//import React from 'react';

import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';
//import SpellLink from 'common/SpellLink';

import ISSUE_IMPORTANCE from 'Parser/Core/ISSUE_IMPORTANCE';

import CoreCastEfficiency from 'Parser/Core/Modules/CastEfficiency';

class CastEfficiency extends CoreCastEfficiency {
  static CPM_ABILITIES = [
    ...CoreCastEfficiency.CPM_ABILITIES,
    {
      spell: SPELLS.CONSECRATION_CAST,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 9 / (1 + haste),
      recommendedCastEfficiency: 0.9,
	},
    {
      spell: SPELLS.JUDGMENT_CAST,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 12 / (1 + haste),
      recommendedCastEfficiency: 0.9,
	},
    {
      spell: SPELLS.BLESSED_HAMMER_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 4.5 / (1 + haste),
      charges: 3,
      isActive: combatant => combatant.hasTalent(SPELLS.BLESSED_HAMMER_TALENT.id),
      recommendedCastEfficiency: 0.9,
	},
	  // Probably useless to try to count the number of casts
    {
      spell: SPELLS.HAND_OF_THE_PROTECTOR_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => null,
      isActive: combatant => combatant.hasTalent(SPELLS.HAND_OF_THE_PROTECTOR_TALENT.id),
      recommendedCastEfficiency: 0.6,
      importance: ISSUE_IMPORTANCE.MINOR,
	},
	  // Will do nb of casts in another file
    {
      spell: SPELLS.SHIELD_OF_THE_RIGHTEOUS,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => null,
      charges: 3,
      recommendedCastEfficiency: 0.8,
	},
    {
      spell: SPELLS.AVENGERS_SHIELD,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 15 / (1 + haste),
      recommendedCastEfficiency: 0.9,
	},

	  //COOLDOWNS
    {
      spell: SPELLS.EYE_OF_TYR,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: (haste, combatant) => (combatant.hasShoulder(ITEMS.PILLARS_OF_INMOST_LIGHT.id) ? 45 : 60),
      recommendedCastEfficiency: 0.85,
	},
    {
      spell: SPELLS.AEGIS_OF_LIGHT_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 180,
      isActive: combatant => combatant.hasTalent(SPELLS.AEGIS_OF_LIGHT_TALENT.id),
      recommendedCastEfficiency: 0.5,
	},
	  // calculate CDR based on forbearance
    {
      spell: SPELLS.BLESSING_OF_SPELLWARDING_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      isActive: combatant => combatant.hasTalent(SPELLS.BLESSING_OF_SPELLWARDING_TALENT.id),
      getCooldown: haste => 180,
	},
	  // calculate CDR based on forbearance
    {
      spell: SPELLS.BLESSING_OF_PROTECTION,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      isActive: combatant => !combatant.hasTalent(SPELLS.BLESSING_OF_SPELLWARDING_TALENT.id),
      getCooldown: haste => 300,
	},
    {
      spell: SPELLS.BASTION_OF_LIGHT_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 120,
      isActive: combatant => combatant.hasTalent(SPELLS.BASTION_OF_LIGHT_TALENT.id),
      recommendedCastEfficiency: 0.9,
	},
	  // Calculate CDR based on weapon
    {
      spell: SPELLS.ARDENT_DEFENDER,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => null,
      recommendedCastEfficiency: 0.85,
	},
    {
      spell: SPELLS.SERAPHIM_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 45,
      isActive: combatant => combatant.hasTalent(SPELLS.SERAPHIM_TALENT.id),
      recommendedCastEfficiency: 0.90,
	},
    {
      spell: SPELLS.GUARDIAN_OF_ANCIENT_KINGS,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 300,
      recommendedCastEfficiency: 0.70,
	},

  ];
}

export default CastEfficiency;
