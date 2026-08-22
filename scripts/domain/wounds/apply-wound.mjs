/**
 * Aplica um novo ferimento seguindo o rollover Minor -> Moderate -> Major.
 * Não muta o Actor; retorna somente o novo estado.
 * @param {object} wounds
 * @param {"minor"|"moderate"|"major"} severity
 * @returns {{wounds:object,appliedSeverity:string,overflow:boolean,dead:boolean}}
 */
export function applyWound(wounds, severity) {
  const next = structuredClone(wounds ?? {});
  for (const key of ["minor", "moderate", "major"]) {
    next[key] ??= { current: 0, max: 3, lastingCount: 0 };
    next[key].current = Math.max(0, Number(next[key].current ?? 0));
    next[key].max = Math.max(1, Number(next[key].max ?? 3));
    next[key].lastingCount = Math.max(0, Number(next[key].lastingCount ?? 0));
  }

  const order = ["minor", "moderate", "major"];
  let index = order.indexOf(severity);
  if (index < 0) index = 0;
  let appliedSeverity = order[index];
  let overflow = false;

  while (index < order.length) {
    const key = order[index];
    if (next[key].current < next[key].max) {
      next[key].current += 1;
      appliedSeverity = key;
      break;
    }
    overflow = true;
    index += 1;
  }

  return {
    wounds: next,
    appliedSeverity,
    overflow,
    dead: next.major.current >= next.major.max
  };
}

/**
 * Remove um ferimento normal, preservando todos os ferimentos duradouros.
 * @param {object} wounds
 * @param {"minor"|"moderate"|"major"} severity
 * @returns {object}
 */
export function removeNormalWound(wounds, severity) {
  const next = structuredClone(wounds ?? {});
  const entry = next[severity];
  if (!entry) return next;
  const lasting = Math.max(0, Number(entry.lastingCount ?? 0));
  entry.current = Math.max(lasting, Number(entry.current ?? 0) - 1);
  return next;
}
