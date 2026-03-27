import type { HomeAssistant } from "./ha-types";
import type { SchedulerBackendItem } from "./types";

type SchedulerListResponse = SchedulerBackendItem[] | { schedules?: SchedulerBackendItem[] };

export class SchedulerService {
  public constructor(private readonly hass: HomeAssistant) {}

  public async fetchSchedules(): Promise<SchedulerBackendItem[]> {
    const response = await this.hass.callWS<SchedulerListResponse>({ type: "scheduler" });
    const baseItems = Array.isArray(response) ? response : response.schedules ?? [];

    const detailedItems = await Promise.all(
      baseItems.map(async (item) => {
        const scheduleRef = item.schedule_id ?? item.entity_id;
        if (!scheduleRef) {
          return item;
        }

        try {
          return await this.hass.callWS<SchedulerBackendItem>({
            type: "scheduler/item",
            schedule_id: item.schedule_id,
            entity_id: item.entity_id ?? scheduleRef
          });
        } catch {
          return item;
        }
      })
    );

    return detailedItems;
  }

  public async fetchTags(): Promise<string[]> {
    try {
      const tags = await this.hass.callWS<string[] | { tags?: string[] }>({ type: "scheduler/tags" });
      return Array.isArray(tags) ? tags : tags.tags ?? [];
    } catch {
      return [];
    }
  }

  public async createSchedule(payload: Record<string, unknown>): Promise<void> {
    await this.hass.callApi("POST", "scheduler/add", payload);
  }

  public async editSchedule(payload: Record<string, unknown>): Promise<void> {
    await this.hass.callApi("POST", "scheduler/edit", payload);
  }

  public async removeSchedule(entityId: string): Promise<void> {
    await this.hass.callApi("POST", "scheduler/remove", { entity_id: entityId });
  }

  public async setScheduleEnabled(entityId: string, enabled: boolean): Promise<void> {
    await this.hass.callService("switch", enabled ? "turn_on" : "turn_off", {
      entity_id: entityId
    });
  }

  public async subscribeToUpdates(callback: () => void): Promise<() => Promise<void> | void> {
    if (!this.hass.connection?.subscribeMessage) {
      return () => undefined;
    }

    return this.hass.connection.subscribeMessage(callback, { type: "scheduler_updated" });
  }
}
