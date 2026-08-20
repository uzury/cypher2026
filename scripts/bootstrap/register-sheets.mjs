import { CypherPcSheet } from "../applications/actors/pc-sheet.mjs";

/**
 * Registra a CypherPcSheet (ApplicationV2) como ficha padrão para PCs
 * utilizando as APIs públicas e namespaced nativas do Foundry V14.
 */
export function registerSheets() {
  // Desregistra a ficha V1 legada do core sem usar globals depreciados
  foundry.applications.apps.DocumentSheetConfig.unregisterSheet(
    foundry.documents.Actor,
    "core",
    foundry.appv1.sheets.ActorSheet
  );

  // Registra a CypherPcSheet (ApplicationV2) como padrão para o tipo "pc"
  foundry.applications.apps.DocumentSheetConfig.registerSheet(
    foundry.documents.Actor,
    "cypher-2026",
    CypherPcSheet,
    {
      types: ["pc"],
      makeDefault: true,
      label: "CYPHER2026.Sheet.PC"
    }
  );
}