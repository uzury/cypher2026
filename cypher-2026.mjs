import { registerDataModels } from "./scripts/bootstrap/register-data-models.mjs";
  import { registerSheets } from "./scripts/bootstrap/register-sheets.mjs";
  import { registerHandlebars } from "./scripts/bootstrap/register-handlebars.mjs";

  Hooks.once("init", () => {
    registerDataModels();
    registerSheets();
    registerHandlebars();
  });
  