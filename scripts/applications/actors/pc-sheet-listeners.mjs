import { applyWound, removeNormalWound } from "../../domain/wounds/apply-wound.mjs";
import { previewPoolSpend } from "../../domain/pools/calculate-pool-total.mjs";
import { setupCombatWoundAlertLayout } from "../combat-alert-layout.mjs";

export function setupPcSheetListeners(sheet) {
  const el = sheet.element;
  if (!el) return;
  setupScrollPreservation(sheet, el);
  setupSentenceDropZones(sheet, el);
  setupTabDragAndDrop(sheet, el);
  setupNumericAutoSelectAndMath(sheet, el);
  setupMouseAnchoredTooltips(el);
  setupAltKeyListeners(el);
  setupAbilitySearch(el);
  setupRuleActionOverrides(sheet, el);
  setupCombatWoundAlertLayout(el);
  setupCharacterArcTextInputs(sheet, el);
}

function setupRuleActionOverrides(sheet, el) {
  sheet._cypherRuleActionController?.abort();
  const controller = new AbortController();
  sheet._cypherRuleActionController = controller;
  el.addEventListener("click", async (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;
    if (!["adjustRecoveryDice", "adjustRecoveryBonus", "adjustWoundCurrent", "rollAbilityItem"].includes(action)) return;
    if (target.dataset.cypherRuleBypass === "true") { delete target.dataset.cypherRuleBypass; return; }

    if (action === "adjustRecoveryDice") {
      event.preventDefault(); event.stopImmediatePropagation();
      const current = Number(sheet.actor.system.recoveries.diceNum ?? 0);
      const delta = Number(target.dataset.delta ?? 0);
      await sheet.actor.update({ "system.recoveries.diceNum": Math.min(6, Math.max(0, current + delta)) });
      return;
    }
    if (action === "adjustRecoveryBonus") {
      event.preventDefault(); event.stopImmediatePropagation();
      const current = Number(sheet.actor.system.recoveries.bonus ?? 1);
      const delta = Number(target.dataset.delta ?? 0);
      await sheet.actor.update({ "system.recoveries.bonus": Math.min(99, Math.max(1, current + delta)) });
      return;
    }
    if (action === "adjustWoundCurrent") {
      event.preventDefault(); event.stopImmediatePropagation();
      const severity = target.dataset.severity;
      const delta = Number(target.dataset.delta ?? 0);
      if (!["minor", "moderate", "major"].includes(severity)) return;
      const wounds = foundry.utils.duplicate(sheet.actor.system.wounds);
      const result = delta > 0 ? applyWound(wounds, severity) : { wounds: removeNormalWound(wounds, severity) };
      const updates = {};
      for (const key of ["minor", "moderate", "major"]) updates[`system.wounds.${key}.current`] = result.wounds[key].current;
      await sheet.actor.update(updates);
      return;
    }
    if (action === "rollAbilityItem") {
      const ability = sheet.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
      const isEnabler = ability?.system?.kind === "enabler";
      const pool = ability?.system?.pool;
      const rawCost = Number(ability?.system?.cost ?? 0);
      if (!ability || isEnabler || !pool || pool === "none" || rawCost <= 0) return;
      event.preventDefault(); event.stopImmediatePropagation();
      const stat = sheet.actor.system.stats[pool];
      const preview = previewPoolSpend(stat, rawCost);
      if (!preview.ok) {
        ui.notifications.warn(`${ability.name}: ${game.i18n.localize("CYPHER2026.Stats.ApplyDamage")} — ${preview.current}/${preview.cost}`);
        return;
      }
      await sheet.actor.update({ [`system.stats.${pool}.current`]: preview.next });
      target.dataset.cypherRuleBypass = "true";
      target.click();
    }
  }, { capture: true, signal: controller.signal });
}

function setupCharacterArcTextInputs(sheet, el) {
  const textareas = el.querySelectorAll('textarea[data-action="updateCharacterArcText"]');
  for (const textarea of textareas) {
    const syncArcText = async () => {
      const item = sheet.actor.items.get(textarea.dataset.itemId);
      if (!item) return;
      await item.update({ system: { ...item.system, description: textarea.value ?? "" } });
    };
    textarea.addEventListener("change", syncArcText);
    textarea.addEventListener("blur", syncArcText);
  }
}

function setupScrollPreservation(sheet, el) {
  const pane = el.querySelector(".tab-pane-content:not(.hidden)");
  if (!pane) return;
  if (sheet._lastTabScroll !== undefined) {
    pane.scrollTop = sheet._lastTabScroll;
    requestAnimationFrame(() => { if (pane) pane.scrollTop = sheet._lastTabScroll; });
  }
  pane.addEventListener("scroll", () => { sheet._lastTabScroll = pane.scrollTop; }, { passive: true });
}

function setupSentenceDropZones(sheet, el) {
  const dropZones = el.querySelectorAll("[data-sentence-drop]");
  for (const zone of dropZones) {
    zone.addEventListener("dragover", (ev) => { ev.preventDefault(); zone.classList.add("drag-over"); });
    zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
    zone.addEventListener("drop", async (ev) => {
      ev.preventDefault(); zone.classList.remove("drag-over");
      try {
        const rawData = ev.dataTransfer?.getData("text/plain"); if (!rawData) return;
        const data = JSON.parse(rawData); if (data.type !== "Item" || !data.uuid) return;
        const item = await fromUuid(data.uuid); if (!item) return;
        const field = zone.dataset.sentenceDrop;
        if (field && item.type === field) {
          await sheet.actor.update({ [`system.sentence.${field}`]: item.name });
          const exists = sheet.actor.items.some((i) => i.name === item.name && i.type === item.type);
          if (!exists) await sheet.actor.createEmbeddedDocuments("Item", [item.toObject()]);
        }
      } catch (err) { console.error("Cypher 2026 | Erro no Drag & Drop de Sentence:", err); }
    });
  }
}

function setupTabDragAndDrop(sheet, el) {
  const tabPanes = el.querySelectorAll(".tab-pane-content");
  for (const pane of tabPanes) {
    pane.addEventListener("dragover", (ev) => ev.preventDefault());
    pane.addEventListener("drop", async (ev) => {
      if (ev.target.closest("[data-sentence-drop]")) return;
      ev.preventDefault();
      try {
        const rawData = ev.dataTransfer?.getData("text/plain"); if (!rawData) return;
        const data = JSON.parse(rawData); if (data.type !== "Item" || !data.uuid) return;
        const item = await fromUuid(data.uuid); if (!item) return;
        await sheet.actor.createEmbeddedDocuments("Item", [item.toObject()]);
      } catch (err) { console.error("Cypher 2026 | Erro no Drag & Drop de Item:", err); }
    });
  }
}

function setupNumericAutoSelectAndMath(sheet, el) {
  const inputs = el.querySelectorAll('input[type="text"].numeric-input, input[type="number"], input.auto-math');
  for (const input of inputs) {
    input.addEventListener("focus", () => input.select());
    input.addEventListener("mouseup", (ev) => { if (document.activeElement !== input) { ev.preventDefault(); input.select(); } });
    input.addEventListener("change", async (ev) => {
      const rawVal = input.value.trim(); const currentNum = Number(input.dataset.currentVal ?? input.defaultValue ?? 0);
      if (/^[+\-*/]/.test(rawVal) || /[+\-*/]/.test(rawVal)) {
        ev.stopImmediatePropagation(); ev.preventDefault();
        let expr = rawVal; if (/^[+\-*/]/.test(rawVal)) expr = currentNum + " " + rawVal;
        try {
          if (/^[0-9+\-*/().\s]+$/.test(expr)) {
            const result = Function('"use strict";return (' + expr + ")")();
            if (Number.isFinite(result)) {
              const finalVal = Math.round(result); input.value = finalVal;
              const path = input.name; if (path) await sheet.actor.update({ [path]: finalVal });
            }
          }
        } catch (err) { console.warn("Cypher 2026 | Expressão matemática inválida:", expr); }
      }
    });
  }
}

function setupMouseAnchoredTooltips(el) {
  const tooltipTargets = el.querySelectorAll("[data-mouse-tooltip]");
  let tooltipEl = document.getElementById("cypher-mouse-tooltip");
  if (!tooltipEl) { tooltipEl = document.createElement("div"); tooltipEl.id = "cypher-mouse-tooltip"; tooltipEl.className = "cypher-floating-tooltip"; document.body.appendChild(tooltipEl); }
  for (const target of tooltipTargets) {
    target.addEventListener("mouseenter", (ev) => {
      const text = target.getAttribute("data-mouse-tooltip"); if (!text) return;
      tooltipEl.innerHTML = text; tooltipEl.style.display = "block"; tooltipEl.style.left = (ev.clientX + 14) + "px"; tooltipEl.style.top = (ev.clientY + 14) + "px";
    });
    target.addEventListener("mousemove", (ev) => { tooltipEl.style.left = (ev.clientX + 14) + "px"; tooltipEl.style.top = (ev.clientY + 14) + "px"; });
    target.addEventListener("mouseleave", () => { tooltipEl.style.display = "none"; });
  }
}

function setupAltKeyListeners(el) {
  window.addEventListener("keydown", (ev) => { if (ev.key === "Alt") el?.classList.add("alt-active"); });
  window.addEventListener("keyup", (ev) => { if (ev.key === "Alt") el?.classList.remove("alt-active"); });
  window.addEventListener("blur", () => { el?.classList.remove("alt-active"); });
}

function setupAbilitySearch(el) {
  const searchInput = el.querySelector("#ability-search-input");
  if (!searchInput) return;
  searchInput.addEventListener("input", (ev) => {
    const query = ev.target.value.toLowerCase().trim();
    const rows = el.querySelectorAll(".ability-entry-row");
    for (const row of rows) {
      const searchContent = (row.getAttribute("data-search-content") || "").toLowerCase();
      row.classList.toggle("is-filtered-out", Boolean(query) && !searchContent.includes(query));
    }
  });
}
