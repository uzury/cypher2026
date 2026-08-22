/**
 * Pure operations for Cypher character pools.
 *
 * This module intentionally has no Foundry dependency. Persistence remains the
 * responsibility of the application/use-case layer.
 */

export function clampPoolCurrent(current, total) {
  const max = Math.max(0, Number(total) || 0);
  const value = Number(current) || 0;
  return Math.min(max, Math.max(0, value));
}

export function adjustPoolCurrent(current, total, delta) {
  return clampPoolCurrent((Number(current) || 0) + (Number(delta) || 0), total);
}

export function resetPoolCurrent(total) {
  return Math.max(0, Number(total) || 0);
}

export function adjustPoolBase(base, delta) {
  return Math.max(0, (Number(base) || 0) + (Number(delta) || 0));
}

export function adjustPoolEdge(edge, delta) {
  return Math.max(0, (Number(edge) || 0) + (Number(delta) || 0));
}
