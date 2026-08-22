/**
 * Configura todos os listeners reativos do DOM na ActorSheet.
 * @param {CypherPcSheet} sheet
 */
export function setupPcSheetListeners(sheet) {
  const el = sheet.element;
  if (!el) return;

  setupScrollPreservation(sheet, el);
  setupSentenceDropZones(sheet, el);
  setupTabDragAndDrop(sheet, el);
  setupNumericAutoSelectAndMath(sheet, el);
  setupMouseAnchoredTooltips(el);
  setupAltKeyListeners(sheet, el);
  setupAbilitySearch(el);
  setupCharacterArcTextInputs(sheet, el);
}

function setupCharacterArcTextInputs(sheet, el) {
  const textareas = el.querySelectorAll('textarea[data-action="updateCharacterArcText"]');
  for (const textarea of textareas) {
    const syncArcText = async () => {
      const item = sheet.actor.items.get(textarea.dataset.itemId);
      if (!item) return;
      await item.update({
        system: {
          ...item.system,
          description: textarea.value ?? ""
        }
      });
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
    requestAnimationFrame(() => {
      if (pane) pane.scrollTop = sheet._lastTabScroll;
    });
  }
  pane.addEventListener("scroll", () => {
    sheet._lastTabScroll = pane.scrollTop;
  }, { passive: true });
}

function setupSentenceDropZones(sheet, el) {
  const dropZones = el.querySelectorAll("[data-sentence-drop]");
  for (const zone of dropZones) {
    zone.addEventListener("dragover", (ev) => {
      ev.preventDefault();
      zone.classList.add("drag-over");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
    zone.addEventListener("drop", async (ev) => {
      ev.preventDefault();
      zone.classList.remove("drag-over");
      try {
        const rawData = ev.dataTransfer?.getData("text/plain");
        if (!rawData) return;
        const data = JSON.parse(rawData);
        if (data.type !== "Item" || !data.uuid) return;
        const item = await fromUuid(data.uuid);
        if (!item) return;
        const field = zone.dataset.sentenceDrop;
        if (field && item.type === field) {
          await sheet.actor.update({ [`system.sentence.${field}`]: item.name });
          const exists = sheet.actor.items.some((i) => i.name === item.name && i.type === item.type);
          if (!exists) await sheet.actor.createEmbeddedDocuments("Item", [item.toObject()]);
        }
      } catch (err) {
        console.error("Cypher 2026 | Erro no Drag & Drop de Sentence:", err);
      }
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
        const rawData = ev.dataTransfer?.getData("text/plain");
        if (!rawData) return;
        const data = JSON.parse(rawData);
        if (data.type !== "Item" || !data.uuid) return;
        const item = await fromUuid(data.uuid);
        if (!item) return;
        await sheet.actor.createEmbeddedDocuments("Item", [item.toObject()]);
      } catch (err) {
        console.error("Cypher 2026 | Erro no Drag & Drop de Item:", err);
      }
    });
  }
}

function setupNumericAutoSelectAndMath(sheet, el) {
  const inputs = el.querySelectorAll('input[type="text"].numeric-input, input[type="number"], input.auto-math');
  for (const input of inputs) {
    input.addEventListener("focus", () => input.select());
    input.addEventListener("mouseup", (ev) => {
      if (document.activeElement !== input) {
        ev.preventDefault();
        input.select();
      }
    });
    input.addEventListener("change", async (ev) => {
      const rawVal = input.value.trim();
      const currentNum = Number(input.dataset.currentVal ?? input.defaultValue ?? 0);
      if (/^[+\-*/]/.test(rawVal) || /[+\-*/]/.test(rawVal)) {
        ev.stopImmediatePropagation();
        ev.preventDefault();
        let expr = rawVal;
        if (/^[+\-*/]/.test(rawVal)) expr = currentNum + " " + rawVal;
        try {
          if (/^[0-9+\-*/().\s]+$/.test(expr)) {
            const result = Function('"use strict";return (' + expr + ")")();
            if (Number.isFinite(result)) {
              const finalVal = Math.round(result);
              input.value = finalVal;
              const path = input.name;
              if (path) await sheet.actor.update({ [path]: finalVal });
            }
          }
        } catch (err) {
          console.warn("Cypher 2026 | Expressão matemática inválida:", expr);
        }
      }
    });
  }
}

function setupMouseAnchoredTooltips(el) {
  const tooltipTargets = el.querySelectorAll("[data-mouse-tooltip]");
  let tooltipEl = document.getElementById("cypher-mouse-tooltip");
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "cypher-mouse-tooltip";
    tooltipEl.className = "cypher-floating-tooltip";
    document.body.appendChild(tooltipEl);
  }
  for (const target of tooltipTargets) {
    target.addEventListener("mouseenter", (ev) => {
      const text = target.getAttribute("data-mouse-tooltip");
      if (!text) return;
      tooltipEl.innerHTML = text;
      tooltipEl.style.display = "block";
      tooltipEl.style.left = (ev.clientX + 14) + "px";
      tooltipEl.style.top = (ev.clientY + 14) + "px";
    });
    target.addEventListener("mousemove", (ev) => {
      tooltipEl.style.left = (ev.clientX + 14) + "px";
      tooltipEl.style.top = (ev.clientY + 14) + "px";
    });
    target.addEventListener("mouseleave", () => {
      tooltipEl.style.display = "none";
    });
  }
}

function setupAltKeyListeners(sheet, el) {
  if (sheet._altKeyCleanup) sheet._altKeyCleanup();

  const onKeyDown = (ev) => {
    if (ev.key === "Alt") el.classList.add("alt-active");
  };
  const onKeyUp = (ev) => {
    if (ev.key === "Alt") el.classList.remove("alt-active");
  };
  const onBlur = () => el.classList.remove("alt-active");

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", onBlur);

  sheet._altKeyCleanup = () => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("blur", onBlur);
  };
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
