import { sortSkills, sortAbilities } from "./pc-sheet-sorting.mjs";
import { setupPcSheetListeners } from "./pc-sheet-listeners.mjs";
import { promptSkillDialog } from "../dialogs/skill-dialog.mjs";
import { promptAbilityDialog } from "../dialogs/ability-dialog.mjs";
import { promptFixedSkillDialog } from "../dialogs/fixed-skill-dialog.mjs";
import { promptDamageDialog } from "../dialogs/damage-prompt-dialog.mjs";
import { promptPostItemToChat } from "../dialogs/post-chat-dialog.mjs";
import { promptRallyDialog } from "../dialogs/rally-dialog.mjs";
import { promptTreatmentDialog } from "../dialogs/treatment-dialog.mjs";
import { promptAddLastingDamageDialog } from "../dialogs/lasting-damage-dialog.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

export class CypherPcSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["cypher2026", "sheet", "actor", "pc"],
    tag: "form",
    position: {
      width: 880,
      height: 920
    },
    form: { submitOnChange: true, closeOnSubmit: false },
    window: { resizable: true },
    actions: {
      changeTab: CypherPcSheet.#onChangeTab,
      rollDie: CypherPcSheet.#onRollDie,
      rollStat: CypherPcSheet.#onRollStat,
      rollSkillItem: CypherPcSheet.#onRollSkillItem,
      rollAbilityItem: CypherPcSheet.#onRollAbilityItem,
      rollFixedSkill: CypherPcSheet.#onRollFixedSkill,
      rollRecoveryCategory: CypherPcSheet.#onRollRecoveryCategory,
      resetAllRecoveries: CypherPcSheet.#onResetAllRecoveries,
      adjustRecoveryDice: CypherPcSheet.#onAdjustRecoveryDice,
      adjustRecoveryBonus: CypherPcSheet.#onAdjustRecoveryBonus,
      adjustRecoveryCategoryMax: CypherPcSheet.#onAdjustRecoveryCategoryMax,
      openRallyDialog: CypherPcSheet.#onOpenRallyDialog,
      openTreatmentDialog: CypherPcSheet.#onOpenTreatmentDialog,
      openAddLastingDamageDialog: CypherPcSheet.#onOpenAddLastingDamageDialog,
      healLastingDamage: CypherPcSheet.#onHealLastingDamage,
      openDamageChatPrompt: CypherPcSheet.#onOpenDamageChatPrompt,
      openFixedSkillDialog: CypherPcSheet.#onOpenFixedSkillDialog,
      openSkillChatPrompt: CypherPcSheet.#onOpenSkillChatPrompt,
      openAbilityChatPrompt: CypherPcSheet.#onOpenAbilityChatPrompt,
      cycleSkillSort: CypherPcSheet.#onCycleSkillSort,
      openAddSkillDialog: CypherPcSheet.#onOpenAddSkillDialog,
      openEditSkillDialog: CypherPcSheet.#onOpenEditSkillDialog,
      cycleAbilitySort: CypherPcSheet.#onCycleAbilitySort,
      openAddAbilityDialog: CypherPcSheet.#onOpenAddAbilityDialog,
      openEditAbilityDialog: CypherPcSheet.#onOpenEditAbilityDialog,
      toggleQuickRoll: CypherPcSheet.#onToggleQuickRoll,
      adjustHeaderStat: CypherPcSheet.#onAdjustHeaderStat,
      adjustPool: CypherPcSheet.#onAdjustPool,
      adjustPoolEdge: CypherPcSheet.#onAdjustPoolEdge,
      adjustPoolBase: CypherPcSheet.#onAdjustPoolBase,
      resetPool: CypherPcSheet.#onResetPool,
      applyDamagePrompt: CypherPcSheet.#onApplyDamagePrompt,
      toggleWound: CypherPcSheet.#onToggleWound,
      adjustWoundCurrent: CypherPcSheet.#onAdjustWoundCurrent,
      adjustWoundMax: CypherPcSheet.#onAdjustWoundMax,
      resetWoundSeverity: CypherPcSheet.#onResetWoundSeverity,
      toggleRecovery: CypherPcSheet.#onToggleRecovery,
      itemCreate: CypherPcSheet.#onItemCreate,
      itemEdit: CypherPcSheet.#onItemEdit,
      itemDelete: CypherPcSheet.#onItemDelete
    }
  };

  static PARTS = {
    header: { template: "systems/cypher-2026/templates/actors/pc/parts/pc-header.hbs" },
    pools: { template: "systems/cypher-2026/templates/actors/pc/parts/pc-pools.hbs" },
    navigation: { template: "systems/cypher-2026/templates/actors/pc/parts/pc-navigation.hbs" },
    tabOverview: { template: "systems/cypher-2026/templates/actors/pc/parts/pc-tab-overview.hbs" },
    tabSkills: { template: "systems/cypher-2026/templates/actors/pc/parts/pc-tab-skills.hbs" },
    tabAbilities: { template: "systems/cypher-2026/templates/actors/pc/parts/pc-tab-abilities.hbs" },
    tabCombat: { template: "systems/cypher-2026/templates/actors/pc/parts/pc-tab-combat.hbs" },
    tabEquipment: { template: "systems/cypher-2026/templates/actors/pc/parts/pc-tab-equipment.hbs" },
    tabNotes: { template: "systems/cypher-2026/templates/actors/pc/parts/pc-tab-notes.hbs" },
    tabEffects: { template: "systems/cypher-2026/templates/actors/pc/parts/pc-tab-effects.hbs" }
  };

  tab = "combat";

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const actor = this.actor;
    const items = Array.from(actor.items.values());

    context.quickRollActive = Boolean(actor.getFlag("cypher-2026", "quickRoll"));
    context.activeTab = this.tab;
    context.system = actor.system;
    context.actor = actor;
    context.isEditable = this.isEditable;

    const skillSortMode = actor.getFlag("cypher-2026", "skillSort") || "alpha-asc";
    context.skillSortMode = skillSortMode;
    context.skillSortLabel = { "alpha-asc": "A-Z", "alpha-desc": "Z-A", "rank-desc": "RANK" }[skillSortMode] || "A-Z";

    const abilitySortMode = actor.getFlag("cypher-2026", "abilitySort") || "alpha-asc";
    context.abilitySortMode = abilitySortMode;
    context.abilitySortLabel = { "alpha-asc": "A-Z", "alpha-desc": "Z-A", "origin": "ORIGIN", "tier": "TIER", "enabler": "ENABLER" }[abilitySortMode] || "A-Z";

    const damageItems = items.filter((i) => i.type === "equipment" && i.system?.isDamage);
    const activeDamage = damageItems.filter((i) => !i.system?.archived);
    const archivedDamage = damageItems.filter((i) => i.system?.archived);

    context.categorizedItems = {
      skills: sortSkills(items, skillSortMode),
      abilities: sortAbilities(items, abilitySortMode),
      damageItems: [...activeDamage, ...archivedDamage],
      attacks: items.filter((i) => (i.type === "weapon" || i.type === "ability") && !i.system?.archived),
      weapons: items.filter((i) => i.type === "weapon" && !i.system?.archived),
      armors: items.filter((i) => i.type === "armor" && !i.system?.archived),
      equipment: items.filter((i) => i.type === "equipment" && !i.system?.isDamage && !i.name.toLowerCase().includes("ammo") && !i.system?.archived),
      ammo: items.filter((i) => i.type === "equipment" && i.name.toLowerCase().includes("ammo")),
      cyphers: items.filter((i) => i.type === "cypher" && !i.system?.archived)
    };

    return context;
  }

  _onRender(context, options) {
    super._onRender(context, options);
    setupPcSheetListeners(this);
  }

  // --- ACTIONS ---

  static #onChangeTab(event, target) {
    if (target.dataset.tab && target.dataset.tab !== this.tab) {
      this.tab = target.dataset.tab;
      this.render();
    }
  }

  static async #onToggleQuickRoll() {
    const current = Boolean(this.actor.getFlag("cypher-2026", "quickRoll"));
    await this.actor.setFlag("cypher-2026", "quickRoll", !current);
    this.render();
  }

  static async #onCycleSkillSort() {
    const current = this.actor.getFlag("cypher-2026", "skillSort") || "alpha-asc";
    const next = { "alpha-asc": "alpha-desc", "alpha-desc": "rank-desc", "rank-desc": "alpha-asc" }[current] || "alpha-asc";
    await this.actor.setFlag("cypher-2026", "skillSort", next);
    this.render();
  }

  static async #onCycleAbilitySort() {
    const current = this.actor.getFlag("cypher-2026", "abilitySort") || "alpha-asc";
    const next = { "alpha-asc": "alpha-desc", "alpha-desc": "origin", "origin": "tier", "tier": "enabler", "enabler": "alpha-asc" }[current] || "alpha-asc";
    await this.actor.setFlag("cypher-2026", "abilitySort", next);
    this.render();
  }

  static #onOpenFixedSkillDialog(event, target) {
    promptFixedSkillDialog({ actor: this.actor, skillKey: target.dataset.skillKey });
  }

  static #onOpenSkillChatPrompt(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if (item) promptPostItemToChat({ actor: this.actor, item });
  }

  static #onOpenAbilityChatPrompt(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if (item) promptPostItemToChat({ actor: this.actor, item });
  }

  static #onOpenDamageChatPrompt(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if (item) promptPostItemToChat({ actor: this.actor, item });
  }

  static #onOpenAddSkillDialog() {
    promptSkillDialog({ actor: this.actor });
  }

  static #onOpenEditSkillDialog(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if (item) promptSkillDialog({ actor: this.actor, item });
  }

  static #onOpenAddAbilityDialog() {
    promptAbilityDialog({ actor: this.actor });
  }

  static #onOpenEditAbilityDialog(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if (item) promptAbilityDialog({ actor: this.actor, item });
  }

  static #onOpenRallyDialog() {
    promptRallyDialog({ actor: this.actor });
  }

  static #onOpenTreatmentDialog() {
    promptTreatmentDialog({ actor: this.actor });
  }

  static #onOpenAddLastingDamageDialog() {
    promptAddLastingDamageDialog({ actor: this.actor });
  }

  static #onApplyDamagePrompt(event, target) {
    promptDamageDialog({ actor: this.actor, pool: target.dataset.pool });
  }

  static async #onHealLastingDamage(event, target) {
    const itemId = target.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    const severity = item.system?.severity || "moderate";
    const woundCurrent = this.actor.system.wounds[severity]?.current ?? 0;

    await this.actor.update({
      [`system.wounds.${severity}.current`]: Math.max(0, woundCurrent - 1)
    });
    await item.update({ "system.value": 0, "system.archived": true });

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: `
        <div class="cypher-chat-card treatment">
          <div class="chat-card-header">
            <div class="chat-header-text">
              <h3 class="chat-card-title">${game.i18n.localize("CYPHER2026.Damage.ChatCardTitle")}</h3>
            </div>
          </div>
          <div class="chat-card-description">
            ${game.i18n.format("CYPHER2026.Damage.ChatCardText", { name: item.name })}
          </div>
        </div>
      `
    });

    ui.notifications.info(game.i18n.format("CYPHER2026.Damage.HealedNotification", { name: item.name }));
  }

  // --- ACTIONS DE FERIMENTOS ---

  static async #onToggleWound(event, target) {
    const severity = target.dataset.severity;
    const index = parseInt(target.dataset.index, 10);
    if (!severity || !index) return;

    const current = this.actor.system.wounds[severity]?.current ?? 0;
    const lastingCount = this.actor.system.wounds[severity]?.lastingCount ?? 0;

    if (index <= lastingCount && current >= index) {
      ui.notifications.warn(game.i18n.localize("CYPHER2026.Notifications.LastingWoundImmutable"));
      return;
    }

    const nextVal = current === index ? Math.max(lastingCount, index - 1) : Math.max(lastingCount, index);
    await this.actor.update({ [`system.wounds.${severity}.current`]: nextVal });
  }

  static async #onAdjustWoundCurrent(event, target) {
    const severity = target.dataset.severity;
    const delta = parseInt(target.dataset.delta, 10) || 0;
    if (!severity) return;

    const current = this.actor.system.wounds[severity]?.current ?? 0;
    const max = this.actor.system.wounds[severity]?.max ?? 3;
    const lastingCount = this.actor.system.wounds[severity]?.lastingCount ?? 0;

    if (delta < 0 && current <= lastingCount) {
      ui.notifications.warn(game.i18n.localize("CYPHER2026.Notifications.CannotReduceBelowLasting"));
      return;
    }

    const nextVal = Math.max(lastingCount, Math.min(max, current + delta));
    await this.actor.update({ [`system.wounds.${severity}.current`]: nextVal });
  }

  static async #onAdjustWoundMax(event, target) {
    const severity = target.dataset.severity;
    const delta = parseInt(target.dataset.delta, 10) || 0;
    if (!severity) return;

    const max = this.actor.system.wounds[severity]?.max ?? 3;
    const nextMax = Math.max(1, Math.min(10, max + delta));
    const current = this.actor.system.wounds[severity]?.current ?? 0;
    const lastingCount = this.actor.system.wounds[severity]?.lastingCount ?? 0;
    const nextCurrent = Math.max(lastingCount, Math.min(current, nextMax));

    await this.actor.update({
      [`system.wounds.${severity}.max`]: nextMax,
      [`system.wounds.${severity}.current`]: nextCurrent
    });
  }

  static async #onResetWoundSeverity(event, target) {
    const severity = target.dataset.severity;
    if (!severity) return;
    const lastingCount = this.actor.system.wounds[severity]?.lastingCount ?? 0;
    await this.actor.update({ [`system.wounds.${severity}.current`]: lastingCount });
  }

  static async #onToggleRecovery(event, target) {
    const type = target.dataset.type;
    const index = parseInt(target.dataset.index, 10);
    if (!type || !index) return;
    const current = this.actor.system.recoveries?.[`${type}Current`] ?? 0;
    await this.actor.update({ [`system.recoveries.${type}Current`]: current === index ? index - 1 : index });
  }

  // --- RECOVERY ACTIONS ---

  static async #onRollDie(event, target) {
    const die = target.dataset.die || "d20";
    const roll = new Roll("1" + die);
    await roll.evaluate();
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: game.i18n.format("CYPHER2026.Roll.DiceTrayFlavor", { die: die.toUpperCase() })
    });
  }

  static async #onRollRecoveryCategory(event, target) {
    const type = target.dataset.type;
    if (!type) return;

    const current = this.actor.system.recoveries?.[`${type}Current`] ?? 0;
    const max = this.actor.system.recoveries?.[`${type}Max`] ?? 1;

    if (current >= max) {
      ui.notifications.warn(game.i18n.localize("CYPHER2026.Notifications.RecoveryExhausted"));
      return;
    }

    const formula = this.actor.system.recoveries?.formula || "1d6+1";
    const roll = new Roll(formula);
    await roll.evaluate();

    const updates = {
      [`system.recoveries.${type}Current`]: current + 1
    };

    let restFlavor = "";
    const minorLasting = this.actor.system.wounds.minor.lastingCount ?? 0;
    const modLasting = this.actor.system.wounds.moderate.lastingCount ?? 0;

    if (type === "tenMin") {
      updates["system.wounds.minor.current"] = minorLasting;
      restFlavor = `<br/><span class="chat-tag-pill accent">${game.i18n.localize("CYPHER2026.Recovery.TenMinRestFlavor")}</span>`;
    } else if (type === "oneHour") {
      const modCurrent = this.actor.system.wounds.moderate.current;
      if (modCurrent > modLasting) {
        updates["system.wounds.moderate.current"] = modCurrent - 1;
        restFlavor = `<br/><span class="chat-tag-pill gold">${game.i18n.localize("CYPHER2026.Recovery.OneHourRestFlavorMod")}</span>`;
      } else {
        updates["system.wounds.minor.current"] = minorLasting;
        restFlavor = `<br/><span class="chat-tag-pill accent">${game.i18n.localize("CYPHER2026.Recovery.OneHourRestFlavorMinor")}</span>`;
      }
    } else if (type === "tenHour") {
      const activeModerateLasting = this.actor.items.filter(i => i.type === "equipment" && i.system?.isDamage && i.system?.severity === "moderate" && !i.system?.archived);

      if (activeModerateLasting.length > 0) {
        const dialog = new foundry.applications.api.DialogV2({
          window: { title: game.i18n.localize("CYPHER2026.Rest.DialogTitle") },
          content: `<p>${game.i18n.localize("CYPHER2026.Rest.PromptQuestion")}</p>`,
          buttons: [
            {
              action: "full",
              label: game.i18n.localize("CYPHER2026.Rest.HealAllButton"),
              default: true,
              callback: async () => {
                for (const item of activeModerateLasting) {
                  await item.update({ "system.value": 0, "system.archived": true });
                }
                await this.actor.update({ "system.wounds.moderate.current": 0 });
              }
            },
            {
              action: "none",
              label: game.i18n.localize("CYPHER2026.Rest.LeaveUnchanged")
            }
          ]
        });
        dialog.render({ force: true });
      }

      const mightMax = this.actor.system.stats.might.total ?? this.actor.system.stats.might.base;
      const speedMax = this.actor.system.stats.speed.total ?? this.actor.system.stats.speed.base;
      const intellectMax = this.actor.system.stats.intellect.total ?? this.actor.system.stats.intellect.base;

      updates["system.recoveries.actionCurrent"] = 0;
      updates["system.recoveries.tenMinCurrent"] = 0;
      updates["system.recoveries.oneHourCurrent"] = 0;
      updates["system.recoveries.tenHourCurrent"] = 0;
      updates["system.wounds.moderate.current"] = modLasting;
      updates["system.stats.might.current"] = mightMax;
      updates["system.stats.speed.current"] = speedMax;
      updates["system.stats.intellect.current"] = intellectMax;
      restFlavor = `<br/><span class="chat-tag-pill highlight">${game.i18n.localize("CYPHER2026.Recovery.TenHourRestFlavor")}</span>`;
    }

    await this.actor.update(updates);

    const timeKeyMap = { action: "1 Action", tenMin: "10 Minutes", oneHour: "1 Hour", tenHour: "10 Hours" };

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `
        <div class="cypher-chat-card recovery">
          <div class="chat-card-header">
            <div class="chat-header-text">
              <h3 class="chat-card-title">${game.i18n.localize("CYPHER2026.Recovery.Heading")} (${timeKeyMap[type]})</h3>
            </div>
          </div>
          <div class="chat-card-description">
            ${game.i18n.format("CYPHER2026.Recovery.PointsToDistribute", { total: roll.total })}${restFlavor}
          </div>
        </div>
      `
    });
  }

  static async #onResetAllRecoveries() {
    await this.actor.update({
      "system.recoveries.actionCurrent": 0,
      "system.recoveries.tenMinCurrent": 0,
      "system.recoveries.oneHourCurrent": 0,
      "system.recoveries.tenHourCurrent": 0
    });
    ui.notifications.info(game.i18n.localize("CYPHER2026.Notifications.RecoveriesReset"));
  }

  static async #onAdjustRecoveryDice(event, target) {
    const delta = parseInt(target.dataset.delta, 10) || 0;
    const current = this.actor.system.recoveries?.diceNum ?? 1;
    const nextVal = Math.max(0, Math.min(6, current + delta));
    await this.actor.update({ "system.recoveries.diceNum": nextVal });
  }

  static async #onAdjustRecoveryBonus(event, target) {
    const delta = parseInt(target.dataset.delta, 10) || 0;
    const current = this.actor.system.recoveries?.bonus ?? 1;
    const nextVal = Math.max(1, Math.min(99, current + delta));
    await this.actor.update({ "system.recoveries.bonus": nextVal });
  }

  static async #onAdjustRecoveryCategoryMax(event, target) {
    const type = target.dataset.type;
    const delta = parseInt(target.dataset.delta, 10) || 0;
    if (!type) return;

    const currentMax = this.actor.system.recoveries?.[`${type}Max`] ?? 1;
    const nextMax = Math.max(1, Math.min(3, currentMax + delta));
    const currentVal = this.actor.system.recoveries?.[`${type}Current`] ?? 0;
    const nextVal = Math.min(currentVal, nextMax);

    await this.actor.update({
      [`system.recoveries.${type}Max`]: nextMax,
      [`system.recoveries.${type}Current`]: nextVal
    });
  }

  static async #onRollStat(event, target) {
    const stat = target.dataset.stat || "might";
    const statObj = this.actor.system.stats[stat];
    const roll = new Roll("1d20");
    await roll.evaluate();
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: game.i18n.format("CYPHER2026.Roll.StatFlavor", {
        stat: game.i18n.localize("CYPHER2026.Stats." + stat),
        current: statObj.current,
        edge: statObj.edge
      })
    });
  }

  static async #onRollSkillItem(event, target) {
    const skill = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if (!skill) return;
    const roll = new Roll("1d20");
    await roll.evaluate();
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: game.i18n.format("CYPHER2026.Roll.SkillFlavor", {
        name: skill.name,
        rank: game.i18n.localize("CYPHER2026.SkillRank." + (skill.system?.rank || "trained")),
        stat: game.i18n.localize("CYPHER2026.Stats." + (skill.system?.stat || "might"))
      })
    });
  }

  static async #onRollAbilityItem(event, target) {
    const ability = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if (!ability) return;
    const isEnabler = ability.system?.kind === "enabler";
    const cost = ability.system?.cost ?? 1;
    const pool = ability.system?.pool || "intellect";
    const roll = new Roll("1d20");
    await roll.evaluate();
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: isEnabler
        ? game.i18n.format("CYPHER2026.Roll.AbilityEnablerFlavor", { name: ability.name })
        : game.i18n.format("CYPHER2026.Roll.AbilityFlavor", {
            name: ability.name,
            cost,
            stat: game.i18n.localize("CYPHER2026.Stats." + pool)
          })
    });
  }

  static async #onRollFixedSkill(event, target) {
    const fixedSkill = this.actor.system.fixedSkills?.[target.dataset.skillKey];
    if (!fixedSkill) return;
    const roll = new Roll("1d20");
    await roll.evaluate();
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: game.i18n.format("CYPHER2026.Roll.FixedSkillFlavor", {
        name: game.i18n.localize("CYPHER2026.FixedSkills." + target.dataset.skillKey),
        rank: game.i18n.localize("CYPHER2026.SkillRank." + fixedSkill.rank),
        stat: game.i18n.localize("CYPHER2026.Stats." + fixedSkill.stat)
      })
    });
  }

  static async #onAdjustHeaderStat(event, target) {
    const stat = target.dataset.stat;
    const delta = parseInt(target.dataset.delta, 10) || 0;
    if (!stat) return;
    let nextVal = (this.actor.system[stat] ?? 0) + delta;
    if (stat === "tier") nextVal = Math.max(1, Math.min(6, nextVal));
    else if (stat === "effort") nextVal = Math.max(1, nextVal);
    else if (stat === "xp") nextVal = Math.max(0, nextVal);
    await this.actor.update({ [`system.${stat}`]: nextVal });
  }

  static async #onAdjustPool(event, target) {
    const pool = target.dataset.pool;
    const delta = parseInt(target.dataset.delta, 10) || 0;
    if (!pool) return;
    const current = this.actor.system.stats[pool]?.current ?? 0;
    const totalMax = this.actor.system.stats[pool]?.total ?? this.actor.system.stats[pool]?.base ?? 0;
    await this.actor.update({ [`system.stats.${pool}.current`]: Math.max(0, Math.min(totalMax, current + delta)) });
  }

  static async #onAdjustPoolEdge(event, target) {
    const pool = target.dataset.pool;
    const delta = parseInt(target.dataset.delta, 10) || 0;
    if (!pool) return;
    const edge = this.actor.system.stats[pool]?.edge ?? 0;
    await this.actor.update({ [`system.stats.${pool}.edge`]: Math.max(0, edge + delta) });
  }

  static async #onAdjustPoolBase(event, target) {
    const pool = target.dataset.pool;
    const delta = parseInt(target.dataset.delta, 10) || 0;
    if (!pool) return;
    const base = this.actor.system.stats[pool]?.base ?? 0;
    await this.actor.update({ [`system.stats.${pool}.base`]: Math.max(0, base + delta) });
  }

  static async #onResetPool(event, target) {
    const pool = target.dataset.pool;
    if (!pool) return;
    const totalMax = this.actor.system.stats[pool]?.total ?? this.actor.system.stats[pool]?.base ?? 0;
    await this.actor.update({ [`system.stats.${pool}.current`]: totalMax });
  }

  static async #onItemCreate(event, target) {
    const type = target.dataset.type || "weapon";
    const created = await this.actor.createEmbeddedDocuments("Item", [
      { name: game.i18n.format("CYPHER2026.Item.NewItemName", { type: game.i18n.localize("TYPES.Item." + type) }), type }
    ]);
    if (created.length > 0) {
      ui.notifications.info(game.i18n.format("CYPHER2026.Notifications.ItemCreated", { type: game.i18n.localize("TYPES.Item." + type), name: created[0].name }));
    }
  }

  static #onItemEdit(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    item?.sheet?.render(true);
  }

  static async #onItemDelete(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if (!item) return;

    if (event.altKey) {
      const isArchived = Boolean(item.system?.archived);
      await item.update({ "system.archived": !isArchived });
      const notifyKey = !isArchived ? "CYPHER2026.Item.ArchivedNotification" : "CYPHER2026.Item.UnarchivedNotification";
      ui.notifications.info(game.i18n.format(notifyKey, { name: item.name }));
      return;
    }

    const confirmed = await foundry.applications.api.DialogV2.confirm({
      window: { title: game.i18n.format("CYPHER2026.Item.DeleteTitle", { name: item.name }) },
      content: `<p>${game.i18n.format("CYPHER2026.Item.DeleteConfirm", { name: item.name })}</p><p class="cypher-dialog-tip">${game.i18n.localize("CYPHER2026.Item.DeleteTip")}</p>`,
      rejectClose: false
    });

    if (confirmed) {
      await item.delete();
    }
  }
}