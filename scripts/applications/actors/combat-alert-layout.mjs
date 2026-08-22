/**
 * Move o alerta de ferimentos para uma única faixa abaixo das três caixas.
 * @param {HTMLElement} el
 */
export function setupCombatWoundAlertLayout(el) {
  const group = el.querySelector(".wounds-category-block");
  if (!group) return;
  el.querySelector(".wound-alerts-below")?.remove();
  const alerts = Array.from(group.querySelectorAll(".wound-alert-banner"));
  if (!alerts.length) return;
  const priority = ["dead", "major-hindered", "moderate-full", "minor-full"];
  const selected = alerts.sort((a, b) => {
    const aLevel = priority.findIndex((level) => a.classList.contains(level));
    const bLevel = priority.findIndex((level) => b.classList.contains(level));
    return aLevel - bLevel;
  })[0];
  if (!selected) return;
  for (const alert of alerts) alert.remove();
  const container = document.createElement("div");
  container.className = "wound-alerts-below";
  container.append(selected);
  group.after(container);
}
