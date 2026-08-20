/**
 * Diálogo em DialogV2 de Rallying conforme regras do Character Rulebook 2026.
 * @param {object} params
 * @param {Actor} params.actor
 */
export function promptRallyDialog({ actor }) {
  const mightCurrent = actor.system.stats.might.current;
  const minorWounds = actor.system.wounds.minor.current;
  const moderateWounds = actor.system.wounds.moderate.current;
  const minorLasting = actor.system.wounds.minor.lastingCount ?? 0;
  const modLasting = actor.system.wounds.moderate.lastingCount ?? 0;

  const normalMinorAvailable = Math.max(0, minorWounds - minorLasting);
  const normalModAvailable = Math.max(0, moderateWounds - modLasting);

  const content = `
    <form class="cypher-dialog-form">
      <div class="dialog-notice-box warning">
        <div class="notice-title"><i class="fas fa-flag"></i> ${game.i18n.localize("CYPHER2026.Rally.Title")}</div>
        <span>${game.i18n.localize("CYPHER2026.Rally.RulesNotice")}</span>
      </div>

      <div class="form-group">
        <label>${game.i18n.localize("CYPHER2026.Rally.SelectWound")}</label>
        <div class="radio-options-list">
          <label class="radio-option-item" style="${normalMinorAvailable <= 0 ? "opacity:0.4; pointer-events:none;" : ""}">
            <input type="radio" name="woundType" value="minor" ${normalMinorAvailable > 0 ? "checked" : "disabled"} />
            <span><strong>${game.i18n.localize("CYPHER2026.Rally.MinorOption")}</strong> (${game.i18n.localize("CYPHER2026.Rally.Available")}: ${normalMinorAvailable})</span>
          </label>
          <label class="radio-option-item" style="${normalModAvailable <= 0 ? "opacity:0.4; pointer-events:none;" : ""}">
            <input type="radio" name="woundType" value="moderate" ${normalMinorAvailable <= 0 && normalModAvailable > 0 ? "checked" : (normalModAvailable <= 0 ? "disabled" : "")} />
            <span><strong>${game.i18n.localize("CYPHER2026.Rally.ModerateOption")}</strong> (${game.i18n.localize("CYPHER2026.Rally.Available")}: ${normalModAvailable})</span>
          </label>
        </div>
      </div>
      <div style="font-size:0.8rem; color:var(--c-text-muted); margin-top:4px;">
        ${game.i18n.localize("CYPHER2026.Rally.CurrentMight")}: <strong>${mightCurrent}</strong>
      </div>
    </form>
  `;

  const dialog = new foundry.applications.api.DialogV2({
    window: { title: game.i18n.localize("CYPHER2026.Rally.Title") },
    content,
    buttons: [
      {
        action: "rally",
        label: game.i18n.localize("CYPHER2026.Rally.Execute"),
        icon: "fas fa-flag",
        default: true,
        callback: async (event, button) => {
          const form = button.form;
          const type = form.woundType?.value;
          if (!type) {
            ui.notifications.warn(game.i18n.localize("CYPHER2026.Rally.NoNormalWounds"));
            return;
          }

          const cost = type === "minor" ? 2 : 5;
          const currentWound = actor.system.wounds[type].current;
          const lasting = actor.system.wounds[type].lastingCount ?? 0;

          if (currentWound <= lasting) {
            ui.notifications.warn(game.i18n.localize("CYPHER2026.Rally.NoNormalWounds"));
            return;
          }

          if (mightCurrent < cost) {
            ui.notifications.error(game.i18n.format("CYPHER2026.Rally.InsufficientMight", { cost, current: mightCurrent }));
            return;
          }

          await actor.update({
            "system.stats.might.current": mightCurrent - cost,
            [`system.wounds.${type}.current`]: currentWound - 1
          });

          await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor }),
            content: `
              <div class="cypher-chat-card-rally" style="border-left:4px solid #f59e0b; padding:8px 12px; background:var(--c-bg-card, #1c202c); color:var(--c-text-primary, #f8fafc); border-radius:4px;">
                <h4 style="margin:0 0 4px 0; color:#f59e0b; font-weight:bold; text-transform:uppercase;"><i class="fas fa-flag"></i> ${game.i18n.localize("CYPHER2026.Rally.Title")}</h4>
                <p style="margin:0; font-size:0.85rem;">-<strong>${cost} Might</strong> | -1 ${type.toUpperCase()} WOUND.</p>
              </div>
            `
          });
        }
      },
      {
        action: "cancel",
        label: game.i18n.localize("CYPHER2026.Common.Cancel"),
        icon: "fas fa-times"
      }
    ]
  });

  dialog.render({ force: true });
}