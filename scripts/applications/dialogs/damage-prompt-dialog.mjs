/**
 * Diálogo em DialogV2 para aplicar dano direto a uma Pool.
 * @param {object} params
 * @param {Actor} params.actor
 * @param {string} params.pool - 'might' | 'speed' | 'intellect'
 */
export function promptDamageDialog({ actor, pool = "might" }) {
  const statName = game.i18n.localize("CYPHER2026.Stats." + pool);
  const current = actor.system.stats[pool]?.current ?? 0;

  const content = `
    <form class="cypher-damage-form">
      <div class="form-group" style="padding: 10px 0;">
        <label style="display: block; margin-bottom: 6px; font-weight: bold;">Quantidade de Dano:</label>
        <input type="text" name="damage" value="1" autofocus class="damage-input-target" style="text-align: center; font-size: 1.3rem; font-weight: bold; width: 100%;" />
      </div>
    </form>
  `;

  const dialog = new foundry.applications.api.DialogV2({
    window: { title: game.i18n.format("CYPHER2026.Dialog.DamageTitle", { stat: statName }) },
    content,
    buttons: [
      {
        action: "apply",
        label: "Aplicar Dano",
        icon: "fas fa-heart-crack",
        default: true,
        callback: async (event, button) => {
          const form = button.form;
          const raw = form.damage?.value?.trim();
          const dmgVal = Math.abs(parseInt(raw, 10) || 0);
          const nextVal = Math.max(0, current - dmgVal);
          await actor.update({ [`system.stats.${pool}.current`]: nextVal });
        }
      },
      {
        action: "cancel",
        label: "Cancelar",
        icon: "fas fa-times"
      }
    ],
    render: (event, html) => {
      const dmgInput = html.querySelector(".damage-input-target");
      if (dmgInput) {
        setTimeout(() => {
          dmgInput.focus();
          dmgInput.select();
        }, 50);
      }
    }
  });

  dialog.render({ force: true });
}