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
  const isAttack = Boolean(item?.system?.isAttack);
  const damage = item?.system?.damage ?? 4;
  const range = item?.system?.range || "short";
  const rank = item?.system?.rank || "practiced";
  const description = item?.system?.description || "";
  const placeholderDesc = game.i18n.localize("CYPHER2026.Dialog.AbilityDescPlaceholder");

  const title = isEdit
    ? game.i18n.format("CYPHER2026.Dialog.EditAbilityTitle", { name: item.name })
    : game.i18n.localize("CYPHER2026.Dialog.AddAbilityTitle");

  const content = `
    <form class="cypher-dialog-form">
      <div class="form-group">
        <label>${game.i18n.localize("CYPHER2026.Dialog.AbilityName")}</label>
        <input type="text" name="name" value="${name}" placeholder="${game.i18n.localize("CYPHER2026.Dialog.AbilityNamePlaceholder")}" autofocus required />
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.Kind")}</label>
          <select name="kind" id="cypher-ability-kind-select">
            <option value="action" ${kind === "action" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.ActionKind")}</option>
            <option value="enabler" ${kind === "enabler" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.EnablerKind")}</option>
          </select>
        </div>
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.Origin")}</label>
          <select name="origin">
            <option value="type" ${origin === "type" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.OriginType")}</option>
            <option value="focus" ${origin === "focus" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.OriginFocus")}</option>
            <option value="descriptor" ${origin === "descriptor" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.OriginDescriptor")}</option>
            <option value="special" ${origin === "special" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.OriginSpecial")}</option>
          </select>
        </div>
      </div>

      <div class="form-grid-3">
        <div class="form-group" id="cypher-ability-cost-wrap" style="${kind === "enabler" || pool === "none" ? "display:none;" : ""}">
          <label>${game.i18n.localize("CYPHER2026.Dialog.Cost")}</label>
          <input type="number" name="cost" value="${cost}" min="0" />
        </div>
        <div class="form-group" id="cypher-ability-pool-wrap" style="${kind === "enabler" ? "display:none;" : ""}">
          <label>${game.i18n.localize("CYPHER2026.Dialog.Pool")}</label>
          <select name="pool">
            <option value="might" ${pool === "might" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.PoolMight")}</option>
            <option value="speed" ${pool === "speed" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.PoolSpeed")}</option>
            <option value="intellect" ${pool === "intellect" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.PoolIntellect")}</option>
            <option value="none" ${pool === "none" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Dialog.PoolNone")}</option>
          </select>
        </div>
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.Tier")}</label>
          <select name="tier">
            <option value="1" ${tier === "1" ? "selected" : ""}>Tier 1</option>
            <option value="2" ${tier === "2" ? "selected" : ""}>Tier 2</option>
            <option value="3" ${tier === "3" ? "selected" : ""}>Tier 3</option>
            <option value="4" ${tier === "4" ? "selected" : ""}>Tier 4</option>
            <option value="5" ${tier === "5" ? "selected" : ""}>Tier 5</option>
            <option value="6" ${tier === "6" ? "selected" : ""}>Tier 6</option>
          </select>
        </div>
      </div>

      <!-- SEÇÃO DE ATAQUE CONDICIONAL -->
      <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:8px; margin-top:4px; margin-bottom:4px;">
        <input type="checkbox" name="isAttack" id="cypher-ability-is-attack" ${isAttack ? "checked" : ""} style="width:auto; margin:0; cursor:pointer;" />
        <label for="cypher-ability-is-attack" style="margin:0; cursor:pointer; font-weight:800; font-size:0.82rem; text-transform:uppercase;">${game.i18n.localize("CYPHER2026.Dialog.IsAttack")}</label>
      </div>

      <!-- CAMPOS DE ATAQUE: DANO, ALCANCE E TREINAMENTO -->
      <div class="form-grid-3" id="cypher-ability-attack-fields-wrap" style="${isAttack ? "" : "display:none;"}">
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.AttackDamage")}</label>
          <input type="number" name="damage" value="${damage}" min="0" />
        </div>
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.AttackRange")}</label>
          <select name="range">
            <option value="immediate" ${range === "immediate" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Range.immediate")}</option>
            <option value="short" ${range === "short" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Range.short")}</option>
            <option value="long" ${range === "long" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Range.long")}</option>
            <option value="extreme" ${range === "extreme" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.Range.extreme")}</option>
          </select>
        </div>
        <div class="form-group">
          <label>${game.i18n.localize("CYPHER2026.Dialog.AttackTraining")}</label>
          <select name="rank">
            <option value="inability" ${rank === "inability" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.inability")}</option>
            <option value="practiced" ${rank === "practiced" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.practiced")}</option>
            <option value="trained" ${rank === "trained" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.trained")}</option>
            <option value="specialized" ${rank === "specialized" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.specialized")}</option>
            <option value="expert" ${rank === "expert" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.expert")}</option>
          </select>
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
          const newName = form.name.value.trim() || (isEdit ? item.name : game.i18n.localize("CYPHER2026.Abilities.Default"));
          const newKind = form.kind.value;
          const newOrigin = form.origin.value;
          const newPool = newKind === "enabler" ? "none" : (form.pool?.value || "intellect");
          const newCost = (newKind === "enabler" || newPool === "none") ? 0 : (parseInt(form.cost?.value, 10) || 0);
          const newTier = parseInt(form.tier.value, 10) || 1;
          const newIsAttack = Boolean(form.isAttack?.checked);
          const newDamage = newIsAttack ? (parseInt(form.damage?.value, 10) || 0) : 0;
          const newRange = newIsAttack ? (form.range?.value || "short") : "immediate";
          const newRank = newIsAttack ? (form.rank?.value || "practiced") : "practiced";
          const newDesc = form.description.value.trim();

          const systemData = {
            kind: newKind,
            origin: newOrigin,
            cost: newCost,
            pool: newPool,
            tier: newTier,
            isAttack: newIsAttack,
            damage: newDamage,
            range: newRange,
            rank: newRank,
            description: newDesc,
            archived: isEdit ? Boolean(item.system?.archived) : false
          };

          if (isEdit) {
            await item.update({
              name: newName,
              system: systemData
            });
          } else {
            await actor.createEmbeddedDocuments("Item", [
              {
                name: newName,
                type: "ability",
                img: "icons/svg/lightning.svg",
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
      const kindSelect = html.querySelector("#cypher-ability-kind-select");
      const poolSelect = html.querySelector("select[name='pool']");
      const costWrap = html.querySelector("#cypher-ability-cost-wrap");
      const poolWrap = html.querySelector("#cypher-ability-pool-wrap");
      const isAttackCheckbox = html.querySelector("#cypher-ability-is-attack");
      const attackFieldsWrap = html.querySelector("#cypher-ability-attack-fields-wrap");

      const updateCostVisibility = () => {
        const isEnabler = kindSelect?.value === "enabler";
        const isNonePool = poolSelect?.value === "none";

        if (poolWrap) poolWrap.style.display = isEnabler ? "none" : "flex";
        if (costWrap) costWrap.style.display = (isEnabler || isNonePool) ? "none" : "flex";
      };

      kindSelect?.addEventListener("change", updateCostVisibility);
      poolSelect?.addEventListener("change", updateCostVisibility);
      updateCostVisibility();

      isAttackCheckbox?.addEventListener("change", (ev) => {
        if (attackFieldsWrap) attackFieldsWrap.style.display = ev.target.checked ? "grid" : "none";
      });

      const textarea = html.querySelector("textarea[name='description']");
      if (textarea) {
        textarea.placeholder = placeholderDesc;
        if (!isEdit) textarea.value = "";
      }
    }
  });

  dialog.render({ force: true });
}