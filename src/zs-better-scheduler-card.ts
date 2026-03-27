import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("zs-better-scheduler-card")
export class ZsBetterSchedulerCard extends LitElement {
  @property({ attribute: false }) public hass?: unknown;
  @property({ attribute: false }) public config?: Record<string, unknown>;

  static styles = css`
    :host {
      display: block;
    }

    .card {
      padding: 16px;
      border-radius: 20px;
      background:
        linear-gradient(135deg, rgba(24, 84, 62, 0.1), rgba(191, 143, 63, 0.12)),
        var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color);
    }

    h3 {
      margin: 0 0 8px;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      line-height: 1.5;
      color: var(--secondary-text-color);
    }
  `;

  public setConfig(config: Record<string, unknown>): void {
    this.config = config;
  }

  public getCardSize(): number {
    return 3;
  }

  protected render() {
    return html`
      <ha-card>
        <div class="card">
          <h3>ZS Better Scheduler Card</h3>
          <p>
            Repo jest gotowe pod implementacje event-first UX nad
            <code>scheduler-component</code>. Szczegoly architektury sa w
            <code>docs/architecture.md</code>.
          </p>
        </div>
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zs-better-scheduler-card": ZsBetterSchedulerCard;
  }
}
