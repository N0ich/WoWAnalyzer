import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';

import Analyzer from 'Parser/Core/Analyzer';
import Combatants from 'Parser/Core/Modules/Combatants';

class TarratusKeystone extends Analyzer {
  static dependencies = {
      combatants: Combatants,
  };
  healing = 0;

  on_initialized() {
    this.active = this.combatants.selected.hasTrinket(ITEMS.TARRATUS_KEYSTONE.id);
  }

  on_byPlayer_heal(event) {
    const spellId = event.ability.guid;

    if (spellId === SPELLS.TARRATUS_KEYSTONE.id) {
      this.healing += (event.amount || 0) + (event.absorbed || 0);
    }
  }

  item() {
    return {
      item: ITEMS.TARRATUS_KEYSTONE,
      result: this.owner.formatItemHealingDone(this.healing),
    };
  }
}

export default TarratusKeystone;
