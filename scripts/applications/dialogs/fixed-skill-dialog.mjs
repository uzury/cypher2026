/**
 * Diálogo em DialogV2 para alterar o grau de uma perícia fixa.
 * @param {object} params
 * @param {Actor} params.actor
 * @param {string} params.skillKey - 'initiative' | 'mightDefense' | 'speedDefense' | 'intellectDefense'
 */
export function promptFixedSkillDialog({ actor, skillKey }) {
  const fixedSkill = actor.system.fixedSkills?.[skillKey];
  if (!fixedSkill) return;

  const skillName = game.i18n.localize("CYPHER2026.FixedSkills." + skillKey);

  const content = `
    <form class="cypher-fixed-skill-dialog">
      <div class="form-group" style="padding:10px 0;">
        <label style="font-weight:bold; display:block; margin-bottom:6px;">Grau de Treinamento em ${skillName}:</label>
        <select name="rank" style="width:100%; padding:6px; font-weight:bold;">
          <option value="inability" ${fixedSkill.rank === "inability" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.inability")}</option>
          <option value="practiced" ${fixedSkill.rank === "practiced" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.practiced")}</option>
          <option value="trained" ${fixedSkill.rank === "trained" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.trained")}</option>
          <option value="specialized" ${fixedSkill.rank === "specialized" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.specialized")}</option>
          <option value="expert" ${fixedSkill.rank === "expert" ? "selected" : ""}>${game.i18n.localize("CYPHER2026.SkillRank.expert")}</option>
        </select>
      </div>
    </form>
  `;

  const dialog = new foundry.applications.api.DialogV2({
    window: { title: `Modificar ${skillName}` },
    content,
    buttons: [
      {
        action: "save",
        label: "Salvar",
        icon: "fas fa-check",
        default: true,
        callback: async (event, button) => {
          const rank = button.form.rank?.value;
          if (rank) await actor.update({ [`system.fixedSkills.${skillKey}.rank`]: rank });
        }
      },
      {
        action: "cancel",
        label: "Cancelar",
        icon: "fas fa-times"
      }
    ]
  });

  dialog.render({ force: true });
}