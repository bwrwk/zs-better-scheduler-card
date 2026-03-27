export type HassEntity = {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
};

export type HomeAssistant = {
  states: Record<string, HassEntity>;
  callWS<T>(message: Record<string, unknown>): Promise<T>;
  callApi<T>(method: string, path: string, parameters?: unknown): Promise<T>;
  callService(domain: string, service: string, serviceData?: Record<string, unknown>): Promise<unknown>;
  connection?: {
    subscribeMessage<T>(
      callback: (message: T) => void,
      subscribeMessage: Record<string, unknown>
    ): Promise<() => Promise<void> | void>;
  };
};
