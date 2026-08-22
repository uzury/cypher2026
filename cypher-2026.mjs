import { registerDataModels } from "./scripts/bootstrap/register-data-models.mjs";
import { registerSheets } from "./scripts/bootstrap/register-sheets.mjs";
import { registerHandlebars } from "./scripts/bootstrap/register-handlebars.mjs";
import { registerLastingDamageLifecycle } from "./scripts/domain/wounds/lasting-damage-lifecycle.mjs";

Hooks.once("init", () => {
  CONFIG.Item ??= {};
  CONFIG.Item.typeLabels ??= {};
  CONFIG.Item.typeLabels.characterArc ??= "Character Arc";

  CONFIG.Item.documentClassMap ??= {};
  CONFIG.Item.documentClassMap.characterArc ??= Item;

  const itemTypeMap = (game.system?.documentTypes?.Item && typeof game.system.documentTypes.Item === "object") ? game.system.documentTypes.Item : {};
  if (game.system) {
    game.system.documentTypes ??= {};
    game.system.documentTypes.Item = {
      ...itemTypeMap,
      characterArc: {}
    };
  }

  registerDataModels();
  registerSheets();
  registerHandlebars();
  registerLastingDamageLifecycle();
});

Hooks.once("ready", () => {
  CONFIG.Item ??= {};
  CONFIG.Item.typeLabels ??= {};
  CONFIG.Item.typeLabels.characterArc ??= "Character Arc";

  CONFIG.Item.documentClassMap ??= {};
  CONFIG.Item.documentClassMap.characterArc ??= Item;

  if (game.system) {
    game.system.documentTypes ??= {};
    game.system.documentTypes.Item ??= {};
    game.system.documentTypes.Item.characterArc ??= {};
  }
});
