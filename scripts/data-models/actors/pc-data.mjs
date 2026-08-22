const { TypeDataModel } = foundry.abstract;
  const fields = foundry.data.fields;

  export class PcDataModel extends TypeDataModel {
    static defineSchema() {
      return {
        tier: new fields.NumberField({ initial: 1, integer: true, min: 1, max: 6 }),
        effort: new fields.NumberField({ initial: 1, integer: true, min: 1 }),
        xp: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
        cypherLimit: new fields.NumberField({ initial: 2, integer: true, min: 0 }),
        biography: new fields.HTMLField({ initial: "" }),
        notes: new fields.HTMLField({ initial: "" }),
        characterNotes: new fields.HTMLField({ initial: "" }),
        gmNotes: new fields.HTMLField({ initial: "" }),
        description: new fields.HTMLField({ initial: "" }),

        sentence: new fields.SchemaField({
          descriptor: new fields.StringField({ initial: "" }),
                                         characterType: new fields.StringField({ initial: "" }),
                                         focus: new fields.StringField({ initial: "" })
        }),

        stats: new fields.SchemaField({
          might: new fields.SchemaField({
            current: new fields.NumberField({ initial: 10, integer: true, min: 0 }),
                                        base: new fields.NumberField({ initial: 10, integer: true, min: 0 }),
                                        edge: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
                                        total: new fields.NumberField({ initial: 10, integer: true, min: 0 })
          }),
          speed: new fields.SchemaField({
            current: new fields.NumberField({ initial: 10, integer: true, min: 0 }),
                                        base: new fields.NumberField({ initial: 10, integer: true, min: 0 }),
                                        edge: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
                                        total: new fields.NumberField({ initial: 10, integer: true, min: 0 })
          }),
          intellect: new fields.SchemaField({
            current: new fields.NumberField({ initial: 10, integer: true, min: 0 }),
                                            base: new fields.NumberField({ initial: 10, integer: true, min: 0 }),
                                            edge: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
                                            total: new fields.NumberField({ initial: 10, integer: true, min: 0 })
          })
        }),

        fixedSkills: new fields.SchemaField({
          initiative: new fields.SchemaField({
            rank: new fields.StringField({ initial: "practiced" }),
                                             stat: new fields.StringField({ initial: "speed" })
          }),
          mightDefense: new fields.SchemaField({
            rank: new fields.StringField({ initial: "practiced" }),
                                               stat: new fields.StringField({ initial: "might" })
          }),
          speedDefense: new fields.SchemaField({
            rank: new fields.StringField({ initial: "practiced" }),
                                               stat: new fields.StringField({ initial: "speed" })
          }),
          intellectDefense: new fields.SchemaField({
            rank: new fields.StringField({ initial: "practiced" }),
                                                   stat: new fields.StringField({ initial: "intellect" })
          })
        }),

        wounds: new fields.SchemaField({
          minor: new fields.SchemaField({
            current: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
                                        max: new fields.NumberField({ initial: 3, integer: true, min: 1 }),
                                        lastingCount: new fields.NumberField({ initial: 0, integer: true, min: 0 })
          }),
          moderate: new fields.SchemaField({
            current: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
                                           max: new fields.NumberField({ initial: 3, integer: true, min: 1 }),
                                           lastingCount: new fields.NumberField({ initial: 0, integer: true, min: 0 })
          }),
          major: new fields.SchemaField({
            current: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
                                        max: new fields.NumberField({ initial: 3, integer: true, min: 1 }),
                                        lastingCount: new fields.NumberField({ initial: 0, integer: true, min: 0 })
          })
        }),

        recoveries: new fields.SchemaField({
          formula: new fields.StringField({ initial: "1d6+1" }),
            diceNum: new fields.NumberField({ initial: 1, integer: true, min: 0, max: 6 }),
                                           bonus: new fields.NumberField({ initial: 1, integer: true, min: 0 }),
                                           actionCurrent: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
                                           actionMax: new fields.NumberField({ initial: 1, integer: true, min: 1 }),
                                           tenMinCurrent: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
                                           tenMinMax: new fields.NumberField({ initial: 1, integer: true, min: 1 }),
                                           oneHourCurrent: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
                                           oneHourMax: new fields.NumberField({ initial: 1, integer: true, min: 1 }),
                                           tenHourCurrent: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
                                           tenHourMax: new fields.NumberField({ initial: 1, integer: true, min: 1 })
        }),

        currency: new fields.SchemaField({
          inexpensive: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
                                         moderately: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
                                         expensive: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
                                         veryExpensive: new fields.NumberField({ initial: 0, integer: true, min: 0 }),
                                         exorbitant: new fields.NumberField({ initial: 0, integer: true, min: 0 })
        })
      };
    }
  }
