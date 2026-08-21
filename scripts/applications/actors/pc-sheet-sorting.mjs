/**
 * Ordena lista de Perícias com itens arquivados fixados no final.
 */
export function sortSkills(items, sortMode) {
  const allSkills = items.filter((i) => i.type === "skill");
  const active = allSkills.filter((i) => !i.system?.archived);
  const archived = allSkills.filter((i) => i.system?.archived);
  const rankWeights = { expert: 4, specialized: 3, trained: 2, inability: 0 };

  const sortFn = (a, b) => {
    if (sortMode === "alpha-asc") return a.name.localeCompare(b.name);
    if (sortMode === "alpha-desc") return b.name.localeCompare(a.name);
    if (sortMode === "rank-desc") {
      return (rankWeights[b.system?.rank] ?? 1) - (rankWeights[a.system?.rank] ?? 1) || a.name.localeCompare(b.name);
    }
    return 0;
  };

  active.sort(sortFn);
  archived.sort(sortFn);
  return [...active, ...archived];
}

/**
 * Ordena lista de Habilidades com itens arquivados fixados no final.
 */
export function sortAbilities(items, sortMode) {
  const allAbilities = items.filter((i) => i.type === "ability");

  // Decora rótulos de apresentação
  for (const ability of allAbilities) {
    const origKey = String(ability.system?.origin || "type").toLowerCase();
    const origLoc = game.i18n.localize("CYPHER2026.AbilityOrigin." + origKey);
    ability.originLabel = origLoc && !origLoc.startsWith("CYPHER2026.")
      ? origLoc
      : origKey.charAt(0).toUpperCase() + origKey.slice(1);

    const poolKey = String(ability.system?.pool || "intellect").toLowerCase();
    const poolLoc = game.i18n.localize("CYPHER2026.Stats." + poolKey);
    ability.poolLabel = poolLoc && !poolLoc.startsWith("CYPHER2026.") ? poolLoc : poolKey.toUpperCase();
  }

  const active = allAbilities.filter((i) => !i.system?.archived);
  const archived = allAbilities.filter((i) => i.system?.archived);
  const originOrder = { focus: 1, type: 2, descriptor: 3, special: 4 };

  const sortFn = (a, b) => {
    if (sortMode === "alpha-asc") return a.name.localeCompare(b.name);
    if (sortMode === "alpha-desc") return b.name.localeCompare(a.name);
    if (sortMode === "origin") {
      const aOrig = a.system?.origin?.toLowerCase() || "type";
      const bOrig = b.system?.origin?.toLowerCase() || "type";
      return (originOrder[aOrig] ?? 9) - (originOrder[bOrig] ?? 9) || a.name.localeCompare(b.name);
    }
    if (sortMode === "tier") {
      return (Number(a.system?.tier) || 1) - (Number(b.system?.tier) || 1) || a.name.localeCompare(b.name);
    }
    if (sortMode === "enabler") {
      const aEn = a.system?.kind === "enabler" ? 0 : 1;
      const bEn = b.system?.kind === "enabler" ? 0 : 1;
      return aEn - bEn || a.name.localeCompare(b.name);
    }
    return 0;
  };

  active.sort(sortFn);
  archived.sort(sortFn);
  return [...active, ...archived];
}