/**
  * Diálogo para cadastrar ou editar Artefato.
  */
  export async function promptArtifactDialog({ actor, item = null }) {
    const isEdit = Boolean(item);
    const name = item?.name || "";
    const level = item?.system?.level || "1d6";
    const depletion = item?.system?.depletion || "1 in 1d20";
    const description = item?.system?.description || "";
    const placeholderDesc = game.i18n.localize("CYPHER2026.Dialog.ArtifactDescPlaceholder");

    const title = isEdit
    ? game.i18n.format("CYPHER2026.Dialog.EditArtifactTitle", { name: item.name })
    : game.i18n.localize("CYPHER2026.Dialog.AddArtifactTitle");

    const content = `
    <form class="cypher-dialog-form">
    <div class="form-group">
    <label>${game.i18n.localize("CYPHER2026.Dialog.ArtifactName")}</label>
    <input type="text" name="name" value="${name}" placeholder="${game.i18n.localize("CYPHER2026.Dialog.ArtifactNamePlaceholder")}" autofocus required />
    </div>

    <div class="form-grid-2">
    <div class="form-group">
    <label>${game.i18n.localize("CYPHER2026.Dialog.Level")}</label>
    <input type="text" name="level" value="${level}" placeholder="e.g. 1d6, 5" />
    </div>
    <div class="form-group">
    <label>${game.i18n.localize("CYPHER2026.Dialog.Depletion")}</label>
    <input type="text" name="depletion" value="${depletion}" placeholder="e.g. 1 in 1d20, 1 in 1d6" />
    </div>
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
                                                             const newName = form.name.value.trim() || (isEdit ? item.name : game.i18n.localize("CYPHER2026.Artifacts.Default"));
                                                             const newLevel = form.level.value.trim() || "1d6";
                                                             const newDepletion = form.depletion.value.trim();
                                                             const newDesc = form.description.value.trim();

                                                             const systemData = {
                                                               level: newLevel,
                                                               depletion: newDepletion,
                                                               description: newDesc,
                                                               archived: isEdit ? Boolean(item.system?.archived) : false
                                                             };

                                                             if (isEdit) {
                                                               await item.update({ name: newName, system: systemData });
                                                             } else {
                                                               await actor.createEmbeddedDocuments("Item", [{
                                                                 name: newName,
                                                                 type: "artifact",
                                                                 img: "icons/svg/clockwork.svg",
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
