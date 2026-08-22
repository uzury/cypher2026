/**
 * Calcula o custo final de uma ação depois do Edge.
 * Edge reduz o custo, mas nunca abaixo de zero.
 * @param {number} cost
 * @param {number} edge
 * @returns {number}
 */
export function calculatePoolSpend(cost, edge) {
  return Math.max(0, Number(cost || 0) - Number(edge || 0));
}

/**
 * Valida e calcula um gasto de Pool sem mutar documentos.
 * @param {object} stat
 * @param {number} cost
 * @returns {{ok:boolean,cost:number,current:number,next:number,reason?:string}}
 */
export function previewPoolSpend(stat, cost) {
  const current = Math.max(0, Number(stat?.current ?? 0));
  const finalCost = calculatePoolSpend(cost, stat?.edge);
  if (finalCost > current) {
    return { ok: false, cost: finalCost, current, next: current, reason: "insufficient-pool" };
  }
  return { ok: true, cost: finalCost, current, next: current - finalCost };
}
