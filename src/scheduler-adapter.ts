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
    enabled: event.enabled
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
    return {
      mode: "readonly",
      rawName: item.name ?? "Unknown schedule",
      rawId: item.entity_id,
      reason: "Brak timeslotow",
      rawSummary: "Harmonogram nie zawiera zadnych timeslotow."
    };
  }

  if (!weekdays.length) {
    return {
      mode: "readonly",
      rawName: item.name ?? "Unknown schedule",
      rawId: item.entity_id,
      reason: "Nietypowe dni",
      rawSummary: "Ten harmonogram uzywa dni spoza prostego modelu UI."
    };
  }

  if (timeslots.length > 2) {
    return {
      mode: "readonly",
      rawName: item.name ?? "Unknown schedule",
      rawId: item.entity_id,
      reason: "Za duzo timeslotow",
      rawSummary: "MVP obsluguje tylko pojedynczy event lub pare start/stop."
    };
  }

  const first = timeslots[0];
  const firstAction = first.actions?.[0];

  if (!first.start || !firstAction?.service || !firstAction.entity_id) {
    return {
      mode: "readonly",
      rawName: item.name ?? "Unknown schedule",
      rawId: item.entity_id,
      reason: "Brak wymaganych pol",
      rawSummary: "Timeslot nie ma kompletnego start/service/entity_id."
    };
  }

  if ((first.actions?.length ?? 0) !== 1) {
    return {
      mode: "readonly",
      rawName: item.name ?? "Unknown schedule",
      rawId: item.entity_id,
      reason: "Wiele akcji",
      rawSummary: "MVP nie edytuje harmonogramow z wieloma akcjami w jednym timeslocie."
    };
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
      return {
        mode: "readonly",
        rawName: item.name ?? "Unknown schedule",
        rawId: item.entity_id,
        reason: "Niekompatybilna para start/stop",
        rawSummary: "Nie udalo sie bezpiecznie rozpoznac jednego eventu z duration."
      };
    }

    const durationMinutes = parseTimeToMinutes(second.start) - parseTimeToMinutes(first.start);

    if (durationMinutes < 1) {
      return {
        mode: "readonly",
        rawName: item.name ?? "Unknown schedule",
        rawId: item.entity_id,
        reason: "Nieprawidlowe duration",
        rawSummary: "Duration nie miesci sie w prostym modelu MVP."
      };
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
