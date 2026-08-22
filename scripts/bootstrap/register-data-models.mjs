import { PcDataModel } from "../data-models/actors/pc-data.mjs";

  const { TypeDataModel } = foundry.abstract;
  const fields = foundry.data.fields;

  class CharacterArcDataModel extends TypeDataModel {
    static defineSchema() {
      return {
        archived: new fields.BooleanField({ initial: false }),
        description: new fields.StringField({ initial: "" }),
        currentStep: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
        currentStepId: new fields.StringField({ initial: "" }),
        steps: new fields.ArrayField(
          new fields.SchemaField({
            id: new fields.StringField({ initial: "" }),
            description: new fields.StringField({ initial: "" }),
            active: new fields.BooleanField({ initial: true })
          })
        )
      };
    }
  }

  export function registerDataModels() {
    CONFIG.Actor.dataModels = CONFIG.Actor.dataModels || {};
    CONFIG.Actor.dataModels.pc = PcDataModel;

    CONFIG.Item = CONFIG.Item || {};
    CONFIG.Item.dataModels = CONFIG.Item.dataModels || {};
    CONFIG.Item.dataModels.characterArc = CharacterArcDataModel;
    CONFIG.Item.typeLabels = CONFIG.Item.typeLabels || {};
    CONFIG.Item.typeLabels.characterArc = "Character Arc";
  }
  