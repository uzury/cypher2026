import fs from "node:fs";
import path from "node:path";

const files = {
  // -------------------------------------------------------------
  // 1. LANG / EN.JSON
  // -------------------------------------------------------------
  "lang/en.json": JSON.stringify({
    "TYPES.Actor.pc": "Character",
    "TYPES.Actor.npc": "NPC",
    "TYPES.Actor.companion": "Companion",
    "TYPES.Item.ability": "Ability",
    "TYPES.Item.skill": "Skill",
    "TYPES.Item.cypher": "Cypher",
    "TYPES.Item.weapon": "Weapon",
    "TYPES.Item.armor": "Armor",
    "TYPES.Item.equipment": "Equipment",
    "TYPES.Item.artifact": "Artifact",
    "TYPES.Item.descriptor": "Descriptor",
    "TYPES.Item.species": "Species",
    "TYPES.Item.characterType": "Character Type",
    "TYPES.Item.focus": "Focus",
    "TYPES.Item.genre": "Genre",

    "CYPHER2026.Sheet.PC": "Character Sheet (Cypher 2026)",
    "CYPHER2026.Actor.PC.NamePlaceholder": "Character Name",
    "CYPHER2026.Actor.PC.SentenceLead": "Is a",
    "CYPHER2026.Actor.PC.DescriptorPlaceholder": "Descriptor",
    "CYPHER2026.Actor.PC.TypePlaceholder": "Type",
    "CYPHER2026.Actor.PC.SentenceMid": "who",
    "CYPHER2026.Actor.PC.FocusPlaceholder": "Focus",
    "CYPHER2026.Actor.Tier": "TIER",
    "CYPHER2026.Actor.Effort": "EFFORT",
    "CYPHER2026.Actor.XP": "XP",

    "CYPHER2026.Header.RollTask": "Roll Task (d20)",
    "CYPHER2026.Header.Defense": "Defense",
    "CYPHER2026.Header.Rest": "Rest",
    "CYPHER2026.Header.Calculator": "Calculator",
    "CYPHER2026.Header.QuickRoll": "QUICK ROLL",
    "CYPHER2026.Header.ToggleQuickRoll": "Toggle Quick Roll Mode",
    "CYPHER2026.Header.RollDie": "Roll {die}",
    "CYPHER2026.Header.SentenceDropHint": "Editable or drag & drop a {type} Item",

    "CYPHER2026.Stats.might": "Might",
    "CYPHER2026.Stats.speed": "Speed",
    "CYPHER2026.Stats.intellect": "Intellect",
    "CYPHER2026.Stats.none": "None / Free",
    "CYPHER2026.Stats.Edge": "Edge",
    "CYPHER2026.Stats.Base": "Base",
    "CYPHER2026.Stats.RollCheck": "Roll {stat} Check",
    "CYPHER2026.Stats.ResetPool": "Restore Pool to Maximum Total",
    "CYPHER2026.Stats.ApplyDamage": "Apply Damage to Pool",
    "CYPHER2026.Stats.CurrentValueTitle": "Current Pool Points (Editable with inline math)",
    "CYPHER2026.Stats.TotalValueTitle": "Maximum Total Points (Base + Modifiers)",

    "CYPHER2026.SkillRank.inability": "Inability",
    "CYPHER2026.SkillRank.practiced": "Practiced",
    "CYPHER2026.SkillRank.trained": "Trained",
    "CYPHER2026.SkillRank.specialized": "Specialized",
    "CYPHER2026.SkillRank.expert": "Expert",

    "CYPHER2026.FixedSkills.initiative": "Initiative",
    "CYPHER2026.FixedSkills.mightDefense": "Might Defense",
    "CYPHER2026.FixedSkills.speedDefense": "Speed Defense",
    "CYPHER2026.FixedSkills.intellectDefense": "Intellect Defense",
    "CYPHER2026.FixedSkills.ModifyTitle": "Modify",
    "CYPHER2026.FixedSkills.RankLabel": "Training Rank in",
    "CYPHER2026.FixedSkills.ClickHint": "Click to modify training rank",
    "CYPHER2026.FixedSkills.RollTitle": "Roll {name}",

    "CYPHER2026.AbilityOrigin.focus": "Focus",
    "CYPHER2026.AbilityOrigin.type": "Type",
    "CYPHER2026.AbilityOrigin.descriptor": "Descriptor",
    "CYPHER2026.AbilityOrigin.special": "Special",
    "CYPHER2026.AbilityOrigin.Focus": "Focus",
    "CYPHER2026.AbilityOrigin.Type": "Type",
    "CYPHER2026.AbilityOrigin.Descriptor": "Descriptor",
    "CYPHER2026.AbilityOrigin.Special": "Special",

    "CYPHER2026.Tabs.Overview": "OVERVIEW",
    "CYPHER2026.Tabs.Skills": "SKILLS",
    "CYPHER2026.Tabs.Abilities": "ABILITIES",
    "CYPHER2026.Tabs.Combat": "COMBAT",
    "CYPHER2026.Tabs.Equipment": "EQUIPMENT",
    "CYPHER2026.Tabs.Notes": "NOTES",
    "CYPHER2026.Tabs.Effects": "EFFECTS",

    "CYPHER2026.Skills.SortTitle": "Toggle Sorting (A-Z, Z-A, Rank)",
    "CYPHER2026.Skills.AddTitle": "Register New Skill",
    "CYPHER2026.Skills.NoSkills": "No skills registered. Click + or drag & drop a Skill Item here.",
    "CYPHER2026.Skills.ArchivedBadge": "ARCHIVED",
    "CYPHER2026.Skills.Default": "New Skill",

    "CYPHER2026.Abilities.SortTitle": "Toggle Sorting (A-Z, Z-A, Origin, Tier, Enabler)",
    "CYPHER2026.Abilities.SearchPlaceholder": "Search by name, tags, cost, tier, or description...",
    "CYPHER2026.Abilities.AddTitle": "Register New Ability",
    "CYPHER2026.Abilities.NoAbilities": "No abilities registered. Click + or drag & drop an Ability Item here.",
    "CYPHER2026.Abilities.Default": "New Ability",

    "CYPHER2026.Overview.Heading": "CHARACTER OVERVIEW",
    "CYPHER2026.Overview.SummaryTag": "SUMMARY",
    "CYPHER2026.Overview.SummaryDescription": "Character overview summarizing capacities, cyphers, and equipment.",

    "CYPHER2026.Notes.Heading": "CHARACTER NOTES",
    "CYPHER2026.Notes.Tag": "BIOGRAPHY & LOG",
    "CYPHER2026.Notes.Placeholder": "Notes, backstory, goals, and campaign connections...",

    "CYPHER2026.Effects.Heading": "ACTIVE EFFECTS",
    "CYPHER2026.Effects.Tag": "CONDITIONS & MODIFIERS",
    "CYPHER2026.Effects.Description": "Active conditions, wound penalties, and lasting modifiers affecting the character.",

    "CYPHER2026.Combat.OffenseTag": "OFFENSE",
    "CYPHER2026.Combat.AttacksHeading": "ATTACKS",
    "CYPHER2026.Combat.NoAttacks": "No attacks registered. Click + to add.",
    "CYPHER2026.Combat.DmgTag": "DMG",
    "CYPHER2026.Combat.DefenseTag": "DEFENSE",
    "CYPHER2026.Combat.ArmorHeading": "ARMOR & SHIELDS",
    "CYPHER2026.Combat.OptionalRuleTag": "OPTIONAL RULE",
    "CYPHER2026.Combat.LastingDamageHeading": "LASTING / PERMANENT DAMAGE",

    "CYPHER2026.WeaponCategory.no": "Not a Weapon / Special",
    "CYPHER2026.WeaponCategory.light": "Light Weapon",
    "CYPHER2026.WeaponCategory.medium": "Medium Weapon",
    "CYPHER2026.WeaponCategory.heavy": "Heavy Weapon",

    "CYPHER2026.Range.immediate": "Immediate",
    "CYPHER2026.Range.short": "Short",
    "CYPHER2026.Range.long": "Long",
    "CYPHER2026.Range.extreme": "Extreme",

    "CYPHER2026.Armor.Heading": "ARMOR & SHIELDS",
    "CYPHER2026.Armor.NoArmor": "No armor or shield equipped. Click + to add.",
    "CYPHER2026.Armor.FreelyUse": "Free Use",
    "CYPHER2026.Armor.NotFreelyUse": "Not Free",
    "CYPHER2026.Armor.ToggleFreeUseTitle": "Toggle Freely Use state",
    "CYPHER2026.Armor.BlockMod": "BLOCK: EASED {steps} {stepLabel}",
    "CYPHER2026.Armor.DodgeMod": "DODGE: HINDERED {steps} {stepLabel}",
    "CYPHER2026.Armor.StepSingular": "STEP",
    "CYPHER2026.Armor.StepPlural": "STEPS",
    "CYPHER2026.Armor.BlockShort": "Block",
    "CYPHER2026.Armor.DodgeShort": "Dodge",
    "CYPHER2026.Armor.RollBlock": "Roll Block (Might Defense)",
    "CYPHER2026.Armor.RollDodge": "Roll Dodge (Speed Defense)",
    "CYPHER2026.Armor.ShieldBreakAlert": "Major Wound destroys the shield",
    "CYPHER2026.Armor.ShieldBroken": "Shield '{name}' took a Major Wound and is broken/ruined!",

    "CYPHER2026.Shield.BlockWoundBtn": "Block Wound",
    "CYPHER2026.Shield.BlockWoundTooltip": "Absorb an incoming attack wound into the shield",
    "CYPHER2026.Shield.BlockWoundDialogTitle": "Block Wound with Shield: {name}",
    "CYPHER2026.Shield.BlockWoundPrompt": "Select the incoming wound severity to absorb into the shield:",
    "CYPHER2026.Shield.BlockWoundChatTitle": "Shield Block",
    "CYPHER2026.Shield.BlockWoundChatMsg": "Blocked a <strong>{severity}</strong> using <strong>{name}</strong>.",
    "CYPHER2026.Shield.RolloverNotice": " (Rolled over to {target})",
    "CYPHER2026.Shield.BrokenChatAlert": "The shield took a Major Wound and was <strong>DESTROYED</strong>!",

    "CYPHER2026.ArmorType.light": "Light Armor",
    "CYPHER2026.ArmorType.medium": "Medium Armor",
    "CYPHER2026.ArmorType.heavy": "Heavy Armor",
    "CYPHER2026.ArmorType.shield": "Shield",

    "CYPHER2026.Wounds.Heading": "WOUNDS",
    "CYPHER2026.Wounds.Tag": "DAMAGE & RECOVERY",
    "CYPHER2026.Wounds.Minor": "Minor Wounds",
    "CYPHER2026.Wounds.Moderate": "Moderate Wounds",
    "CYPHER2026.Wounds.Major": "Major Wounds",
    "CYPHER2026.Wounds.Qty": "Qty.",
    "CYPHER2026.Wounds.Decrease": "Decrease wound",
    "CYPHER2026.Wounds.Increase": "Increase wound",
    "CYPHER2026.Wounds.DecreaseCapacity": "Decrease capacity",
    "CYPHER2026.Wounds.IncreaseCapacity": "Increase capacity",
    "CYPHER2026.Wounds.Reset": "Reset normal wounds",
    "CYPHER2026.Wounds.LastingTooltip": "Lasting/Permanent Damage (Cannot be healed normally)",
    "CYPHER2026.Wounds.AlertMinorFull": "No negative effects. Excess minor wounds become moderate.",
    "CYPHER2026.Wounds.AlertModerateFull": "Hindered. Excess moderate wounds become major.",
    "CYPHER2026.Wounds.AlertMajorHindered": "Hindered. On your last, you die.",
    "CYPHER2026.Wounds.AlertDead": "Dead!",

    "CYPHER2026.Recovery.Heading": "RECOVERY ROLLS",
    "CYPHER2026.Recovery.Tag": "RECOVERY",
    "CYPHER2026.Recovery.FormulaTitle": "Recovery Formula (Editable)",
    "CYPHER2026.Recovery.DecreaseDice": "Decrease d6 dice",
    "CYPHER2026.Recovery.IncreaseDice": "Increase d6 dice",
    "CYPHER2026.Recovery.DecreaseBonus": "Decrease bonus",
    "CYPHER2026.Recovery.IncreaseBonus": "Increase bonus",
    "CYPHER2026.Recovery.ResetAll": "Reset all recovery usages",
    "CYPHER2026.Recovery.RollTimeTitle": "Roll {time} Recovery",
    "CYPHER2026.Recovery.TenMinRestFlavor": "10-Minute Rest: All normal Minor Wounds were removed.",
    "CYPHER2026.Recovery.OneHourRestFlavorMod": "1-Hour Rest: 1 normal Moderate Wound removed.",
    "CYPHER2026.Recovery.OneHourRestFlavorMinor": "1-Hour Rest: All normal Minor Wounds removed.",
    "CYPHER2026.Recovery.TenHourRestFlavor": "10-Hour Full Rest: Pools and recoveries restored, normal Moderate Wounds removed.",
    "CYPHER2026.Recovery.PointsToDistribute": "Points to distribute in Pools: {total}",

    "CYPHER2026.Rest.DialogTitle": "10-Hour Rest — Lasting Damage",
    "CYPHER2026.Rest.PromptQuestion": "Was there sufficient full rest (1 full day or 3 light days) to heal active Moderate Lasting Damages?",
    "CYPHER2026.Rest.HealAllButton": "Heal All Moderates",
    "CYPHER2026.Rest.LeaveUnchanged": "Keep Unchanged",
    "CYPHER2026.Rest.FullCompleteNotice": "Full rest (10h) completed: Pools and recoveries restored, normal Moderate Wounds removed.",

    "CYPHER2026.Rally.Title": "Rallying Action",
    "CYPHER2026.Rally.RulesNotice": "Removes a normal wound by spending Might points directly. Might Edge does NOT reduce this cost. Lasting/Permanent Damage cannot be rallied.",
    "CYPHER2026.Rally.SelectWound": "Select normal wound to rally:",
    "CYPHER2026.Rally.MinorOption": "1 Minor Wound — Cost: 2 Might",
    "CYPHER2026.Rally.ModerateOption": "1 Moderate Wound — Cost: 5 Might",
    "CYPHER2026.Rally.CurrentMight": "Current Might",
    "CYPHER2026.Rally.Available": "Available",
    "CYPHER2026.Rally.Execute": "Execute Rally",
    "CYPHER2026.Rally.InsufficientMight": "Insufficient Might points for Rally. Required: {cost}, Current: {current}.",
    "CYPHER2026.Rally.NoNormalWounds": "Remaining wounds are Lasting/Permanent Damage and cannot be rallied.",
    "CYPHER2026.Rally.ChatMessage": "Spent <strong>{cost} Might</strong> (no Edge reduction) and removed <strong>1 {severity} WOUND</strong>.",

    "CYPHER2026.Treatment.Title": "Wound Treatment",
    "CYPHER2026.Treatment.RulesNotice": "An Intellect (Healing) task to remove wounds with time and first aid. Does not cost Might points.",
    "CYPHER2026.Treatment.SelectSeverity": "Select wound severity to treat:",
    "CYPHER2026.Treatment.MinorOption": "Minor Wound: Difficulty 0 (Routine) | Time: 1 minute",
    "CYPHER2026.Treatment.ModerateOption": "Moderate Wound: Difficulty 3 (Target 9) | Time: 10 minutes",
    "CYPHER2026.Treatment.MajorOption": "Major Wound: Difficulty 6 (Target 18) | Time: 1 hour",
    "CYPHER2026.Treatment.RollButton": "Roll Healing Task",
    "CYPHER2026.Treatment.Success": "Success! 1 {severity} Wound removed.",
    "CYPHER2026.Treatment.Failure": "Treatment task failed.",
    "CYPHER2026.Treatment.CannotHealLasting": "Remaining {severity} wounds are Lasting/Permanent Damage and require extended rest or special care.",
    "CYPHER2026.Treatment.ChatFlavor": "Difficulty: <strong>{diff} (Target: {target})</strong> | Time: <strong>{time}</strong>",

    "CYPHER2026.Damage.Title": "Register Lasting / Permanent Damage",
    "CYPHER2026.Damage.RulesNotice": "Each entry adds 1 wound that cannot be healed normally through recoveries or Rally.",
    "CYPHER2026.Damage.Name": "Injury Name",
    "CYPHER2026.Damage.NamePlaceholder": "e.g. Broken Arm, Concussion, Torn Ligament...",
    "CYPHER2026.Damage.Type": "Damage Type",
    "CYPHER2026.Damage.Lasting": "Lasting Damage",
    "CYPHER2026.Damage.Permanent": "Permanent Damage",
    "CYPHER2026.Damage.Severity": "Severity",
    "CYPHER2026.Damage.Moderate": "Moderate Wound",
    "CYPHER2026.Damage.Major": "Major Wound",
    "CYPHER2026.Damage.Description": "Narrative Details / Description",
    "CYPHER2026.Damage.DescPlaceholder": "Details (e.g. fall from high distance, fracture in combat...)",
    "CYPHER2026.Damage.CreateButton": "Create Injury",
    "CYPHER2026.Damage.Heal": "HEAL",
    "CYPHER2026.Damage.HealTooltip": "Heal injury completely (Removes 1 corresponding wound and archives)",
    "CYPHER2026.Damage.HealedNotification": "Injury '{name}' completely healed.",
    "CYPHER2026.Damage.NoActive": "No active lasting or permanent damage. Click + to register.",
    "CYPHER2026.Damage.ChatCardTitle": "Extraordinary Healing",
    "CYPHER2026.Damage.ChatCardText": "Injury <strong>{name}</strong> was completely healed and archived.",

    "CYPHER2026.Dialog.AddSkillTitle": "Add New Skill",
    "CYPHER2026.Dialog.AddAbilityTitle": "Add New Ability",
    "CYPHER2026.Dialog.AddAttackTitle": "Add New Attack",
    "CYPHER2026.Dialog.AddArmorTitle": "Add New Armor / Shield",
    "CYPHER2026.Dialog.EditSkillTitle": "Edit Skill: {name}",
    "CYPHER2026.Dialog.EditAbilityTitle": "Edit Ability: {name}",
    "CYPHER2026.Dialog.EditAttackTitle": "Edit Attack: {name}",
    "CYPHER2026.Dialog.EditArmorTitle": "Edit Armor / Shield: {name}",
    "CYPHER2026.Dialog.SkillName": "Skill Name",
    "CYPHER2026.Dialog.SkillNamePlaceholder": "e.g. Stealth, History, Perception...",
    "CYPHER2026.Dialog.SkillRank": "Training Rank",
    "CYPHER2026.Dialog.SkillPool": "Associated Pool",
    "CYPHER2026.Dialog.SkillOrigin": "Origin",
    "CYPHER2026.Dialog.SkillOriginBackground": "Background",
    "CYPHER2026.Dialog.SkillOriginTier": "Tier",
    "CYPHER2026.Dialog.TierLevel": "Tier Level",
    "CYPHER2026.Dialog.SkillDescription": "Description",
    "CYPHER2026.Dialog.SkillDescPlaceholder": "Description of how this skill is applied...",
    "CYPHER2026.Dialog.AbilityName": "Ability Name",
    "CYPHER2026.Dialog.AbilityNamePlaceholder": "e.g. Energy Ray, Telekinetic Shield...",
    "CYPHER2026.Dialog.AttackName": "Attack Name",
    "CYPHER2026.Dialog.AttackNamePlaceholder": "e.g. Broadsword, Punch, Plasma Rifle...",
    "CYPHER2026.Dialog.AttackDamage": "Damage",
    "CYPHER2026.Dialog.WeaponCategory": "Weapon Category",
    "CYPHER2026.Dialog.AttackRange": "Range",
    "CYPHER2026.Dialog.AttackTraining": "Training",
    "CYPHER2026.Dialog.AttackDescPlaceholder": "Attack notes, special properties, ammo type...",
    "CYPHER2026.Dialog.ArmorName": "Name",
    "CYPHER2026.Dialog.ArmorNamePlaceholder": "e.g. Leather Jerkin, Chainmail, Wooden Shield...",
    "CYPHER2026.Dialog.ArmorType": "Type",
    "CYPHER2026.Dialog.FreelyUseCheckbox": "Can Freely Use without Speed penalty?",
    "CYPHER2026.Dialog.ArmorDescPlaceholder": "Details, material, special properties...",
    "CYPHER2026.Dialog.IsAttack": "Is it an Attack?",
    "CYPHER2026.Dialog.Kind": "Cost",
    "CYPHER2026.Dialog.ActionKind": "Action (Costs Pool)",
    "CYPHER2026.Dialog.EnablerKind": "Enabler (Passive / Permanent)",
    "CYPHER2026.Dialog.Origin": "Origin",
    "CYPHER2026.Dialog.Cost": "Cost",
    "CYPHER2026.Dialog.Pool": "Pool",
    "CYPHER2026.Dialog.Tier": "Tier",
    "CYPHER2026.Dialog.Description": "Description",
    "CYPHER2026.Dialog.AbilityDescPlaceholder": "Full rules description of this ability...",
    "CYPHER2026.Dialog.DamageTitle": "Apply Damage to {stat}",
    "CYPHER2026.Dialog.DamageAmount": "Damage Amount",
    "CYPHER2026.Dialog.ApplyDamage": "Apply Damage",
    "CYPHER2026.Dialog.PostChatConfirm": "Do you want to post the info card for <strong>{name}</strong> to the chat?",
    "CYPHER2026.Dialog.PostChatTitle": "Send {name} to Chat",

    "CYPHER2026.Item.DeleteTitle": "Delete {name}",
    "CYPHER2026.Item.DeleteConfirm": "Are you sure you want to permanently delete <strong>{name}</strong>?",
    "CYPHER2026.Item.DeleteTip": "(Tip: Hold Alt + Click the trash icon to archive/unarchive without deleting)",
    "CYPHER2026.Item.ArchivedNotification": "Item '{name}' has been archived.",
    "CYPHER2026.Item.UnarchivedNotification": "Item '{name}' has been restored from archive.",

    "CYPHER2026.Notifications.CannotReduceBelowLasting": "Cannot reduce wounds below active Lasting/Permanent Damage count.",
    "CYPHER2026.Notifications.LastingWoundImmutable": "This wound was caused by Lasting/Permanent Damage and can only be healed through its damage item.",
    "CYPHER2026.Notifications.RecoveryExhausted": "All usages for this recovery time period have been exhausted.",
    "CYPHER2026.Notifications.RecoveriesReset": "Recovery usages have been reset.",
    "CYPHER2026.Notifications.ItemCreated": "Registered {type} '{name}'.",

    "CYPHER2026.Roll.DiceTrayFlavor": "{die} Roll",
    "CYPHER2026.Roll.StatFlavor": "{stat} Check (Current: {current} | Edge: {edge})",
    "CYPHER2026.Roll.SkillFlavor": "Skill: {name} ({rank} | {stat})",
    "CYPHER2026.Roll.FixedSkillFlavor": "{name} ({rank} | {stat})",
    "CYPHER2026.Roll.AbilityFlavor": "Ability: <strong>{name}</strong> [{cost} {stat}]",
    "CYPHER2026.Roll.AbilityEnablerFlavor": "Ability: <strong>{name}</strong> (Enabler)",
    "CYPHER2026.Roll.AttackFlavor": "Attack: <strong>{name}</strong> ({rank} | {range} | {damage} DMG)",

    "CYPHER2026.Common.Add": "Add",
    "CYPHER2026.Common.Save": "Save",
    "CYPHER2026.Common.Delete": "Delete",
    "CYPHER2026.Common.Archive": "Archive",
    "CYPHER2026.Common.Unarchive": "Unarchive",
    "CYPHER2026.Common.HoldAltToDelete": "Hold Alt to Delete",
    "CYPHER2026.Common.Cancel": "Cancel",
    "CYPHER2026.Common.Send": "Send to Chat",
    "CYPHER2026.Common.None": "None",
    "CYPHER2026.Common.NoItems": "No items registered.",
    "CYPHER2026.Common.NoDescription": "No description provided.",
    "CYPHER2026.Common.PostToChat": "Click to post card to chat",
    "CYPHER2026.Common.Edit": "Edit",
    "CYPHER2026.Common.DeleteOrArchive": "Archive (Hold Alt to Delete)",
    "CYPHER2026.Common.DeleteOrUnarchive": "Unarchive (Hold Alt to Delete)",
    "CYPHER2026.Item.NewItemName": "New {type}",

    "CYPHER2026.Dialog.OriginType": "Type",
    "CYPHER2026.Dialog.OriginFocus": "Focus",
    "CYPHER2026.Dialog.OriginDescriptor": "Descriptor",
    "CYPHER2026.Dialog.OriginSpecial": "Special",

    "CYPHER2026.Dialog.PoolMight": "Might",
    "CYPHER2026.Dialog.PoolSpeed": "Speed",
    "CYPHER2026.Dialog.PoolIntellect": "Intellect",
    "CYPHER2026.Dialog.PoolNone": "None / Free"
  }, null, 2),

  // -------------------------------------------------------------
  // 2. LANG / PT-BR.JSON
  // -------------------------------------------------------------
  "lang/pt-BR.json": JSON.stringify({
    "TYPES.Actor.pc": "Personagem",
    "TYPES.Actor.npc": "PNJ",
    "TYPES.Actor.companion": "Companheiro",
    "TYPES.Item.ability": "Habilidade",
    "TYPES.Item.skill": "Perícia",
    "TYPES.Item.cypher": "Cypher",
    "TYPES.Item.weapon": "Arma",
    "TYPES.Item.armor": "Armadura",
    "TYPES.Item.equipment": "Equipamento",
    "TYPES.Item.artifact": "Artefato",
    "TYPES.Item.descriptor": "Descritor",
    "TYPES.Item.species": "Espécie",
    "TYPES.Item.characterType": "Tipo de Personagem",
    "TYPES.Item.focus": "Foco",
    "TYPES.Item.genre": "Gênero",

    "CYPHER2026.Sheet.PC": "Ficha de Personagem (Cypher 2026)",
    "CYPHER2026.Actor.PC.NamePlaceholder": "Nome do Personagem",
    "CYPHER2026.Actor.PC.SentenceLead": "Is a",
    "CYPHER2026.Actor.PC.DescriptorPlaceholder": "Descritor",
    "CYPHER2026.Actor.PC.TypePlaceholder": "Tipo",
    "CYPHER2026.Actor.PC.SentenceMid": "who",
    "CYPHER2026.Actor.PC.FocusPlaceholder": "Foco",
    "CYPHER2026.Actor.Tier": "TIER",
    "CYPHER2026.Actor.Effort": "EFFORT",
    "CYPHER2026.Actor.XP": "XP",

    "CYPHER2026.Header.RollTask": "Rolar Teste (d20)",
    "CYPHER2026.Header.Defense": "Defesa",
    "CYPHER2026.Header.Rest": "Descanso",
    "CYPHER2026.Header.Calculator": "Calculadora",
    "CYPHER2026.Header.QuickRoll": "QUICK ROLL",
    "CYPHER2026.Header.ToggleQuickRoll": "Alternar Modo Quick Roll",
    "CYPHER2026.Header.RollDie": "Rolar {die}",
    "CYPHER2026.Header.SentenceDropHint": "Editável ou arraste um Item de {type}",

    "CYPHER2026.Stats.might": "Might",
    "CYPHER2026.Stats.speed": "Speed",
    "CYPHER2026.Stats.intellect": "Intellect",
    "CYPHER2026.Stats.none": "Geral / Gratuito",
    "CYPHER2026.Stats.Edge": "Margem",
    "CYPHER2026.Stats.Base": "Base",
    "CYPHER2026.Stats.RollCheck": "Rolar Teste de {stat}",
    "CYPHER2026.Stats.ResetPool": "Restaurar Pool ao Total Máximo",
    "CYPHER2026.Stats.ApplyDamage": "Aplicar Dano na Pool",
    "CYPHER2026.Stats.CurrentValueTitle": "Pontos Atuais da Pool (Editável com contas matemáticas)",
    "CYPHER2026.Stats.TotalValueTitle": "Pontos Totais Máximos (Base + Modificadores)",

    "CYPHER2026.SkillRank.inability": "Inabilidade",
    "CYPHER2026.SkillRank.practiced": "Praticada",
    "CYPHER2026.SkillRank.trained": "Treinada",
    "CYPHER2026.SkillRank.specialized": "Especializada",
    "CYPHER2026.SkillRank.expert": "Expert",

    "CYPHER2026.FixedSkills.initiative": "Iniciativa",
    "CYPHER2026.FixedSkills.mightDefense": "Defesa de Might",
    "CYPHER2026.FixedSkills.speedDefense": "Defesa de Speed",
    "CYPHER2026.FixedSkills.intellectDefense": "Defesa de Intellect",
    "CYPHER2026.FixedSkills.ModifyTitle": "Modificar",
    "CYPHER2026.FixedSkills.RankLabel": "Grau de Treinamento em",
    "CYPHER2026.FixedSkills.ClickHint": "Clique para alterar o grau de treinamento",
    "CYPHER2026.FixedSkills.RollTitle": "Rolar {name}",

    "CYPHER2026.AbilityOrigin.focus": "Focus",
    "CYPHER2026.AbilityOrigin.type": "Type",
    "CYPHER2026.AbilityOrigin.descriptor": "Descriptor",
    "CYPHER2026.AbilityOrigin.special": "Special",
    "CYPHER2026.AbilityOrigin.Focus": "Focus",
    "CYPHER2026.AbilityOrigin.Type": "Type",
    "CYPHER2026.AbilityOrigin.Descriptor": "Descriptor",
    "CYPHER2026.AbilityOrigin.Special": "Special",

    "CYPHER2026.Tabs.Overview": "OVERVIEW",
    "CYPHER2026.Tabs.Skills": "SKILLS",
    "CYPHER2026.Tabs.Abilities": "ABILITIES",
    "CYPHER2026.Tabs.Combat": "COMBAT",
    "CYPHER2026.Tabs.Equipment": "EQUIPMENT",
    "CYPHER2026.Tabs.Notes": "NOTES",
    "CYPHER2026.Tabs.Effects": "EFFECTS",

    "CYPHER2026.Skills.SortTitle": "Alternar Ordenação (A-Z, Z-A, Rank)",
    "CYPHER2026.Skills.AddTitle": "Cadastrar Nova Perícia",
    "CYPHER2026.Skills.NoSkills": "Nenhuma perícia cadastrada. Clique no + ou arraste um Item de Perícia para esta aba.",
    "CYPHER2026.Skills.ArchivedBadge": "ARQUIVADA",
    "CYPHER2026.Skills.Default": "Nova Perícia",

    "CYPHER2026.Abilities.SortTitle": "Alternar Ordenação (A-Z, Z-A, Origem, Tier, Enabler)",
    "CYPHER2026.Abilities.SearchPlaceholder": "Pesquisar por nome, tags, custo, tier ou descrição...",
    "CYPHER2026.Abilities.AddTitle": "Cadastrar Nova Habilidade",
    "CYPHER2026.Abilities.NoAbilities": "Nenhuma habilidade cadastrada. Clique no + ou arraste um Item de Habilidade para esta aba.",
    "CYPHER2026.Abilities.Default": "Nova Habilidade",

    "CYPHER2026.Overview.Heading": "CHARACTER OVERVIEW",
    "CYPHER2026.Overview.SummaryTag": "SUMÁRIO",
    "CYPHER2026.Overview.SummaryDescription": "Visão geral do personagem com resumo de capacidades, cyphers e equipamentos.",

    "CYPHER2026.Notes.Heading": "CHARACTER NOTES",
    "CYPHER2026.Notes.Tag": "BIOGRAFIA & REGISTROS",
    "CYPHER2026.Notes.Placeholder": "Anotações, histórico, objetivos e conexões de campanha...",

    "CYPHER2026.Effects.Heading": "ACTIVE EFFECTS",
    "CYPHER2026.Effects.Tag": "CONDIÇÕES & MODIFICADORES",
    "CYPHER2026.Effects.Description": "Condições ativas, penalidades de ferimentos e modificadores duradouros do personagem.",

    "CYPHER2026.Combat.OffenseTag": "OFENSIVA",
    "CYPHER2026.Combat.AttacksHeading": "ATTACKS",
    "CYPHER2026.Combat.NoAttacks": "Nenhum ataque cadastrado. Clique no + para adicionar.",
    "CYPHER2026.Combat.DmgTag": "DANO",
    "CYPHER2026.Combat.DefenseTag": "DEFESA",
    "CYPHER2026.Combat.ArmorHeading": "ARMADURA & ESCUDOS",
    "CYPHER2026.Combat.OptionalRuleTag": "REGRA OPCIONAL",
    "CYPHER2026.Combat.LastingDamageHeading": "LASTING / PERMANENT DAMAGE",

    "CYPHER2026.WeaponCategory.no": "Não é Arma / Especial",
    "CYPHER2026.WeaponCategory.light": "Arma Leve",
    "CYPHER2026.WeaponCategory.medium": "Arma Média",
    "CYPHER2026.WeaponCategory.heavy": "Arma Pesada",

    "CYPHER2026.Range.immediate": "Imediato",
    "CYPHER2026.Range.short": "Curto",
    "CYPHER2026.Range.long": "Longo",
    "CYPHER2026.Range.extreme": "Extremo",

    "CYPHER2026.Armor.Heading": "ARMADURA & ESCUDOS",
    "CYPHER2026.Armor.NoArmor": "Nenhuma armadura ou escudo equipado. Clique no + para adicionar.",
    "CYPHER2026.Armor.FreelyUse": "Uso Livre",
    "CYPHER2026.Armor.NotFreelyUse": "Não Livre",
    "CYPHER2026.Armor.ToggleFreeUseTitle": "Alternar status de Uso Livre",
    "CYPHER2026.Armor.BlockMod": "BLOQUEIO: FACILITADO {steps} {stepLabel}",
    "CYPHER2026.Armor.DodgeMod": "ESQUIVA: DIFICULTADA {steps} {stepLabel}",
    "CYPHER2026.Armor.StepSingular": "PASSO",
    "CYPHER2026.Armor.StepPlural": "PASSOS",
    "CYPHER2026.Armor.BlockShort": "Bloqueio",
    "CYPHER2026.Armor.DodgeShort": "Esquiva",
    "CYPHER2026.Armor.RollBlock": "Rolar Bloqueio (Defesa de Might)",
    "CYPHER2026.Armor.RollDodge": "Rolar Esquiva (Defesa de Speed)",
    "CYPHER2026.Armor.ShieldBreakAlert": "Major Wound destrói o escudo",
    "CYPHER2026.Armor.ShieldBroken": "O escudo '{name}' sofreu um Major Wound e foi destruído!",

    "CYPHER2026.Shield.BlockWoundBtn": "Bloquear Dano",
    "CYPHER2026.Shield.BlockWoundTooltip": "Absorver o ferimento do ataque recebido no escudo",
    "CYPHER2026.Shield.BlockWoundDialogTitle": "Bloquear Ferimento com Escudo: {name}",
    "CYPHER2026.Shield.BlockWoundPrompt": "Selecione a gravidade do ferimento recebido para absorver no escudo:",
    "CYPHER2026.Shield.BlockWoundChatTitle": "Bloqueio com Escudo",
    "CYPHER2026.Shield.BlockWoundChatMsg": "Bloqueou um <strong>{severity}</strong> usando o escudo <strong>{name}</strong>.",
    "CYPHER2026.Shield.RolloverNotice": " (Convertido para {target})",
    "CYPHER2026.Shield.BrokenChatAlert": "O escudo sofreu um Major Wound e foi <strong>DESTRUÍDO</strong>!",

    "CYPHER2026.ArmorType.light": "Armadura Leve",
    "CYPHER2026.ArmorType.medium": "Armadura Média",
    "CYPHER2026.ArmorType.heavy": "Armadura Pesada",
    "CYPHER2026.ArmorType.shield": "Escudo",

    "CYPHER2026.Wounds.Heading": "WOUNDS",
    "CYPHER2026.Wounds.Tag": "DAMAGE & RECOVERY",
    "CYPHER2026.Wounds.Minor": "Minor Wounds",
    "CYPHER2026.Wounds.Moderate": "Moderate Wounds",
    "CYPHER2026.Wounds.Major": "Major Wounds",
    "CYPHER2026.Wounds.Qty": "Qtd.",
    "CYPHER2026.Wounds.Decrease": "Diminuir ferimento",
    "CYPHER2026.Wounds.Increase": "Aumentar ferimento",
    "CYPHER2026.Wounds.DecreaseCapacity": "Diminuir capacidade",
    "CYPHER2026.Wounds.IncreaseCapacity": "Aumentar capacidade",
    "CYPHER2026.Wounds.Reset": "Zerar ferimentos normais",
    "CYPHER2026.Wounds.LastingTooltip": "Ferimento Duradouro (Incurável normalmente)",
    "CYPHER2026.Wounds.AlertMinorFull": "No negative effects. Excess minor wounds become moderate.",
    "CYPHER2026.Wounds.AlertModerateFull": "Hindered. Excess moderate wounds become major.",
    "CYPHER2026.Wounds.AlertMajorHindered": "Hindered. On your last, you die.",
    "CYPHER2026.Wounds.AlertDead": "Dead!",

    "CYPHER2026.Recovery.Heading": "RECOVERY ROLLS",
    "CYPHER2026.Recovery.Tag": "RECUPERAÇÃO",
    "CYPHER2026.Recovery.FormulaTitle": "Fórmula de Recuperação (Editável)",
    "CYPHER2026.Recovery.DecreaseDice": "Diminuir dados d6",
    "CYPHER2026.Recovery.IncreaseDice": "Aumentar dados d6",
    "CYPHER2026.Recovery.DecreaseBonus": "Diminuir bônus",
    "CYPHER2026.Recovery.IncreaseBonus": "Aumentar bônus",
    "CYPHER2026.Recovery.ResetAll": "Zerar todos os usos de recuperação",
    "CYPHER2026.Recovery.RollTimeTitle": "Rolar Recuperação ({time})",
    "CYPHER2026.Recovery.TenMinRestFlavor": "10 Minutos de Descanso: Todos os Minor Wounds normais foram removidos.",
    "CYPHER2026.Recovery.OneHourRestFlavorMod": "1 Hora de Descanso: 1 Moderate Wound normal removido.",
    "CYPHER2026.Recovery.OneHourRestFlavorMinor": "1 Hora de Descanso: Todos os Minor Wounds normais foram removidos.",
    "CYPHER2026.Recovery.TenHourRestFlavor": "10 Horas (Descanso Completo): Pools e recuperações restauradas, Moderate Wounds normais removidos.",
    "CYPHER2026.Recovery.PointsToDistribute": "Pontos para distribuir nas Pools: {total}",

    "CYPHER2026.Rest.DialogTitle": "Descanso de 10 Horas — Lasting Damage",
    "CYPHER2026.Rest.PromptQuestion": "Houve repouso real suficiente (1 dia completo ou 3 dias leves) para curar os Moderate Lasting Damages ativos?",
    "CYPHER2026.Rest.HealAllButton": "Curar Todos Moderates",
    "CYPHER2026.Rest.LeaveUnchanged": "Não Alterar",
    "CYPHER2026.Rest.FullCompleteNotice": "Descanso completo (10h) concluído: Pools e recuperações restauradas, Moderate Wounds normais removidos.",

    "CYPHER2026.Rally.Title": "Ação de Rally (Rallying)",
    "CYPHER2026.Rally.RulesNotice": "Remove um ferimento normal gastando pontos de Might diretamente. Might Edge NÃO reduz este custo. Lasting/Permanent Damage NÃO pode ser removido por Rally.",
    "CYPHER2026.Rally.SelectWound": "Selecione o ferimento normal para se recompor:",
    "CYPHER2026.Rally.MinorOption": "1 Minor Wound — Custo: 2 Might",
    "CYPHER2026.Rally.ModerateOption": "1 Moderate Wound — Custo: 5 Might",
    "CYPHER2026.Rally.CurrentMight": "Might Atual",
    "CYPHER2026.Rally.Available": "Disponíveis",
    "CYPHER2026.Rally.Execute": "Executar Rally",
    "CYPHER2026.Rally.InsufficientMight": "Pontos de Might insuficientes para Rally. Necessário: {cost}, Atual: {current}.",
    "CYPHER2026.Rally.NoNormalWounds": "Os ferimentos restantes são Lasting/Permanent Damage e não podem ser removidos por Rally.",
    "CYPHER2026.Rally.ChatMessage": "Gastou <strong>{cost} Might</strong> (sem redução por Edge) e removeu <strong>1 {severity} WOUND</strong>.",

    "CYPHER2026.Treatment.Title": "Tratamento de Ferimentos (Treatment)",
    "CYPHER2026.Treatment.RulesNotice": "Teste de Intellect (Healing) para remover ferimentos com primeiros socorros e tempo. Não gasta pontos de Might.",
    "CYPHER2026.Treatment.SelectSeverity": "Selecione a gravidade do tratamento:",
    "CYPHER2026.Treatment.MinorOption": "Minor Wound: Dificuldade 0 (Rotina) | Tempo: 1 minuto",
    "CYPHER2026.Treatment.ModerateOption": "Moderate Wound: Dificuldade 3 (Alvo 9) | Tempo: 10 minutos",
    "CYPHER2026.Treatment.MajorOption": "Major Wound: Dificuldade 6 (Alvo 18) | Tempo: 1 hora",
    "CYPHER2026.Treatment.RollButton": "Rolar Teste de Cura",
    "CYPHER2026.Treatment.Success": "Sucesso! 1 {severity} Wound removido.",
    "CYPHER2026.Treatment.Failure": "Falha no teste de tratamento.",
    "CYPHER2026.Treatment.CannotHealLasting": "Os ferimentos de {severity} restantes são Lasting/Permanent Damage e exigem repouso ou cura extraordinária.",
    "CYPHER2026.Treatment.ChatFlavor": "Dificuldade: <strong>{diff} (Alvo: {target})</strong> | Tempo: <strong>{time}</strong>",

    "CYPHER2026.Damage.Title": "Registrar Lasting / Permanent Damage",
    "CYPHER2026.Damage.RulesNotice": "Cada registro adiciona 1 ferimento que não se cura por recuperações normais ou Rally.",
    "CYPHER2026.Damage.Name": "Nome do Ferimento",
    "CYPHER2026.Damage.NamePlaceholder": "Ex: Braço Quebrado, Concussão, Ligamento Rompido...",
    "CYPHER2026.Damage.Type": "Tipo de Dano",
    "CYPHER2026.Damage.Lasting": "Lasting Damage (Duradouro)",
    "CYPHER2026.Damage.Permanent": "Permanent Damage (Permanente)",
    "CYPHER2026.Damage.Severity": "Severidade",
    "CYPHER2026.Damage.Moderate": "Moderate Wound",
    "CYPHER2026.Damage.Major": "Major Wound",
    "CYPHER2026.Damage.Description": "Descrição / Consequência Narrativa",
    "CYPHER2026.Damage.DescPlaceholder": "Detalhes (ex: queda de grande altura, fratura no combate...)",
    "CYPHER2026.Damage.CreateButton": "Criar Ferimento",
    "CYPHER2026.Damage.Heal": "CURAR",
    "CYPHER2026.Damage.HealTooltip": "Curar ferimento completamente (Remove 1 wound correspondente e arquiva)",
    "CYPHER2026.Damage.HealedNotification": "Ferimento '{name}' curado completamente.",
    "CYPHER2026.Damage.NoActive": "Nenhum ferimento duradouro ou permanente ativo. Clique no + para registrar.",
    "CYPHER2026.Damage.ChatCardTitle": "Cura Extraordinária",
    "CYPHER2026.Damage.ChatCardText": "O ferimento <strong>{name}</strong> foi curado completamente e arquivado.",

    "CYPHER2026.Dialog.AddSkillTitle": "Adicionar Nova Perícia",
    "CYPHER2026.Dialog.AddAbilityTitle": "Adicionar Nova Habilidade",
    "CYPHER2026.Dialog.AddAttackTitle": "Adicionar Novo Ataque",
    "CYPHER2026.Dialog.AddArmorTitle": "Adicionar Nova Armadura / Escudo",
    "CYPHER2026.Dialog.EditSkillTitle": "Editar Perícia: {name}",
    "CYPHER2026.Dialog.EditAbilityTitle": "Editar Habilidade: {name}",
    "CYPHER2026.Dialog.EditAttackTitle": "Editar Ataque: {name}",
    "CYPHER2026.Dialog.EditArmorTitle": "Editar Armadura / Escudo: {name}",
    "CYPHER2026.Dialog.SkillName": "Nome da Perícia",
    "CYPHER2026.Dialog.SkillNamePlaceholder": "Ex: Furtividade, Percepção...",
    "CYPHER2026.Dialog.SkillRank": "Grau de Treinamento",
    "CYPHER2026.Dialog.SkillPool": "Pool Associada",
    "CYPHER2026.Dialog.SkillOrigin": "Origem",
    "CYPHER2026.Dialog.SkillOriginBackground": "Background",
    "CYPHER2026.Dialog.SkillOriginTier": "Tier",
    "CYPHER2026.Dialog.TierLevel": "Nível de Tier",
    "CYPHER2026.Dialog.SkillDescription": "Descrição",
    "CYPHER2026.Dialog.SkillDescPlaceholder": "Descrição do uso desta perícia...",
    "CYPHER2026.Dialog.AbilityName": "Nome da Habilidade",
    "CYPHER2026.Dialog.AbilityNamePlaceholder": "Ex: Raio de Energia, Barreira Telecinética...",
    "CYPHER2026.Dialog.AttackName": "Nome do Ataque",
    "CYPHER2026.Dialog.AttackNamePlaceholder": "Ex: Espada Larga, Soco, Rifle de Plasma...",
    "CYPHER2026.Dialog.AttackDamage": "Dano",
    "CYPHER2026.Dialog.WeaponCategory": "Categoria de Arma",
    "CYPHER2026.Dialog.AttackRange": "Alcance",
    "CYPHER2026.Dialog.AttackTraining": "Treinamento",
    "CYPHER2026.Dialog.AttackDescPlaceholder": "Notas do ataque, propriedades especiais, tipo de munição...",
    "CYPHER2026.Dialog.ArmorName": "Nome",
    "CYPHER2026.Dialog.ArmorNamePlaceholder": "Ex: Gibão de Couro, Cota de Malha, Escudo de Madeira...",
    "CYPHER2026.Dialog.ArmorType": "Tipo",
    "CYPHER2026.Dialog.FreelyUseCheckbox": "Pode usar livremente sem penalidade de Speed?",
    "CYPHER2026.Dialog.ArmorDescPlaceholder": "Detalhes, material, propriedades especiais...",
    "CYPHER2026.Dialog.IsAttack": "É um Ataque?",
    "CYPHER2026.Dialog.Kind": "Custo",
    "CYPHER2026.Dialog.ActionKind": "Ação (Gasta Pool)",
    "CYPHER2026.Dialog.EnablerKind": "Enabler (Passivo / Permanente)",
    "CYPHER2026.Dialog.Origin": "Origem",
    "CYPHER2026.Dialog.Cost": "Custo",
    "CYPHER2026.Dialog.Pool": "Pool",
    "CYPHER2026.Dialog.Tier": "Tier",
    "CYPHER2026.Dialog.Description": "Descrição",
    "CYPHER2026.Dialog.AbilityDescPlaceholder": "Descrição completa das regras desta habilidade...",
    "CYPHER2026.Dialog.DamageTitle": "Aplicar Dano em {stat}",
    "CYPHER2026.Dialog.DamageAmount": "Quantidade de Dano",
    "CYPHER2026.Dialog.ApplyDamage": "Aplicar Dano",
    "CYPHER2026.Dialog.PostChatConfirm": "Deseja postar o card informativo de <strong>{name}</strong> no chat?",
    "CYPHER2026.Dialog.PostChatTitle": "Enviar {name} ao Chat",

    "CYPHER2026.Item.DeleteTitle": "Excluir {name}",
    "CYPHER2026.Item.DeleteConfirm": "Tem certeza que deseja excluir permanentemente o item <strong>{name}</strong>?",
    "CYPHER2026.Item.DeleteTip": "(Dica: Segure Alt + Clique na lixeira para apenas arquivar/desarquivar o item)",
    "CYPHER2026.Item.ArchivedNotification": "O item '{name}' foi arquivado.",
    "CYPHER2026.Item.UnarchivedNotification": "O item '{name}' foi restaurado do arquivo.",

    "CYPHER2026.Notifications.CannotReduceBelowLasting": "Não é possível reduzir ferimentos abaixo dos Lasting/Permanent Damages ativos.",
    "CYPHER2026.Notifications.LastingWoundImmutable": "Este ferimento é decorrente de Lasting/Permanent Damage e só pode ser curado através do próprio ferimento.",
    "CYPHER2026.Notifications.RecoveryExhausted": "Todos os usos deste tempo de recuperação já foram consumidos.",
    "CYPHER2026.Notifications.RecoveriesReset": "Usos de recuperação zerados.",
    "CYPHER2026.Notifications.ItemCreated": "Registrado {type} '{name}'.",

    "CYPHER2026.Roll.DiceTrayFlavor": "Rolagem de {die}",
    "CYPHER2026.Roll.StatFlavor": "Teste de {stat} (Atual: {current} | Margem: {edge})",
    "CYPHER2026.Roll.SkillFlavor": "Perícia: {name} ({rank} | {stat})",
    "CYPHER2026.Roll.FixedSkillFlavor": "{name} ({rank} | {stat})",
    "CYPHER2026.Roll.AbilityFlavor": "Habilidade: <strong>{name}</strong> [{cost} {stat}]",
    "CYPHER2026.Roll.AbilityEnablerFlavor": "Habilidade: <strong>{name}</strong> (Enabler)",
    "CYPHER2026.Roll.AttackFlavor": "Ataque: <strong>{name}</strong> ({rank} | {range} | {damage} DANO)",

    "CYPHER2026.Common.Add": "Adicionar",
    "CYPHER2026.Common.Save": "Salvar",
    "CYPHER2026.Common.Delete": "Excluir",
    "CYPHER2026.Common.Archive": "Arquivar",
    "CYPHER2026.Common.Unarchive": "Desarquivar",
    "CYPHER2026.Common.HoldAltToDelete": "Segure Alt para Excluir",
    "CYPHER2026.Common.Cancel": "Cancelar",
    "CYPHER2026.Common.Send": "Enviar ao Chat",
    "CYPHER2026.Common.None": "Nenhum",
    "CYPHER2026.Common.NoItems": "Nenhum item cadastrado.",
    "CYPHER2026.Common.NoDescription": "Nenhuma descrição fornecida.",
    "CYPHER2026.Common.PostToChat": "Clique para enviar o card ao chat",
    "CYPHER2026.Common.Edit": "Editar",
    "CYPHER2026.Common.DeleteOrArchive": "Arquivar (Segure Alt para Excluir)",
    "CYPHER2026.Common.DeleteOrUnarchive": "Desarquivar (Segure Alt para Excluir)",
    "CYPHER2026.Item.NewItemName": "Novo(a) {type}",

    "CYPHER2026.Dialog.OriginType": "Tipo",
    "CYPHER2026.Dialog.OriginFocus": "Foco",
    "CYPHER2026.Dialog.OriginDescriptor": "Descritor",
    "CYPHER2026.Dialog.OriginSpecial": "Especial",

    "CYPHER2026.Dialog.PoolMight": "Might",
    "CYPHER2026.Dialog.PoolSpeed": "Speed",
    "CYPHER2026.Dialog.PoolIntellect": "Intellect",
    "CYPHER2026.Dialog.PoolNone": "Nenhuma / Gratuito"
  }, null, 2),

  // -------------------------------------------------------------
  // 3. TEMPLATES / PC-TAB-COMBAT.HBS
  // -------------------------------------------------------------
  "templates/actors/pc/parts/pc-tab-combat.hbs": `<div class="tab-pane-content combat-layout {{#unless (eq activeTab 'combat')}}hidden{{/unless}}" data-application-part="tabCombat">

  <!-- COLUNA ESQUERDA: WOUNDS -> RECOVERY ROLLS -> LASTING DAMAGE -->
  <div class="combat-column-left">

    <!-- 1. WOUNDS CARD -->
    <div class="sub-panel-card book-callout-border wounds-panel-card">
      <div class="panel-card-header">
        <div>
          <span class="sub-title-tag">{{localize "CYPHER2026.Wounds.Tag"}}</span>
          <h3 class="panel-heading">{{localize "CYPHER2026.Wounds.Heading"}}</h3>
        </div>
        <i class="fas fa-heart-crack icon-danger"></i>
      </div>

      <div class="wounds-category-block">
        <!-- MINOR WOUNDS -->
        <div class="wound-severity-block">
          <div class="wound-top-control-row">
            <div class="wound-title-group">
              <span class="wound-name">{{localize "CYPHER2026.Wounds.Minor"}}</span>
              <div class="wound-step-btns">
                <button type="button" class="btn-step-mini {{#if (lte system.wounds.minor.current system.wounds.minor.lastingCount)}}is-disabled{{/if}}" data-action="adjustWoundCurrent" data-severity="minor" data-delta="-1" title="{{localize 'CYPHER2026.Wounds.Decrease'}}">-</button>
                <button type="button" class="btn-step-mini {{#if (gte system.wounds.minor.current system.wounds.minor.max)}}is-disabled{{/if}}" data-action="adjustWoundCurrent" data-severity="minor" data-delta="1" title="{{localize 'CYPHER2026.Wounds.Increase'}}">+</button>
              </div>
            </div>
            <div class="wound-qty-group">
              <span class="qty-label">{{localize "CYPHER2026.Wounds.Qty"}}</span>
              <button type="button" class="btn-step-mini {{#if (lte system.wounds.minor.max 1)}}is-disabled{{/if}}" data-action="adjustWoundMax" data-severity="minor" data-delta="-1" title="{{localize 'CYPHER2026.Wounds.DecreaseCapacity'}}"><i class="fas fa-chevron-left"></i></button>
              <span class="qty-val-display">{{system.wounds.minor.max}}</span>
              <button type="button" class="btn-step-mini {{#if (gte system.wounds.minor.max 10)}}is-disabled{{/if}}" data-action="adjustWoundMax" data-severity="minor" data-delta="1" title="{{localize 'CYPHER2026.Wounds.IncreaseCapacity'}}"><i class="fas fa-chevron-right"></i></button>
            </div>
          </div>

          <div class="wound-pills-row-wrap">
            <div class="wound-pills-row">
              {{#times system.wounds.minor.max}}
              <button type="button" class="pill-tracker-btn {{#if (lte this ../system.wounds.minor.current)}}checked{{/if}} {{#if (lte this ../system.wounds.minor.lastingCount)}}lasting-wound{{/if}}" data-action="toggleWound" data-severity="minor" data-index="{{this}}" title="{{#if (lte this ../system.wounds.minor.lastingCount)}}{{localize 'CYPHER2026.Wounds.LastingTooltip'}}{{/if}}">{{this}}</button>
              {{/times}}
            </div>
            <button type="button" class="btn-micro-reset" data-action="resetWoundSeverity" data-severity="minor" title="{{localize 'CYPHER2026.Wounds.Reset'}}"><i class="fas fa-rotate-left"></i></button>
          </div>

          {{#if system.wounds.minor.alert}}
          <div class="wound-alert-banner {{system.wounds.minor.alert.level}}">
            <i class="fas {{system.wounds.minor.alert.icon}}"></i>
            <span>{{system.wounds.minor.alert.text}}</span>
          </div>
          {{/if}}
        </div>

        <!-- MODERATE WOUNDS -->
        <div class="wound-severity-block">
          <div class="wound-top-control-row">
            <div class="wound-title-group">
              <span class="wound-name">{{localize "CYPHER2026.Wounds.Moderate"}}</span>
              <div class="wound-step-btns">
                <button type="button" class="btn-step-mini {{#if (lte system.wounds.moderate.current system.wounds.moderate.lastingCount)}}is-disabled{{/if}}" data-action="adjustWoundCurrent" data-severity="moderate" data-delta="-1" title="{{localize 'CYPHER2026.Wounds.Decrease'}}">-</button>
                <button type="button" class="btn-step-mini {{#if (gte system.wounds.moderate.current system.wounds.moderate.max)}}is-disabled{{/if}}" data-action="adjustWoundCurrent" data-severity="moderate" data-delta="1" title="{{localize 'CYPHER2026.Wounds.Increase'}}">+</button>
              </div>
            </div>
            <div class="wound-qty-group">
              <span class="qty-label">{{localize "CYPHER2026.Wounds.Qty"}}</span>
              <button type="button" class="btn-step-mini {{#if (lte system.wounds.moderate.max 1)}}is-disabled{{/if}}" data-action="adjustWoundMax" data-severity="moderate" data-delta="-1" title="{{localize 'CYPHER2026.Wounds.DecreaseCapacity'}}"><i class="fas fa-chevron-left"></i></button>
              <span class="qty-val-display">{{system.wounds.moderate.max}}</span>
              <button type="button" class="btn-step-mini {{#if (gte system.wounds.moderate.max 10)}}is-disabled{{/if}}" data-action="adjustWoundMax" data-severity="moderate" data-delta="1" title="{{localize 'CYPHER2026.Wounds.IncreaseCapacity'}}"><i class="fas fa-chevron-right"></i></button>
            </div>
          </div>

          <div class="wound-pills-row-wrap">
            <div class="wound-pills-row">
              {{#times system.wounds.moderate.max}}
              <button type="button" class="pill-tracker-btn {{#if (lte this ../system.wounds.moderate.current)}}checked{{/if}} {{#if (lte this ../system.wounds.moderate.lastingCount)}}lasting-wound{{/if}}" data-action="toggleWound" data-severity="moderate" data-index="{{this}}" title="{{#if (lte this ../system.wounds.moderate.lastingCount)}}{{localize 'CYPHER2026.Wounds.LastingTooltip'}}{{/if}}">{{this}}</button>
              {{/times}}
            </div>
            <button type="button" class="btn-micro-reset" data-action="resetWoundSeverity" data-severity="moderate" title="{{localize 'CYPHER2026.Wounds.Reset'}}"><i class="fas fa-rotate-left"></i></button>
          </div>

          {{#if system.wounds.moderate.alert}}
          <div class="wound-alert-banner {{system.wounds.moderate.alert.level}}">
            <i class="fas {{system.wounds.moderate.alert.icon}}"></i>
            <span>{{system.wounds.moderate.alert.text}}</span>
          </div>
          {{/if}}
        </div>

        <!-- MAJOR WOUNDS -->
        <div class="wound-severity-block">
          <div class="wound-top-control-row">
            <div class="wound-title-group">
              <span class="wound-name">{{localize "CYPHER2026.Wounds.Major"}}</span>
              <div class="wound-step-btns">
                <button type="button" class="btn-step-mini {{#if (lte system.wounds.major.current system.wounds.major.lastingCount)}}is-disabled{{/if}}" data-action="adjustWoundCurrent" data-severity="major" data-delta="-1" title="{{localize 'CYPHER2026.Wounds.Decrease'}}">-</button>
                <button type="button" class="btn-step-mini {{#if (gte system.wounds.major.current system.wounds.major.max)}}is-disabled{{/if}}" data-action="adjustWoundCurrent" data-severity="major" data-delta="1" title="{{localize 'CYPHER2026.Wounds.Increase'}}">+</button>
              </div>
            </div>
            <div class="wound-qty-group">
              <span class="qty-label">{{localize "CYPHER2026.Wounds.Qty"}}</span>
              <button type="button" class="btn-step-mini {{#if (lte system.wounds.major.max 1)}}is-disabled{{/if}}" data-action="adjustWoundMax" data-severity="major" data-delta="-1" title="{{localize 'CYPHER2026.Wounds.DecreaseCapacity'}}"><i class="fas fa-chevron-left"></i></button>
              <span class="qty-val-display">{{system.wounds.major.max}}</span>
              <button type="button" class="btn-step-mini {{#if (gte system.wounds.major.max 10)}}is-disabled{{/if}}" data-action="adjustWoundMax" data-severity="major" data-delta="1" title="{{localize 'CYPHER2026.Wounds.IncreaseCapacity'}}"><i class="fas fa-chevron-right"></i></button>
            </div>
          </div>

          <div class="wound-pills-row-wrap">
            <div class="wound-pills-row">
              {{#times system.wounds.major.max}}
              <button type="button" class="pill-tracker-btn {{#if (lte this ../system.wounds.major.current)}}checked{{/if}} {{#if (lte this ../system.wounds.major.lastingCount)}}lasting-wound{{/if}}" data-action="toggleWound" data-severity="major" data-index="{{this}}" title="{{#if (lte this ../system.wounds.major.lastingCount)}}{{localize 'CYPHER2026.Wounds.LastingTooltip'}}{{/if}}">{{this}}</button>
              {{/times}}
            </div>
            <button type="button" class="btn-micro-reset" data-action="resetWoundSeverity" data-severity="major" title="{{localize 'CYPHER2026.Wounds.Reset'}}"><i class="fas fa-rotate-left"></i></button>
          </div>

          {{#if system.wounds.major.alert}}
          <div class="wound-alert-banner {{system.wounds.major.alert.level}}">
            <i class="fas {{system.wounds.major.alert.icon}}"></i>
            <span>{{system.wounds.major.alert.text}}</span>
          </div>
          {{/if}}
        </div>
      </div>
    </div>

    <!-- 2. RECOVERY ROLLS CARD -->
    <div class="sub-panel-card book-callout-border recovery-panel-card">
      <div class="panel-card-header">
        <div>
          <span class="sub-title-tag">{{localize "CYPHER2026.Recovery.Tag"}}</span>
          <h3 class="panel-heading">{{localize "CYPHER2026.Recovery.Heading"}}</h3>
        </div>
        <i class="fas fa-heart icon-recovery"></i>
      </div>

      <div class="recovery-formula-control-row">
        <div class="recovery-formula-left-tools">
          <div class="stepper-subgroup">
            <button type="button" class="btn-step-mini {{#if (lte system.recoveries.diceNum 0)}}is-disabled{{/if}}" data-action="adjustRecoveryDice" data-delta="-1" title="{{localize 'CYPHER2026.Recovery.DecreaseDice'}}"><i class="fas fa-chevron-down"></i></button>
            <button type="button" class="btn-step-mini {{#if (gte system.recoveries.diceNum 6)}}is-disabled{{/if}}" data-action="adjustRecoveryDice" data-delta="1" title="{{localize 'CYPHER2026.Recovery.IncreaseDice'}}"><i class="fas fa-chevron-up"></i></button>
          </div>

          <div class="formula-display-box">
            <input type="text" class="recovery-formula-input auto-math" name="system.recoveries.formula" value="{{system.recoveries.formula}}" title="{{localize 'CYPHER2026.Recovery.FormulaTitle'}}" autocomplete="off" />
          </div>

          <div class="stepper-subgroup">
            <button type="button" class="btn-step-mini {{#if (lte system.recoveries.bonus 1)}}is-disabled{{/if}}" data-action="adjustRecoveryBonus" data-delta="-1" title="{{localize 'CYPHER2026.Recovery.DecreaseBonus'}}">-</button>
            <button type="button" class="btn-step-mini {{#if (gte system.recoveries.bonus 99)}}is-disabled{{/if}}" data-action="adjustRecoveryBonus" data-delta="1" title="{{localize 'CYPHER2026.Recovery.IncreaseBonus'}}">+</button>
          </div>
        </div>

        <div class="recovery-formula-right-actions">
          <button type="button" class="btn-rally-action" data-action="openRallyDialog" title="{{localize 'CYPHER2026.Rally.Title'}}">
            <i class="fas fa-flag"></i> RALLY
          </button>
          <button type="button" class="btn-treatment-action" data-action="openTreatmentDialog" title="{{localize 'CYPHER2026.Treatment.Title'}}">
            <i class="fas fa-kit-medical"></i> TREATMENT
          </button>
          <button type="button" class="btn-micro-reset" data-action="resetAllRecoveries" title="{{localize 'CYPHER2026.Recovery.ResetAll'}}">
            <i class="fas fa-rotate-left"></i>
          </button>
        </div>
      </div>

      <!-- GRADE 2x2 -->
      <div class="recovery-trackers-grid">
        <!-- 1 ACTION -->
        <div class="recovery-category-block">
          <div class="rec-cat-header">
            <button type="button" class="btn-rec-roll-label {{#if (gte system.recoveries.actionCurrent system.recoveries.actionMax)}}is-disabled{{/if}}" data-action="rollRecoveryCategory" data-type="action" title="{{localize 'CYPHER2026.Recovery.RollTimeTitle' time='1 Action'}}">
              <i class="fas fa-dice-d20"></i> 1 Action
            </button>
            <div class="rec-qty-steppers">
              <button type="button" class="btn-step-micro {{#if (lte system.recoveries.actionMax 1)}}is-disabled{{/if}}" data-action="adjustRecoveryCategoryMax" data-type="action" data-delta="-1" title="{{localize 'CYPHER2026.Wounds.DecreaseCapacity'}}">-</button>
              <button type="button" class="btn-step-micro {{#if (gte system.recoveries.actionMax 3)}}is-disabled{{/if}}" data-action="adjustRecoveryCategoryMax" data-type="action" data-delta="1" title="{{localize 'CYPHER2026.Wounds.IncreaseCapacity'}}">+</button>
            </div>
          </div>
          <div class="rec-pills">
            {{#times system.recoveries.actionMax}}
            <button type="button" class="pill-tracker-btn {{#if (lte this ../system.recoveries.actionCurrent)}}checked{{/if}}" data-action="toggleRecovery" data-type="action" data-index="{{this}}">{{this}}</button>
            {{/times}}
          </div>
        </div>

        <!-- 10 MINUTES -->
        <div class="recovery-category-block">
          <div class="rec-cat-header">
            <button type="button" class="btn-rec-roll-label {{#if (gte system.recoveries.tenMinCurrent system.recoveries.tenMinMax)}}is-disabled{{/if}}" data-action="rollRecoveryCategory" data-type="tenMin" title="{{localize 'CYPHER2026.Recovery.RollTimeTitle' time='10 Min'}}">
              <i class="fas fa-dice-d20"></i> 10 Min
            </button>
            <div class="rec-qty-steppers">
              <button type="button" class="btn-step-micro {{#if (lte system.recoveries.tenMinMax 1)}}is-disabled{{/if}}" data-action="adjustRecoveryCategoryMax" data-type="tenMin" data-delta="-1" title="{{localize 'CYPHER2026.Wounds.DecreaseCapacity'}}">-</button>
              <button type="button" class="btn-step-micro {{#if (gte system.recoveries.tenMinMax 3)}}is-disabled{{/if}}" data-action="adjustRecoveryCategoryMax" data-type="tenMin" data-delta="1" title="{{localize 'CYPHER2026.Wounds.IncreaseCapacity'}}">+</button>
            </div>
          </div>
          <div class="rec-pills">
            {{#times system.recoveries.tenMinMax}}
            <button type="button" class="pill-tracker-btn {{#if (lte this ../system.recoveries.tenMinCurrent)}}checked{{/if}}" data-action="toggleRecovery" data-type="tenMin" data-index="{{this}}">{{this}}</button>
            {{/times}}
          </div>
        </div>

        <!-- 1 HOUR -->
        <div class="recovery-category-block">
          <div class="rec-cat-header">
            <button type="button" class="btn-rec-roll-label {{#if (gte system.recoveries.oneHourCurrent system.recoveries.oneHourMax)}}is-disabled{{/if}}" data-action="rollRecoveryCategory" data-type="oneHour" title="{{localize 'CYPHER2026.Recovery.RollTimeTitle' time='1 Hour'}}">
              <i class="fas fa-dice-d20"></i> 1 Hour
            </button>
            <div class="rec-qty-steppers">
              <button type="button" class="btn-step-micro {{#if (lte system.recoveries.oneHourMax 1)}}is-disabled{{/if}}" data-action="adjustRecoveryCategoryMax" data-type="oneHour" data-delta="-1" title="{{localize 'CYPHER2026.Wounds.DecreaseCapacity'}}">-</button>
              <button type="button" class="btn-step-micro {{#if (gte system.recoveries.oneHourMax 3)}}is-disabled{{/if}}" data-action="adjustRecoveryCategoryMax" data-type="oneHour" data-delta="1" title="{{localize 'CYPHER2026.Wounds.IncreaseCapacity'}}">+</button>
            </div>
          </div>
          <div class="rec-pills">
            {{#times system.recoveries.oneHourMax}}
            <button type="button" class="pill-tracker-btn {{#if (lte this ../system.recoveries.oneHourCurrent)}}checked{{/if}}" data-action="toggleRecovery" data-type="oneHour" data-index="{{this}}">{{this}}</button>
            {{/times}}
          </div>
        </div>

        <!-- 10 HOURS -->
        <div class="recovery-category-block">
          <div class="rec-cat-header">
            <button type="button" class="btn-rec-roll-label {{#if (gte system.recoveries.tenHourCurrent system.recoveries.tenHourMax)}}is-disabled{{/if}}" data-action="rollRecoveryCategory" data-type="tenHour" title="{{localize 'CYPHER2026.Recovery.RollTimeTitle' time='10 Hours'}}">
              <i class="fas fa-dice-d20"></i> 10 Hours
            </button>
            <div class="rec-qty-steppers">
              <button type="button" class="btn-step-micro {{#if (lte system.recoveries.tenHourMax 1)}}is-disabled{{/if}}" data-action="adjustRecoveryCategoryMax" data-type="tenHour" data-delta="-1" title="{{localize 'CYPHER2026.Wounds.DecreaseCapacity'}}">-</button>
              <button type="button" class="btn-step-micro {{#if (gte system.recoveries.tenHourMax 3)}}is-disabled{{/if}}" data-action="adjustRecoveryCategoryMax" data-type="tenHour" data-delta="1" title="{{localize 'CYPHER2026.Wounds.IncreaseCapacity'}}">+</button>
            </div>
          </div>
          <div class="rec-pills">
            {{#times system.recoveries.tenHourMax}}
            <button type="button" class="pill-tracker-btn {{#if (lte this ../system.recoveries.tenHourCurrent)}}checked{{/if}}" data-action="toggleRecovery" data-type="tenHour" data-index="{{this}}">{{this}}</button>
            {{/times}}
          </div>
        </div>
      </div>
    </div>

    <!-- 3. LASTING / PERMANENT DAMAGE CARD -->
    <div class="sub-panel-card book-callout-border">
      <div class="panel-card-header">
        <div>
          <span class="sub-title-tag">{{localize "CYPHER2026.Combat.OptionalRuleTag"}}</span>
          <h3 class="panel-heading">{{localize "CYPHER2026.Combat.LastingDamageHeading"}}</h3>
        </div>
        <button type="button" class="btn-add-circle" data-action="openAddLastingDamageDialog" title="{{localize 'CYPHER2026.Damage.Title'}}"><i class="fas fa-plus"></i></button>
      </div>

      <div class="panel-items-list">
        {{#each categorizedItems.damageItems as |item|}}
        <div class="lasting-damage-row {{#if item.system.archived}}is-archived{{/if}}" data-item-id="{{item.id}}" data-mouse-tooltip="<div class='tooltip-header'>{{item.name}}</div><div class='tooltip-content'>{{item.system.description}}</div>">
          <div class="damage-left" data-action="openDamageChatPrompt" title="{{localize 'CYPHER2026.Common.Send'}}" style="cursor:pointer;">
            <img src="{{item.img}}" class="damage-icon" width="22" height="22" style="border-radius:3px;" />
            <span class="damage-name">{{item.name}}</span>
            <span class="damage-type-pill {{item.system.damageType}}">
              {{item.system.damageType}} ({{item.system.severity}})
            </span>
          </div>

          <div class="damage-counter-group">
            <button type="button" class="btn-damage-heal" data-action="healLastingDamage" data-item-id="{{item.id}}" title="{{localize 'CYPHER2026.Damage.HealTooltip'}}">
              <i class="fas fa-kit-medical"></i> {{localize 'CYPHER2026.Damage.Heal'}}
            </button>

            <button type="button" class="btn-action-icon btn-archive-toggle" data-action="itemArchiveOrDelete" title="{{#if item.system.archived}}{{localize 'CYPHER2026.Common.DeleteOrUnarchive'}}{{else}}{{localize 'CYPHER2026.Common.DeleteOrArchive'}}{{/if}}">
              <i class="fas fa-box-archive archive-icon"></i>
              <i class="fas fa-trash trash-icon"></i>
            </button>
          </div>
        </div>
        {{else}}
        <div class="empty-placeholder">{{localize 'CYPHER2026.Damage.NoActive'}}</div>
        {{/each}}
      </div>
    </div>
  </div>

  <!-- COLUNA DIREITA: ATTACKS -> ARMOR & SHIELDS -->
  <div class="combat-column-right">

    <!-- 1. ATTACKS CARD -->
    <div class="sub-panel-card">
      <div class="panel-card-header">
        <div>
          <span class="sub-title-tag">{{localize "CYPHER2026.Combat.OffenseTag"}}</span>
          <h3 class="panel-heading">{{localize "CYPHER2026.Combat.AttacksHeading"}}</h3>
        </div>
        <button type="button" class="btn-add-circle" data-action="openAddAttackDialog" title="{{localize 'CYPHER2026.Dialog.AddAttackTitle'}}">
          <i class="fas fa-plus"></i>
        </button>
      </div>

      <div class="panel-items-list">
        {{#each categorizedItems.attacks as |attack|}}
        <div class="attack-entry-card {{#if attack.system.archived}}is-archived{{/if}}"
             data-item-id="{{attack.id}}"
             data-mouse-tooltip="<div class='tooltip-header'>{{attack.name}}{{#if attack.system.archived}} ({{localize 'CYPHER2026.Skills.ArchivedBadge'}}){{/if}}</div><div class='tooltip-content'>{{attack.system.description}}</div>">

          <!-- ESQUERDA: ÍCONE + TÍTULO COM DANO NA MESMA LINHA + METADADOS ABAIXO -->
          <div class="attack-left" data-action="openAttackChatPrompt" title="{{localize 'CYPHER2026.Common.PostToChat'}}" style="cursor:pointer;">
            <img class="attack-icon" src="{{attack.img}}" width="28" height="28" alt="{{attack.name}}" />

            <div class="attack-details">
              <!-- LINHA 1: NOME + DANO -->
              <div class="attack-header-line">
                <span class="attack-title">{{attack.name}}</span>
                <span class="dmg-tag"><strong class="dmg-num">{{attack.system.damage}}</strong> {{localize "CYPHER2026.Combat.DmgTag"}}</span>
              </div>

              <!-- LINHA 2: METADADOS -->
              <div class="attack-sub-meta">
                {{#if (eq attack.type "ability")}}
                  <!-- METADADOS DE HABILIDADE DE ATAQUE -->
                  <span class="meta-tag">{{localize (concat "CYPHER2026.AbilityOrigin." (lower attack.system.origin))}}</span> ·
                  <span class="meta-tag">TIER {{attack.system.tier}}</span> ·
                  <span class="meta-tag">{{#if attack.system.range}}{{localize (concat "CYPHER2026.Range." attack.system.range)}}{{else}}{{localize "CYPHER2026.Range.short"}}{{/if}}</span> ·
                  <span class="meta-rank {{attack.system.rank}}">{{#if attack.system.rank}}{{localize (concat "CYPHER2026.SkillRank." attack.system.rank)}}{{else}}{{localize "CYPHER2026.SkillRank.practiced"}}{{/if}}</span>
                  {{#if (and (gt attack.system.cost 0) (ne attack.system.pool "none"))}}
                    · <span class="meta-cost">{{attack.system.cost}} {{localize (concat "CYPHER2026.Stats." (lower attack.system.pool))}}</span>
                  {{/if}}
                {{else}}
                  <!-- METADADOS DE ARMA / ATAQUE FÍSICO -->
                  {{#if (and attack.system.weaponCategory (ne attack.system.weaponCategory "no"))}}
                    <span class="meta-tag">{{localize (concat "CYPHER2026.WeaponCategory." attack.system.weaponCategory)}}</span> ·
                  {{/if}}
                  <span class="meta-tag">{{#if attack.system.range}}{{localize (concat "CYPHER2026.Range." attack.system.range)}}{{else}}{{localize "CYPHER2026.Range.immediate"}}{{/if}}</span> ·
                  <span class="meta-rank {{attack.system.rank}}">{{#if attack.system.rank}}{{localize (concat "CYPHER2026.SkillRank." attack.system.rank)}}{{else}}{{localize "CYPHER2026.SkillRank.practiced"}}{{/if}}</span>
                  {{#if (and (gt attack.system.cost 0) (ne attack.system.pool "none"))}}
                    · <span class="meta-cost">{{attack.system.cost}} {{localize (concat "CYPHER2026.Stats." (lower attack.system.pool))}}</span>
                  {{/if}}
                {{/if}}
              </div>
            </div>
          </div>

          <!-- DIREITA: AÇÕES (D20, EDITAR, ARQUIVAR) -->
          <div class="attack-right">
            <button type="button" class="btn-action-icon btn-roll-d20 {{#if attack.system.archived}}is-disabled{{/if}}" data-action="rollAttackItem" title="{{localize 'CYPHER2026.Header.RollTask'}}">
              <i class="fas fa-dice-d20"></i>
            </button>

            <button type="button" class="btn-action-icon" data-action="openEditAttackDialog" title="{{localize 'CYPHER2026.Common.Edit'}}">
              <i class="fas fa-edit"></i>
            </button>

            <button type="button" class="btn-action-icon btn-archive-toggle" data-action="itemArchiveOrDelete" title="{{#if attack.system.archived}}{{localize 'CYPHER2026.Common.DeleteOrUnarchive'}}{{else}}{{localize 'CYPHER2026.Common.DeleteOrArchive'}}{{/if}}">
              <i class="fas fa-box-archive archive-icon"></i>
              <i class="fas fa-trash trash-icon"></i>
            </button>
          </div>
        </div>
        {{else}}
        <div class="empty-placeholder">{{localize "CYPHER2026.Combat.NoAttacks"}}</div>
        {{/each}}
      </div>
    </div>

    <!-- 2. ARMOR & SHIELDS CARD -->
    <div class="sub-panel-card">
      <div class="panel-card-header">
        <div>
          <span class="sub-title-tag">{{localize "CYPHER2026.Combat.DefenseTag"}}</span>
          <h3 class="panel-heading">{{localize "CYPHER2026.Armor.Heading"}}</h3>
        </div>
        <button type="button" class="btn-add-circle" data-action="openAddArmorDialog" title="{{localize 'CYPHER2026.Dialog.AddArmorTitle'}}">
          <i class="fas fa-plus"></i>
        </button>
      </div>

      <div class="panel-items-list">
        {{#each categorizedItems.armors as |armor|}}
        <div class="armor-entry-card {{#if armor.system.archived}}is-archived{{/if}}"
             data-item-id="{{armor.id}}"
             data-mouse-tooltip="<div class='tooltip-header'>{{armor.name}}{{#if armor.system.archived}} ({{localize 'CYPHER2026.Skills.ArchivedBadge'}}){{/if}}</div><div class='tooltip-content'>{{armor.system.description}}</div>">

          <!-- 1ª LINHA: ESQUERDA (ÍCONE + NOME) | DIREITA (PÍLULA FREE USE) -->
          <div class="armor-header-row">
            <div class="armor-title-wrap" data-action="openArmorChatPrompt" title="{{localize 'CYPHER2026.Common.PostToChat'}}" style="cursor:pointer;">
              <img src="{{armor.img}}" width="24" height="24" class="armor-icon" alt="{{armor.name}}" />
              <span class="armor-name">{{armor.name}}</span>
            </div>

            <div class="armor-header-right">
              <button type="button" class="tag-status-btn {{#if armor.system.freelyUse}}free-use{{else}}not-free{{/if}}" data-action="toggleArmorFreelyUse" title="{{localize 'CYPHER2026.Armor.ToggleFreeUseTitle'}}">
                {{#if armor.system.freelyUse}}
                  <i class="fas fa-check"></i> {{localize 'CYPHER2026.Armor.FreelyUse'}}
                {{else}}
                  <i class="fas fa-xmark"></i> {{localize 'CYPHER2026.Armor.NotFreelyUse'}}
                {{/if}}
              </button>
            </div>
          </div>

          <!-- 2ª LINHA: ESQUERDA (TAGS OU WOUNDS) | DIREITA (AÇÕES) -->
          <div class="armor-body-row">
            <div class="armor-body-left">
              {{#if (eq armor.system.armorType "shield")}}
                <!-- TRACKER DE FERIMENTOS DO ESCUDO (3 MINOR, 2 MODERATE, 1 MAJOR) -->
                <div class="shield-wound-trackers">
                  <div class="shield-track-group">
                    <span class="track-label">MIN</span>
                    <div class="track-pills">
                      {{#times 3}}
                        <button type="button" class="mini-pill {{#if (lte this ../armor.system.wounds.minor.current)}}checked{{/if}}" data-action="toggleShieldWound" data-item-id="{{../armor.id}}" data-severity="minor" data-index="{{this}}" title="{{localize 'CYPHER2026.Wounds.Minor'}} {{this}}">{{this}}</button>
                      {{/times}}
                    </div>
                  </div>

                  <div class="shield-track-group">
                    <span class="track-label">MOD</span>
                    <div class="track-pills">
                      {{#times 2}}
                        <button type="button" class="mini-pill {{#if (lte this ../armor.system.wounds.moderate.current)}}checked{{/if}}" data-action="toggleShieldWound" data-item-id="{{../armor.id}}" data-severity="moderate" data-index="{{this}}" title="{{localize 'CYPHER2026.Wounds.Moderate'}} {{this}}">{{this}}</button>
                      {{/times}}
                    </div>
                  </div>

                  <div class="shield-track-group">
                    <span class="track-label">MAJ</span>
                    <div class="track-pills">
                      <button type="button" class="mini-pill major {{#if (gte armor.system.wounds.major.current 1)}}checked{{/if}}" data-action="toggleShieldWound" data-item-id="{{armor.id}}" data-severity="major" data-index="1" title="{{localize 'CYPHER2026.Wounds.Major'}} 1 ({{localize 'CYPHER2026.Armor.ShieldBreakAlert'}})">1</button>
                    </div>
                  </div>
                </div>
              {{else}}
                <!-- TAGS DE MODIFICADORES DE ARMADURA (LIGHT, MEDIUM, HEAVY) -->
                <div class="armor-modifiers-tags">
                  {{#if (eq armor.system.armorType "light")}}
                    <span class="pill-mod positive">{{localize "CYPHER2026.Armor.BlockMod" steps="1" stepLabel=(localize "CYPHER2026.Armor.StepSingular")}}</span>
                    <span class="pill-mod negative">{{localize "CYPHER2026.Armor.DodgeMod" steps="1" stepLabel=(localize "CYPHER2026.Armor.StepSingular")}}</span>
                  {{else if (eq armor.system.armorType "medium")}}
                    <span class="pill-mod positive">{{localize "CYPHER2026.Armor.BlockMod" steps="2" stepLabel=(localize "CYPHER2026.Armor.StepPlural")}}</span>
                    <span class="pill-mod negative">{{localize "CYPHER2026.Armor.DodgeMod" steps="2" stepLabel=(localize "CYPHER2026.Armor.StepPlural")}}</span>
                  {{else if (eq armor.system.armorType "heavy")}}
                    <span class="pill-mod positive">{{localize "CYPHER2026.Armor.BlockMod" steps="3" stepLabel=(localize "CYPHER2026.Armor.StepPlural")}}</span>
                    <span class="pill-mod negative">{{localize "CYPHER2026.Armor.DodgeMod" steps="3" stepLabel=(localize "CYPHER2026.Armor.StepPlural")}}</span>
                  {{/if}}
                </div>
              {{/if}}
            </div>

            <!-- BOTÕES DE AÇÃO: BLOCK WOUND PARA ESCUDO, OU BLOCK/DODGE PARA ARMADURA -->
            <div class="armor-body-right">
              {{#if (eq armor.system.armorType "shield")}}
                <!-- BOTÃO ESPECÍFICO DO ESCUDO: BLOCK WOUND -->
                <button type="button" class="btn-def-action btn-shield-block {{#if armor.system.archived}}is-disabled{{/if}}" data-action="openBlockWoundDialog" data-item-id="{{armor.id}}" title="{{localize 'CYPHER2026.Shield.BlockWoundTooltip'}}">
                  <i class="fas fa-shield-heart"></i> {{localize 'CYPHER2026.Shield.BlockWoundBtn'}}
                </button>
              {{else}}
                <!-- BOTÕES DA ARMADURA: BLOCK & DODGE -->
                <button type="button" class="btn-def-action btn-block-roll {{#if armor.system.archived}}is-disabled{{/if}}" data-action="rollArmorDefense" data-mode="block" title="{{localize 'CYPHER2026.Armor.RollBlock'}}">
                  <i class="fas fa-shield"></i> {{localize 'CYPHER2026.Armor.BlockShort'}}
                </button>

                <button type="button" class="btn-def-action btn-dodge-roll {{#if armor.system.archived}}is-disabled{{/if}}" data-action="rollArmorDefense" data-mode="dodge" title="{{localize 'CYPHER2026.Armor.RollDodge'}}">
                  <i class="fas fa-person-running"></i> {{localize 'CYPHER2026.Armor.DodgeShort'}}
                </button>
              {{/if}}

              <button type="button" class="btn-action-icon" data-action="openEditArmorDialog" title="{{localize 'CYPHER2026.Common.Edit'}}">
                <i class="fas fa-edit"></i>
              </button>

              <button type="button" class="btn-action-icon btn-archive-toggle" data-action="itemArchiveOrDelete" title="{{#if armor.system.archived}}{{localize 'CYPHER2026.Common.DeleteOrUnarchive'}}{{else}}{{localize 'CYPHER2026.Common.DeleteOrArchive'}}{{/if}}">
                <i class="fas fa-box-archive archive-icon"></i>
                <i class="fas fa-trash trash-icon"></i>
              </button>
            </div>
          </div>
        </div>
        {{else}}
        <div class="empty-placeholder">{{localize "CYPHER2026.Armor.NoArmor"}}</div>
        {{/each}}
      </div>
    </div>

  </div>
</div>`,

  // -------------------------------------------------------------
  // 4. STYLES / TAB-COMBAT.CSS
  // -------------------------------------------------------------
  "styles/components/tab-combat.css": `@layer components {
  .cypher2026.sheet.actor.pc {
    .combat-layout {
      display: grid;
      grid-template-columns: 50% 50%;
      gap: 8px;
    }

    /* Wounds */
    .wounds-category-block {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .wound-severity-block {
        background: var(--c-bg-card);
        border: 1px solid var(--c-border-subtle);
        border-radius: 6px;
        padding: 6px 8px;
        display: flex;
        flex-direction: column;
        gap: 5px;

        .wound-top-control-row {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .wound-title-group {
            display: flex;
            align-items: center;
            gap: 5px;

            .wound-name {
              font-size: 0.75rem;
              font-weight: 800;
              color: var(--c-text-primary);
              text-transform: uppercase;
              letter-spacing: 0.2px;
            }

            .wound-step-btns {
              display: flex;
              gap: 3px;
            }
          }

          .wound-qty-group {
            display: flex;
            align-items: center;
            gap: 3px;
            font-size: 0.68rem;
            color: var(--c-text-muted);

            .qty-label {
              font-weight: 800;
              text-transform: uppercase;
              font-size: 0.62rem;
            }

            .qty-val-display {
              font-weight: 900;
              color: var(--c-text-primary);
              min-width: 16px;
              text-align: center;
              font-size: 0.8rem;
            }
          }

          .btn-step-mini {
            background: var(--c-bg-input);
            border: 1px solid var(--c-border-subtle);
            color: var(--c-text-primary);
            border-radius: 3px;
            width: 18px;
            height: 18px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 0.82rem;
            font-weight: 900;
            line-height: 1;
            padding: 0;

            &:hover {
              background: var(--c-bg-hover);
              color: var(--c-neon-red);
            }
          }
        }

        .wound-pills-row-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4px;

          .wound-pills-row {
            display: flex;
            gap: 3px;
            flex-wrap: wrap;
            flex: 1;

            .pill-tracker-btn {
              background: var(--c-bg-input);
              border: 1px solid var(--c-border-card);
              color: var(--c-text-primary);
              border-radius: 3px;
              width: 20px;
              height: 20px;
              font-size: 0.68rem;
              font-weight: 800;
              cursor: pointer;

              /* Ferimento Normal: Vermelho */
              &.checked {
                background: var(--c-neon-red);
                color: #ffffff;
                border-color: var(--c-neon-red);
              }

              /* Ferimento Duradouro / Permanente: Dourado Âmbar Brilhante */
              &.checked.lasting-wound {
                background: #d97706 !important;
                color: #000000 !important;
                border-color: #fbbf24 !important;
                box-shadow: 0 0 6px rgba(245, 158, 11, 0.7);
              }
            }
          }

          .btn-micro-reset {
            background: transparent;
            border: none;
            color: var(--c-text-muted);
            cursor: pointer;
            padding: 1px 3px;
            font-size: 0.75rem;
            &:hover { color: var(--c-text-primary); }
          }
        }

        .wound-alert-banner {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 6px;
          border-radius: 3px;
          font-size: 0.65rem;
          font-weight: 800;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &.minor-full {
            background: rgba(2, 132, 199, 0.15);
            color: #38bdf8;
            border: 1px solid rgba(2, 132, 199, 0.35);
          }

          &.moderate-full {
            background: rgba(245, 158, 11, 0.18);
            color: #fbbf24;
            border: 1px solid rgba(245, 158, 11, 0.45);
          }

          &.major-hindered {
            background: rgba(220, 38, 38, 0.2);
            color: #f87171;
            border: 1px solid rgba(220, 38, 38, 0.5);
          }

          &.dead {
            background: #450a0a;
            color: #fecaca;
            border: 1px solid #ef4444;
            box-shadow: 0 0 10px rgba(239, 68, 68, 0.45);
            font-weight: 900;
            text-transform: uppercase;
          }
        }
      }
    }

    /* Recovery */
    .recovery-panel-card {
      gap: 6px;

      .recovery-formula-control-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 4px;
        background: var(--c-bg-card);
        border: 1px solid var(--c-border-subtle);
        border-radius: 6px;
        padding: 3px 5px;

        .recovery-formula-left-tools {
          display: flex;
          align-items: center;
          gap: 3px;

          .stepper-subgroup {
            display: flex;
            flex-direction: row;
            gap: 2px;
            align-items: center;

            .btn-step-mini {
              background: var(--c-bg-input);
              border: 1px solid var(--c-border-subtle);
              color: var(--c-text-primary);
              border-radius: 3px;
              width: 18px;
              height: 18px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              font-size: 0.75rem;
              font-weight: 900;
              padding: 0;

              &:hover {
                background: var(--c-bg-hover);
                color: var(--c-neon-green);
              }
            }
          }

          .formula-display-box {
            input.recovery-formula-input {
              width: 55px;
              text-align: center;
              font-family: var(--c-font-condensed);
              font-size: 0.9rem;
              font-weight: 800;
              padding: 1px 2px;
              border: 1px solid var(--c-border-subtle) !important;
              background: var(--c-bg-input) !important;
              border-radius: 3px;
            }
          }
        }

        .recovery-formula-right-actions {
          display: flex;
          align-items: center;
          gap: 3px;

          .btn-rally-action,
          .btn-treatment-action {
            border-radius: 4px;
            padding: 3px 6px;
            font-size: 0.68rem;
            font-weight: 800;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 3px;
            text-transform: uppercase;
            transition: all 0.15s ease;
            white-space: nowrap;
          }

          .btn-rally-action {
            background: rgba(245, 158, 11, 0.15);
            color: var(--c-gold);
            border: 1px solid rgba(245, 158, 11, 0.3);

            &:hover {
              background: var(--c-gold);
              color: #000;
            }
          }

          .btn-treatment-action {
            background: rgba(16, 185, 129, 0.15);
            color: var(--c-neon-green);
            border: 1px solid rgba(16, 185, 129, 0.3);

            &:hover {
              background: var(--c-neon-green);
              color: #fff;
            }
          }

          .btn-micro-reset {
            background: transparent;
            border: none;
            color: var(--c-text-muted);
            cursor: pointer;
            padding: 1px 3px;
            font-size: 0.75rem;
            &:hover { color: var(--c-text-primary); }
          }
        }
      }

      .recovery-trackers-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;

        .recovery-category-block {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3px 5px;
          background: var(--c-bg-card);
          border-radius: 4px;
          border: 1px solid var(--c-border-subtle);

          .rec-cat-header {
            display: flex;
            align-items: center;
            gap: 3px;

            .btn-rec-roll-label {
              background: transparent;
              border: none;
              font-size: 0.68rem;
              font-weight: 800;
              color: var(--c-text-primary);
              cursor: pointer;
              display: inline-flex;
              align-items: center;
              gap: 4px;
              padding: 0;
              transition: color 0.15s ease;

              i {
                color: var(--c-neon-green);
                font-size: 0.75rem;
              }

              &:hover {
                color: var(--c-neon-green);
              }
            }

            .rec-qty-steppers {
              display: flex;
              gap: 1px;

              .btn-step-micro {
                background: var(--c-bg-input);
                border: 1px solid var(--c-border-subtle);
                color: var(--c-text-muted);
                border-radius: 2px;
                width: 13px;
                height: 13px;
                font-size: 0.52rem;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                padding: 0;

                &:hover {
                  color: var(--c-text-primary);
                  background: var(--c-bg-hover);
                }
              }
            }
          }

          .rec-pills {
            display: flex;
            gap: 2px;

            .pill-tracker-btn {
              background: var(--c-bg-input);
              border: 1px solid var(--c-border-card);
              color: var(--c-text-primary);
              border-radius: 3px;
              width: 18px;
              height: 18px;
              font-size: 0.65rem;
              font-weight: 800;
              cursor: pointer;

              &.checked {
                background: var(--c-neon-green);
                color: #ffffff;
                border-color: var(--c-neon-green);
              }
            }
          }
        }
      }
    }

    /* Lasting / Permanent Damage Card */
    .lasting-damage-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--c-bg-card);
      border: 1px solid var(--c-border-subtle);
      border-radius: 6px;
      padding: 5px 8px;
      margin-bottom: 4px;
      transition: all 0.15s ease;

      &.is-archived {
        opacity: 0.45;
        border-style: dashed;
        filter: grayscale(0.5);

        .damage-name {
          text-decoration: line-through;
          color: var(--c-text-muted);
        }
      }

      .damage-left {
        display: flex;
        align-items: center;
        gap: 6px;

        .damage-name {
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--c-text-primary);
        }

        .damage-type-pill {
          font-size: 0.6rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 1px 5px;
          border-radius: 3px;

          &.lasting { background: rgba(245, 158, 11, 0.15); color: var(--c-gold); border: 1px solid rgba(245, 158, 11, 0.3); }
          &.permanent { background: rgba(220, 38, 38, 0.15); color: var(--c-neon-red); border: 1px solid rgba(220, 38, 38, 0.3); }
        }
      }

      .damage-counter-group {
        display: flex;
        align-items: center;
        gap: 4px;

        .btn-damage-heal {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: var(--c-neon-green);
          border-radius: 3px;
          padding: 2px 6px;
          font-size: 0.68rem;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 3px;
          cursor: pointer;

          &:hover {
            background: var(--c-neon-green);
            color: #ffffff;
          }
        }

        .btn-action-icon {
          background: transparent;
          border: none;
          color: var(--c-text-muted);
          cursor: pointer;
          padding: 2px;
          font-size: 0.8rem;

          &:hover { color: var(--c-neon-red); }
          .archive-icon { display: none; }
        }
      }
    }

    /* Attack Entry Card */
    .attack-entry-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--c-bg-card);
      border: 1px solid var(--c-border-subtle);
      border-radius: 6px;
      padding: 5px 8px;
      margin-bottom: 4px;
      gap: 6px;
      transition: all 0.15s ease;

      &:hover {
        border-color: var(--c-border-card);
        background: var(--c-bg-hover);
      }

      /* Ataque Arquivado */
      &.is-archived {
        opacity: 0.45;
        background: var(--c-bg-panel);
        border-style: dashed;
        filter: grayscale(0.5);

        .attack-title {
          text-decoration: line-through;
          color: var(--c-text-muted);
        }

        &:hover {
          opacity: 0.85;
          filter: grayscale(0);
        }
      }

      .attack-left {
        display: flex;
        align-items: center;
        gap: 6px;
        flex: 1 1 auto;
        min-width: 0;

        .attack-icon {
          border-radius: 4px;
          border: 1px solid var(--c-border-card);
          object-fit: cover;
          flex-shrink: 0;
        }

        .attack-details {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
          flex: 1 1 auto;

          /* LINHA 1: NOME + DANO */
          .attack-header-line {
            display: flex;
            align-items: center;
            gap: 6px;

            .attack-title {
              font-size: 0.82rem;
              font-weight: 800;
              color: var(--c-text-primary);
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .dmg-tag {
              color: var(--c-neon-red);
              font-size: 0.58rem;
              font-weight: 800;
              white-space: nowrap;
              background: rgba(230, 57, 70, 0.12);
              border: 1px solid rgba(230, 57, 70, 0.3);
              padding: 1px 4px;
              border-radius: 3px;
              letter-spacing: 0.2px;
              line-height: 1.1;

              .dmg-num {
                font-size: 0.78rem;
                font-weight: 900;
              }
            }
          }

          /* LINHA 2: METADADOS MAIS COMPACTOS */
          .attack-sub-meta {
            font-size: 0.58rem;
            color: var(--c-text-muted);
            text-transform: uppercase;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 3px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            letter-spacing: 0.1px;

            .meta-rank.specialized, .meta-rank.expert { color: var(--c-neon-cyan); }
            .meta-rank.trained { color: var(--c-neon-green); }
            .meta-rank.inability { color: var(--c-neon-red); }
            .meta-cost { color: var(--c-gold); }
          }
        }
      }

      /* Lado Direito: 3 Botões mais juntos e compactos */
      .attack-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: 2px;
        flex-shrink: 0;

        .btn-action-icon {
          background: transparent;
          border: none;
          color: var(--c-text-muted);
          cursor: pointer;
          padding: 2px 2px;
          font-size: 0.8rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s ease;

          &:hover { color: var(--c-text-primary); }
          &.btn-roll-d20 { color: var(--c-neon-red); font-size: 0.88rem; }
          &.btn-roll-d20:hover { filter: brightness(1.2); }

          .trash-icon { display: none; }
          .archive-icon { display: inline-block; }
          &:hover .archive-icon { color: var(--c-gold); }
        }
      }
    }

    /* Troca Ícone para Lixeira quando ALT estiver pressionado */
    &.alt-active .attack-entry-card .btn-archive-toggle {
      .archive-icon { display: none !important; }
      .trash-icon { display: inline-block !important; color: var(--c-neon-red) !important; }
    }

    /* ARMOR & SHIELD ENTRY CARD */
    .armor-entry-card {
      background: var(--c-bg-card);
      border: 1px solid var(--c-border-subtle);
      border-radius: 6px;
      padding: 6px 8px;
      margin-bottom: 4px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      transition: all 0.15s ease;

      &:hover {
        border-color: var(--c-border-card);
        background: var(--c-bg-hover);
      }

      &.is-archived {
        opacity: 0.45;
        background: var(--c-bg-panel);
        border-style: dashed;
        filter: grayscale(0.5);

        .armor-name {
          text-decoration: line-through;
          color: var(--c-text-muted);
        }

        &:hover {
          opacity: 0.85;
          filter: grayscale(0);
        }
      }

      /* 1ª Linha: Ícone + Nome e Pílula Free Use */
      .armor-header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6px;

        .armor-title-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
          min-width: 0;

          .armor-icon {
            border-radius: 3px;
            border: 1px solid var(--c-border-card);
            object-fit: cover;
            flex-shrink: 0;
          }

          .armor-name {
            font-size: 0.82rem;
            font-weight: 800;
            color: var(--c-text-primary);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .armor-header-right {
          flex-shrink: 0;

          .tag-status-btn {
            border: none;
            border-radius: 3px;
            padding: 1px 6px;
            font-size: 0.60rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 3px;
            transition: all 0.15s ease;

            &.free-use {
              background: rgba(46, 196, 182, 0.15);
              color: var(--c-neon-green);
              border: 1px solid rgba(46, 196, 182, 0.3);
            }

            &.not-free {
              background: rgba(230, 57, 70, 0.15);
              color: var(--c-neon-red);
              border: 1px solid rgba(230, 57, 70, 0.3);
            }

            &:hover {
              filter: brightness(1.2);
              transform: scale(1.02);
            }
          }
        }
      }

      /* 2ª Linha: Tags / Shield Wounds à esquerda e Ações à direita */
      .armor-body-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6px;

        .armor-body-left {
          flex: 1 1 auto;
          min-width: 0;

          .armor-modifiers-tags {
            display: flex;
            gap: 4px;
            flex-wrap: wrap;

            .pill-mod {
              font-size: 0.58rem;
              font-weight: 800;
              padding: 1px 5px;
              border-radius: 3px;
              letter-spacing: 0.2px;

              &.positive {
                background: rgba(46, 196, 182, 0.15);
                color: var(--c-neon-green);
                border: 1px solid rgba(46, 196, 182, 0.3);
              }
              &.negative {
                background: rgba(230, 57, 70, 0.15);
                color: var(--c-neon-red);
                border: 1px solid rgba(230, 57, 70, 0.3);
              }
            }
          }

          /* Tracker de Wounds para Escudo com botões e fontes maiores */
          .shield-wound-trackers {
            display: flex;
            align-items: center;
            gap: 6px;
            flex-wrap: wrap;

            .shield-track-group {
              display: flex;
              align-items: center;
              gap: 3px;

              .track-label {
                font-size: 0.62rem;
                font-weight: 800;
                color: var(--c-text-muted);
                text-transform: uppercase;
                letter-spacing: 0.2px;
              }

              .track-pills {
                display: flex;
                gap: 2px;

                .mini-pill {
                  background: var(--c-bg-input);
                  border: 1px solid var(--c-border-card);
                  color: var(--c-text-primary);
                  border-radius: 3px;
                  width: 18px;
                  height: 18px;
                  font-size: 0.68rem;
                  font-weight: 800;
                  cursor: pointer;
                  padding: 0;
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  transition: all 0.15s ease;

                  &:hover {
                    border-color: var(--c-neon-red);
                  }

                  &.checked {
                    background: var(--c-neon-red);
                    color: #ffffff;
                    border-color: var(--c-neon-red);
                  }

                  &.major.checked {
                    background: #450a0a !important;
                    color: #fecaca !important;
                    border-color: #ef4444 !important;
                    box-shadow: 0 0 6px rgba(239, 68, 68, 0.5);
                  }
                }
              }
            }
          }
        }

        .armor-body-right {
          display: flex;
          align-items: center;
          gap: 3px;
          flex-shrink: 0;

          .btn-def-action {
            background: var(--c-bg-card);
            border: 1px solid var(--c-border-subtle);
            border-radius: 3px;
            padding: 2px 5px;
            font-size: 0.60rem;
            font-weight: 800;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 3px;
            text-transform: uppercase;
            color: var(--c-text-primary);
            transition: all 0.15s ease;

            &.btn-block-roll {
              &:hover {
                background: rgba(230, 57, 70, 0.2);
                border-color: var(--c-might);
                color: var(--c-might);
              }
            }

            &.btn-dodge-roll {
              &:hover {
                background: rgba(46, 196, 182, 0.2);
                border-color: var(--c-speed);
                color: var(--c-speed);
              }
            }

            &.btn-shield-block {
              background: rgba(245, 158, 11, 0.15);
              color: var(--c-gold);
              border-color: rgba(245, 158, 11, 0.3);

              &:hover {
                background: var(--c-gold);
                color: #000000;
                border-color: var(--c-gold);
              }
            }
          }

          .btn-action-icon {
            background: transparent;
            border: none;
            color: var(--c-text-muted);
            cursor: pointer;
            padding: 2px 2px;
            font-size: 0.8rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: color 0.15s ease;

            &:hover { color: var(--c-text-primary); }

            .trash-icon { display: none; }
            .archive-icon { display: inline-block; }
            &:hover .archive-icon { color: var(--c-gold); }
          }
        }
      }
    }

    /* Troca Ícone para Lixeira quando ALT estiver pressionado em Armor */
    &.alt-active .armor-entry-card .btn-archive-toggle {
      .archive-icon { display: none !important; }
      .trash-icon { display: inline-block !important; color: var(--c-neon-red) !important; }
    }
  }
}`,

  // -------------------------------------------------------------
  // 5. SCRIPTS / APPLICATIONS / PC-SHEET.MJS
  // -------------------------------------------------------------
  "scripts/applications/pc-sheet.mjs": `import { sortSkills, sortAbilities } from "./pc-sheet-sorting.mjs";
import { setupPcSheetListeners } from "./pc-sheet-listeners.mjs";
import { promptSkillDialog } from "../dialogs/skill-dialog.mjs";
import { promptAbilityDialog } from "../dialogs/ability-dialog.mjs";
import { promptAttackDialog } from "../dialogs/attack-dialog.mjs";
import { promptArmorDialog } from "../dialogs/armor-dialog.mjs";
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
      rollAttackItem: CypherPcSheet.#onRollAttackItem,
      rollArmorDefense: CypherPcSheet.#onRollArmorDefense,
      openBlockWoundDialog: CypherPcSheet.#onOpenBlockWoundDialog,
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
      openAttackChatPrompt: CypherPcSheet.#onOpenAttackChatPrompt,
      openArmorChatPrompt: CypherPcSheet.#onOpenArmorChatPrompt,
      openFixedSkillDialog: CypherPcSheet.#onOpenFixedSkillDialog,
      openSkillChatPrompt: CypherPcSheet.#onOpenSkillChatPrompt,
      openAbilityChatPrompt: CypherPcSheet.#onOpenAbilityChatPrompt,
      cycleSkillSort: CypherPcSheet.#onCycleSkillSort,
      openAddSkillDialog: CypherPcSheet.#onOpenAddSkillDialog,
      openEditSkillDialog: CypherPcSheet.#onOpenEditSkillDialog,
      cycleAbilitySort: CypherPcSheet.#onCycleAbilitySort,
      openAddAbilityDialog: CypherPcSheet.#onOpenAddAbilityDialog,
      openEditAbilityDialog: CypherPcSheet.#onOpenEditAbilityDialog,
      openAddAttackDialog: CypherPcSheet.#onOpenAddAttackDialog,
      openEditAttackDialog: CypherPcSheet.#onOpenEditAttackDialog,
      openAddArmorDialog: CypherPcSheet.#onOpenAddArmorDialog,
      openEditArmorDialog: CypherPcSheet.#onOpenEditArmorDialog,
      toggleArmorFreelyUse: CypherPcSheet.#onToggleArmorFreelyUse,
      toggleShieldWound: CypherPcSheet.#onToggleShieldWound,
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
      itemDelete: CypherPcSheet.#onItemDelete,
      itemArchiveOrDelete: CypherPcSheet.#onItemArchiveOrDelete
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

    const allAttacks = items.filter((i) => (i.type === "weapon" || (i.type === "ability" && i.system?.isAttack)));
    const activeAttacks = allAttacks.filter((i) => !i.system?.archived);
    const archivedAttacks = allAttacks.filter((i) => i.system?.archived);

    const allArmors = items.filter((i) => i.type === "armor");
    const activeArmors = allArmors.filter((i) => !i.system?.archived);
    const archivedArmors = allArmors.filter((i) => i.system?.archived);

    context.categorizedItems = {
      skills: sortSkills(items, skillSortMode),
      abilities: sortAbilities(items, abilitySortMode),
      damageItems: [...activeDamage, ...archivedDamage],
      attacks: [...activeAttacks, ...archivedAttacks],
      armors: [...activeArmors, ...archivedArmors],
      weapons: items.filter((i) => i.type === "weapon" && !i.system?.archived),
      equipment: items.filter((i) => i.type === "equipment" && !i.system?.isDamage && !i.system?.archived),
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

  static #onOpenAttackChatPrompt(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if (item) promptPostItemToChat({ actor: this.actor, item });
  }

  static #onOpenArmorChatPrompt(event, target) {
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

  static #onOpenAddAttackDialog() {
    promptAttackDialog({ actor: this.actor });
  }

  static #onOpenEditAttackDialog(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if (item) {
      if (item.type === "ability") promptAbilityDialog({ actor: this.actor, item });
      else promptAttackDialog({ actor: this.actor, item });
    }
  }

  static #onOpenAddArmorDialog() {
    promptArmorDialog({ actor: this.actor });
  }

  static #onOpenEditArmorDialog(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if (item) promptArmorDialog({ actor: this.actor, item });
  }

  static async #onToggleArmorFreelyUse(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if (!item) return;
    const current = Boolean(item.system?.freelyUse);
    await item.update({ "system.freelyUse": !current });
  }

  static async #onToggleShieldWound(event, target) {
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item || item.system?.armorType !== "shield") return;

    const severity = target.dataset.severity;
    const index = parseInt(target.dataset.index, 10);
    if (!severity || !index) return;

    const currentWounds = foundry.utils.duplicate(item.system?.wounds || {
      minor: { current: 0, max: 3 },
      moderate: { current: 0, max: 2 },
      major: { current: 0, max: 1 }
    });

    const currentVal = currentWounds[severity]?.current ?? 0;
    const nextVal = currentVal === index ? index - 1 : index;
    currentWounds[severity].current = nextVal;

    if (severity === "major" && nextVal >= 1) {
      await item.update({
        "system.wounds": currentWounds,
        "system.archived": true
      });
      ui.notifications.warn(game.i18n.format("CYPHER2026.Armor.ShieldBroken", { name: item.name }));
    } else {
      await item.update({ "system.wounds": currentWounds });
    }
  }

  static async #onOpenBlockWoundDialog(event, target) {
    const itemId = target.dataset.itemId || target.closest("[data-item-id]")?.dataset.itemId;
    const shield = this.actor.items.get(itemId);
    if (!shield || shield.system?.armorType !== "shield") return;

    const dialog = new foundry.applications.api.DialogV2({
      window: { title: game.i18n.format("CYPHER2026.Shield.BlockWoundDialogTitle", { name: shield.name }) },
      content: \`
        <form class="cypher-dialog-form">
          <p style="font-size:0.85rem; margin-bottom:6px;">\${game.i18n.localize("CYPHER2026.Shield.BlockWoundPrompt")}</p>
          <div class="radio-options-list">
            <label class="radio-option-item">
              <input type="radio" name="severity" value="minor" checked />
              <span><strong>1 Minor Wound</strong></span>
            </label>
            <label class="radio-option-item">
              <input type="radio" name="severity" value="moderate" />
              <span><strong>1 Moderate Wound</strong></span>
            </label>
            <label class="radio-option-item">
              <input type="radio" name="severity" value="major" />
              <span><strong>1 Major Wound</strong></span>
            </label>
          </div>
        </form>
      \`,
      buttons: [
        {
          action: "block",
          label: game.i18n.localize("CYPHER2026.Shield.BlockWoundBtn"),
          icon: "fas fa-shield-heart",
          default: true,
          callback: async (event, button) => {
            const form = button.form;
            const chosenSeverity = form.severity.value;

            const currentWounds = foundry.utils.duplicate(shield.system?.wounds || {
              minor: { current: 0, max: 3 },
              moderate: { current: 0, max: 2 },
              major: { current: 0, max: 1 }
            });

            let absorbedSeverity = chosenSeverity;
            if (chosenSeverity === "minor") {
              if (currentWounds.minor.current < 3) {
                currentWounds.minor.current += 1;
              } else if (currentWounds.moderate.current < 2) {
                currentWounds.moderate.current += 1;
                absorbedSeverity = "moderate";
              } else {
                currentWounds.major.current += 1;
                absorbedSeverity = "major";
              }
            } else if (chosenSeverity === "moderate") {
              if (currentWounds.moderate.current < 2) {
                currentWounds.moderate.current += 1;
              } else {
                currentWounds.major.current += 1;
                absorbedSeverity = "major";
              }
            } else if (chosenSeverity === "major") {
              currentWounds.major.current += 1;
            }

            const isBroken = currentWounds.major.current >= 1;

            await shield.update({
              "system.wounds": currentWounds,
              "system.archived": isBroken ? true : Boolean(shield.system?.archived)
            });

            const chosenLabel = game.i18n.localize(\`CYPHER2026.Wounds.\${chosenSeverity.charAt(0).toUpperCase() + chosenSeverity.slice(1)}\`);
            let rolloverText = "";
            if (absorbedSeverity !== chosenSeverity) {
              const targetLabel = game.i18n.localize(\`CYPHER2026.Wounds.\${absorbedSeverity.charAt(0).toUpperCase() + absorbedSeverity.slice(1)}\`);
              rolloverText = game.i18n.format("CYPHER2026.Shield.RolloverNotice", { target: targetLabel });
            }

            const brokenAlert = isBroken
              ? \`<br/><span class="chat-tag-pill highlight">\${game.i18n.localize("CYPHER2026.Shield.BrokenChatAlert")}</span>\`
              : "";

            await ChatMessage.create({
              speaker: ChatMessage.getSpeaker({ actor: this.actor }),
              content: \`
                <div class="cypher-chat-card item-card">
                  <div class="chat-card-header">
                    <img src="\${shield.img}" width="28" height="28" class="chat-item-icon" />
                    <div class="chat-header-text">
                      <h3 class="chat-card-title">\${game.i18n.localize("CYPHER2026.Shield.BlockWoundChatTitle")}</h3>
                      <span class="chat-card-subtitle">\${shield.name}</span>
                    </div>
                  </div>
                  <div class="chat-card-description">
                    \${game.i18n.format("CYPHER2026.Shield.BlockWoundChatMsg", { name: shield.name, severity: chosenLabel })}\${rolloverText}\${brokenAlert}
                  </div>
                </div>
              \`
            });

            if (isBroken) {
              ui.notifications.warn(game.i18n.format("CYPHER2026.Armor.ShieldBroken", { name: shield.name }));
            }
          }
        },
        {
          action: "cancel",
          label: game.i18n.localize("CYPHER2026.Common.Cancel"),
          icon: "fas fa-times"
        }
      ]
    });

    dialog.render({ force: true });
  }

  static async #onRollArmorDefense(event, target) {
    const mode = target.dataset.mode || "block";
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if (!item) return;

    const isBlock = mode === "block";
    const statKey = isBlock ? "might" : "speed";
    const statObj = this.actor.system.stats[statKey];

    const armorType = item.system?.armorType || "light";
    const stepsMap = { light: 1, medium: 2, heavy: 3, shield: 0 };
    const steps = stepsMap[armorType] ?? 0;

    const roll = new Roll("1d20");
    await roll.evaluate();

    const title = isBlock
      ? game.i18n.localize("CYPHER2026.Armor.RollBlock")
      : game.i18n.localize("CYPHER2026.Armor.RollDodge");

    const modTag = isBlock
      ? (steps > 0 ? \`<span class="chat-tag-pill accent">\${game.i18n.format("CYPHER2026.Armor.BlockMod", { steps, stepLabel: steps > 1 ? game.i18n.localize("CYPHER2026.Armor.StepPlural") : game.i18n.localize("CYPHER2026.Armor.StepSingular") })}</span>\` : "")
      : (steps > 0 ? \`<span class="chat-tag-pill highlight">\${game.i18n.format("CYPHER2026.Armor.DodgeMod", { steps, stepLabel: steps > 1 ? game.i18n.localize("CYPHER2026.Armor.StepPlural") : game.i18n.localize("CYPHER2026.Armor.StepSingular") })}</span>\` : "");

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: \`
        <div class="cypher-chat-card item-card">
          <div class="chat-card-header">
            <img src="\${item.img}" width="28" height="28" class="chat-item-icon" />
            <div class="chat-header-text">
              <h3 class="chat-card-title">\${title}</h3>
              <span class="chat-card-subtitle">\${item.name} (\${game.i18n.localize("CYPHER2026.Stats." + statKey)}: \${statObj.current} | Edge: \${statObj.edge})</span>
            </div>
          </div>
          <div class="chat-card-description">
            \${modTag}
          </div>
        </div>
      \`
    });
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
      [\`system.wounds.\${severity}.current\`]: Math.max(0, woundCurrent - 1)
    });
    await item.update({ "system.value": 0, "system.archived": true });

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: \`
        <div class="cypher-chat-card treatment">
          <div class="chat-card-header">
            <div class="chat-header-text">
              <h3 class="chat-card-title">\${game.i18n.localize("CYPHER2026.Damage.ChatCardTitle")}</h3>
            </div>
          </div>
          <div class="chat-card-description">
            \${game.i18n.format("CYPHER2026.Damage.ChatCardText", { name: item.name })}
          </div>
        </div>
      \`
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
    await this.actor.update({ [\`system.wounds.\${severity}.current\`]: nextVal });
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
    await this.actor.update({ [\`system.wounds.\${severity}.current\`]: nextVal });
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
      [\`system.wounds.\${severity}.max\`]: nextMax,
      [\`system.wounds.\${severity}.current\`]: nextCurrent
    });
  }

  static async #onResetWoundSeverity(event, target) {
    const severity = target.dataset.severity;
    if (!severity) return;
    const lastingCount = this.actor.system.wounds[severity]?.lastingCount ?? 0;
    await this.actor.update({ [\`system.wounds.\${severity}.current\`]: lastingCount });
  }

  static async #onToggleRecovery(event, target) {
    const type = target.dataset.type;
    const index = parseInt(target.dataset.index, 10);
    if (!type || !index) return;
    const current = this.actor.system.recoveries?.[target.dataset.type + "Current"] ?? 0;
    await this.actor.update({ [\`system.recoveries.\${type}Current\`]: current === index ? index - 1 : index });
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

    const current = this.actor.system.recoveries?.[target.dataset.type + "Current"] ?? 0;
    const max = this.actor.system.recoveries?.[target.dataset.type + "Max"] ?? 1;

    if (current >= max) {
      ui.notifications.warn(game.i18n.localize("CYPHER2026.Notifications.RecoveryExhausted"));
      return;
    }

    const formula = this.actor.system.recoveries?.formula || "1d6+1";
    const roll = new Roll(formula);
    await roll.evaluate();

    const updates = {
      [\`system.recoveries.\${type}Current\`]: current + 1
    };

    let restFlavor = "";
    const minorLasting = this.actor.system.wounds.minor.lastingCount ?? 0;
    const modLasting = this.actor.system.wounds.moderate.lastingCount ?? 0;

    if (type === "tenMin") {
      updates["system.wounds.minor.current"] = minorLasting;
      restFlavor = \`<br/><span class="chat-tag-pill accent">\${game.i18n.localize("CYPHER2026.Recovery.TenMinRestFlavor")}</span>\`;
    } else if (type === "oneHour") {
      const modCurrent = this.actor.system.wounds.moderate.current;
      if (modCurrent > modLasting) {
        updates["system.wounds.moderate.current"] = modCurrent - 1;
        restFlavor = \`<br/><span class="chat-tag-pill gold">\${game.i18n.localize("CYPHER2026.Recovery.OneHourRestFlavorMod")}</span>\`;
      } else {
        updates["system.wounds.minor.current"] = minorLasting;
        restFlavor = \`<br/><span class="chat-tag-pill accent">\${game.i18n.localize("CYPHER2026.Recovery.OneHourRestFlavorMinor")}</span>\`;
      }
    } else if (type === "tenHour") {
      const activeModerateLasting = this.actor.items.filter(i => i.type === "equipment" && i.system?.isDamage && i.system?.severity === "moderate" && !i.system?.archived);

      if (activeModerateLasting.length > 0) {
        const dialog = new foundry.applications.api.DialogV2({
          window: { title: game.i18n.localize("CYPHER2026.Rest.DialogTitle") },
          content: \`<p>\${game.i18n.localize("CYPHER2026.Rest.PromptQuestion")}</p>\`,
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
      restFlavor = \`<br/><span class="chat-tag-pill highlight">\${game.i18n.localize("CYPHER2026.Recovery.TenHourRestFlavor")}</span>\`;
    }

    await this.actor.update(updates);

    const timeKeyMap = { action: "1 Action", tenMin: "10 Minutes", oneHour: "1 Hour", tenHour: "10 Hours" };

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: \`
        <div class="cypher-chat-card recovery">
          <div class="chat-card-header">
            <div class="chat-header-text">
              <h3 class="chat-card-title">\${game.i18n.localize("CYPHER2026.Recovery.Heading")} (\${timeKeyMap[type]})</h3>
            </div>
          </div>
          <div class="chat-card-description">
            \${game.i18n.format("CYPHER2026.Recovery.PointsToDistribute", { total: roll.total })}\${restFlavor}
          </div>
        </div>
      \`
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

    const currentMax = this.actor.system.recoveries?.[target.dataset.type + "Max"] ?? 1;
    const nextMax = Math.max(1, Math.min(3, currentMax + delta));
    const currentVal = this.actor.system.recoveries?.[target.dataset.type + "Current"] ?? 0;
    const nextVal = Math.min(currentVal, nextMax);

    await this.actor.update({
      [\`system.recoveries.\${type}Max\`]: nextMax,
      [\`system.recoveries.\${type}Current\`]: nextVal
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

  static async #onRollAttackItem(event, target) {
    const attack = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if (!attack) return;

    const roll = new Roll("1d20");
    await roll.evaluate();

    const damage = attack.system?.damage ?? 4;
    const rankKey = attack.system?.rank || "practiced";
    const rangeKey = attack.system?.range || (attack.type === "ability" ? "short" : "immediate");
    const rankLabel = game.i18n.localize(\`CYPHER2026.SkillRank.\${rankKey}\`);
    const rangeLabel = game.i18n.localize(\`CYPHER2026.Range.\${rangeKey}\`);

    let subtitle = "";

    if (attack.type === "ability") {
      const originKey = String(attack.system?.origin || "type").toLowerCase();
      const originLoc = game.i18n.localize("CYPHER2026.AbilityOrigin." + originKey);
      const costText = (attack.system?.cost > 0 && attack.system?.pool !== "none")
        ? \` · \${attack.system.cost} \${game.i18n.localize("CYPHER2026.Stats." + attack.system.pool)}\`
        : "";
      subtitle = \`\${originLoc} · TIER \${attack.system.tier || 1} · \${rangeLabel} · \${rankLabel} · \${damage} \${game.i18n.localize("CYPHER2026.Combat.DmgTag")}\${costText}\`;
    } else {
      const weaponCatText = (attack.system?.weaponCategory && attack.system.weaponCategory !== "no")
        ? \`\${game.i18n.localize("CYPHER2026.WeaponCategory." + attack.system.weaponCategory)} · \`
        : "";
      subtitle = \`\${weaponCatText}\${rankLabel} · \${rangeLabel} · \${damage} \${game.i18n.localize("CYPHER2026.Combat.DmgTag")}\`;
    }

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: \`
        <div class="cypher-chat-card item-card">
          <div class="chat-card-header">
            <img src="\${attack.img}" width="28" height="28" class="chat-item-icon" />
            <div class="chat-header-text">
              <h3 class="chat-card-title">\${attack.name}</h3>
              <span class="chat-card-subtitle">\${subtitle}</span>
            </div>
          </div>
          \${attack.system?.description ? \`<div class="chat-card-description">\${attack.system.description}</div>\` : ""}
        </div>
      \`
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
    await this.actor.update({ [\`system.\${stat}\`]: nextVal });
  }

  static async #onAdjustPool(event, target) {
    const pool = target.dataset.pool;
    const delta = parseInt(target.dataset.delta, 10) || 0;
    if (!pool) return;
    const current = this.actor.system.stats[pool]?.current ?? 0;
    const totalMax = this.actor.system.stats[pool]?.total ?? this.actor.system.stats[pool]?.base ?? 0;
    await this.actor.update({ [\`system.stats.\${pool}.current\`]: Math.max(0, Math.min(totalMax, current + delta)) });
  }

  static async #onAdjustPoolEdge(event, target) {
    const pool = target.dataset.pool;
    const delta = parseInt(target.dataset.delta, 10) || 0;
    if (!pool) return;
    const edge = this.actor.system.stats[pool]?.edge ?? 0;
    await this.actor.update({ [\`system.stats.\${pool}.edge\`]: Math.max(0, edge + delta) });
  }

  static async #onAdjustPoolBase(event, target) {
    const pool = target.dataset.pool;
    const delta = parseInt(target.dataset.delta, 10) || 0;
    if (!pool) return;
    const base = this.actor.system.stats[pool]?.base ?? 0;
    await this.actor.update({ [\`system.stats.\${pool}.base\`]: Math.max(0, base + delta) });
  }

  static async #onResetPool(event, target) {
    const pool = target.dataset.pool;
    if (!pool) return;
    const totalMax = this.actor.system.stats[pool]?.total ?? this.actor.system.stats[pool]?.base ?? 0;
    await this.actor.update({ [\`system.stats.\${pool}.current\`]: totalMax });
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

  static async #onItemArchiveOrDelete(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if (!item) return;

    if (event.altKey) {
      const confirmed = await foundry.applications.api.DialogV2.confirm({
        window: { title: game.i18n.format("CYPHER2026.Item.DeleteTitle", { name: item.name }) },
        content: \`<p>\${game.i18n.format("CYPHER2026.Item.DeleteConfirm", { name: item.name })}</p><p class="cypher-dialog-tip">\${game.i18n.localize("CYPHER2026.Item.DeleteTip")}</p>\`,
        rejectClose: false
      });
      if (confirmed) await item.delete();
      return;
    }

    const isArchived = Boolean(item.system?.archived);
    await item.update({ "system.archived": !isArchived });
    const notifyKey = !isArchived ? "CYPHER2026.Item.ArchivedNotification" : "CYPHER2026.Item.UnarchivedNotification";
    ui.notifications.info(game.i18n.format(notifyKey, { name: item.name }));
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
      content: \`<p>\${game.i18n.format("CYPHER2026.Item.DeleteConfirm", { name: item.name })}</p><p class="cypher-dialog-tip">\${game.i18n.localize("CYPHER2026.Item.DeleteTip")}</p>\`,
      rejectClose: false
    });

    if (confirmed) {
      await item.delete();
    }
  }
}`,

  // -------------------------------------------------------------
  // 6. SCRIPTS / DIALOGS / ARMOR-DIALOG.MJS
  // -------------------------------------------------------------
  "scripts/dialogs/armor-dialog.mjs": `/**
 * Diálogo em DialogV2 para cadastrar ou editar uma Armadura ou Escudo.
 * @param {object} params
 * @param {Actor} params.actor
 * @param {Item} [params.item]
 */
export async function promptArmorDialog({ actor, item = null }) {
  const isEdit = Boolean(item);
  const name = item?.name || "";
  const armorType = item?.system?.armorType || "light";
  const freelyUse = item?.system?.freelyUse ?? true;
  const description = item?.system?.description || "";
  const placeholderDesc = game.i18n.localize("CYPHER2026.Dialog.ArmorDescPlaceholder");

  const title = isEdit
    ? game.i18n.format("CYPHER2026.Dialog.EditArmorTitle", { name: item.name })
    : game.i18n.localize("CYPHER2026.Dialog.AddArmorTitle");

  const content = \`
    <form class="cypher-dialog-form">
      <div class="form-group">
        <label>\${game.i18n.localize("CYPHER2026.Dialog.ArmorName")}</label>
        <input type="text" name="name" value="\${name}" placeholder="\${game.i18n.localize("CYPHER2026.Dialog.ArmorNamePlaceholder")}" autofocus required />
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label>\${game.i18n.localize("CYPHER2026.Dialog.ArmorType")}</label>
          <select name="armorType" id="cypher-armor-type-select">
            <option value="light" \${armorType === "light" ? "selected" : ""}>\${game.i18n.localize("CYPHER2026.ArmorType.light")}</option>
            <option value="medium" \${armorType === "medium" ? "selected" : ""}>\${game.i18n.localize("CYPHER2026.ArmorType.medium")}</option>
            <option value="heavy" \${armorType === "heavy" ? "selected" : ""}>\${game.i18n.localize("CYPHER2026.ArmorType.heavy")}</option>
            <option value="shield" \${armorType === "shield" ? "selected" : ""}>\${game.i18n.localize("CYPHER2026.ArmorType.shield")}</option>
          </select>
        </div>

        <div class="form-group" style="display:flex; flex-direction:row; align-items:center; gap:8px; margin-top:20px;">
          <input type="checkbox" name="freelyUse" id="cypher-armor-freely-use" \${freelyUse ? "checked" : ""} style="width:auto; margin:0; cursor:pointer;" />
          <label for="cypher-armor-freely-use" style="margin:0; cursor:pointer; font-weight:800; font-size:0.82rem; text-transform:uppercase;">\${game.i18n.localize("CYPHER2026.Dialog.FreelyUseCheckbox")}</label>
        </div>
      </div>

      <div class="form-group">
        <label>\${game.i18n.localize("CYPHER2026.Dialog.Description")}</label>
        <textarea name="description" rows="3" placeholder="\${placeholderDesc}">\${isEdit ? description : ""}</textarea>
      </div>
    </form>
  \`;

  const dialog = new foundry.applications.api.DialogV2({
    window: { title },
    content,
    buttons: [
      {
        action: "save",
        label: game.i18n.localize(isEdit ? "CYPHER2026.Common.Save" : "CYPHER2026.Common.Add"),
        icon: isEdit ? "fas fa-save" : "fas fa-plus",
        default: true,
        callback: async (event, button) => {
          const form = button.form;
          const newArmorType = form.armorType.value;
          const newName = form.name.value.trim() || (isEdit ? item.name : game.i18n.format("CYPHER2026.Item.NewItemName", { type: game.i18n.localize("CYPHER2026.ArmorType." + newArmorType) }));
          const newFreelyUse = Boolean(form.freelyUse?.checked);
          const newDesc = form.description.value.trim();

          const defaultImg = newArmorType === "shield"
            ? "icons/svg/shield.svg"
            : "icons/svg/aura.svg";

          const systemData = {
            armorType: newArmorType,
            freelyUse: newFreelyUse,
            description: newDesc,
            archived: isEdit ? Boolean(item.system?.archived) : false,
            wounds: isEdit && item.system?.wounds ? item.system.wounds : {
              minor: { current: 0, max: 3 },
              moderate: { current: 0, max: 2 },
              major: { current: 0, max: 1 }
            }
          };

          if (isEdit) {
            await item.update({
              name: newName,
              img: defaultImg,
              system: systemData
            });
          } else {
            await actor.createEmbeddedDocuments("Item", [
              {
                name: newName,
                type: "armor",
                img: defaultImg,
                system: systemData
              }
            ]);
          }
        }
      },
      {
        action: "cancel",
        label: game.i18n.localize("CYPHER2026.Common.Cancel"),
        icon: "fas fa-times"
      }
    ],
    render: (event, html) => {
      const textarea = html.querySelector("textarea[name='description']");
      if (textarea) {
        textarea.placeholder = placeholderDesc;
        if (!isEdit) textarea.value = "";
      }
    }
  });

  dialog.render({ force: true });
}`
};

// -------------------------------------------------------------
// EXECUÇÃO DO PATCH AUTOMÁTICO
// -------------------------------------------------------------
console.log("⚡ Iniciando atualização dos arquivos do Cypher 2026...\n");

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.resolve(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + "\n", "utf-8");
  console.log(`  ✓ Atualizado: ${filePath}`);
}

console.log("\n🚀 Todas as alterações foram aplicadas com sucesso!");
console.log("👉 Dê um F5 / CTRL+F5 no Foundry VTT para carregar os novos textos e componentes.");
