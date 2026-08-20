export class PcDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const { SchemaField, StringField, NumberField, BooleanField } = foundry.data.fields;

    const createStatSchema = () =>
      new SchemaField({
        base: new NumberField({ required: true, integer: true, initial: 20, min: 0 }),
        current: new NumberField({ required: true, integer: true, initial: 20, min: 0 }),
        edge: new NumberField({ required: true, integer: true, initial: 3, min: 0 })
      });

    return {
      sentence: new SchemaField({
        descriptor: new StringField({ initial: "Feiticeiro" }),
        species: new StringField({ initial: "" }),
        characterType: new StringField({ initial: "Elocutionist" }),
        focus: new StringField({ initial: "Controla o Espaço Infinito" }),
        genres: new StringField({ initial: "" })
      }),
      stats: new SchemaField({
        might: createStatSchema(),
        speed: createStatSchema(),
        intellect: createStatSchema()
      }),
      tier: new NumberField({ required: true, integer: true, initial: 6, min: 1, max: 6 }),
      effort: new NumberField({ required: true, integer: true, initial: 6, min: 1 }),
      xp: new NumberField({ required: true, integer: true, initial: 6, min: 0 }),
      resourcePoints: new NumberField({ required: true, integer: true, initial: 0, min: 0 }),
      cypherLimit: new NumberField({ required: true, integer: true, initial: 3, min: 0 }),

      // Perícias Fixas
      fixedSkills: new SchemaField({
        initiative: new SchemaField({
          rank: new StringField({ initial: "trained" }),
          stat: new StringField({ initial: "speed" })
        }),
        mightDefense: new SchemaField({
          rank: new StringField({ initial: "practiced" }),
          stat: new StringField({ initial: "might" })
        }),
        speedDefense: new SchemaField({
          rank: new StringField({ initial: "specialized" }),
          stat: new StringField({ initial: "speed" })
        }),
        intellectDefense: new SchemaField({
          rank: new StringField({ initial: "expert" }),
          stat: new StringField({ initial: "intellect" })
        })
      }),

      // Ferimentos
      wounds: new SchemaField({
        minor: new SchemaField({
          current: new NumberField({ required: true, integer: true, initial: 0, min: 0 }),
          max: new NumberField({ required: true, integer: true, initial: 3, min: 1, max: 10 })
        }),
        moderate: new SchemaField({
          current: new NumberField({ required: true, integer: true, initial: 0, min: 0 }),
          max: new NumberField({ required: true, integer: true, initial: 3, min: 1, max: 10 })
        }),
        major: new SchemaField({
          current: new NumberField({ required: true, integer: true, initial: 0, min: 0 }),
          max: new NumberField({ required: true, integer: true, initial: 3, min: 1, max: 10 })
        })
      }),

      // Recuperações
      recoveries: new SchemaField({
        diceNum: new NumberField({ required: true, integer: true, initial: 1, min: 0, max: 6 }),
        bonus: new NumberField({ required: true, integer: true, initial: 1, min: 1, max: 99 }),
        formula: new StringField({ initial: "1d6+1" }),
        actionCurrent: new NumberField({ required: true, integer: true, initial: 0, min: 0 }),
        actionMax: new NumberField({ required: true, integer: true, initial: 1, min: 1, max: 3 }),
        tenMinCurrent: new NumberField({ required: true, integer: true, initial: 0, min: 0 }),
        tenMinMax: new NumberField({ required: true, integer: true, initial: 1, min: 1, max: 3 }),
        oneHourCurrent: new NumberField({ required: true, integer: true, initial: 0, min: 0 }),
        oneHourMax: new NumberField({ required: true, integer: true, initial: 1, min: 1, max: 3 }),
        tenHourCurrent: new NumberField({ required: true, integer: true, initial: 0, min: 0 }),
        tenHourMax: new NumberField({ required: true, integer: true, initial: 1, min: 1, max: 3 })
      }),
      lastingDamage: new NumberField({ required: true, integer: true, initial: 0, min: 0 }),
      biography: new StringField({ initial: "" }),
      notes: new StringField({ initial: "" })
    };
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    // 1. Derivação do Total (YY) de cada Pool
    for (const key of ["might", "speed", "intellect"]) {
      const stat = this.stats[key];
      let total = stat.base;
      if (key === "might" && this.lastingDamage > 0) {
        total = Math.max(0, total - this.lastingDamage);
      }
      stat.total = total;
    }

    // 2. Contagem de Wounds causadas por Lasting / Permanent Damage
    let minorLastingCount = 0;
    let moderateLastingCount = 0;
    let majorLastingCount = 0;

    if (this.parent?.items) {
      for (const item of this.parent.items) {
        if (item.type === "equipment" && item.system?.isDamage && !item.system?.archived) {
          const sev = item.system?.severity || "moderate";
          if (sev === "minor") minorLastingCount += 1;
          else if (sev === "moderate") moderateLastingCount += 1;
          else if (sev === "major") majorLastingCount += 1;
        }
      }
    }

    this.wounds.minor.lastingCount = minorLastingCount;
    this.wounds.moderate.lastingCount = moderateLastingCount;
    this.wounds.major.lastingCount = majorLastingCount;

    // Garante que o valor atual nunca seja menor que os ferimentos duradouros
    for (const sev of ["minor", "moderate", "major"]) {
      const lasting = this.wounds[sev].lastingCount;
      if (this.wounds[sev].current < lasting) {
        this.wounds[sev].current = lasting;
      }
    }

    // 3. Fórmula de Recuperação
    const diceNum = this.recoveries.diceNum ?? 1;
    const bonus = this.recoveries.bonus ?? 1;
    this.recoveries.formula = diceNum === 0 ? `1+${bonus}` : `${diceNum}d6+${bonus}`;

    // 4. Alertas Específicos
    const minor = this.wounds.minor;
    const moderate = this.wounds.moderate;
    const major = this.wounds.major;

    minor.alert = (minor.current >= minor.max && minor.max > 0)
      ? { level: "minor-full", icon: "fa-circle-info", text: "No negative effects. Excess minor wounds become moderate." }
      : null;

    moderate.alert = (moderate.current >= moderate.max && moderate.max > 0)
      ? { level: "moderate-full", icon: "fa-shield-halved", text: "Hindered. Excess moderate wounds become major." }
      : null;

    if (major.current >= major.max && major.max > 0) {
      major.alert = { level: "dead", icon: "fa-skull-crossbones", text: "Dead!" };
    } else if (major.current >= 1) {
      major.alert = { level: "major-hindered", icon: "fa-triangle-exclamation", text: "Hindered. On your last, you die." };
    } else {
      major.alert = null;
    }
  }
}