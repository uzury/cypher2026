/**
  * Diálogo para cadastrar ou editar Cypher.
  */
  export async function promptCypherDialog({ actor, item = null }) {
    const isEdit = Boolean(item);
    const name = item?.name || "";
    const level = item?.system?.level || "1d6";
    const description = item?.system?.description || "";
    const placeholderDesc = game.i18n.localize("CYPHER2026.Dialog.CypherDescPlaceholder");

    const title = isEdit
    ? game.i18n.format("CYPHER2026.Dialog.EditCypherTitle", { name: item.name })
    : game.i18n.localize("CYPHER2026.Dialog.AddCypherTitle");

    const content = `
    <form class="cypher-dialog-form">
    <div class="form-group">
    <label>${game.i18n.localize("CYPHER2026.Dialog.CypherName")}</label>
    <input type="text" name="name" value="${name}" placeholder="${game.i18n.localize("CYPHER2026.Dialog.CypherNamePlaceholder")}" autofocus required />
    </div>

    <div class="form-group">
    <label>${game.i18n.localize("CYPHER2026.Dialog.Level")}</label>
    <input type="text" name="level" value="${level}" placeholder="e.g. 1d6, 4, 1d6+2" />
    </div>

    <div class="form-group">
    <label>${game.i18n.localize("CYPHER2026.Dialog.Description")}</label>
    <textarea name="description" rows="4" placeholder="${placeholderDesc}">${isEdit ? description : ""}</textarea>
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
                                                             const newName = form.name.value.trim() || (isEdit ? item.name : game.i18n.localize("CYPHER2026.Cyphers.Default"));
                                                             const newLevel = form.level.value.trim() || "1d6";
                                                             const newDesc = form.description.value.trim();

                                                             const systemData = {
                                                               level: newLevel,
                                                               description: newDesc,
                                                               archived: isEdit ? Boolean(item.system?.archived) : false
                                                             };

                                                             if (isEdit) {
                                                               await item.update({ name: newName, system: systemData });
                                                             } else {
                                                               await actor.createEmbeddedDocuments("Item", [{
                                                                 name: newName,
                                                                 type: "cypher",
                                                                 img: "icons/svg/d20-highlight.svg",
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
