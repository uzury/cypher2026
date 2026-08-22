/**
 * Diálogo para cadastrar ou editar um Character Arc.
 */
export async function promptCharacterArcDialog({ actor, item = null }) {
  const isEdit = Boolean(item);
  const name = item?.name || "";
  const initialDescription = item?.system?.steps?.[Number(item?.system?.currentStep ?? 0)]?.description ?? item?.system?.description ?? "";
  const title = isEdit
    ? game.i18n.format("CYPHER2026.Dialog.EditCharacterArcTitle", { name: item.name })
    : game.i18n.localize("CYPHER2026.Dialog.AddCharacterArcTitle");

  const content = `
    <form class="cypher-dialog-form">
      <div class="form-group">
        <label>${game.i18n.localize("CYPHER2026.Dialog.CharacterArcName")}</label>
        <input type="text" name="name" value="${name}" placeholder="${game.i18n.localize("CYPHER2026.Dialog.CharacterArcNamePlaceholder")}" autofocus required />
      </div>

      <div class="form-group">
        <label>${game.i18n.localize("CYPHER2026.Dialog.CharacterArcDescription")}</label>
        <textarea name="description" rows="5" placeholder="${game.i18n.localize("CYPHER2026.Dialog.CharacterArcDescriptionPlaceholder")}">${isEdit ? initialDescription : ""}</textarea>
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
          const newName = form.name.value.trim() || (isEdit ? item.name : game.i18n.localize("CYPHER2026.CharacterArcs.Default"));
          const newDescription = form.description.value.trim();

          const buildSteps = (description) => [{
            id: (crypto.randomUUID?.() ?? `arc-step-${Date.now()}`),
            description: description || "",
            active: true
          }];

          const existingSteps = Array.isArray(item?.system?.steps) && item.system.steps.length
            ? item.system.steps.map((step) => ({
                id: step.id || (crypto.randomUUID?.() ?? `arc-step-${Date.now()}`),
                description: String(step.description ?? ""),
                active: true
              }))
            : [];

          const nextSteps = existingSteps.length ? existingSteps : buildSteps(newDescription);
          const finalSteps = nextSteps.map((step, index) => ({
            ...step,
            description: index === 0 ? newDescription : String(step.description ?? "")
          }));

          const currentStep = Math.min(Math.max(Number(item?.system?.currentStep ?? 0), 0), Math.max(finalSteps.length - 1, 0));
          const currentStepId = finalSteps[currentStep]?.id ?? null;

          const systemData = {
            description: newDescription,
            currentStep,
            currentStepId,
            steps: finalSteps.length ? finalSteps : buildSteps(newDescription),
            archived: isEdit ? Boolean(item.system?.archived) : false
          };

          if (isEdit) {
            await item.update({ name: newName, system: systemData });
          } else {
            await actor.createEmbeddedDocuments("Item", [{
              name: newName,
              type: "characterArc",
              img: "icons/svg/book.svg",
              system: systemData
            }]);
          }
        }
      },
      { action: "cancel", label: game.i18n.localize("CYPHER2026.Common.Cancel"), icon: "fas fa-times" }
    ]
  });

  dialog.render({ force: true });
}
