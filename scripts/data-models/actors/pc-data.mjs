const { TypeDataModel } = foundry.abstract;
const fields = foundry.data.fields;

function getItemPoolModifier(item, stat) {
  if (item?.system?.archived) return 0;
  const system = item?.system ?? {};
  const direct = system.poolModifiers ?? system.modifiers?.pools ?? system.modifiers;
  if (!direct) return 0;
  if (Array.isArray(direct)) {
    return direct.reduce((sum, modifier) => {
      if (typeof modifier === "number") return sum + modifier;
      if (String(modifier?.pool ?? modifier?.stat ?? "").toLowerCase() !== stat) return sum;
      return sum + Number(modifier?.value ?? modifier?.amount ?? 0);
    }, 0);
  }
  if (typeof direct === "object") {
    const value = direct[stat] ?? direct[`${stat}Pool`] ?? direct[`${stat}Modifier`];
    return Number(value ?? 0) || 0;
  }
  return 0;
}

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
        might: new fields.SchemaField({ current: new fields.NumberField({ initial: 10, integer: true, min: 0 }), base: new fields.NumberField({ initial: 10, integer: true, min: 0 }), edge: new fields.NumberField({ initial: 0, integer: true, min: 0 }), total: new fields.NumberField({ initial: 10, integer: true, min: 0, persisted: false }) }),
        speed: new fields.SchemaField({ current: new fields.NumberField({ initial: 10, integer: true, min: 0 }), base: new fields.NumberField({ initial: 10, integer: true, min: 0 }), edge: new fields.NumberField({ initial: 0, integer: true, min: 0 }), total: new fields.NumberField({ initial: 10, integer: true, min: 0, persisted: false }) }),
        intellect: new fields.SchemaField({ current: new fields.NumberField({ initial: 10, integer: true, min: 0 }), base: new fields.NumberField({ initial: 10, integer: true, min: 0 }), edge: new fields.NumberField({ initial: 0, integer: true, min: 0 }), total: new fields.NumberField({ initial: 10, integer: true, min: 0, persisted: false }) })
      }),
      fixedSkills: new fields.SchemaField({
        initiative: new fields.SchemaField({ rank: new fields.StringField({ initial: "practiced" }), stat: new fields.StringField({ initial: "speed" }) }),
        mightDefense: new fields.SchemaField({ rank: new fields.StringField({ initial: "practiced" }), stat: new fields.StringField({ initial: "might" }) }),
        speedDefense: new fields.SchemaField({ rank: new fields.StringField({ initial: "practiced" }), stat: new fields.StringField({ initial: "speed" }) }),
        intellectDefense: new fields.SchemaField({ rank: new fields.StringField({ initial: "practiced" }), stat: new fields.StringField({ initial: "intellect" }) })
      }),
      wounds: new fields.SchemaField({
        minor: new fields.SchemaField({ current: new fields.NumberField({ initial: 0, integer: true, min: 0 }), max: new fields.NumberField({ initial: 3, integer: true, min: 1 }), lastingCount: new fields.NumberField({ initial: 0, integer: true, min: 0 }), alert: new fields.ObjectField({ initial: null, nullable: true, persisted: false }) }),
        moderate: new fields.SchemaField({ current: new fields.NumberField({ initial: 0, integer: true, min: 0 }), max: new fields.NumberField({ initial: 3, integer: true, min: 1 }), lastingCount: new fields.NumberField({ initial: 0, integer: true, min: 0 }), alert: new fields.ObjectField({ initial: null, nullable: true, persisted: false }) }),
        major: new fields.SchemaField({ current: new fields.NumberField({ initial: 0, integer: true, min: 0 }), max: new fields.NumberField({ initial: 3, integer: true, min: 1 }), lastingCount: new fields.NumberField({ initial: 0, integer: true, min: 0 }), alert: new fields.ObjectField({ initial: null, nullable: true, persisted: false }) })
      }),
      recoveries: new fields.SchemaField({
        formula: new fields.StringField({ initial: "1d6+1" }),
        diceNum: new fields.NumberField({ initial: 1, integer: true, min: 0, max: 6 }),
        bonus: new fields.NumberField({ initial: 1, integer: true, min: 1 }),
        actionCurrent: new fields.NumberField({ initial: 0, integer: true, min: 0 }), actionMax: new fields.NumberField({ initial: 1, integer: true, min: 1 }),
        tenMinCurrent: new fields.NumberField({ initial: 0, integer: true, min: 0 }), tenMinMax: new fields.NumberField({ initial: 1, integer: true, min: 1 }),
        oneHourCurrent: new fields.NumberField({ initial: 0, integer: true, min: 0 }), oneHourMax: new fields.NumberField({ initial: 1, integer: true, min: 1 }),
        tenHourCurrent: new fields.NumberField({ initial: 0, integer: true, min: 0 }), tenHourMax: new fields.NumberField({ initial: 1, integer: true, min: 1 })
      }),
      currency: new fields.SchemaField({
        inexpensive: new fields.NumberField({ initial: 0, integer: true, min: 0 }), moderately: new fields.NumberField({ initial: 0, integer: true, min: 0 }), expensive: new fields.NumberField({ initial: 0, integer: true, min: 0 }), veryExpensive: new fields.NumberField({ initial: 0, integer: true, min: 0 }), exorbitant: new fields.NumberField({ initial: 0, integer: true, min: 0 })
      })
    };
  }

  prepareBaseData() {
    for (const stat of ["might", "speed", "intellect"]) this.stats[stat].total = Math.max(0, Number(this.stats[stat].base ?? 0));
  }

  prepareDerivedData() {
    const actor = this.parent;
    const items = actor?.items ? Array.from(actor.items.values()) : [];
    for (const stat of ["might", "speed", "intellect"]) {
      const data = this.stats[stat];
      const itemModifier = items.reduce((sum, item) => sum + getItemPoolModifier(item, stat), 0);
      data.total = Math.max(0, Number(data.total ?? data.base ?? 0) + itemModifier);
      data.current = Math.min(Math.max(0, Number(data.current ?? 0)), data.total);
    }

    const wounds = this.wounds;
    wounds.minor.alert = null; wounds.moderate.alert = null; wounds.major.alert = null;
    if (wounds.minor.current >= wounds.minor.max) wounds.minor.alert = { level: "minor-full", icon: "fa-arrow-right", text: game.i18n.localize("CYPHER2026.Wounds.AlertMinorFull") };
    if (wounds.moderate.current >= wounds.moderate.max) wounds.moderate.alert = { level: "moderate-full", icon: "fa-arrow-right", text: game.i18n.localize("CYPHER2026.Wounds.AlertModerateFull") };
    if (wounds.major.current >= wounds.major.max) wounds.major.alert = { level: "dead", icon: "fa-skull-crossbones", text: game.i18n.localize("CYPHER2026.Wounds.AlertDead") };
    else if (wounds.major.current > 0) wounds.major.alert = { level: "major-hindered", icon: "fa-triangle-exclamation", text: game.i18n.localize("CYPHER2026.Wounds.AlertMajorHindered") };

    const dice = Math.max(0, Number(this.recoveries.diceNum ?? 0));
    const bonus = Math.max(1, Number(this.recoveries.bonus ?? 1));
    const diePart = dice === 0 ? "1" : `${dice}d6`;
    this.recoveries.formula = `${diePart}+${bonus}`;
  }
}
