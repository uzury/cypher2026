/**
 * Diálogo em DialogV2 para cadastrar Lasting / Permanent Damage.
 * @param {object} params
 * @param {Actor} params.actor
 */
export function promptAddLastingDamageDialog({ actor }) {
  if (!actor) return;

  const content = `
    <form class="cypher-dialog-form">
      <div class="dialog-notice-box warning">
        <div class="notice-title"><i class="fas fa-bone"></i> ${game.i18n.localize("CYPHER2026.Damage.Title")}</div>
        <span>${game.i18n.localize("CYPHER2026.Damage.RulesNotice")}</span>
      </div>

      <div class="form-group">
        <label>${game.i18n.localize("CYPHER2026.Damage.Name")}:</label>
        <input type="text" name="name" placeholder="${game.i18n.localize("CYPHER2026.Damage.NamePlaceholder")}" autofocus required />
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Damage.Type")}:</label>
          <select name="damageType">
            <option value="lasting" selected>${game.i18n.localize("CYPHER2026.Damage.Lasting")}</option>
            <option value="permanent">${game.i18n.localize("CYPHER2026.Damage.Permanent")}</option>
          </select>
        </div>

        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Damage.Severity")}:</label>
          <select name="severity">
            <option value="moderate" selected>${game.i18n.localize("CYPHER2026.Damage.Moderate")}</option>
            <option value="major">${game.i18n.localize("CYPHER2026.Damage.Major")}</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>${game.i18n.localize("CYPHER2026.Damage.Description")}:</label>
        <textarea name="description" rows="3" placeholder="${game.i18n.localize("CYPHER2026.Damage.DescPlaceholder")}"></textarea>
      </div>
    </form>
  `;

  const dialog = new foundry.applications.api.DialogV2({
    window: { title: game.i18n.localize("CYPHER2026.Damage.Title") },
    content,
    buttons: [
      {
        action: "create",
        label: game.i18n.localize("CYPHER2026.Damage.CreateButton"),
        icon: "fas fa-plus",
        default: true,
        callback: async (event, button) => {
          const form = button.form;
          const name = form.name.value.trim() || game.i18n.localize("CYPHER2026.Damage.Lasting");
          const damageType = form.damageType.value;
          const severity = form.severity.value;
          const description = form.description.value.trim();

          const wound = actor.system.wounds[severity];
          const current = Number(wound?.current ?? 0);
          const max = Number(wound?.max ?? 0);
          const lastingCount = Number(wound?.lastingCount ?? 0);

          if (!wound || current >= max) {
            ui.notifications.warn(game.i18n.localize("CYPHER2026.Damage.NoWoundCapacity"));
            return;
          }

          await actor.createEmbeddedDocuments("Item", [
            {
              name,
              type: "equipment",
              img: "icons/svg/bones.svg",
              system: {
                isDamage: true,
                damageType,
                severity,
                value: 1,
                description,
                archived: false,
                woundApplied: true
              }
            }
          ]);

          await actor.update({
            [`system.wounds.${severity}.current`]: current + 1,
            [`system.wounds.${severity}.lastingCount`]: lastingCount + 1
          });

          ui.notifications.info(game.i18n.format("CYPHER2026.Damage.Created", { name }));
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
