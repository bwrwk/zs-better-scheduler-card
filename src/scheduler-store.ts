import { backendItemToProjection } from "./scheduler-adapter";
import { SchedulerService } from "./scheduler-service";
import type { SchedulerBackendItem, UiScheduleProjection } from "./types";

export type SchedulerStoreSnapshot = {
  items: SchedulerBackendItem[];
  projections: UiScheduleProjection[];
  tags: string[];
};

export async function loadSchedulerSnapshot(service: SchedulerService): Promise<SchedulerStoreSnapshot> {
  const [items, tags] = await Promise.all([service.fetchSchedules(), service.fetchTags()]);
  return {
    items,
    projections: items.map((item) => backendItemToProjection(item)),
    tags
  };
}
