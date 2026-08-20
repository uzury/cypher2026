/**
 * Diálogo em DialogV2 para postar card de item no chat (Skill, Ability, Damage, etc.).
 * @param {object} params
 * @param {Actor} params.actor
 * @param {Item} params.item
 */
export function promptPostItemToChat({ actor, item }) {
  if (!actor || !item) return;

  const isSkill = item.type === "skill";
  const isAbility = item.type === "ability";
  const isDamage = item.system?.isDamage;

  const dialog = new foundry.applications.api.DialogV2({
    window: { title: game.i18n.format("CYPHER2026.Dialog.PostChatTitle", { name: item.name }) },
    content: `<p>${game.i18n.format("CYPHER2026.Dialog.PostChatConfirm", { name: item.name })}</p>`,
    buttons: [
      {
        action: "send",
        label: game.i18n.localize("CYPHER2026.Common.Send"),
        icon: "fas fa-comment-dots",
        default: true,
        callback: async () => {
          let tagsHtml = "";
          let typeLabel = item.type.toUpperCase();
          let cardModifierClass = "item-card";

          if (isSkill) {
            typeLabel = game.i18n.localize("TYPES.Item.skill").toUpperCase();
            const rankLabel = game.i18n.localize("CYPHER2026.SkillRank." + (item.system?.rank || "trained"));
            const statLabel = game.i18n.localize("CYPHER2026.Stats." + (item.system?.stat || "none"));
            const originLabel = item.system?.origin || "Background";
            tagsHtml = `
              <span class="chat-tag-pill highlight">${rankLabel}</span>
              <span class="chat-tag-pill">${originLabel}</span>
              <span class="chat-tag-pill accent">${statLabel}</span>
            `;
          } else if (isAbility) {
            typeLabel = game.i18n.localize("TYPES.Item.ability").toUpperCase();
            const isEnabler = item.system?.kind === "enabler";
            const costText = isEnabler ? "ENABLER" : `${item.system?.cost ?? 1} ${game.i18n.localize("CYPHER2026.Stats." + (item.system?.pool || "intellect"))}`;
            const originLabel = item.originLabel || "Type";
            const tierLabel = `TIER ${item.system?.tier || 1}`;
            tagsHtml = `
              <span class="chat-tag-pill ${isEnabler ? "gold" : "highlight"}">${costText}</span>
              <span class="chat-tag-pill accent">${originLabel}</span>
              <span class="chat-tag-pill">${tierLabel}</span>
            `;
          } else if (isDamage) {
            cardModifierClass = "rally";
            const dType = item.system?.damageType === "permanent" ? "Permanent" : "Lasting";
            const sev = item.system?.severity === "major" ? "Major" : "Moderate";
            typeLabel = game.i18n.localize(`CYPHER2026.Damage.${dType}`).toUpperCase();
            const sevLabel = game.i18n.localize(`CYPHER2026.Damage.${sev}`).toUpperCase();
            tagsHtml = `
              <span class="chat-tag-pill gold">${typeLabel}</span>
              <span class="chat-tag-pill highlight">${sevLabel}</span>
            `;
          }

          const description = item.system?.description || `<em>${game.i18n.localize("CYPHER2026.Common.NoDescription")}</em>`;

          const chatContent = `
            <div class="cypher-chat-card ${cardModifierClass}">
              <div class="chat-card-header">
                <img src="${item.img}" class="chat-item-icon" width="32" height="32" />
                <div class="chat-header-text">
                  <h3 class="chat-card-title">${item.name}</h3>
                  <span class="chat-card-subtitle">${typeLabel}</span>
                </div>
              </div>
              <div class="chat-card-tags">
                ${tagsHtml}
              </div>
              <div class="chat-card-description">
                ${description}
              </div>
            </div>
          `;

          await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor }),
            content: chatContent
          });
        }
      },
      {
        action: "cancel",
        label: game.i18n.localize("CYPHER2026.Common.Cancel"),
        icon: "fas fa-times"
      }
    ]
  });

  dialog.render({ force: true });
}