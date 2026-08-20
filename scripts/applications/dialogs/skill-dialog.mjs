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

  const content = `
    <form class="cypher-skill-dialog-form">
      <div class="form-group" style="margin-bottom:8px;">
        <label style="font-weight:bold; font-size:0.85rem;">${game.i18n.localize("CYPHER2026.Dialog.SkillName")}:</label>
        <input type="text" name="name" value="${name}" placeholder="${game.i18n.localize("CYPHER2026.Dialog.SkillNamePlaceholder")}" autofocus required style="width:100%; padding:4px;" />
      </div>

      <div class="form-group" style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;">
        <div>
          <label style="font-weight:bold; font-size:0.85rem;">${game.i18n.localize("CYPHER2026.Dialog.SkillRank")}:</label>
          <select name="rank" style="width:100%; padding:4px;">
            <option value="inability" ${rank === "inability" ? "selected" : ""}>Inabilidade</option>
            <option value="trained" ${rank === "trained" ? "selected" : ""}>Treinada</option>
            <option value="specialized" ${rank === "specialized" ? "selected" : ""}>Especializada</option>
            <option value="expert" ${rank === "expert" ? "selected" : ""}>Expert</option>
          </select>
        </div>

        <div>
          <label style="font-weight:bold; font-size:0.85rem;">Pool:</label>
          <select name="stat" style="width:100%; padding:4px;">
            <option value="might" ${stat === "might" ? "selected" : ""}>Might</option>
            <option value="speed" ${stat === "speed" ? "selected" : ""}>Speed</option>
            <option value="intellect" ${stat === "intellect" ? "selected" : ""}>Intellect</option>
            <option value="none" ${stat === "none" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Stats.none")}</option>
          </select>
        </div>
      </div>

      <div class="form-group" style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;">
        <div>
          <label style="font-weight:bold; font-size:0.85rem;">${game.i18n.localize("CYPHER2026.Dialog.SkillOrigin")}:</label>
          <select name="originType" id="cypher-skill-origin-select" style="width:100%; padding:4px;">
            <option value="background" ${!isTier ? "selected" : ""}>Background</option>
            <option value="tier" ${isTier ? "selected" : ""}>Tier</option>
          </select>
        </div>
        <div id="cypher-skill-tier-wrap" style="${isTier ? "" : "display:none;"}">
          <label style="font-weight:bold; font-size:0.85rem;">Nível de Tier:</label>
          <select name="originTier" style="width:100%; padding:4px;">
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
        <label style="font-weight:bold; font-size:0.85rem;">${game.i18n.localize("CYPHER2026.Dialog.SkillDescription")}:</label>
        <textarea name="description" value="${description}" rows="3" placeholder="${game.i18n.localize("CYPHER2026.Dialog.SkillDescPlaceholder")}" autofocus required style="width:100%; resize:vertical;">${game.i18n.localize("CYPHER2026.Dialog.SkillDescPlaceholder")}</textarea>
      </div>
    </form>
  `;

  const dialog = new foundry.applications.api.DialogV2({
    window: { title: isEdit ? `Editar Perícia: ${item.name}` : game.i18n.localize("CYPHER2026.Dialog.AddSkillTitle") },
    content,
    buttons: [
      {
        action: "save",
        label: isEdit ? "CYPHER2026.Common.Save" : "CYPHER2026.Common.Add",
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

          if (isEdit) {
            await item.update({
              name: newName,
              "system.rank": newRank,
              "system.stat": newStat,
              "system.origin": newOrigin,
              "system.description": newDesc
            });
          } else {
            await actor.createEmbeddedDocuments("Item", [
              {
                name: newName,
                type: "skill",
                img: "icons/svg/book.svg",
                system: {
                  rank: newRank,
                  stat: newStat,
                  origin: newOrigin,
                  description: newDesc,
                  archived: false
                }
              }
            ]);
          }
        }
      },
      {
        action: "cancel",
        label: "Cancelar",
        icon: "fas fa-times"
      }
    ],
    render: (event, html) => {
      const originSelect = html.querySelector("#cypher-skill-origin-select");
      const tierWrap = html.querySelector("#cypher-skill-tier-wrap");
      if (originSelect && tierWrap) {
        originSelect.addEventListener("change", (ev) => {
          tierWrap.style.display = ev.target.value === "tier" ? "block" : "none";
        });
      }
    }
  });

  dialog.render({ force: true });
}