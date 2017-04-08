import Module from 'Main/Parser/Module';

class Buffs extends Module {
  buffs = [];

  on_byPlayer_combatantinfo(event) {
    event.auras.forEach(aura => {
      this.applyActiveBuff({
        ability: {
          abilityIcon: aura.icon,
          guid: aura.ability,
        },
        sourceID: aura.source,
        timestamp: event.timestamp,
      });
    });
  }
  on_toPlayer_applybuff(event) {
    this.applyActiveBuff(event);
  }
  on_toPlayer_refreshbuff(event) {
    this.removeActiveBuff(event);
    this.applyActiveBuff(event);
  }
  on_toPlayer_removebuff(event) {
    this.removeActiveBuff(event);
  }
  on_toPlayer_removebuffstack(event) {
    // In the case of Maraad's Dying Breath it calls a `removebuffstack` that removes all additional stacks from the buff before it calls a `removebuff`, with this we can find the amount of stacks it had. The `event.stacks` only includes the amount of removed stacks, which (at least for Maraad's) are all stacks minus one since the original buff is also considered a stack.
    const existingBuff = this.buffs.find(item => item.ability.guid === event.ability.guid && item.end === null);
    existingBuff.stacks = event.stack + 1;
  }

  /**
   * @param spellId
   * @param bufferTime Time (in MS) the buff may have expired. There's a bug in the combat log where if a spell consumes a buff that buff may disappear a few MS earlier than the heal event is logged. I've seen this go up to 32ms.
   * @param forTimestamp
   * @returns {boolean}
   */
  hasBuff(spellId, bufferTime = 0, forTimestamp = null) {
    return this.getBuff(spellId, bufferTime, forTimestamp) !== undefined;
  }
  getBuff(spellId, bufferTime = 0, forTimestamp = null) {
    const currentTimestamp = forTimestamp || this.owner.currentTimestamp;
    return this.buffs.find(buff => buff.ability.guid === Number(spellId) && buff.start < currentTimestamp && (buff.end === null || (buff.end + bufferTime) >= currentTimestamp));
  }
  getBuffUptime(buffAbilityId) {
    return this.buffs.reduce((uptime, buff) => {
      if (buff.ability.guid === buffAbilityId) {
        uptime += (buff.end || this.owner.currentTimestamp) - buff.start;
      }
      return uptime;
    }, 0);
  }

  applyActiveBuff(buff) {
    this.buffs.push({
      ...buff,
      start: buff.timestamp,
      end: null,
    });
  }
  removeActiveBuff(buff) {
    const existingBuff = this.buffs.find(item => item.ability.guid === buff.ability.guid && item.end === null);
    if (existingBuff) {
      existingBuff.end = buff.timestamp;
    } else {
      this.buffs.push({
        ...buff,
        start: this.owner.fight.start_time,
        end: buff.timestamp,
      });
    }
  }
}

export default Buffs;