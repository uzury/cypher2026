/**
 * Diálogo em DialogV2 para cadastrar ou editar uma Armadura ou Escudo.
 * @param {object} params
 * @param {Actor} params.actor
 * @param {Item} [params.item]
 */
export async function promptArmorDialog({ actor, item = null }) {
  const isEdit = Boolean(item);
  const name = item?.name || "";
  const armorType = item?.system?.armorType || "light";
  const freelyUse = item?.system?.freelyUse ?? true;
  const description = item?.system?.description || "";
  const placeholderDesc = game.i18n.localize("CYPHER2026.Dialog.ArmorDescPlaceholder");

  const title = isEdit
    ? game.i18n.format("CYPHER2026.Dialog.EditArmorTitle", { name: item.name })
    : game.i18n.localize("CYPHER2026.Dialog.AddArmorTitle");

  const content = `
    <form class="cypher-dialog-form">
      <div class="form-group">
        <label>${game.i18n.localize("CYPHER2026.Dialog.ArmorName")}</label>
        <input type="text" name="name" value="${name}" placeholder="${game.i18n.localize("CYPHER2026.Dialog.ArmorNamePlaceholder")}" autofocus required />
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.ArmorType")}</label>
          <select name="armorType" id="cypher-armor-type-select">
            <option value="light" ${armorType === "light" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.ArmorType.light")}</option>
            <option value="medium" ${armorType === "medium" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.ArmorType.medium")}</option>
            <option value="heavy" ${armorType === "heavy" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.ArmorType.heavy")}</option>
            <option value="shield" ${armorType === "shield" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.ArmorType.shield")}</option>
          </select>
        </div>

        <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:8px; margin-top:20px;">
          <input type="checkbox" name="freelyUse" id="cypher-armor-freely-use" ${freelyUse ? "checked" : ""} style="width:auto; margin:0; cursor:pointer;" />
          <label for="cypher-armor-freely-use" style="margin:0; cursor:pointer; font-weight:800; font-size:0.82rem; text-transform:uppercase;">${game.i18n.localize("CYPHER2026.Dialog.FreelyUseCheckbox")}</label>
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
          const newArmorType = form.armorType.value;
          const newName = form.name.value.trim() || (isEdit ? item.name : game.i18n.format("CYPHER2026.Item.NewItemName", { type: game.i18n.localize("CYPHER2026.ArmorType." + newArmorType) }));
          const newFreelyUse = Boolean(form.freelyUse?.checked);
          const newDesc = form.description.value.trim();

          // Ícones nativos perfeitos: Escudo usa shield.svg e Armadura usa aura.svg
          const defaultImg = newArmorType === "shield"
            ? "icons/svg/shield.svg"
            : "icons/svg/aura.svg";

          const systemData = {
            armorType: newArmorType,
            freelyUse: newFreelyUse,
            description: newDesc,
            archived: isEdit ? Boolean(item.system?.archived) : false,
            wounds: isEdit && item.system?.wounds ? item.system.wounds : {
              minor: { current: 0, max: 3 },
              moderate: { current: 0, max: 2 },
              major: { current: 0, max: 1 }
            }
          };

          if (isEdit) {
            await item.update({
              name: newName,
              img: defaultImg,
              system: systemData
            });
          } else {
            await actor.createEmbeddedDocuments("Item", [
              {
                name: newName,
                type: "armor",
                img: defaultImg,
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
      const textarea = html.querySelector("textarea[name='description']");
      if (textarea) {
        textarea.placeholder = placeholderDesc;
        if (!isEdit) textarea.value = "";
      }
    }
  });

  dialog.render({ force: true });
}