import type { UiScheduleEvent, Weekday } from "./types";

const WEEKDAY_LABELS: Record<Weekday, string> = {
  mon: "Pn",
  tue: "Wt",
  wed: "Sr",
  thu: "Cz",
  fri: "Pt",
  sat: "Sb",
  sun: "Nd"
};

export function formatWeekdays(weekdays: Weekday[]): string {
  if (weekdays.length === 7) {
    return "Codziennie";
  }

  return weekdays.map((day) => WEEKDAY_LABELS[day]).join(", ");
}

export function formatActionSummary(event: UiScheduleEvent): string {
  switch (event.action.kind) {
    case "turn_on_for_duration":
      return `Wlacz na ${event.durationMinutes ?? 0} min`;
    case "turn_on":
      return "Wlacz";
    case "turn_off":
      return "Wylacz";
    case "run":
      return "Uruchom";
    case "activate":
      return "Aktywuj";
    case "custom_service":
      return event.action.label || "Wlasna akcja";
    default:
      return event.action.label;
  }
}

export function formatEventSummary(event: UiScheduleEvent): string {
  return `${formatWeekdays(event.weekdays)} ${event.startTime} | ${event.target.label} | ${formatActionSummary(event)}`;
}
