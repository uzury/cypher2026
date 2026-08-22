const { TypeDataModel } = foundry.abstract;
const fields = foundry.data.fields;

/**
 * Persisted data model for Character Arc items.
 *
 * Keep the schema here so item-specific persistence is co-located with the
 * corresponding domain data model rather than embedded in bootstrap code.
 */
export class CharacterArcDataModel extends TypeDataModel {
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
