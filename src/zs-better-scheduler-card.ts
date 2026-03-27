import { LitElement, css, html, nothing } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { DEMO_EVENTS } from "./demo-data";
import type { HomeAssistant } from "./ha-types";
import { eventToAddPayload, eventToEditPayload, validateUiEvent } from "./scheduler-adapter";
import { SchedulerService } from "./scheduler-service";
import { loadSchedulerSnapshot } from "./scheduler-store";
import { formatActionSummary, formatEventSummary, formatWeekdays } from "./summary";
import {
  buildTargetOptions,
  getActionKindsForTarget,
  getActionLabel,
  isSupportedTargetDomain,
  type SupportedTargetDomain
} from "./targets";
import type { SchedulerActionKind, SchedulerTargetRef, UiScheduleEvent, UiScheduleProjection, Weekday } from "./types";

type EditorDraft = UiScheduleEvent;
type FilterStatus = "all" | "active" | "inactive";

const WEEKDAYS: Array<{ key: Weekday; label: string }> = [
  { key: "mon", label: "Pn" },
  { key: "tue", label: "Wt" },
  { key: "wed", label: "Sr" },
  { key: "thu", label: "Cz" },
  { key: "fri", label: "Pt" },
  { key: "sat", label: "Sb" },
  { key: "sun", label: "Nd" }
];

const DEMO_PROJECTIONS: UiScheduleProjection[] = DEMO_EVENTS.map((event) => ({
  mode: "editable" as const,
  event,
  warnings: ["Tryb demo: karta nie jest jeszcze podpieta do Home Assistanta."]
}));

@customElement("zs-better-scheduler-card")
export class ZsBetterSchedulerCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public config?: Record<string, unknown>;

  @state() private projections: UiScheduleProjection[] = DEMO_PROJECTIONS;
  @state() private availableTags: string[] = [];
  @state() private availableTargets: SchedulerTargetRef[] = [];
  @state() private draft: EditorDraft = this.createEmptyDraft();
  @state() private editingId: string | null = null;
  @state() private loading = false;
  @state() private saving = false;
  @state() private error = "";
  @state() private notice = "Tryb demo: karta czeka na obiekt hass.";
  @state() private filterSearch = "";
  @state() private filterStatus: FilterStatus = "all";
  @state() private filterTag = "all";
  @state() private showReadonly = true;
  @state() private targetSearch = "";
  @state() private expandedReadonlyIds: string[] = [];

  private schedulerService?: SchedulerService;
  private unsubscribeUpdates?: () => Promise<void> | void;
  private isInitializedForHass = false;

  static styles = css`
    :host {
      display: block;
    }

    .card {
      padding: 18px;
      border-radius: 22px;
      background:
        radial-gradient(circle at top left, rgba(28, 91, 64, 0.16), transparent 32%),
        linear-gradient(160deg, rgba(28, 91, 64, 0.08), rgba(180, 133, 52, 0.14)),
        var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color);
    }

    .shell {
      display: grid;
      gap: 18px;
    }

    @media (min-width: 980px) {
      .shell {
        grid-template-columns: minmax(0, 1.35fr) minmax(340px, 0.95fr);
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

    .eyebrow,
    .pill,
    .status {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.77rem;
      font-weight: 600;
    }

    .eyebrow {
      background: rgba(24, 84, 62, 0.12);
      color: #1c5b40;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .pill {
      background: rgba(24, 84, 62, 0.08);
      color: var(--primary-text-color);
    }

    .status.off {
      background: rgba(120, 120, 120, 0.14);
      color: var(--secondary-text-color);
    }

    .status.readonly {
      background: rgba(158, 91, 0, 0.13);
      color: #9e5b00;
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
      background: rgba(255, 255, 255, 0.74);
      box-shadow: inset 0 0 0 1px rgba(127, 127, 127, 0.12);
    }

    .toolbar,
    .row-top,
    .row-meta,
    .button-row,
    .filters {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: center;
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

    .row.readonly {
      background: rgba(250, 246, 238, 0.9);
      border-color: rgba(158, 91, 0, 0.18);
    }

    .row.readonly .summary {
      color: #6f4100;
    }

    .summary {
      font-weight: 600;
      line-height: 1.4;
    }

    .meta,
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

    .notice {
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(24, 84, 62, 0.08);
      color: var(--primary-text-color);
      font-size: 0.9rem;
    }

    .notice.error {
      background: rgba(170, 52, 52, 0.11);
      color: #8d2323;
    }

    .notice.warning {
      background: rgba(158, 91, 0, 0.11);
      color: #9e5b00;
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .stack {
      display: grid;
      gap: 8px;
    }

    .readonly-box {
      padding: 10px 12px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.72);
      border: 1px dashed rgba(158, 91, 0, 0.24);
    }

    .mono {
      font-family: Consolas, "Courier New", monospace;
      font-size: 0.82rem;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      padding: 5px 10px;
      border-radius: 999px;
      font-size: 0.78rem;
      background: rgba(24, 84, 62, 0.1);
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

    button[disabled] {
      opacity: 0.55;
      cursor: not-allowed;
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
      .field-grid.two,
      .filters {
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
    return 7;
  }

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("hass")) {
      void this.handleHassChanged();
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    void this.teardownSubscription();
  }

  protected render() {
    const validationErrors = validateUiEvent(this.draft);
    const filtered = this.getFilteredProjections();
    const visibleTargets = this.getVisibleTargets();

    let payloadPreview = "";
    try {
      payloadPreview = JSON.stringify(
        this.editingId ? eventToEditPayload(this.draft) : eventToAddPayload(this.draft),
        null,
        2
      );
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
                    Lista i formularz pracuja teraz na prawdziwym store schedulerow, jesli karta ma dostep do
                    <code>hass</code>. Niekompatybilne wpisy pokazywane sa jako readonly.
                  </p>
                </div>
                <button @click=${this.handleCreateNew} ?disabled=${this.saving}>Dodaj harmonogram</button>
              </div>

              ${this.error ? html`<div class="notice error">${this.error}</div>` : nothing}
              ${this.notice ? html`<div class="notice">${this.notice}</div>` : nothing}

              <section class="list-card">
                <div class="toolbar">
                  <h3>Harmonogramy</h3>
                  <span class="helper">${filtered.length} z ${this.projections.length} wpisow</span>
                </div>

                <div class="field-grid filters">
                  <label>
                    Szukaj
                    <input .value=${this.filterSearch} @input=${this.handleSearchInput} placeholder="Salon, scena, skrypt..." />
                  </label>
                  <label>
                    Status
                    <select .value=${this.filterStatus} @change=${this.handleStatusFilterChange}>
                      <option value="all">Wszystkie</option>
                      <option value="active">Tylko aktywne</option>
                      <option value="inactive">Tylko nieaktywne</option>
                    </select>
                  </label>
                  <label>
                    Tag
                    <select .value=${this.filterTag} @change=${this.handleTagFilterChange}>
                      <option value="all">Wszystkie tagi</option>
                      ${this.availableTags.map((tag) => html`<option value=${tag}>${tag}</option>`)}
                    </select>
                  </label>
                  <label>
                    Readonly
                    <select .value=${this.showReadonly ? "show" : "hide"} @change=${this.handleReadonlyFilterChange}>
                      <option value="show">Pokazuj readonly</option>
                      <option value="hide">Ukryj readonly</option>
                    </select>
                  </label>
                </div>

                <div class="list">
                  ${this.loading ? html`<div class="notice">Ladowanie harmonogramow z Home Assistanta...</div>` : nothing}
                  ${!this.loading && filtered.length === 0
                    ? html`<div class="notice warning">Brak harmonogramow pasujacych do filtrow.</div>`
                    : nothing}
                  ${filtered.map((projection) => this.renderProjectionRow(projection))}
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
                    <input .value=${this.draft.name} @input=${this.handleNameInput} ?disabled=${this.saving} />
                  </label>

                  <div class="field-grid two">
                    <label>
                      Szukaj targetu
                      <input
                        .value=${this.targetSearch}
                        @input=${this.handleTargetSearchInput}
                        placeholder="szukaj po nazwie lub entity_id"
                        ?disabled=${this.saving}
                      />
                    </label>
                    <label>
                      Target
                      <select .value=${this.draft.target.entityId} @change=${this.handleTargetSelectionChange} ?disabled=${this.saving}>
                        ${visibleTargets.length === 0
                          ? html`<option value="">Brak pasujacych encji</option>`
                          : visibleTargets.map(
                              (target) => html`
                                <option value=${target.entityId}>
                                  ${target.label} | ${target.entityId}
                                </option>
                              `
                            )}
                      </select>
                    </label>
                  </div>

                  <div class="field-grid two">
                    <label>
                      Entity ID / custom
                      <input .value=${this.draft.target.entityId} @input=${this.handleTargetInput} ?disabled=${this.saving} />
                    </label>
                    <label>
                      Label
                      <input .value=${this.draft.target.label} @input=${this.handleTargetLabelInput} ?disabled=${this.saving} />
                    </label>
                  </div>

                  <div class="helper">
                    Wybrany target: ${this.draft.target.label || "brak"} | ${this.draft.target.entityId || "brak"}
                  </div>

                  <div class="field-grid two">
                    <label>
                      Domena
                      <select .value=${this.draft.target.domain} @change=${this.handleDomainChange} ?disabled=${this.saving}>
                        <option value="light">light</option>
                        <option value="switch">switch</option>
                        <option value="script">script</option>
                        <option value="automation">automation</option>
                        <option value="scene">scene</option>
                        <option value="input_boolean">input_boolean</option>
                      </select>
                    </label>
                  </div>

                  <div class="field-grid two">
                    <label>
                      Akcja
                      <select .value=${this.draft.action.kind} @change=${this.handleActionChange} ?disabled=${this.saving}>
                        ${this.getCurrentActionOptions().map(
                          (kind) => html`<option value=${kind}>${getActionLabel(kind)}</option>`
                        )}
                      </select>
                    </label>
                    <label>
                      Status
                      <select .value=${this.draft.enabled ? "on" : "off"} @change=${this.handleEnabledChange} ?disabled=${this.saving}>
                        <option value="on">Aktywny</option>
                        <option value="off">Nieaktywny</option>
                      </select>
                    </label>
                  </div>

                  <div class="field-grid two">
                    <label>
                      Start
                      <input type="time" .value=${this.draft.startTime} @input=${this.handleStartTimeInput} ?disabled=${this.saving} />
                    </label>
                    <label>
                      Duration (min)
                      <input
                        type="number"
                        min="1"
                        .value=${String(this.draft.durationMinutes ?? "")}
                        ?disabled=${this.draft.action.kind !== "turn_on_for_duration" || this.saving}
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
                            ?disabled=${this.saving}
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
                      <input
                        .value=${this.draft.tags.join(", ")}
                        @input=${this.handleTagsInput}
                        list="scheduler-tags"
                        placeholder="daily, evening"
                        ?disabled=${this.saving}
                      />
                    </label>
                    <label>
                      Service
                      <input
                        .value=${this.draft.action.service ?? ""}
                        @input=${this.handleServiceInput}
                        ?disabled=${this.draft.action.kind !== "custom_service" || this.saving}
                        placeholder="np. light.turn_on"
                      />
                    </label>
                  </div>

                  ${this.availableTags.length
                    ? html`
                        <div class="tag-list">
                          ${this.availableTags.map(
                            (tag) => html`
                              <button type="button" class="ghost" @click=${() => this.addTagToDraft(tag)} ?disabled=${this.saving}>
                                #${tag}
                              </button>
                            `
                          )}
                        </div>
                      `
                    : nothing}
                  <datalist id="scheduler-tags">
                    ${this.availableTags.map((tag) => html`<option value=${tag}></option>`)}
                  </datalist>

                  <label>
                    Notatka
                    <textarea .value=${this.draft.note ?? ""} @input=${this.handleNoteInput} ?disabled=${this.saving}></textarea>
                  </label>

                  <div class="helper">
                    Widok uproszczony: ${formatWeekdays(this.draft.weekdays)} ${this.draft.startTime} |
                    ${this.draft.target.label || this.draft.target.entityId || "Brak targetu"} |
                    ${formatActionSummary(this.draft)}
                  </div>

                  ${this.draft.action.kind === "turn_on_for_duration"
                    ? html`
                        <div class="warning">
                          Dla obecnego backendu bezpieczne minimum dla "na czas" to 2 minuty. Slot po 1 minucie
                          bywa pomijany przez scheduler-component.
                        </div>
                      `
                    : nothing}

                  ${validationErrors.length
                    ? html`<div class="warning">${validationErrors.map((error) => html`<div>${error}</div>`)}</div>`
                    : nothing}

                  <div class="button-row">
                    <button @click=${this.handleSave} ?disabled=${this.saving || validationErrors.length > 0}>
                      ${this.saving ? "Zapisywanie..." : this.editingId ? "Zapisz zmiany" : "Dodaj harmonogram"}
                    </button>
                    <button class="secondary" @click=${this.handleResetEditor} ?disabled=${this.saving}>Reset</button>
                    ${this.editingId
                      ? html`
                          <button class="ghost" @click=${this.handleDeleteCurrent} ?disabled=${this.saving}>
                            Usun
                          </button>
                        `
                      : nothing}
                  </div>
                </div>
              </section>

              <section class="payload-card">
                <div class="toolbar">
                  <h3>Podglad adaptera</h3>
                  <span class="helper">${this.editingId ? "edit payload" : "add payload"}</span>
                </div>
                <pre>${payloadPreview}</pre>
              </section>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private renderProjectionRow(projection: UiScheduleProjection) {
    if (projection.mode === "readonly") {
      const readonlyKey = projection.rawId ?? projection.rawName;
      const expanded = this.expandedReadonlyIds.includes(readonlyKey);
      return html`
        <article class="row readonly">
          <div class="row-top">
            <div class="summary">${projection.rawName}</div>
            <span class="status readonly">Readonly</span>
          </div>
          <div class="meta">${projection.rawSummary}</div>
          <div class="warning">Powod: ${projection.reason}</div>
          ${projection.suggestions.length ? html`<div class="meta">${projection.suggestions[0]}</div>` : nothing}
          ${projection.rawId ? html`<div class="meta">${projection.rawId}</div>` : nothing}
          <div class="button-row">
            <button class="ghost" @click=${() => this.toggleReadonlyDetails(readonlyKey)}>
              ${expanded ? "Ukryj szczegoly" : "Pokaz szczegoly"}
            </button>
          </div>
          ${expanded
            ? html`
                <div class="stack">
                  ${projection.details.length
                    ? html`
                        <div class="readonly-box">
                          <div class="summary">Detale</div>
                          ${projection.details.map((detail) => html`<div class="meta">${detail}</div>`)}
                        </div>
                      `
                    : nothing}
                  ${projection.rawTimeslots.length
                    ? html`
                        <div class="readonly-box">
                          <div class="summary">Timesloty backendu</div>
                          ${projection.rawTimeslots.map(
                            (slot) => html`
                              <div class="meta mono">
                                ${slot.start ?? "--:--"}${slot.stop ? ` -> ${slot.stop}` : ""} |
                                ${slot.actions.join(" | ")}
                              </div>
                            `
                          )}
                        </div>
                      `
                    : nothing}
                  ${projection.suggestions.length
                    ? html`
                        <div class="readonly-box">
                          <div class="summary">Co dalej</div>
                          ${projection.suggestions.map((suggestion) => html`<div class="meta">${suggestion}</div>`)}
                        </div>
                      `
                    : nothing}
                </div>
              `
            : nothing}
        </article>
      `;
    }

    const { event, warnings } = projection;
    const scheduleEntityId = event.sourceMeta?.backendScheduleId;

    return html`
      <article class="row">
        <div class="row-top">
          <div class="summary">${formatEventSummary(event)}</div>
          <span class="status ${event.enabled ? "" : "off"}">${event.enabled ? "Aktywny" : "Nieaktywny"}</span>
        </div>
        <div class="row-meta">
          <div class="meta">${event.name}</div>
          <div class="meta">${event.target.entityId}</div>
        </div>
        <div class="row-meta">
          <div class="tag-list">
            ${event.tags.map((tag) => html`<span class="chip">#${tag}</span>`)}
            <span class="pill">${event.sourceMeta?.compatibility ?? "native"}</span>
          </div>
          <div class="meta">${warnings[0] ?? ""}</div>
        </div>
        <div class="button-row">
          <button class="secondary" @click=${() => this.handleEdit(event)} ?disabled=${this.saving}>Edytuj</button>
          <button class="ghost" @click=${() => this.handleToggleEnabled(event)} ?disabled=${this.saving || !scheduleEntityId}>
            ${event.enabled ? "Wylacz" : "Wlacz"}
          </button>
          <button class="ghost" @click=${() => this.handleDeleteEvent(event)} ?disabled=${this.saving || !scheduleEntityId}>
            Usun
          </button>
        </div>
      </article>
    `;
  }

  private async handleHassChanged() {
    this.availableTargets = this.hass ? buildTargetOptions(this.hass.states) : [];
    this.ensureDraftTargetValidity();

    if (!this.hass || this.isInitializedForHass) {
      return;
    }

    this.schedulerService = new SchedulerService(this.hass);
    this.isInitializedForHass = true;
    this.notice = "Laczenie z scheduler-component...";
    await this.refreshFromBackend();
    await this.setupSubscription();
  }

  private async setupSubscription() {
    if (!this.schedulerService) {
      return;
    }

    await this.teardownSubscription();
    this.unsubscribeUpdates = await this.schedulerService.subscribeToUpdates(() => {
      void this.refreshFromBackend("Odebrano aktualizacje schedulera.");
    });
  }

  private async teardownSubscription() {
    if (!this.unsubscribeUpdates) {
      return;
    }

    await this.unsubscribeUpdates();
    this.unsubscribeUpdates = undefined;
  }

  private async refreshFromBackend(successNotice = "Harmonogramy odswiezone.") {
    if (!this.schedulerService) {
      return;
    }

    this.loading = true;
    this.error = "";
    try {
      const snapshot = await loadSchedulerSnapshot(this.schedulerService);
      this.projections = snapshot.projections.length ? snapshot.projections : [];
      this.availableTags = snapshot.tags.sort((left, right) => left.localeCompare(right, "pl"));
      this.notice = successNotice;
      this.syncDraftAfterRefresh();
    } catch (error) {
      this.error = error instanceof Error ? error.message : "Nie udalo sie pobrac harmonogramow.";
      this.notice = "";
    } finally {
      this.loading = false;
    }
  }

  private syncDraftAfterRefresh() {
    if (!this.editingId) {
      return;
    }

    const editable = this.projections
      .filter((projection): projection is Extract<UiScheduleProjection, { mode: "editable" }> => projection.mode === "editable")
      .find((projection) => projection.event.id === this.editingId);

    if (editable) {
      this.draft = structuredClone(editable.event);
      return;
    }

    this.editingId = null;
    this.draft = this.createEmptyDraft();
  }

  private createEmptyDraft(): EditorDraft {
    const target = this.availableTargets[0];
    const inferredDomain = target?.domain ?? "";
    const domain: SupportedTargetDomain = isSupportedTargetDomain(inferredDomain) ? inferredDomain : "light";
    const actionKind = getActionKindsForTarget(target ?? { entityId: "", domain, label: "" })[0];

    return {
      id: `draft-${Date.now()}`,
      name: "",
      enabled: true,
      weekdays: ["mon", "tue", "wed", "thu", "fri"],
      startTime: "18:00",
      durationMinutes: actionKind === "turn_on_for_duration" ? 30 : undefined,
      target: target ?? { entityId: "", domain, label: "" },
      action: {
        kind: actionKind,
        label: getActionLabel(actionKind)
      },
      tags: [],
      note: "",
      sourceMeta: {
        compatibility: "native"
      }
    };
  }

  private ensureDraftTargetValidity() {
    if (!this.availableTargets.length) {
      return;
    }

    const existing = this.availableTargets.find((target) => target.entityId === this.draft.target.entityId);
    if (!existing && !this.draft.target.entityId) {
      this.draft = this.createEmptyDraft();
    }
  }

  private getCurrentActionOptions(): SchedulerActionKind[] {
    return getActionKindsForTarget(this.draft.target);
  }

  private getFilteredTargets(): SchedulerTargetRef[] {
    const query = this.targetSearch.trim().toLowerCase();
    if (!query) {
      return this.availableTargets;
    }

    return this.availableTargets.filter(
      (target) =>
        target.label.toLowerCase().includes(query) ||
        target.entityId.toLowerCase().includes(query) ||
        target.domain.toLowerCase().includes(query)
    );
  }

  private getVisibleTargets(): SchedulerTargetRef[] {
    const filteredTargets = this.getFilteredTargets();
    if (!this.draft.target.entityId) {
      return filteredTargets;
    }

    const selectedAlreadyVisible = filteredTargets.some((target) => target.entityId === this.draft.target.entityId);
    if (selectedAlreadyVisible) {
      return filteredTargets;
    }

    return [
      {
        entityId: this.draft.target.entityId,
        domain: this.draft.target.domain,
        label: this.draft.target.label || this.draft.target.entityId
      },
      ...filteredTargets
    ];
  }

  private getFilteredProjections(): UiScheduleProjection[] {
    return this.projections.filter((projection) => {
      if (projection.mode === "readonly") {
        if (!this.showReadonly || this.filterStatus !== "all" || this.filterTag !== "all") {
          return false;
        }
        const query = this.filterSearch.trim().toLowerCase();
        return !query || projection.rawName.toLowerCase().includes(query) || projection.rawSummary.toLowerCase().includes(query);
      }

      const { event } = projection;
      const query = this.filterSearch.trim().toLowerCase();
      const matchesSearch =
        !query ||
        event.name.toLowerCase().includes(query) ||
        event.target.label.toLowerCase().includes(query) ||
        event.target.entityId.toLowerCase().includes(query);

      const matchesStatus =
        this.filterStatus === "all" ||
        (this.filterStatus === "active" && event.enabled) ||
        (this.filterStatus === "inactive" && !event.enabled);

      const matchesTag = this.filterTag === "all" || event.tags.includes(this.filterTag);
      return matchesSearch && matchesStatus && matchesTag;
    });
  }

  private handleCreateNew = () => {
    this.editingId = null;
    this.draft = this.createEmptyDraft();
    this.notice = "Tworzenie nowego harmonogramu.";
  };

  private handleResetEditor = () => {
    if (!this.editingId) {
      this.draft = this.createEmptyDraft();
      return;
    }

    const current = this.projections
      .filter((projection): projection is Extract<UiScheduleProjection, { mode: "editable" }> => projection.mode === "editable")
      .find((projection) => projection.event.id === this.editingId);

    if (current) {
      this.draft = structuredClone(current.event);
    }
  };

  private handleEdit(event: UiScheduleEvent) {
    this.editingId = event.id;
    this.draft = structuredClone(event);
    this.notice = `Edytujesz: ${event.name || event.target.label}`;
  }

  private async handleToggleEnabled(event: UiScheduleEvent) {
    const entityId = event.sourceMeta?.backendScheduleId;
    if (!entityId || !this.schedulerService) {
      return;
    }

    this.saving = true;
    this.error = "";
    try {
      await this.schedulerService.setScheduleEnabled(entityId, !event.enabled);
      await this.refreshFromBackend(`Zmieniono status harmonogramu ${event.name || entityId}.`);
    } catch (error) {
      this.error = error instanceof Error ? error.message : "Nie udalo sie zmienic statusu.";
    } finally {
      this.saving = false;
    }
  }

  private async handleDeleteEvent(event: UiScheduleEvent) {
    const entityId = event.sourceMeta?.backendScheduleId;
    if (!entityId || !this.schedulerService) {
      return;
    }

    if (!window.confirm(`Usunac harmonogram "${event.name || event.target.label}"?`)) {
      return;
    }

    this.saving = true;
    this.error = "";
    try {
      await this.schedulerService.removeSchedule(entityId);
      if (this.editingId === event.id) {
        this.editingId = null;
        this.draft = this.createEmptyDraft();
      }
      await this.refreshFromBackend(`Usunieto harmonogram ${event.name || entityId}.`);
    } catch (error) {
      this.error = error instanceof Error ? error.message : "Nie udalo sie usunac harmonogramu.";
    } finally {
      this.saving = false;
    }
  }

  private handleDeleteCurrent = async () => {
    const current = this.projections
      .filter((projection): projection is Extract<UiScheduleProjection, { mode: "editable" }> => projection.mode === "editable")
      .find((projection) => projection.event.id === this.editingId);

    if (current) {
      await this.handleDeleteEvent(current.event);
    }
  };

  private handleSave = async () => {
    if (!this.schedulerService) {
      this.error = "Brak polaczenia z Home Assistant. Nie mozna zapisac zmian w trybie demo.";
      return;
    }

    const errors = validateUiEvent(this.draft);
    if (errors.length) {
      return;
    }

    this.saving = true;
    this.error = "";
    try {
      if (this.editingId) {
        await this.schedulerService.editSchedule(eventToEditPayload(this.draft));
      } else {
        await this.schedulerService.createSchedule(eventToAddPayload(this.draft));
      }

      await this.refreshFromBackend(this.editingId ? "Zapisano zmiany harmonogramu." : "Dodano nowy harmonogram.");

      if (!this.editingId) {
        this.draft = this.createEmptyDraft();
      }
    } catch (error) {
      this.error = error instanceof Error ? error.message : "Nie udalo sie zapisac harmonogramu.";
    } finally {
      this.saving = false;
    }
  };

  private handleSearchInput = (event: Event) => {
    this.filterSearch = (event.target as HTMLInputElement).value;
  };

  private handleStatusFilterChange = (event: Event) => {
    this.filterStatus = (event.target as HTMLSelectElement).value as FilterStatus;
  };

  private handleTagFilterChange = (event: Event) => {
    this.filterTag = (event.target as HTMLSelectElement).value;
  };

  private handleReadonlyFilterChange = (event: Event) => {
    this.showReadonly = (event.target as HTMLSelectElement).value === "show";
  };

  private handleTargetSearchInput = (event: Event) => {
    this.targetSearch = (event.target as HTMLInputElement).value;
  };

  private handleNameInput = (event: Event) => {
    this.draft = { ...this.draft, name: (event.target as HTMLInputElement).value };
  };

  private handleTargetSelectionChange = (event: Event) => {
    const entityId = (event.target as HTMLSelectElement).value;
    const target = this.availableTargets.find((item) => item.entityId === entityId);
    if (!target) {
      return;
    }

    const nextKind = getActionKindsForTarget(target)[0];
    this.draft = {
      ...this.draft,
      target,
      action: {
        ...this.draft.action,
        kind: nextKind,
        label: getActionLabel(nextKind),
        service: nextKind === "custom_service" ? this.draft.action.service : undefined
      },
      durationMinutes: nextKind === "turn_on_for_duration" ? this.draft.durationMinutes ?? 30 : undefined
    };
    this.targetSearch = target.label;
  };

  private handleTargetInput = (event: Event) => {
    const entityId = (event.target as HTMLInputElement).value.trim();
    const domain = entityId.split(".")[0] ?? this.draft.target.domain;
    const supportedDomain = isSupportedTargetDomain(domain) ? domain : this.draft.target.domain;
    const knownTarget = this.availableTargets.find((target) => target.entityId === entityId);

    this.draft = {
      ...this.draft,
      target: {
        ...this.draft.target,
        entityId,
        domain: knownTarget?.domain ?? supportedDomain,
        label: knownTarget?.label ?? this.draft.target.label
      }
    };

    if (knownTarget) {
      this.targetSearch = knownTarget.label;
    }
  };

  private handleTargetLabelInput = (event: Event) => {
    this.draft = {
      ...this.draft,
      target: {
        ...this.draft.target,
        label: (event.target as HTMLInputElement).value
      }
    };
  };

  private handleDomainChange = (event: Event) => {
    const domain = (event.target as HTMLSelectElement).value as SupportedTargetDomain;
    const nextKind = getActionKindsForTarget({ ...this.draft.target, domain })[0];
    this.draft = {
      ...this.draft,
      target: {
        ...this.draft.target,
        domain
      },
      action: {
        ...this.draft.action,
        kind: nextKind,
        label: getActionLabel(nextKind),
        service: nextKind === "custom_service" ? this.draft.action.service : undefined
      },
      durationMinutes: nextKind === "turn_on_for_duration" ? this.draft.durationMinutes ?? 30 : undefined
    };
  };

  private handleActionChange = (event: Event) => {
    const kind = (event.target as HTMLSelectElement).value as SchedulerActionKind;
    this.draft = {
      ...this.draft,
      action: {
        ...this.draft.action,
        kind,
        label: getActionLabel(kind),
        service: kind === "custom_service" ? this.draft.action.service ?? "" : undefined
      },
      durationMinutes: kind === "turn_on_for_duration" ? this.draft.durationMinutes ?? 30 : undefined
    };
  };

  private handleStartTimeInput = (event: Event) => {
    this.draft = { ...this.draft, startTime: (event.target as HTMLInputElement).value };
  };

  private handleDurationInput = (event: Event) => {
    const raw = (event.target as HTMLInputElement).value;
    this.draft = { ...this.draft, durationMinutes: raw ? Number(raw) : undefined };
  };

  private toggleWeekday(day: Weekday) {
    const exists = this.draft.weekdays.includes(day);
    this.draft = {
      ...this.draft,
      weekdays: exists ? this.draft.weekdays.filter((entry) => entry !== day) : [...this.draft.weekdays, day]
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

  private addTagToDraft(tag: string) {
    if (this.draft.tags.includes(tag)) {
      return;
    }

    this.draft = {
      ...this.draft,
      tags: [...this.draft.tags, tag]
    };
  }

  private handleEnabledChange = (event: Event) => {
    this.draft = {
      ...this.draft,
      enabled: (event.target as HTMLSelectElement).value === "on"
    };
  };

  private handleServiceInput = (event: Event) => {
    this.draft = {
      ...this.draft,
      action: {
        ...this.draft.action,
        service: (event.target as HTMLInputElement).value
      }
    };
  };

  private handleNoteInput = (event: Event) => {
    this.draft = { ...this.draft, note: (event.target as HTMLTextAreaElement).value };
  };

  private toggleReadonlyDetails(key: string) {
    this.expandedReadonlyIds = this.expandedReadonlyIds.includes(key)
      ? this.expandedReadonlyIds.filter((entry) => entry !== key)
      : [...this.expandedReadonlyIds, key];
  }
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
