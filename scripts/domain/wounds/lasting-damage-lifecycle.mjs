/**
 * Libera o ferimento persistente somente quando o Item de dano é arquivado,
 * deletado ou curado pelo botão Heal. Recuperação normal nunca chama este serviço.
 */
const RELEASE_CONTEXT = "cypher2026-release-lasting-wound";

async function releaseLastingWound(item, { keepCurrent = false } = {}) {
  const actor = item?.actor;
  const severity = item?.system?.severity;
  if (!actor || !item.system?.isDamage || !item.system?.woundApplied) return;
  if (!["minor", "moderate", "major"].includes(severity)) return;
  const wound = actor.system.wounds[severity];
  if (!wound) return;
  const lastingCount = Math.max(0, Number(wound.lastingCount ?? 0));
  if (lastingCount <= 0) return;

  const updates = { [`system.wounds.${severity}.lastingCount`]: lastingCount - 1 };
  if (!keepCurrent) updates[`system.wounds.${severity}.current`] = Math.max(lastingCount - 1, Number(wound.current ?? 0) - 1);
  await actor.update(updates, { [RELEASE_CONTEXT]: true });
  if (item.parent) await item.update({ "system.woundApplied": false }, { [RELEASE_CONTEXT]: true });
}

export function registerLastingDamageLifecycle() {
  Hooks.on("updateItem", async (item, changed, options) => {
    if (options?.[RELEASE_CONTEXT]) return;
    if (!item.system?.isDamage || item.system?.archived !== true) return;
    if (changed?.system?.archived !== true) return;
    const healedByButton = changed?.system?.value === 0;
    await releaseLastingWound(item, { keepCurrent: healedByButton });
  });

  Hooks.on("preDeleteItem", (item, options) => {
    if (options?.[RELEASE_CONTEXT]) return;
    void releaseLastingWound(item);
  });
}
