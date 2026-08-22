/**
  * Diálogo para cadastrar ou editar Cypher.
  */
  export function promptCypherTypeChoice({ actor, item = null }) {
    const dialog = new foundry.applications.api.DialogV2({
      window: { title: game.i18n.localize("CYPHER2026.Dialog.CypherTypeTitle") },
      content: `
        <div class="cypher-type-choice">
          <p>${game.i18n.localize("CYPHER2026.Dialog.CypherTypePrompt")}</p>
        </div>
      `,
      buttons: [
        {
          action: "manifest",
          label: game.i18n.localize("CYPHER2026.Dialog.CypherManifest"),
          icon: "fas fa-star",
          callback: () => promptCypherDialog({ actor, item, manifestMode: true })
        },
        {
          action: "regular",
          label: game.i18n.localize("CYPHER2026.Dialog.CypherRegular"),
          icon: "fas fa-circle",
          callback: () => promptCypherDialog({ actor, item, manifestMode: false })
        }
      ]
    });

    dialog.render({ force: true });
  }

  export async function promptCypherDialog({ actor, item = null, manifestMode = false }) {
    const isEdit = Boolean(item);
    const name = item?.name || "";
    const effect = item?.system?.effect || "";
    const manifest = isEdit ? Boolean(item?.system?.manifest) : Boolean(manifestMode);
    const explanation = item?.system?.explanation || "";
    const genreItem = item?.system?.genreItem || "";
    const power = item?.system?.power || "low";
    const placeholderEffect = game.i18n.localize("CYPHER2026.Dialog.CypherEffectPlaceholder");
    const placeholderExplanation = game.i18n.localize("CYPHER2026.Dialog.CypherExplanationPlaceholder");
    const placeholderGenre = game.i18n.localize("CYPHER2026.Dialog.CypherGenrePlaceholder");
    const showManifestFields = manifestMode || (isEdit && manifest);

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
        <label>${game.i18n.localize("CYPHER2026.Dialog.CypherEffect")}</label>
        <textarea name="effect" rows="4" placeholder="${placeholderEffect}">${isEdit ? effect : ""}</textarea>
      </div>

      ${showManifestFields ? `
      <div id="cypher-explanation-wrap" data-field="cypher-explanation" hidden style="margin-top:6px;">
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.CypherExplanation")}</label>
          <textarea name="explanation" rows="3" placeholder="${placeholderExplanation}">${isEdit ? explanation : ""}</textarea>
        </div>
      </div>

      <div id="cypher-manifest-fields" data-field="cypher-manifest" style="margin-top:6px;">
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.CypherGenreItem")}</label>
          <input type="text" name="genreItem" value="${genreItem}" placeholder="${placeholderGenre}" />
        </div>

        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.CypherPower")}</label>
          <select name="power">
            <option value="low" ${power === "low" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Cypher.Power.low")}</option>
            <option value="med" ${power === "med" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Cypher.Power.med")}</option>
            <option value="adv" ${power === "adv" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Cypher.Power.adv")}</option>
            <option value="high" ${power === "high" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Cypher.Power.high")}</option>
            <option value="ultra" ${power === "ultra" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Cypher.Power.ultra")}</option>
          </select>
        </div>
      </div>
      ` : `
      <div id="cypher-explanation-wrap" data-field="cypher-explanation" style="margin-top:6px;">
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.CypherExplanation")}</label>
          <textarea name="explanation" rows="3" placeholder="${placeholderExplanation}">${isEdit ? explanation : ""}</textarea>
        </div>
      </div>
      `}
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
            const newEffect = form.effect.value.trim();
            const newManifest = Boolean(showManifestFields && manifestMode);
            const newExplanation = form.explanation.value.trim();
            const newGenreItem = form.genreItem?.value?.trim() || "";
            const newPower = form.power?.value || "low";

            const systemData = {
              effect: newEffect,
              manifest: newManifest,
              explanation: newExplanation,
              genreItem: newGenreItem,
              power: newPower,
              description: newEffect,
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
        const checkbox = html.querySelector("input[name='manifest']");
        const explanationWrap = html.querySelector("#cypher-explanation-wrap");
        const manifestFields = html.querySelector("#cypher-manifest-fields");

        if (checkbox && explanationWrap && manifestFields) {
          const sync = () => {
            const isManifest = checkbox.checked;
            explanationWrap.hidden = isManifest;
            manifestFields.hidden = !isManifest;
          };

          checkbox.addEventListener("change", sync);
          checkbox.checked = manifest;
          sync();
        }
      }
    });

    dialog.render({ force: true });
  }
