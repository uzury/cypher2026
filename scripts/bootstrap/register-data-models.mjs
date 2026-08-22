import { PcDataModel } from "../data-models/actors/pc-data.mjs";
import { CharacterArcDataModel } from "../data-models/items/character-arc-data.mjs";

/**
 * Register the DataModels declared by the system manifest.
 *
 * Keep this module limited to Foundry registration; schemas belong in their
 * respective data-model files.
 */
export function registerDataModels() {
  CONFIG.Actor.dataModels ??= {};
  CONFIG.Actor.dataModels.pc = PcDataModel;

  CONFIG.Item.dataModels ??= {};
  CONFIG.Item.dataModels.characterArc = CharacterArcDataModel;
}
