import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { DEMO_EVENTS } from "./demo-data";
import { eventToAddPayload, validateUiEvent } from "./scheduler-adapter";
import { formatActionSummary, formatEventSummary, formatWeekdays } from "./summary";
import type { UiScheduleEvent, Weekday } from "./types";

type EditorDraft = UiScheduleEvent;

const WEEKDAYS: Array<{ key: Weekday; label: string }> = [
  { key: "mon", label: "Pn" },
  { key: "tue", label: "Wt" },
  { key: "wed", label: "Sr" },
  { key: "thu", label: "Cz" },
  { key: "fri", label: "Pt" },
  { key: "sat", label: "Sb" },
  { key: "sun", label: "Nd" }
];

@customElement("zs-better-scheduler-card")
export class ZsBetterSchedulerCard extends LitElement {
  @property({ attribute: false }) public hass?: unknown;
  @property({ attribute: false }) public config?: Record<string, unknown>;

  @state() private events: UiScheduleEvent[] = DEMO_EVENTS;
  @state() private draft: EditorDraft = this.createEmptyDraft();
  @state() private editingId: string | null = null;

  static styles = css`
    :host {
      display: block;
    }

    .card {
      padding: 18px;
      border-radius: 22px;
      background:
        linear-gradient(160deg, rgba(28, 91, 64, 0.1), rgba(180, 133, 52, 0.12)),
        var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color);
    }

    .shell {
      display: grid;
      gap: 18px;
    }

    @media (min-width: 920px) {
      .shell {
        grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
      }
    }

    .intro {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: flex-start;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(127, 127, 127, 0.18);
    }

    .eyebrow {
      display: inline-flex;
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(24, 84, 62, 0.12);
      color: #1c5b40;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .column {
      display: grid;
      gap: 14px;
    }

    .list-card,
    .editor-card,
    .payload-card {
      padding: 14px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.72);
      box-shadow: inset 0 0 0 1px rgba(127, 127, 127, 0.12);
    }

    .toolbar {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    .list {
      display: grid;
      gap: 10px;
    }

    .row {
      display: grid;
      gap: 10px;
      padding: 12px;
      border-radius: 16px;
      background: rgba(248, 246, 240, 0.86);
      border: 1px solid rgba(127, 127, 127, 0.14);
    }

    .row-top,
    .row-meta,
    .button-row {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }

    .summary {
      font-weight: 600;
      line-height: 1.4;
    }

    .meta {
      color: var(--secondary-text-color);
      font-size: 0.92rem;
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .chip,
    .status {
      display: inline-flex;
      align-items: center;
      padding: 5px 10px;
      border-radius: 999px;
      font-size: 0.78rem;
      background: rgba(24, 84, 62, 0.1);
    }

    .status.off {
      background: rgba(120, 120, 120, 0.14);
      color: var(--secondary-text-color);
    }

    button {
      border: 0;
      border-radius: 12px;
      padding: 10px 12px;
      font: inherit;
      cursor: pointer;
      background: #1c5b40;
      color: white;
    }

    button.secondary {
      background: rgba(24, 84, 62, 0.08);
      color: var(--primary-text-color);
    }

    button.ghost {
      background: transparent;
      color: var(--primary-text-color);
      border: 1px solid rgba(127, 127, 127, 0.2);
    }

    .form {
      display: grid;
      gap: 12px;
    }

    .field-grid {
      display: grid;
      gap: 12px;
    }

    @media (min-width: 560px) {
      .field-grid.two {
        grid-template-columns: 1fr 1fr;
      }
    }

    label {
      display: grid;
      gap: 6px;
      font-size: 0.93rem;
      font-weight: 600;
    }

    input,
    select,
    textarea {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid rgba(127, 127, 127, 0.22);
      border-radius: 12px;
      padding: 10px 12px;
      font: inherit;
      background: rgba(255, 255, 255, 0.96);
      color: var(--primary-text-color);
    }

    textarea {
      resize: vertical;
      min-height: 84px;
    }

    .weekday-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .weekday-row button {
      min-width: 42px;
      padding: 9px 0;
      background: rgba(24, 84, 62, 0.08);
      color: var(--primary-text-color);
    }

    .weekday-row button.selected {
      background: #1c5b40;
      color: white;
    }

    .helper,
    .warning,
    p {
      margin: 0;
      line-height: 1.5;
      color: var(--secondary-text-color);
    }

    .warning {
      color: #9e5b00;
    }

    h2,
    h3 {
      margin: 0;
      font-size: 1.05rem;
    }

    pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      font-size: 0.84rem;
      line-height: 1.5;
    }
  `;

  public setConfig(config: Record<string, unknown>): void {
    this.config = config;
  }

  public getCardSize(): number {
    return 6;
  }

  protected render() {
    const validationErrors = validateUiEvent(this.draft);

    let payloadPreview = "";
    try {
      payloadPreview = JSON.stringify(eventToAddPayload(this.draft), null, 2);
    } catch (error) {
      payloadPreview = error instanceof Error ? error.message : "Nie udalo sie przygotowac payloadu.";
    }

    return html`
      <ha-card>
        <div class="card">
          <div class="shell">
            <div class="column">
              <div class="intro">
                <div>
                  <span class="eyebrow">Event-first MVP</span>
                  <h2>ZS Better Scheduler Card</h2>
                  <p>
                    Pierwszy UI listy i formularza. Karta pracuje jeszcze na lokalnym stanie
                    demonstracyjnym, ale pokazuje docelowy model: target, akcja, start, duration i dni.
                  </p>
                </div>
                <button @click=${this.handleCreateNew}>Dodaj harmonogram</button>
              </div>

              <section class="list-card">
                <div class="toolbar">
                  <h3>Harmonogramy</h3>
                  <span class="helper">${this.events.length} wpisy</span>
                </div>
                <div class="list">
                  ${this.events.map(
                    (event) => html`
                      <article class="row">
                        <div class="row-top">
                          <div class="summary">${formatEventSummary(event)}</div>
                          <span class="status ${event.enabled ? "" : "off"}">
                            ${event.enabled ? "Aktywny" : "Nieaktywny"}
                          </span>
                        </div>
                        <div class="row-meta">
                          <div class="meta">${event.name}</div>
                          <div class="meta">${event.target.entityId}</div>
                        </div>
                        <div class="row-meta">
                          <div class="tag-list">
                            ${event.tags.map((tag) => html`<span class="chip">#${tag}</span>`)}
                          </div>
                          <div class="meta">${event.sourceMeta?.compatibility ?? "native"}</div>
                        </div>
                        <div class="button-row">
                          <button class="secondary" @click=${() => this.handleEdit(event)}>Edytuj</button>
                          <button class="ghost" @click=${() => this.toggleEnabled(event.id)}>
                            ${event.enabled ? "Wylacz" : "Wlacz"}
                          </button>
                        </div>
                      </article>
                    `
                  )}
                </div>
              </section>
            </div>

            <div class="column">
              <section class="editor-card">
                <div class="toolbar">
                  <h3>${this.editingId ? "Edytuj event" : "Nowy event"}</h3>
                  <span class="helper">${formatEventSummary(this.draft)}</span>
                </div>

                <div class="form">
                  <label>
                    Nazwa harmonogramu
                    <input .value=${this.draft.name} @input=${this.handleNameInput} />
                  </label>

                  <div class="field-grid two">
                    <label>
                      Target
                      <input .value=${this.draft.target.entityId} @input=${this.handleTargetInput} />
                    </label>
                    <label>
                      Label
                      <input .value=${this.draft.target.label} @input=${this.handleTargetLabelInput} />
                    </label>
                  </div>

                  <div class="field-grid two">
                    <label>
                      Domena
                      <select .value=${this.draft.target.domain} @change=${this.handleDomainChange}>
                        <option value="light">light</option>
                        <option value="switch">switch</option>
                        <option value="script">script</option>
                        <option value="automation">automation</option>
                        <option value="scene">scene</option>
                        <option value="input_boolean">input_boolean</option>
                      </select>
                    </label>
                    <label>
                      Akcja
                      <select .value=${this.draft.action.kind} @change=${this.handleActionChange}>
                        <option value="turn_on">Wlacz</option>
                        <option value="turn_off">Wylacz</option>
                        <option value="turn_on_for_duration">Wlacz na czas</option>
                        <option value="run">Uruchom</option>
                        <option value="activate">Aktywuj</option>
                        <option value="custom_service">Custom service</option>
                      </select>
                    </label>
                  </div>

                  <div class="field-grid two">
                    <label>
                      Start
                      <input type="time" .value=${this.draft.startTime} @input=${this.handleStartTimeInput} />
                    </label>
                    <label>
                      Duration (min)
                      <input
                        type="number"
                        min="1"
                        .value=${String(this.draft.durationMinutes ?? "")}
                        ?disabled=${this.draft.action.kind !== "turn_on_for_duration"}
                        @input=${this.handleDurationInput}
                      />
                    </label>
                  </div>

                  <label>
                    Dni
                    <div class="weekday-row">
                      ${WEEKDAYS.map(
                        (day) => html`
                          <button
                            type="button"
                            class=${this.draft.weekdays.includes(day.key) ? "selected" : ""}
                            @click=${() => this.toggleWeekday(day.key)}
                          >
                            ${day.label}
                          </button>
                        `
                      )}
                    </div>
                  </label>

                  <div class="field-grid two">
                    <label>
                      Tagi
                      <input .value=${this.draft.tags.join(", ")} @input=${this.handleTagsInput} />
                    </label>
                    <label>
                      Status
                      <select .value=${this.draft.enabled ? "on" : "off"} @change=${this.handleEnabledChange}>
                        <option value="on">Aktywny</option>
                        <option value="off">Nieaktywny</option>
                      </select>
                    </label>
                  </div>

                  <label>
                    Notatka
                    <textarea .value=${this.draft.note ?? ""} @input=${this.handleNoteInput}></textarea>
                  </label>

                  <div class="helper">
                    Widok uproszczony: ${formatWeekdays(this.draft.weekdays)} ${this.draft.startTime} |
                    ${this.draft.target.label || this.draft.target.entityId} | ${formatActionSummary(this.draft)}
                  </div>

                  ${validationErrors.length
                    ? html`
                        <div class="warning">
                          ${validationErrors.map((error) => html`<div>${error}</div>`)}
                        </div>
                      `
                    : null}

                  <div class="button-row">
                    <button @click=${this.handleSave}>${this.editingId ? "Zapisz zmiany" : "Dodaj do listy"}</button>
                    <button class="secondary" @click=${this.handleResetEditor}>Reset</button>
                  </div>
                </div>
              </section>

              <section class="payload-card">
                <div class="toolbar">
                  <h3>Podglad adaptera</h3>
                  <span class="helper">UI model -> scheduler payload</span>
                </div>
                <pre>${payloadPreview}</pre>
              </section>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private createEmptyDraft(): EditorDraft {
    return {
      id: `draft-${Date.now()}`,
      name: "",
      enabled: true,
      weekdays: ["mon", "tue", "wed", "thu", "fri"],
      startTime: "18:00",
      target: {
        entityId: "",
        domain: "light",
        label: ""
      },
      action: {
        kind: "turn_on",
        label: "Wlacz"
      },
      tags: [],
      note: "",
      sourceMeta: {
        compatibility: "native"
      }
    };
  }

  private handleCreateNew = () => {
    this.editingId = null;
    this.draft = this.createEmptyDraft();
  };

  private handleResetEditor = () => {
    if (!this.editingId) {
      this.draft = this.createEmptyDraft();
      return;
    }

    const current = this.events.find((event) => event.id === this.editingId);
    if (current) {
      this.draft = structuredClone(current);
    }
  };

  private handleEdit(event: UiScheduleEvent) {
    this.editingId = event.id;
    this.draft = structuredClone(event);
  }

  private toggleEnabled(id: string) {
    this.events = this.events.map((event) =>
      event.id === id ? { ...event, enabled: !event.enabled } : event
    );
    if (this.editingId === id) {
      this.draft = {
        ...this.draft,
        enabled: !this.draft.enabled
      };
    }
  }

  private handleSave = () => {
    const errors = validateUiEvent(this.draft);
    if (errors.length) {
      return;
    }

    if (this.editingId) {
      this.events = this.events.map((event) =>
        event.id === this.editingId ? structuredClone(this.draft) : event
      );
    } else {
      this.events = [...this.events, structuredClone(this.draft)];
      this.editingId = this.draft.id;
    }
  };

  private handleNameInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    this.draft = { ...this.draft, name: value };
  };

  private handleTargetInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    this.draft = {
      ...this.draft,
      target: {
        ...this.draft.target,
        entityId: value
      }
    };
  };

  private handleTargetLabelInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    this.draft = {
      ...this.draft,
      target: {
        ...this.draft.target,
        label: value
      }
    };
  };

  private handleDomainChange = (event: Event) => {
    const domain = (event.target as HTMLSelectElement).value;
    this.draft = {
      ...this.draft,
      target: {
        ...this.draft.target,
        domain
      }
    };
  };

  private handleActionChange = (event: Event) => {
    const kind = (event.target as HTMLSelectElement).value as UiScheduleEvent["action"]["kind"];
    const labelMap: Record<UiScheduleEvent["action"]["kind"], string> = {
      turn_on: "Wlacz",
      turn_off: "Wylacz",
      turn_on_for_duration: "Wlacz na czas",
      run: "Uruchom",
      activate: "Aktywuj",
      custom_service: "Custom service"
    };

    this.draft = {
      ...this.draft,
      action: {
        ...this.draft.action,
        kind,
        label: labelMap[kind]
      },
      durationMinutes: kind === "turn_on_for_duration" ? this.draft.durationMinutes ?? 30 : undefined
    };
  };

  private handleStartTimeInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    this.draft = { ...this.draft, startTime: value };
  };

  private handleDurationInput = (event: Event) => {
    const raw = (event.target as HTMLInputElement).value;
    this.draft = {
      ...this.draft,
      durationMinutes: raw ? Number(raw) : undefined
    };
  };

  private toggleWeekday(day: Weekday) {
    const exists = this.draft.weekdays.includes(day);
    this.draft = {
      ...this.draft,
      weekdays: exists
        ? this.draft.weekdays.filter((entry) => entry !== day)
        : [...this.draft.weekdays, day]
    };
  }

  private handleTagsInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    this.draft = {
      ...this.draft,
      tags: value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    };
  };

  private handleEnabledChange = (event: Event) => {
    this.draft = {
      ...this.draft,
      enabled: (event.target as HTMLSelectElement).value === "on"
    };
  };

  private handleNoteInput = (event: Event) => {
    this.draft = {
      ...this.draft,
      note: (event.target as HTMLTextAreaElement).value
    };
  };
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }

  interface HTMLElementTagNameMap {
    "zs-better-scheduler-card": ZsBetterSchedulerCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "zs-better-scheduler-card",
  name: "ZS Better Scheduler Card",
  description: "Event-first scheduler card for Home Assistant"
});
