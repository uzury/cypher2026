/**
 * Diálogo para cadastrar ou editar Artefato.
 */
export async function promptArtifactDialog({ actor, item = null }) {
  const isEdit = Boolean(item);
  const name = item?.name || "";
  const form = item?.system?.form || "";
  const effect = item?.system?.effect || item?.system?.description || "";
  const currentThreshold = Number(item?.system?.depletionThreshold ?? item?.system?.depletionValue ?? 1) || 1;
  const currentDie = item?.system?.depletionDie || item?.system?.depletion || "1d20";
  const normalizedDie = currentDie.startsWith("1d") ? currentDie : `1d${currentDie.replace(/\D/g, "") || 20}`;
  const depletionDie = normalizedDie;
  const depletionMax = Number(normalizedDie.replace(/\D/g, "")) || 20;
  const depletionValue = Math.min(Math.max(currentThreshold, 1), depletionMax);
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

      <div class="form-group">
        <label>${game.i18n.localize("CYPHER2026.Dialog.ArtifactForm")}</label>
        <input type="text" name="form" value="${form}" placeholder="${game.i18n.localize("CYPHER2026.Dialog.ArtifactFormPlaceholder")}" />
      </div>

      <div class="form-group">
        <label>${game.i18n.localize("CYPHER2026.Dialog.ArtifactEffect")}</label>
        <textarea name="effect" rows="4" placeholder="${placeholderDesc}">${isEdit ? effect : ""}</textarea>
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.ArtifactDepletionThreshold")}</label>
          <input type="number" name="depletionValue" min="1" max="${depletionMax}" step="1" value="${depletionValue}" />
        </div>
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.ArtifactDepletionDie")}</label>
          <select name="depletionDie">
            <option value="1d6" ${depletionDie === "1d6" ? "selected" : ""}>d6</option>
            <option value="1d10" ${depletionDie === "1d10" ? "selected" : ""}>d10</option>
            <option value="1d20" ${depletionDie === "1d20" ? "selected" : ""}>d20</option>
            <option value="1d100" ${depletionDie === "1d100" ? "selected" : ""}>d100</option>
          </select>
        </div>
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
          const newForm = form.form.value.trim();
          const newEffect = form.effect.value.trim();
          const depletionDie = form.depletionDie.value || "1d20";
          const depletionMax = Number(depletionDie.replace(/\D/g, "")) || 20;
          const depletionValue = Math.min(Math.max(parseInt(form.depletionValue.value, 10) || 1, 1), depletionMax);
          const newDesc = newEffect;

          const systemData = {
            form: newForm,
            effect: newEffect,
            depletion: `${depletionValue} in ${depletionDie}`,
            depletionThreshold: depletionValue,
            depletionDie: depletionDie,
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
      const textarea = html.querySelector("textarea[name='effect']");
      if (textarea) {
        textarea.placeholder = placeholderDesc;
        if (!isEdit) textarea.value = "";
      }
    }
  });

  dialog.render({ force: true });
}
