export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type SchedulerTargetRef = {
  entityId: string;
  domain: string;
  label: string;
};

export type SchedulerActionKind =
  | "turn_on"
  | "turn_off"
  | "turn_on_for_duration"
  | "run"
  | "activate"
  | "custom_service";

export type UiScheduleCondition = {
  entityId: string;
  value: string;
  matchType: "is" | "not" | "below" | "above";
};

export type UiScheduleEvent = {
  id: string;
  name: string;
  enabled: boolean;
  weekdays: Weekday[];
  startTime: string;
  durationMinutes?: number;
  target: SchedulerTargetRef;
  action: {
    kind: SchedulerActionKind;
    service?: string;
    serviceData?: Record<string, unknown>;
    label: string;
  };
  tags: string[];
  conditions?: UiScheduleCondition[];
  note?: string;
  sourceMeta?: {
    backendScheduleId?: string;
    compatibility: "native" | "derived" | "lossy";
  };
};

export type SchedulerActionPayload = {
  service: string;
  entity_id: string;
  service_data?: Record<string, unknown>;
};

export type SchedulerConditionPayload = {
  entity_id: string;
  value: string;
  match_type: "is" | "not" | "below" | "above";
};

export type SchedulerTimeslotPayload = {
  start: string;
  stop?: string;
  actions: SchedulerActionPayload[];
  conditions?: SchedulerConditionPayload[];
  condition_type?: "and" | "or";
  track_conditions?: boolean;
};

export type SchedulerAddPayload = {
  name: string;
  weekdays: Weekday[];
  timeslots: SchedulerTimeslotPayload[];
  tags?: string[];
  repeat_type: "repeat" | "single" | "pause";
};

export type SchedulerEditPayload = SchedulerAddPayload & {
  entity_id: string;
};

export type UiScheduleProjection =
  | {
      mode: "editable";
      event: UiScheduleEvent;
      warnings: string[];
    }
  | {
      mode: "readonly";
      rawName: string;
      rawId?: string;
      reason: string;
      rawSummary: string;
    };

export type SchedulerBackendItem = {
  schedule_id?: string;
  entity_id?: string;
  name?: string;
  weekdays?: string[];
  tags?: string[];
  enabled?: boolean;
  timeslots?: Array<{
    start?: string;
    stop?: string;
    actions?: Array<{
      service?: string;
      entity_id?: string;
      service_data?: Record<string, unknown>;
    }>;
    conditions?: Array<{
      entity_id?: string;
      value?: string;
      match_type?: "is" | "not" | "below" | "above";
    }>;
    condition_type?: "and" | "or";
    track_conditions?: boolean;
  }>;
};
