/**
 * Diálogo em DialogV2 para cadastrar ou editar uma Habilidade.
 * @param {object} params
 * @param {Actor} params.actor
 * @param {Item} [params.item]
 */
export async function promptAbilityDialog({ actor, item = null }) {
  const isEdit = Boolean(item);
  const name = item?.name || "";
  const kind = item?.system?.kind || "action";
  const origin = (item?.system?.origin || "type").toLowerCase();
  const cost = item?.system?.cost ?? 1;
  const pool = (item?.system?.pool || "intellect").toLowerCase();
  const tier = String(item?.system?.tier || "1");
  const description = item?.system?.description || "";

  const content = `
    <form class="cypher-ability-dialog-form">
      <div class="form-group" style="margin-bottom:8px;">
        <label style="font-weight:bold; font-size:0.85rem;">${game.i18n.localize("CYPHER2026.Dialog.AbilityName")}:</label>
        <input type="text" name="name" value="${name}" placeholder="${game.i18n.localize("CYPHER2026.Dialog.AbilityNamePlaceholder")}" autofocus required style="width:100%; padding:4px;" />
      </div>

      <div class="form-group" style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;">
        <div>
          <label style="font-weight:bold; font-size:0.85rem;">${game.i18n.localize("CYPHER2026.Dialog.Kind")}:</label>
          <select name="kind" id="cypher-ability-kind-select" style="width:100%; padding:4px;">
            <option value="action" ${kind === "action" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.ActionKind")}</option>
            <option value="enabler" ${kind === "enabler" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.EnablerKind")}</option>
          </select>
        </div>
        <div>
          <label style="font-weight:bold; font-size:0.85rem;">${game.i18n.localize("CYPHER2026.Dialog.Origin")}:</label>
          <select name="origin" style="width:100%; padding:4px;">
            <option value="type" ${origin === "type" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.OriginType")}</option>
            <option value="focus" ${origin === "focus" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.OriginFocus")}</option>
            <option value="descriptor" ${origin === "descriptor" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.OriginDescriptor")}</option>
            <option value="special" ${origin === "special" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.OriginSpecial")}</option>
          </select>
        </div>
      </div>

      <div class="form-group" style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:8px;">
        <div id="cypher-ability-cost-wrap" style="${kind === "enabler" ? "display:none;" : ""}">
          <label style="font-weight:bold; font-size:0.85rem;">${game.i18n.localize("CYPHER2026.Dialog.Cost")}:</label>
          <input type="number" name="cost" value="${cost}" min="0" style="width:100%; padding:4px; text-align:center;" />
        </div>
        <div id="cypher-ability-pool-wrap" style="${kind === "enabler" ? "display:none;" : ""}">
          <label style="font-weight:bold; font-size:0.85rem;">${game.i18n.localize("CYPHER2026.Dialog.Pool")}:</label>
          <select name="pool" style="width:100%; padding:4px;">
            <option value="might" ${pool === "might" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.PoolMight")}</option>
            <option value="speed" ${pool === "speed" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.PoolSpeed")}</option>
            <option value="intellect" ${pool === "intellect" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.PoolIntellect")}</option>
            <option value="none" ${pool === "none" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.PoolNone")}</option>
          </select>
        </div>
        <div>
          <label style="font-weight:bold; font-size:0.85rem;">${game.i18n.localize("CYPHER2026.Dialog.Tier")}:</label>
          <select name="tier" style="width:100%; padding:4px;">
            <option value="1" ${tier === "1" ? "selected" : ""}>Tier 1</option>
            <option value="2" ${tier === "2" ? "selected" : ""}>Tier 2</option>
            <option value="3" ${tier === "3" ? "selected" : ""}>Tier 3</option>
            <option value="4" ${tier === "4" ? "selected" : ""}>Tier 4</option>
            <option value="5" ${tier === "5" ? "selected" : ""}>Tier 5</option>
            <option value="6" ${tier === "6" ? "selected" : ""}>Tier 6</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label style="font-weight:bold; font-size:0.85rem;">${game.i18n.localize("CYPHER2026.Dialog.Description")}:</label>
        <textarea name="description" value="${description}" rows="4" placeholder="${game.i18n.localize("CYPHER2026.Dialog.AbilityDescPlaceholder")}" autofocus required style="width:100%; resize:vertical;">${game.i18n.localize("CYPHER2026.Dialog.AbilityDescPlaceholder")}</textarea>
      </div>
    </form>
  `;

  const dialog = new foundry.applications.api.DialogV2({
    window: { title: isEdit ? `Editar Habilidade: ${item.name}` : game.i18n.localize("CYPHER2026.Dialog.AddAbilityTitle") },
    content,
    buttons: [
      {
        action: "save",
        label: isEdit ? "CYPHER2026.Common.Save" : "CYPHER2026.Common.Add",
        icon: isEdit ? "fas fa-save" : "fas fa-plus",
        default: true,
        callback: async (event, button) => {
          const form = button.form;
          const newName = form.name.value.trim() || (isEdit ? item.name : game.i18n.localize("CYPHER2026.Abilities.Default"));
          const newKind = form.kind.value;
          const newOrigin = form.origin.value;
          const newCost = parseInt(form.cost?.value, 10) || 0;
          const newPool = form.pool?.value || "intellect";
          const newTier = form.tier.value;
          const newDesc = form.description.value.trim();

          const data = {
            name: newName,
            "system.kind": newKind,
            "system.origin": newOrigin,
            "system.cost": newKind === "enabler" ? 0 : newCost,
            "system.pool": newKind === "enabler" ? "none" : newPool,
            "system.tier": newTier,
            "system.description": newDesc
          };

          if (isEdit) {
            await item.update(data);
          } else {
            await actor.createEmbeddedDocuments("Item", [
              {
                name: newName,
                type: "ability",
                img: "icons/svg/lightning.svg",
                system: {
                  ...data["system"],
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
      const kindSelect = html.querySelector("#cypher-ability-kind-select");
      const costWrap = html.querySelector("#cypher-ability-cost-wrap");
      const poolWrap = html.querySelector("#cypher-ability-pool-wrap");

      if (kindSelect) {
        kindSelect.addEventListener("change", (ev) => {
          const isEnabler = ev.target.value === "enabler";
          if (costWrap) costWrap.style.display = isEnabler ? "none" : "block";
          if (poolWrap) poolWrap.style.display = isEnabler ? "none" : "block";
        });
      }
    }
  });

  dialog.render({ force: true });
}