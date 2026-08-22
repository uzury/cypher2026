/**
 * Diálogo em DialogV2 para postar card de item no chat (Skill, Ability, Damage, etc.).
 * @param {object} params
 * @param {Actor} params.actor
 * @param {Item} params.item
 */
export function promptPostItemToChat({ actor, item, archiveOnSend = false }) {
  if (!actor || !item) return;

  const isSkill = item.type === "skill";
  const isAbility = item.type === "ability";
  const isDamage = item.system?.isDamage;
  const isArtifact = item.type === "artifact";
  const isCharacterArc = item.type === "characterArc";

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
          } else if (isArtifact) {
            typeLabel = game.i18n.localize("TYPES.Item.artifact").toUpperCase();
            const formLabel = item.system?.form ? `Form: ${item.system.form}` : "";
            const depletionValue = Number(item.system?.depletionThreshold ?? item.system?.depletionValue ?? 1) || 1;
            const depletionDie = item.system?.depletionDie || item.system?.depletion?.match(/1d\d+/)?.[0] || "1d20";
            tagsHtml = `
              <span class="chat-tag-pill highlight">${formLabel || "Artifact"}</span>
              <span class="chat-tag-pill accent">${depletionValue} in ${depletionDie}</span>
            `;
          } else if (isCharacterArc) {
            typeLabel = game.i18n.localize("CYPHER2026.Notes.CharacterArcs").toUpperCase();
            const stepsCount = Array.isArray(item.system?.steps) ? item.system.steps.length : 0;
            tagsHtml = `
              <span class="chat-tag-pill highlight">${stepsCount} steps</span>
              <span class="chat-tag-pill accent">Arc</span>
            `;
          }

          const description = item.system?.description || item.system?.effect || `<em>${game.i18n.localize("CYPHER2026.Common.NoDescription")}</em>`;
          const steps = Array.isArray(item.system?.steps) ? item.system.steps : [];
          const stepsHtml = steps.length
            ? `<div class="chat-card-description" style="margin-top:8px;"><strong>Steps</strong><ol style="margin:6px 0 0 1.2rem; padding:0;">${steps.map((step, index) => `<li>${(step.description ?? "").trim() || `Step ${index + 1}`}</li>`).join("")}</ol></div>`
            : "";
          let chatContent = `
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
              ${stepsHtml}
            </div>
          `;

          if (isArtifact) {
            const depletionDie = item.system?.depletionDie || item.system?.depletion?.match(/1d\d+/)?.[0] || "1d20";
            const threshold = Math.max(1, Number(item.system?.depletionThreshold ?? item.system?.depletionValue ?? item.system?.depletion?.match(/\d+/)?.[0] ?? 1) || 1);
            const maxDieValue = Number(depletionDie.replace(/\D/g, "")) || 20;
            const safeThreshold = Math.min(threshold, maxDieValue);
            const roll = new Roll(depletionDie);
            await roll.evaluate();
            const isDepleted = roll.total <= safeThreshold;

            if (isDepleted) {
              await item.update({ "system.archived": true });
            }

            chatContent += `
              <div class="chat-card-description" style="margin-top:8px;">
                <span class="chat-tag-pill">Rolled: ${roll.total}</span>
                <span class="chat-tag-pill ${isDepleted ? "highlight" : "accent"}">${isDepleted ? "Archived after depletion check" : "Artifact remains functional"}</span>
              </div>
            `;
          }

          await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor }),
            content: chatContent
          });

          if (archiveOnSend && item.type === "cypher") {
            await item.update({ "system.archived": true });
          }
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