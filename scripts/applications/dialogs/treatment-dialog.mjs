/**
 * Diálogo em DialogV2 de Treatment conforme regras do Character Rulebook 2026.
 * @param {object} params
 * @param {Actor} params.actor
 */
export function promptTreatmentDialog({ actor }) {
  const minorWounds = actor.system.wounds.minor.current;
  const modWounds = actor.system.wounds.moderate.current;
  const majorWounds = actor.system.wounds.major.current;
  const minorLasting = actor.system.wounds.minor.lastingCount ?? 0;
  const modLasting = actor.system.wounds.moderate.lastingCount ?? 0;
  const majorLasting = actor.system.wounds.major.lastingCount ?? 0;

  const content = `
    <form class="cypher-dialog-form">
      <div class="dialog-notice-box success">
        <div class="notice-title"><i class="fas fa-kit-medical"></i> ${game.i18n.localize("CYPHER2026.Treatment.Title")}</div>
        <span>${game.i18n.localize("CYPHER2026.Treatment.RulesNotice")}</span>
      </div>

      <div class="form-group">
        <label>${game.i18n.localize("CYPHER2026.Treatment.SelectSeverity")}</label>
        <div class="radio-options-list">
          <label class="radio-option-item">
            <input type="radio" name="treatmentSeverity" value="minor" checked />
            <span><strong>${game.i18n.localize("CYPHER2026.Treatment.MinorOption")}</strong> (${game.i18n.localize("CYPHER2026.Rally.Available")}: ${Math.max(0, minorWounds - minorLasting)})</span>
          </label>
          <label class="radio-option-item">
            <input type="radio" name="treatmentSeverity" value="moderate" />
            <span><strong>${game.i18n.localize("CYPHER2026.Treatment.ModerateOption")}</strong> (${game.i18n.localize("CYPHER2026.Rally.Available")}: ${Math.max(0, modWounds - modLasting)})</span>
          </label>
          <label class="radio-option-item">
            <input type="radio" name="treatmentSeverity" value="major" />
            <span><strong>${game.i18n.localize("CYPHER2026.Treatment.MajorOption")}</strong> (${game.i18n.localize("CYPHER2026.Rally.Available")}: ${Math.max(0, majorWounds - majorLasting)})</span>
          </label>
        </div>
      </div>
    </form>
  `;

  const dialog = new foundry.applications.api.DialogV2({
    window: { title: game.i18n.localize("CYPHER2026.Treatment.Title") },
    content,
    buttons: [
      {
        action: "roll",
        label: game.i18n.localize("CYPHER2026.Treatment.RollButton"),
        icon: "fas fa-dice-d20",
        default: true,
        callback: async (event, button) => {
          const form = button.form;
          const severity = form.treatmentSeverity?.value || "minor";
          const diffMap = { minor: { diff: 0, target: 0, time: "1 min" }, moderate: { diff: 3, target: 9, time: "10 min" }, major: { diff: 6, target: 18, time: "1 hr" } };
          const info = diffMap[severity];

          const currentWound = actor.system.wounds[severity].current;
          const lasting = actor.system.wounds[severity].lastingCount ?? 0;

          if (currentWound <= lasting) {
            ui.notifications.warn(game.i18n.format("CYPHER2026.Treatment.CannotHealLasting", { severity }));
            return;
          }

          const roll = new Roll("1d20");
          await roll.evaluate();
          const isSuccess = roll.total >= info.target;

          if (isSuccess && currentWound > lasting) {
            await actor.update({
              [`system.wounds.${severity}.current`]: currentWound - 1
            });
          }

          await roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor }),
            flavor: `
              <div class="cypher-chat-card-treatment" style="border-left:4px solid #10b981; padding:6px 10px; background:var(--c-bg-card, #1c202c); color:var(--c-text-primary, #f8fafc); border-radius:4px;">
                <h4 style="margin:0 0 4px 0; color:#10b981; font-weight:bold; text-transform:uppercase;"><i class="fas fa-kit-medical"></i> Treatment: ${severity.toUpperCase()}</h4>
                <p style="margin:0; font-size:0.8rem;">Diff: <strong>${info.diff} (Target: ${info.target})</strong> | Time: <strong>${info.time}</strong></p>
                <p style="margin:4px 0 0 0; font-weight:bold; color:${isSuccess ? "#34d399" : "#f87171"};">
                  ${isSuccess ? game.i18n.format("CYPHER2026.Treatment.Success", { severity: severity.toUpperCase() }) : game.i18n.localize("CYPHER2026.Treatment.Failure")}
                </p>
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