/**
 * Diálogo em DialogV2 para cadastrar ou editar uma Perícia.
 * @param {object} params
 * @param {Actor} params.actor
 * @param {Item} [params.item]
 */
export async function promptSkillDialog({ actor, item = null }) {
  const isEdit = Boolean(item);
  const name = item?.name || "";
  const rank = item?.system?.rank || "trained";
  const stat = item?.system?.stat || "speed";
  const origin = item?.system?.origin || "Background";
  const isTier = origin.startsWith("Tier");
  const currentTier = isTier ? origin.replace("Tier ", "").trim() : "1";
  const description = item?.system?.description || "";
  const placeholderDesc = game.i18n.localize("CYPHER2026.Dialog.SkillDescPlaceholder");

  const title = isEdit
    ? game.i18n.format("CYPHER2026.Dialog.EditSkillTitle", { name: item.name })
    : game.i18n.localize("CYPHER2026.Dialog.AddSkillTitle");

  const content = `
    <form class="cypher-dialog-form">
      <div class="form-group">
        <label>${game.i18n.localize("CYPHER2026.Dialog.SkillName")}</label>
        <input type="text" name="name" value="${name}" placeholder="${game.i18n.localize("CYPHER2026.Dialog.SkillNamePlaceholder")}" autofocus required />
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.SkillRank")}</label>
          <select name="rank">
            <option value="inability" ${rank === "inability" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.inability")}</option>
            <option value="trained" ${rank === "trained" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.trained")}</option>
            <option value="specialized" ${rank === "specialized" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.specialized")}</option>
            <option value="expert" ${rank === "expert" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.expert")}</option>
          </select>
        </div>

        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.SkillPool")}</label>
          <select name="stat">
            <option value="might" ${stat === "might" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Stats.might")}</option>
            <option value="speed" ${stat === "speed" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Stats.speed")}</option>
            <option value="intellect" ${stat === "intellect" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Stats.intellect")}</option>
            <option value="none" ${stat === "none" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Stats.none")}</option>
          </select>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.SkillOrigin")}</label>
          <select name="originType" id="cypher-skill-origin-select">
            <option value="background" ${!isTier ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.SkillOriginBackground")}</option>
            <option value="tier" ${isTier ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.SkillOriginTier")}</option>
          </select>
        </div>
        <div class="form-group" id="cypher-skill-tier-wrap" style="${isTier ? "" : "display:none;"}">
          <label>${game.i18n.localize("CYPHER2026.Dialog.TierLevel")}</label>
          <select name="originTier">
            <option value="1" ${currentTier === "1" ? "selected" : ""}>Tier 1</option>
            <option value="2" ${currentTier === "2" ? "selected" : ""}>Tier 2</option>
            <option value="3" ${currentTier === "3" ? "selected" : ""}>Tier 3</option>
            <option value="4" ${currentTier === "4" ? "selected" : ""}>Tier 4</option>
            <option value="5" ${currentTier === "5" ? "selected" : ""}>Tier 5</option>
            <option value="6" ${currentTier === "6" ? "selected" : ""}>Tier 6</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>${game.i18n.localize("CYPHER2026.Dialog.SkillDescription")}</label>
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
          const newName = form.name.value.trim() || (isEdit ? item.name : game.i18n.localize("CYPHER2026.Skills.Default"));
          const newRank = form.rank.value;
          const newStat = form.stat.value;
          const originType = form.originType.value;
          const originTier = form.originTier?.value || "1";
          const newDesc = form.description.value.trim();
          const newOrigin = originType === "tier" ? `Tier ${originTier}` : "Background";

          const systemData = {
            rank: newRank,
            stat: newStat,
            origin: newOrigin,
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
                type: "skill",
                img: "icons/svg/book.svg",
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
      const originSelect = html.querySelector("#cypher-skill-origin-select");
      const tierWrap = html.querySelector("#cypher-skill-tier-wrap");
      if (originSelect && tierWrap) {
        originSelect.addEventListener("change", (ev) => {
          tierWrap.style.display = ev.target.value === "tier" ? "flex" : "none";
        });
      }

      // Garante que o placeholder seja renderizado e limpa qualquer cache do navegador
      const textarea = html.querySelector("textarea[name='description']");
      if (textarea) {
        textarea.placeholder = placeholderDesc;
        if (!isEdit) textarea.value = "";
      }
    }
  });

  dialog.render({ force: true });
}