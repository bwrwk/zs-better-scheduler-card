import { addMinutesToTime, parseTimeToMinutes } from "./time";
import type {
  SchedulerActionPayload,
  SchedulerAddPayload,
  SchedulerBackendItem,
  SchedulerConditionPayload,
  SchedulerEditPayload,
  SchedulerTimeslotPayload,
  UiScheduleCondition,
  UiScheduleEvent,
  UiScheduleProjection,
  Weekday
} from "./types";

function getRawTimeslotSummary(item: SchedulerBackendItem) {
  return (item.timeslots ?? []).map((slot) => ({
    start: slot.start,
    stop: slot.stop,
    actions: (slot.actions ?? []).map((action) =>
      [action.service ?? "unknown service", action.entity_id ?? "unknown entity"].join(" -> ")
    )
  }));
}

function makeReadonlyProjection(
  item: SchedulerBackendItem,
  reasonCode:
    | "no_timeslots"
    | "unsupported_weekdays"
    | "too_many_timeslots"
    | "missing_required_fields"
    | "multiple_actions"
    | "incompatible_duration_pair"
    | "invalid_duration",
  reason: string,
  rawSummary: string,
  details: string[] = [],
  suggestions: string[] = []
): UiScheduleProjection {
  return {
    mode: "readonly",
    rawName: item.name ?? "Unknown schedule",
    rawId: item.entity_id,
    reasonCode,
    reason,
    rawSummary,
    details,
    rawTimeslots: getRawTimeslotSummary(item),
    suggestions
  };
}

function mapConditions(conditions?: UiScheduleCondition[]): SchedulerConditionPayload[] | undefined {
  if (!conditions?.length) {
    return undefined;
  }

  return conditions.map((condition) => ({
    entity_id: condition.entityId,
    value: condition.value,
    match_type: condition.matchType
  }));
}

function buildActionPayload(event: UiScheduleEvent, kindOverride?: "turn_on" | "turn_off"): SchedulerActionPayload {
  const effectiveKind = kindOverride ?? event.action.kind;
  const { domain, entityId } = event.target;

  switch (effectiveKind) {
    case "turn_on":
      return { entity_id: entityId, service: `${domain}.turn_on` };
    case "turn_off":
      return { entity_id: entityId, service: `${domain}.turn_off` };
    case "turn_on_for_duration":
      return {
        entity_id: entityId,
        service: `${domain}.turn_on`,
        service_data: event.action.serviceData
      };
    case "run":
      if (domain === "automation") {
        return { entity_id: entityId, service: "automation.trigger", service_data: event.action.serviceData };
      }
      return { entity_id: entityId, service: `${domain}.turn_on`, service_data: event.action.serviceData };
    case "activate":
      return { entity_id: entityId, service: `${domain}.turn_on`, service_data: event.action.serviceData };
    case "custom_service":
      return {
        entity_id: entityId,
        service: event.action.service ?? `${domain}.turn_on`,
        service_data: event.action.serviceData
      };
    default:
      return { entity_id: entityId, service: `${domain}.turn_on` };
  }
}

function supportsDuration(event: UiScheduleEvent): boolean {
  if (event.action.kind !== "turn_on_for_duration") {
    return false;
  }

  return ["light", "switch", "input_boolean"].includes(event.target.domain);
}

export function validateUiEvent(event: UiScheduleEvent): string[] {
  const errors: string[] = [];

  if (!event.name.trim()) {
    errors.push("Nazwa harmonogramu jest wymagana.");
  }

  if (!event.target.entityId.trim()) {
    errors.push("Target jest wymagany.");
  }

  if (!event.target.label.trim()) {
    errors.push("Label targetu jest wymagany.");
  }

  if (!event.weekdays.length) {
    errors.push("Wybierz przynajmniej jeden dzien.");
  }

  if (event.action.kind === "turn_on_for_duration") {
    if (!supportsDuration(event)) {
      errors.push("Duration w MVP jest wspierane tylko dla light, switch i input_boolean.");
    }

    if (!event.durationMinutes || event.durationMinutes < 1) {
      errors.push("Duration musi byc wieksze od 0.");
    }

    if ((event.durationMinutes ?? 0) < 2) {
      errors.push("Na backendzie scheduler-component minimalne pewne duration to 2 minuty.");
    }

    if (event.durationMinutes) {
      const result = addMinutesToTime(event.startTime, event.durationMinutes);
      if (result.crossesMidnight) {
        errors.push("Przejscie przez polnoc nie jest jeszcze wspierane w MVP.");
      }
    }
  }

  return errors;
}

export function eventToAddPayload(event: UiScheduleEvent): SchedulerAddPayload {
  const errors = validateUiEvent(event);
  if (errors.length) {
    throw new Error(errors.join(" "));
  }

  const baseTimeslot: SchedulerTimeslotPayload = {
    start: event.startTime,
    actions: [buildActionPayload(event)],
    conditions: mapConditions(event.conditions),
    condition_type: event.conditions?.length ? "and" : undefined
  };

  const timeslots: SchedulerTimeslotPayload[] =
    event.action.kind === "turn_on_for_duration" && event.durationMinutes
      ? [
          baseTimeslot,
          {
            start: addMinutesToTime(event.startTime, event.durationMinutes).time,
            actions: [buildActionPayload(event, "turn_off")],
            conditions: mapConditions(event.conditions),
            condition_type: event.conditions?.length ? "and" : undefined
          }
        ]
      : [baseTimeslot];

  return {
    name: event.name,
    weekdays: event.weekdays,
    timeslots,
    tags: event.tags.length ? event.tags : undefined,
    repeat_type: "repeat"
  };
}

export function eventToEditPayload(event: UiScheduleEvent): SchedulerEditPayload {
  if (!event.sourceMeta?.backendScheduleId) {
    throw new Error("Brak backendScheduleId dla edycji wpisu.");
  }

  return {
    entity_id: event.sourceMeta.backendScheduleId,
    ...eventToAddPayload(event)
  };
}

function sameConditions(
  left?: SchedulerConditionPayload[] | Array<{ entity_id?: string; value?: string; match_type?: string }>,
  right?: SchedulerConditionPayload[] | Array<{ entity_id?: string; value?: string; match_type?: string }>
): boolean {
  return JSON.stringify(left ?? []) === JSON.stringify(right ?? []);
}

function asWeekdays(days?: string[]): Weekday[] {
  const supported: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  return (days ?? []).filter((day): day is Weekday => supported.includes(day as Weekday));
}

function actionLabelForService(service: string, durationMinutes?: number): string {
  if (service === "automation.trigger") {
    return "Uruchom";
  }
  if (service.endsWith(".turn_off")) {
    return "Wylacz";
  }
  if (durationMinutes) {
    return `Wlacz na ${durationMinutes} min`;
  }
  if (service.startsWith("script.")) {
    return "Uruchom";
  }
  if (service.startsWith("scene.")) {
    return "Aktywuj";
  }
  return "Wlacz";
}

export function backendItemToProjection(item: SchedulerBackendItem): UiScheduleProjection {
  const timeslots = item.timeslots ?? [];
  const weekdays = asWeekdays(item.weekdays);

  if (!timeslots.length) {
    return makeReadonlyProjection(
      item,
      "no_timeslots",
      "Brak timeslotow",
      "Harmonogram nie zawiera zadnych timeslotow.",
      ["Ten wpis nie ma zadnego momentu startu do pokazania w prostym modelu eventu."],
      ["Sprawdz wpis w oryginalnym schedulerze lub utworz go ponownie w tej karcie."]
    );
  }

  if (!weekdays.length) {
    return makeReadonlyProjection(
      item,
      "unsupported_weekdays",
      "Nietypowe dni",
      "Ten harmonogram uzywa dni spoza prostego modelu UI.",
      [`Odebrane dni: ${(item.weekdays ?? []).join(", ") || "brak"}`],
      ["Obecna karta wspiera tylko mon-sun w prostym modelu event-first."]
    );
  }

  if (timeslots.length > 2) {
    return makeReadonlyProjection(
      item,
      "too_many_timeslots",
      "Za duzo timeslotow",
      "MVP obsluguje tylko pojedynczy event lub pare start/stop.",
      [`Liczba timeslotow: ${timeslots.length}`],
      ["Ten wpis wyglada na bardziej zlozony scenariusz niz prosty event."]
    );
  }

  const first = timeslots[0];
  const firstAction = first.actions?.[0];

  if (!first.start || !firstAction?.service || !firstAction.entity_id) {
    return makeReadonlyProjection(
      item,
      "missing_required_fields",
      "Brak wymaganych pol",
      "Timeslot nie ma kompletnego start/service/entity_id.",
      [
        `start: ${first.start ?? "brak"}`,
        `service: ${firstAction?.service ?? "brak"}`,
        `entity_id: ${firstAction?.entity_id ?? "brak"}`
      ],
      ["UI event-first wymaga jednoznacznego startu, uslugi i targetu."]
    );
  }

  if ((first.actions?.length ?? 0) !== 1) {
    return makeReadonlyProjection(
      item,
      "multiple_actions",
      "Wiele akcji",
      "MVP nie edytuje harmonogramow z wieloma akcjami w jednym timeslocie.",
      [`Liczba akcji w pierwszym timeslocie: ${first.actions?.length ?? 0}`],
      ["Rozwaz rozbicie tego wpisu na prostsze harmonogramy lub skrypt."]
    );
  }

  if (timeslots.length === 2) {
    const second = timeslots[1];
    const secondAction = second.actions?.[0];

    if (
      !second.start ||
      !secondAction?.service ||
      !secondAction.entity_id ||
      secondAction.entity_id !== firstAction.entity_id ||
      !firstAction.service.endsWith(".turn_on") ||
      !secondAction.service.endsWith(".turn_off") ||
      !sameConditions(first.conditions, second.conditions)
    ) {
      return makeReadonlyProjection(
        item,
        "incompatible_duration_pair",
        "Niekompatybilna para start/stop",
        "Nie udalo sie bezpiecznie rozpoznac jednego eventu z duration.",
        [
          `Start entity: ${firstAction.entity_id}`,
          `Stop entity: ${secondAction?.entity_id ?? "brak"}`,
          `Start service: ${firstAction.service}`,
          `Stop service: ${secondAction?.service ?? "brak"}`
        ],
        ["Para start/stop nie spelnia prostego wzorca jednego eventu 'na czas'."]
      );
    }

    const durationMinutes = parseTimeToMinutes(second.start) - parseTimeToMinutes(first.start);

    if (durationMinutes < 1) {
      return makeReadonlyProjection(
        item,
        "invalid_duration",
        "Nieprawidlowe duration",
        "Duration nie miesci sie w prostym modelu MVP.",
        [`start: ${first.start}`, `stop: ${second.start}`, `wyliczone duration: ${durationMinutes}`],
        ["Obecna karta nie wspiera duration rownego 0, ujemnego ani przechodzacego przez polnoc."]
      );
    }

    const domain = firstAction.entity_id.split(".")[0] ?? "unknown";

    return {
      mode: "editable",
      warnings: ["Duration jest wyprowadzone z pary start/stop w backendzie."],
      event: {
        id: item.schedule_id ?? item.entity_id ?? `${item.name ?? "schedule"}-derived`,
        name: item.name ?? "Schedule",
        enabled: item.enabled ?? true,
        weekdays,
        startTime: first.start,
        durationMinutes,
        target: {
          entityId: firstAction.entity_id,
          domain,
          label: firstAction.entity_id
        },
        action: {
          kind: "turn_on_for_duration",
          label: actionLabelForService(firstAction.service, durationMinutes),
          serviceData: firstAction.service_data
        },
        tags: item.tags ?? [],
        conditions: first.conditions?.map((condition) => ({
          entityId: condition.entity_id ?? "",
          value: condition.value ?? "",
          matchType: (condition.match_type ?? "is") as UiScheduleCondition["matchType"]
        })),
        sourceMeta: {
          backendScheduleId: item.entity_id,
          compatibility: "derived"
        }
      }
    };
  }

  const domain = firstAction.entity_id.split(".")[0] ?? "unknown";
  const service = firstAction.service;

  let actionKind: UiScheduleEvent["action"]["kind"] = "custom_service";
  if (service === "automation.trigger") {
    actionKind = "run";
  } else if (service.endsWith(".turn_on")) {
    actionKind = domain === "script" ? "run" : domain === "scene" ? "activate" : "turn_on";
  } else if (service.endsWith(".turn_off")) {
    actionKind = "turn_off";
  }

  return {
    mode: "editable",
    warnings: [],
    event: {
      id: item.schedule_id ?? item.entity_id ?? `${item.name ?? "schedule"}-native`,
      name: item.name ?? "Schedule",
      enabled: item.enabled ?? true,
      weekdays,
      startTime: first.start,
      target: {
        entityId: firstAction.entity_id,
        domain,
        label: firstAction.entity_id
      },
      action: {
        kind: actionKind,
        label: actionLabelForService(service),
        service: actionKind === "custom_service" ? service : undefined,
        serviceData: firstAction.service_data
      },
      tags: item.tags ?? [],
      conditions: first.conditions?.map((condition) => ({
        entityId: condition.entity_id ?? "",
        value: condition.value ?? "",
        matchType: (condition.match_type ?? "is") as UiScheduleCondition["matchType"]
      })),
      sourceMeta: {
        backendScheduleId: item.entity_id,
        compatibility: "native"
      }
    }
  };
}
