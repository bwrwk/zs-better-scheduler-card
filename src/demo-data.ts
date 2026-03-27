import type { UiScheduleEvent } from "./types";

export const DEMO_EVENTS: UiScheduleEvent[] = [
  {
    id: "demo-salon-light",
    name: "Salon po poludniu",
    enabled: true,
    weekdays: ["tue", "wed"],
    startTime: "15:00",
    durationMinutes: 30,
    target: {
      entityId: "light.salon",
      domain: "light",
      label: "Salon"
    },
    action: {
      kind: "turn_on_for_duration",
      label: "Wlacz na 30 min"
    },
    tags: ["daily"],
    sourceMeta: {
      compatibility: "derived"
    }
  },
  {
    id: "demo-scene-evening",
    name: "Wieczorna scena",
    enabled: true,
    weekdays: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    startTime: "20:30",
    target: {
      entityId: "scene.evening_relax",
      domain: "scene",
      label: "Scena wieczorna"
    },
    action: {
      kind: "activate",
      label: "Aktywuj"
    },
    tags: ["evening"],
    sourceMeta: {
      compatibility: "native"
    }
  },
  {
    id: "demo-presence-script",
    name: "Symulacja obecnosci",
    enabled: false,
    weekdays: ["fri", "sat"],
    startTime: "18:45",
    target: {
      entityId: "script.presence_simulation",
      domain: "script",
      label: "Skrypt obecnosci"
    },
    action: {
      kind: "run",
      label: "Uruchom"
    },
    tags: ["holiday"],
    note: "Przyklad zlozonego scenariusza odpalonego przez scheduler",
    sourceMeta: {
      compatibility: "native"
    }
  }
];
