import type { HassEntity } from "./ha-types";
import type { SchedulerActionKind, SchedulerTargetRef } from "./types";

export const SUPPORTED_TARGET_DOMAINS = [
  "light",
  "switch",
  "script",
  "automation",
  "scene",
  "input_boolean"
] as const;

export type SupportedTargetDomain = (typeof SUPPORTED_TARGET_DOMAINS)[number];

const ACTION_OPTIONS: Record<SupportedTargetDomain, SchedulerActionKind[]> = {
  light: ["turn_on", "turn_off", "turn_on_for_duration"],
  switch: ["turn_on", "turn_off", "turn_on_for_duration"],
  input_boolean: ["turn_on", "turn_off", "turn_on_for_duration"],
  script: ["run"],
  automation: ["run", "turn_on", "turn_off"],
  scene: ["activate"]
};

export function isSupportedTargetDomain(domain: string): domain is SupportedTargetDomain {
  return (SUPPORTED_TARGET_DOMAINS as readonly string[]).includes(domain);
}

export function getActionOptionsForDomain(domain: string): SchedulerActionKind[] {
  if (!isSupportedTargetDomain(domain)) {
    return ["custom_service"];
  }

  return ACTION_OPTIONS[domain];
}

export function getActionLabel(kind: SchedulerActionKind): string {
  switch (kind) {
    case "turn_on":
      return "Wlacz";
    case "turn_off":
      return "Wylacz";
    case "turn_on_for_duration":
      return "Wlacz na czas";
    case "run":
      return "Uruchom";
    case "activate":
      return "Aktywuj";
    case "custom_service":
      return "Custom service";
    default:
      return kind;
  }
}

export function getActionKindsForTarget(target: SchedulerTargetRef): SchedulerActionKind[] {
  return getActionOptionsForDomain(target.domain);
}

export function buildTargetOptions(states: Record<string, HassEntity>): SchedulerTargetRef[] {
  return Object.values(states)
    .filter((state) => isSupportedTargetDomain(state.entity_id.split(".")[0] ?? ""))
    .map((state) => {
      const domain = state.entity_id.split(".")[0] ?? "";
      return {
        entityId: state.entity_id,
        domain,
        label: String(state.attributes.friendly_name ?? state.entity_id)
      };
    })
    .sort((left, right) => left.label.localeCompare(right.label, "pl"));
}
