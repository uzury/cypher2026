/**
  * Diálogo para cadastrar ou editar Equipamento.
  */
  export async function promptEquipmentDialog({ actor, item = null }) {
    const isEdit = Boolean(item);
    const name = item?.name || "";
    const quantity = item?.system?.quantity ?? 1;
    const carry = Boolean(item?.system?.carry);
    const isWeapon = Boolean(item?.system?.isWeapon);
    const damage = item?.system?.damage || "";
    const weaponCategory = item?.system?.weaponCategory || "no";
    const range = item?.system?.range || "immediate";
    const training = item?.system?.training || "inability";
    const description = item?.system?.description || "";
    const placeholderDesc = game.i18n.localize("CYPHER2026.Dialog.EquipmentDescPlaceholder");

    const title = isEdit
    ? game.i18n.format("CYPHER2026.Dialog.EditEquipmentTitle", { name: item.name })
    : game.i18n.localize("CYPHER2026.Dialog.AddEquipmentTitle");

  const content = `
  <form class="cypher-dialog-form">
    <div class="form-group">
      <label data-iq8n="CYPHER2026.Dialog.EquipmentName">${game.i18n.localize("CYPHER2026.Dialog.EquipmentName")}</label>
      <input data-iq8n="CYPHER2026.Dialog.EquipmentNamePlaceholder" type="text" name="name" value="${name}" placeholder="${game.i18n.localize("CYPHER2026.Dialog.EquipmentNamePlaceholder")}" autofocus required />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label data-iq8n="CYPHER2026.Dialog.Quantity">${game.i18n.localize("CYPHER2026.Dialog.Quantity")}</label>
        <input type="number" name="quantity" value="${quantity}" min="1" />
      </div>
      <div class="form-group" style="display:flex; align-items:center; gap:8px; margin-left:8px;">
        <input id="carry-checkbox" type="checkbox" name="carry" ${carry ? "checked" : ""} />
        <label for="carry-checkbox" data-iq8n="CYPHER2026.Dialog.CarryingCheckbox">${game.i18n.localize("CYPHER2026.Dialog.CarryingCheckbox")}</label>
      </div>
    </div>

    <div class="form-group">
      <label data-iq8n="CYPHER2026.Dialog.Description">${game.i18n.localize("CYPHER2026.Dialog.Description")}</label>
      <textarea name="description" rows="3" placeholder="${placeholderDesc}">${isEdit ? description : ""}</textarea>
    </div>

    <div class="form-group" style="display:flex; align-items:center; gap:8px;">
      <input id="isweapon-checkbox" type="checkbox" name="isWeapon" ${isWeapon ? "checked" : ""} />
      <label for="isweapon-checkbox" data-iq8n="CYPHER2026.Dialog.IsWeaponCheckbox">${game.i18n.localize("CYPHER2026.Dialog.IsWeaponCheckbox")}</label>
    </div>

    <div id="weapon-fields" style="display: ${isWeapon ? "block" : "none"}; margin-top:6px;">
      <div class="form-group">
        <label data-iq8n="CYPHER2026.Dialog.AttackDamage">${game.i18n.localize("CYPHER2026.Dialog.AttackDamage")}</label>
        <input type="text" name="damage" value="${damage}" placeholder="e.g. 2" />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label data-iq8n="CYPHER2026.Dialog.WeaponCategory">${game.i18n.localize("CYPHER2026.Dialog.WeaponCategory")}</label>
          <select name="weaponCategory">
            <option value="no" ${weaponCategory === "no" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.WeaponCategory.no")}</option>
            <option value="light" ${weaponCategory === "light" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.WeaponCategory.light")}</option>
            <option value="medium" ${weaponCategory === "medium" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.WeaponCategory.medium")}</option>
            <option value="heavy" ${weaponCategory === "heavy" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.WeaponCategory.heavy")}</option>
          </select>
        </div>

        <div class="form-group" style="margin-left:8px;">
          <label data-iq8n="CYPHER2026.Dialog.AttackRange">${game.i18n.localize("CYPHER2026.Dialog.AttackRange")}</label>
          <select name="range">
            <option value="immediate" ${range === "immediate" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Range.immediate")}</option>
            <option value="short" ${range === "short" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Range.short")}</option>
            <option value="long" ${range === "long" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Range.long")}</option>
            <option value="extreme" ${range === "extreme" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Range.extreme")}</option>
          </select>
        </div>

        <div class="form-group" style="margin-left:8px;">
          <label data-iq8n="CYPHER2026.Dialog.AttackTraining">${game.i18n.localize("CYPHER2026.Dialog.AttackTraining")}</label>
          <select name="training">
            <option value="inability" ${training === "inability" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.inability")}</option>
            <option value="practiced" ${training === "practiced" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.practiced")}</option>
            <option value="trained" ${training === "trained" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.trained")}</option>
            <option value="specialized" ${training === "specialized" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.specialized")}</option>
            <option value="expert" ${training === "expert" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.expert")}</option>
          </select>
        </div>
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
                                                            const newName = form.name.value.trim() || (isEdit ? item.name : game.i18n.localize("CYPHER2026.Equipment.Default"));
                                                            const newQty = parseInt(form.quantity.value, 10) || 1;
                                                            const newDesc = form.description.value.trim();
                                                            const newCarry = Boolean(form.carry?.checked);
                                                            const newIsWeapon = Boolean(form.isWeapon?.checked);
                                                            const newDamage = form.damage?.value?.trim() || "";
                                                            const newWeaponCategory = form.weaponCategory?.value || "no";
                                                            const newRange = form.range?.value || "immediate";
                                                            const newTraining = form.training?.value || "inability";

                                                            const systemData = {
                                                              quantity: newQty,
                                                              description: newDesc,
                                                              carry: newCarry,
                                                              isWeapon: newIsWeapon,
                                                              damage: newDamage,
                                                              weaponCategory: newWeaponCategory,
                                                              range: newRange,
                                                              training: newTraining,
                                                              archived: isEdit ? Boolean(item.system?.archived) : false
                                                            };

                                                            if (isEdit) {
                                                              await item.update({ name: newName, system: systemData });
                                                              // If editing and it was newly toggled to weapon, consider creating a weapon entry
                                                              if (newIsWeapon && !item.type === "weapon") {
                                                                await actor.createEmbeddedDocuments("Item", [{
                                                                  name: newName,
                                                                  type: "weapon",
                                                                  img: "icons/svg/sword.svg",
                                                                  system: {
                                                                    damage: parseInt(newDamage, 10) || 0,
                                                                    weaponCategory: newWeaponCategory,
                                                                    range: newRange,
                                                                    rank: newTraining || "practiced",
                                                                    cost: 0,
                                                                    pool: "none",
                                                                    description: newDesc,
                                                                    archived: false
                                                                  }
                                                                }]);
                                                              }
                                                            } else {
                                                              const created = await actor.createEmbeddedDocuments("Item", [{
                                                                name: newName,
                                                                type: "equipment",
                                                                img: "icons/svg/item-bag.svg",
                                                                system: systemData
                                                              }]);

                                                              // If marked as weapon, also create a weapon entry in Attacks
                                                              if (newIsWeapon) {
                                                                await actor.createEmbeddedDocuments("Item", [{
                                                                  name: newName,
                                                                  type: "weapon",
                                                                  img: "icons/svg/sword.svg",
                                                                  system: {
                                                                    damage: parseInt(newDamage, 10) || 0,
                                                                    weaponCategory: newWeaponCategory,
                                                                    range: newRange,
                                                                    rank: newTraining || "practiced",
                                                                    cost: 0,
                                                                    pool: "none",
                                                                    description: newDesc,
                                                                    archived: false
                                                                  }
                                                                }]);
                                                              }
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

        const isWeaponCheckbox = html.querySelector("input[name='isWeapon']");
        const weaponFields = html.querySelector("#weapon-fields");
        if (isWeaponCheckbox && weaponFields) {
          isWeaponCheckbox.addEventListener("change", (ev) => {
            weaponFields.style.display = isWeaponCheckbox.checked ? "block" : "none";
          });
        }
      }
    });

    dialog.render({ force: true });
  }
