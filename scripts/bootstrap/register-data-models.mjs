import { PcDataModel } from "../data-models/actors/pc-data.mjs";

  export function registerDataModels() {
    CONFIG.Actor.dataModels = CONFIG.Actor.dataModels || {};
    CONFIG.Actor.dataModels.pc = PcDataModel;
  }
  