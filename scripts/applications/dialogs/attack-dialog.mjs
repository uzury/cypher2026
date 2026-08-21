/**
 * Diálogo em DialogV2 para cadastrar ou editar um Ataque/Arma.
 * @param {object} params
 * @param {Actor} params.actor
 * @param {Item} [params.item]
 */
export async function promptAttackDialog({ actor, item = null }) {
  const isEdit = Boolean(item);
  const name = item?.name || "";
  const damage = item?.system?.damage ?? 4;
  const weaponCategory = item?.system?.weaponCategory || "medium";
  const range = item?.system?.range || "immediate";
  const rank = item?.system?.rank || "practiced";
  const cost = item?.system?.cost ?? 0;
  const pool = item?.system?.pool || "might";
  const description = item?.system?.description || "";
  const placeholderDesc = game.i18n.localize("CYPHER2026.Dialog.AttackDescPlaceholder");

  const title = isEdit
    ? game.i18n.format("CYPHER2026.Dialog.EditAttackTitle", { name: item.name })
    : game.i18n.localize("CYPHER2026.Dialog.AddAttackTitle");

  const content = `
    <form class="cypher-dialog-form">
      <div class="form-group">
        <label>${game.i18n.localize("CYPHER2026.Dialog.AttackName")}</label>
        <input type="text" name="name" value="${name}" placeholder="${game.i18n.localize("CYPHER2026.Dialog.AttackNamePlaceholder")}" autofocus required />
      </div>

      <div class="form-grid-3">
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.AttackDamage")}</label>
          <input type="number" name="damage" value="${damage}" min="0" required />
        </div>
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.WeaponCategory")}</label>
          <select name="weaponCategory">
            <option value="no" ${weaponCategory === "no" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.WeaponCategory.no")}</option>
            <option value="light" ${weaponCategory === "light" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.WeaponCategory.light")}</option>
            <option value="medium" ${weaponCategory === "medium" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.WeaponCategory.medium")}</option>
            <option value="heavy" ${weaponCategory === "heavy" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.WeaponCategory.heavy")}</option>
          </select>
        </div>
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.AttackRange")}</label>
          <select name="range">
            <option value="immediate" ${range === "immediate" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Range.immediate")}</option>
            <option value="short" ${range === "short" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Range.short")}</option>
            <option value="long" ${range === "long" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Range.long")}</option>
            <option value="extreme" ${range === "extreme" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Range.extreme")}</option>
          </select>
        </div>
      </div>

      <div class="form-grid-3">
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.AttackTraining")}</label>
          <select name="rank">
            <option value="inability" ${rank === "inability" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.inability")}</option>
            <option value="practiced" ${rank === "practiced" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.practiced")}</option>
            <option value="trained" ${rank === "trained" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.trained")}</option>
            <option value="specialized" ${rank === "specialized" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.specialized")}</option>
            <option value="expert" ${rank === "expert" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.expert")}</option>
          </select>
        </div>

        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.Cost")}</label>
          <input type="number" name="cost" id="cypher-attack-cost-input" value="${cost}" min="0" />
        </div>

        <div class="form-group" id="cypher-attack-pool-wrap" style="${cost <= 0 ? "display:none;" : ""}">
          <label>${game.i18n.localize("CYPHER2026.Dialog.Pool")}</label>
          <select name="pool">
            <option value="might" ${pool === "might" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.PoolMight")}</option>
            <option value="speed" ${pool === "speed" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.PoolSpeed")}</option>
            <option value="intellect" ${pool === "intellect" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.PoolIntellect")}</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>${game.i18n.localize("CYPHER2026.Dialog.Description")}</label>
        <textarea name="description" rows="3" placeholder="${placeholderDesc}">${isEdit ? description : ""}</textarea>
      </div>
    </form>
  `;

  const dialog = new foundry.applications.api.DialogV2({
    window: { title },
    content,
    buttons: [
      {
        action: "save",
        label: game.i18n.localize(isEdit ? "CYPHER2026.Common.Save" : "CYPHER2026.Common.Add"),
        icon: isEdit ? "fas fa-save" : "fas fa-plus",
        default: true,
        callback: async (event, button) => {
          const form = button.form;
          const newName = form.name.value.trim() || (isEdit ? item.name : game.i18n.format("CYPHER2026.Item.NewItemName", { type: game.i18n.localize("TYPES.Item.weapon") }));
          const newDamage = parseInt(form.damage.value, 10) || 0;
          const newWeaponCategory = form.weaponCategory.value;
          const newRange = form.range.value;
          const newRank = form.rank.value;
          const newCost = parseInt(form.cost?.value, 10) || 0;
          const newPool = newCost > 0 ? (form.pool?.value || "might") : "none";
          const newDesc = form.description.value.trim();

          const systemData = {
            damage: newDamage,
            weaponCategory: newWeaponCategory,
            range: newRange,
            rank: newRank,
            cost: newCost,
            pool: newPool,
            description: newDesc,
            archived: isEdit ? Boolean(item.system?.archived) : false
          };

          if (isEdit) {
            await item.update({
              name: newName,
              system: systemData
            });
          } else {
            await actor.createEmbeddedDocuments("Item", [
              {
                name: newName,
                type: "weapon",
                img: "icons/svg/sword.svg",
                system: systemData
              }
            ]);
          }
        }
      },
      {
        action: "cancel",
        label: game.i18n.localize("CYPHER2026.Common.Cancel"),
        icon: "fas fa-times"
      }
    ],
    render: (event, html) => {
      const costInput = html.querySelector("#cypher-attack-cost-input");
      const poolWrap = html.querySelector("#cypher-attack-pool-wrap");

      costInput?.addEventListener("input", (ev) => {
        const val = parseInt(ev.target.value, 10) || 0;
        if (poolWrap) poolWrap.style.display = val > 0 ? "flex" : "none";
      });

      const textarea = html.querySelector("textarea[name='description']");
      if (textarea) {
        textarea.placeholder = placeholderDesc;
        if (!isEdit) textarea.value = "";
      }
    }
  });

  dialog.render({ force: true });
}