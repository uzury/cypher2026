/**
  * Diálogo para cadastrar ou editar Equipamento.
  */
  export async function promptEquipmentDialog({ actor, item = null }) {
    const isEdit = Boolean(item);
    const name = item?.name || "";
    const quantity = item?.system?.quantity ?? 1;
    const description = item?.system?.description || "";
    const placeholderDesc = game.i18n.localize("CYPHER2026.Dialog.EquipmentDescPlaceholder");

    const title = isEdit
    ? game.i18n.format("CYPHER2026.Dialog.EditEquipmentTitle", { name: item.name })
    : game.i18n.localize("CYPHER2026.Dialog.AddEquipmentTitle");

    const content = `
    <form class="cypher-dialog-form">
    <div class="form-group">
    <label>${game.i18n.localize("CYPHER2026.Dialog.EquipmentName")}</label>
    <input type="text" name="name" value="${name}" placeholder="${game.i18n.localize("CYPHER2026.Dialog.EquipmentNamePlaceholder")}" autofocus required />
    </div>

    <div class="form-group">
    <label>${game.i18n.localize("CYPHER2026.Dialog.Quantity")}</label>
    <input type="number" name="quantity" value="${quantity}" min="1" />
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
                                                             const newName = form.name.value.trim() || (isEdit ? item.name : game.i18n.localize("CYPHER2026.Equipment.Default"));
                                                             const newQty = parseInt(form.quantity.value, 10) || 1;
                                                             const newDesc = form.description.value.trim();

                                                             const systemData = {
                                                               quantity: newQty,
                                                               description: newDesc,
                                                               archived: isEdit ? Boolean(item.system?.archived) : false
                                                             };

                                                             if (isEdit) {
                                                               await item.update({ name: newName, system: systemData });
                                                             } else {
                                                               await actor.createEmbeddedDocuments("Item", [{
                                                                 name: newName,
                                                                 type: "equipment",
                                                                 img: "icons/svg/item-bag.svg",
                                                                 system: systemData
                                                               }]);
                                                             }
                                                           }
        },
        { action: "cancel", label: game.i18n.localize("CYPHER2026.Common.Cancel"), icon: "fas fa-times" }
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
