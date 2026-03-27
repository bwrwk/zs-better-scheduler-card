import { describe, expect, it } from "vitest";
import { backendItemToProjection, eventToAddPayload } from "./scheduler-adapter";
import type { SchedulerBackendItem, UiScheduleEvent } from "./types";

describe("eventToAddPayload", () => {
  it("maps turn_on_for_duration into start and stop timeslots", () => {
    const event: UiScheduleEvent = {
      id: "test-1",
      name: "Salon po poludniu",
      enabled: true,
      weekdays: ["tue", "wed"],
      startTime: "16:20",
      durationMinutes: 40,
      target: {
        entityId: "light.salon",
        domain: "light",
        label: "Salon"
      },
      action: {
        kind: "turn_on_for_duration",
        label: "Wlacz na 40 min"
      },
      tags: ["living-room"]
    };

    const payload = eventToAddPayload(event);

    expect(payload.weekdays).toEqual(["tue", "wed"]);
    expect(payload.repeat_type).toBe("repeat");
    expect(payload.timeslots).toHaveLength(2);
    expect(payload.timeslots[0]).toMatchObject({
      start: "16:20",
      actions: [{ entity_id: "light.salon", service: "light.turn_on" }]
    });
    expect(payload.timeslots[1]).toMatchObject({
      start: "17:00",
      actions: [{ entity_id: "light.salon", service: "light.turn_off" }]
    });
  });
});

describe("backendItemToProjection", () => {
  it("derives a duration event from a start and stop pair", () => {
    const item: SchedulerBackendItem = {
      entity_id: "switch.schedule_123456",
      name: "Salon po poludniu",
      weekdays: ["tue", "wed"],
      enabled: true,
      tags: ["living-room"],
      timeslots: [
        {
          start: "16:20",
          actions: [{ entity_id: "light.salon", service: "light.turn_on" }]
        },
        {
          start: "17:00",
          actions: [{ entity_id: "light.salon", service: "light.turn_off" }]
        }
      ]
    };

    const projection = backendItemToProjection(item);

    expect(projection.mode).toBe("editable");
    if (projection.mode !== "editable") {
      return;
    }

    expect(projection.event.action.kind).toBe("turn_on_for_duration");
    expect(projection.event.durationMinutes).toBe(40);
    expect(projection.event.weekdays).toEqual(["tue", "wed"]);
    expect(projection.event.sourceMeta?.compatibility).toBe("derived");
  });

  it("marks multi-slot schedules as readonly when they exceed the simple model", () => {
    const item: SchedulerBackendItem = {
      entity_id: "switch.schedule_complex",
      name: "Complex schedule",
      weekdays: ["mon", "wed"],
      timeslots: [
        {
          start: "08:00",
          actions: [{ entity_id: "light.salon", service: "light.turn_on" }]
        },
        {
          start: "12:00",
          actions: [{ entity_id: "light.salon", service: "light.turn_off" }]
        },
        {
          start: "18:00",
          actions: [{ entity_id: "light.salon", service: "light.turn_on" }]
        }
      ]
    };

    const projection = backendItemToProjection(item);

    expect(projection.mode).toBe("readonly");
    if (projection.mode !== "readonly") {
      return;
    }

    expect(projection.reasonCode).toBe("too_many_timeslots");
    expect(projection.rawTimeslots).toHaveLength(3);
    expect(projection.suggestions[0]).toContain("bardziej zlozony");
  });

  it("marks schedules with multiple actions in one timeslot as readonly", () => {
    const item: SchedulerBackendItem = {
      entity_id: "switch.schedule_multi_action",
      name: "Multi action",
      weekdays: ["mon"],
      timeslots: [
        {
          start: "10:00",
          actions: [
            { entity_id: "light.salon", service: "light.turn_on" },
            { entity_id: "switch.tv", service: "switch.turn_on" }
          ]
        }
      ]
    };

    const projection = backendItemToProjection(item);

    expect(projection.mode).toBe("readonly");
    if (projection.mode !== "readonly") {
      return;
    }

    expect(projection.reasonCode).toBe("multiple_actions");
    expect(projection.details[0]).toContain("2");
  });
});
