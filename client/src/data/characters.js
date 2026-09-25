import portraits from './portrait-manifest.json';

// Element, weapon and rarity are copied from the wuthering.gg character-list entries.
const referenceCharacterData = {
  Sanhua: ['Glacio', 'Sword', 4], Zhezhi: ['Glacio', 'Rectifier', 5], Carlotta: ['Glacio', 'Pistols', 5],
  'Yangyang: Xuanling': ['Havoc', 'Sword', 5], Lucilla: ['Glacio', 'Rectifier', 5], Hiyuki: ['Glacio', 'Sword', 5], Suisui: ['Glacio', 'Rectifier', 5],
  Encore: ['Fusion', 'Rectifier', 5], Changli: ['Fusion', 'Sword', 5], Brant: ['Fusion', 'Sword', 5], Lupa: ['Fusion', 'Broadblade', 5],
  Galbrena: ['Fusion', 'Pistols', 5], Mornye: ['Fusion', 'Broadblade', 5], Aemeath: ['Fusion', 'Sword', 5], Shorekeeper: ['Spectro', 'Rectifier', 5],
  Jinhsi: ['Spectro', 'Broadblade', 5], Camellya: ['Havoc', 'Sword', 5], Yinlin: ['Electro', 'Rectifier', 5], Jiyan: ['Aero', 'Broadblade', 5],
  Verina: ['Spectro', 'Rectifier', 5], Sigrika: ['Aero', 'Gauntlets', 5], Zani: ['Spectro', 'Gauntlets', 5], Rebecca: ['Electro', 'Pistols', 5],
  Qiuyuan: ['Aero', 'Sword', 5], Roccia: ['Havoc', 'Gauntlets', 5], Qingxiao: ['Aero', 'Sword', 5], Lynae: ['Spectro', 'Pistols', 5],
  Luuk: ['Spectro', 'Gauntlets', 5, 'Luuk Herssen'], Jingran: ['Fusion', 'Broadblade', 5], Denia: ['Fusion', 'Rectifier', 5],
  Ciaccona: ['Aero', 'Pistols', 5], Chisa: ['Havoc', 'Broadblade', 5], Cantarella: ['Havoc', 'Rectifier', 5], Augusta: ['Electro', 'Broadblade', 5],
  Iuno: ['Aero', 'Gauntlets', 5], Phoebe: ['Spectro', 'Rectifier', 5], Lucy: ['Spectro', 'Pistols', 5], Danjin: ['Havoc', 'Sword', 4],
  Jianxin: ['Aero', 'Gauntlets', 5], Yangyang: ['Aero', 'Sword', 4], Lumi: ['Electro', 'Broadblade', 4], 'Xiangli Yao': ['Electro', 'Gauntlets', 5],
  Phrolova: ['Havoc', 'Rectifier', 5], Cartethyia: ['Aero', 'Sword', 5], 'Rover Spectro': ['Spectro', 'Sword', 5, 'Rover (Spectro)'], 'Rover Havoc': ['Havoc', 'Sword', 5, 'Rover (Havoc)']
};
// Short gameplay summaries are included only for characters with a description
// on the reference list. Basic element/weapon/rarity data above covers the rest.
const referenceIntroductions = {
  Sanhua: 'A Glacio damage dealer who creates and detonates ice constructs, with timing at the center of her attacks.',
  Zhezhi: 'Builds Forte with basic attacks and her Intro Skill, then uses Phantasmic Imprints to reposition and attack.',
  Carlotta: 'A Glacio damage dealer who builds Moldable Crystals and shifts into a high-damage state with her Resonance Liberation.',
  Encore: 'A Fusion damage dealer whose strongest attacks arrive during Cosmos Rave, when her combat style changes.',
  Changli: 'A damage-focused Resonator whose Outro Skill boosts the next character’s Fusion and Resonance Liberation damage.',
  Brant: 'A high-damage character whose rotations depend on balancing Energy Regen and offensive stats.',
  Lupa: 'A Fusion support and off-field damage dealer who builds Wolf Flame and buffs teammates’ follow-up attacks.',
  Galbrena: 'A Fusion damage dealer who builds Forte to enter Demon Hypostasis and strengthen Echo and Heavy Attack damage.',
  Mornye: 'A Fusion Broadblade support and sub-DPS described as a professor and researcher focused on time and space.',
  Aemeath: 'A Fusion main DPS with dual combat modes and multi-phase rotations that reward precise execution.',
  Yinlin: 'A ranged Electro damage dealer who fights alongside her puppet Zapstring.',
  'Xiangli Yao': 'An Electro damage dealer whose enhanced skills and attacks are focused through his Resonance Liberation.',
  Augusta: 'An Electro damage dealer who builds multiple combat resources before unleashing her time-stopping Liberation.',
  Yangyang: 'An accessible Aero support with short rotations and strong Concerto Energy generation.',
  Jiyan: 'An Aero damage dealer who becomes an area damage powerhouse during Resonance Liberation.',
  Jianxin: 'An Aero support who builds Chi to create shields, mitigate damage, and heal allies.',
  Ciaccona: 'An Aero support and sub-DPS focused on Erosion, team buffs, and off-field elemental effects.',
  Cartethyia: 'An Aero damage dealer with two forms whose sword-based kit uses Erosion and HP-scaling damage.',
  Iuno: 'A hybrid Aero support and sub-DPS who alternates forms to heal allies and boost team damage.',
  Qiuyuan: 'An Aero Sword hybrid who builds Swordster’s Soliloquy, then boosts team Echo Skill damage and allied Crit. DMG.',
  Sigrika: 'An Aero damage dealer who builds runes and plushies to unleash a powerful Echo-focused attack.',
  Verina: 'A Spectro support who heals and buffs the team using Photosynthesis energy.',
  'Rover Spectro': 'A versatile Spectro fighter who builds Forte for enhanced Resonance Skill damage and offers utility through her Outro Skill.',
  Jinhsi: 'A Spectro damage dealer whose burst scales with Incandescence accumulated from attribute damage and coordinated attacks.',
  Shorekeeper: 'A Spectro support and healer whose build and rotations emphasize Energy Regen and Liberation uptime.',
  Phoebe: 'A Spectro Resonator with a choice between burst damage in Absolution and Frazzle application in Confession.',
  Zani: 'A Spectro damage dealer who builds resources and enters Inferno mode to deal Frazzle-based damage.',
  Lynae: 'A mobile Spectro support who amplifies Tune Break through rupture or strain debuffs and team buffs.',
  Luuk: 'A Spectro aerial damage dealer who builds Icore Flow through sustained combos before converting it into a powerful Liberation.',
  Danjin: 'A high-risk, high-reward Havoc damage dealer whose kit rewards careful health management.',
  Camellya: 'A Havoc damage dealer who switches between Vine forms for sustained aerial and area damage.',
  'Rover Havoc': 'A Havoc damage dealer who builds Forte to enter Umbra Eclipse and strengthen attacks.',
  Roccia: 'A Havoc support who groups enemies and buffs allies while dealing damage with slam attacks.',
  Cantarella: 'A Havoc healer and coordinated attacker who builds Forte to empower attacks and apply debuffs.',
  Phrolova: 'An off-field Havoc damage dealer who builds notes to command her puppet Hecate for sustained attacks.',
  Chisa: 'A Havoc support who combines debuffs, grouping, shields, and healing with her chainsaw stance.',
  'Yangyang: Xuanling': 'A Havoc Sword user who switches stances, builds Melody, and applies Havoc Bane.'
};
const names = Object.keys(referenceCharacterData);
const elements = [...new Set(Object.values(referenceCharacterData).map(([element]) => element))];
const weapons = [...new Set(Object.values(referenceCharacterData).map(([, weapon]) => weapon))];
const portraitById = Object.fromEntries(portraits.map(({ Slug, File }) => [Slug, File]));
const referencePortraits = {
  Calcharo: '/character-art/calcharo.png',
  Danjin: '/character-art/danjin.png',
  Jianxin: '/character-art/jianxin.png',
  'Rover Spectro': '/character-art/rover-spectro.png',
  'Rover Havoc': '/character-art/rover-havoc.png'
};
export const portraitFiles = portraits.map(({ File }) => File);

const characterRecords = names.map(name => {
  const [element, weapon, rarity, referenceName = name] = referenceCharacterData[name];
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return {
    id: slug,
    slug,
    name: referenceName,
    referenceName,
    element,
    rarity,
    weapon,
    image: referencePortraits[name] ?? portraitById[slug] ?? (name === 'Luuk' ? portraitById.luuk : null),
    referenceSource: 'https://wuthering.gg/characters',
    introduction: referenceIntroductions[name],
    detailsAvailable: true
  };
});

const verifiedCharacterOverrides = {
  aemeath: {
    detailsAvailable: true,
    element: 'Fusion',
    rarity: 5,
    weapon: 'Sword',
    role: 'Main DPS',
    maxLevel: 90,
    introduction: 'Aemeath is a 5-Star Fusion Resonator who wields a Sword. Once an Exostrider Synchronist of Rabelle College, she now persists as a digital ghost among the stars.',
    stats: { hp: '11025', atk: '425', def: '1148', critRate: '5%', critDMG: '150%', energyRegen: '100%', maxResonanceEnergy: '140' },
    materials: [{ name: 'Our Choice', quantity: '16' }, { name: 'Moss Amber', quantity: '20' }, { name: 'FF Exoswarm Core', quantity: '4' }, { name: 'Shell Credit', quantity: '80000', image: '/assets/items/shell-credit.png' }],
    weaponBuild: { name: 'Everbright Polestar', level: 90, rank: 1, atk: '587.50', secondary: 'Crit. Rate 24.30%', passiveName: 'Starchaser', passive: 'Increases All-Attribute DMG Bonus by 12%. When inflicting Tune Rupture - Shifting or Fusion Burst, the wielder’s Resonance Liberation DMG ignores 32% DEF and 10% Fusion RES on targets for 8 s.' },
    echoBuild: {
      echoes: [{ name: 'Sigillum', cost: 4 }, { name: 'Kronablight', cost: 3 }, { name: 'Twin Nova: Collapsar Blade', cost: 3 }, { name: 'Geospider S4', cost: 1 }, { name: 'Shadow Stepper', cost: 1 }],
      sonata: 'Trailblazing Star',
      effects: [{ pieces: '2-Piece', description: 'Fusion DMG increases by 10%.' }, { pieces: '5-Piece', description: 'Inflicting Fusion Burst or Tune Rupture - Shifting increases Crit. Rate by 20% and grants 20% Fusion DMG Bonus for 8 s.' }],
      bestStats: null,
      echoAbility: { name: 'Sigillum', rank: 5, description: 'Summon Sigillum to unleash two attacks, dealing 68.40% and 205.20% Fusion DMG respectively. When equipped in the main slot by Aemeath, it grants 25.00% Resonance Liberation DMG Bonus.', cooldown: '20 s' }
    },
    buildStats: null,
    skills: [
      { name: 'Infinity Calibration', type: 'Normal Attack', description: 'Perform up to 4 consecutive Fusion DMG attacks. Includes charged, mid-air, and dodge counter attacks.' },
      { name: 'Shared Voyage', type: 'Resonance Skill', description: 'Switch between Aemeath and her Mech. The Mech inherits Aemeath’s stats and unlocks additional attacks.' },
      { name: 'Towards the Daybreak', type: 'Resonance Liberation', description: 'Heavenfall Edict - Overdrive deals Fusion DMG, switches to Mech form, and enters Stardust Resonance for 30 s and Heavenfall Edict: Unbound for 60 s. Level 1: 101.00% + 134.67% × 3 DMG; 25 s cooldown; 125 Resonance Energy.' },
      { name: 'Overture of Departure', type: 'Intro Skill', description: 'Songs Across the Universe deals Fusion DMG and grants Starlume Acceleration for 15 s. Level 1 damage: 6.77% × 2 + 54.16%.' },
      { name: 'Silent Protection', type: 'Outro Skill', description: 'Grants other team Resonators 10% All-DMG Amplification for 20 s, increased to 20% for Resonators who inflict Tune Rupture - Shifting or Fusion Burst.' }
    ],
    passives: [
      { name: 'Before All Sounds', description: 'In Instant Response, Heavy Attack - Aemeath and Heavy Attack - Mech gain 200% DMG Amplification.' },
      { name: 'Between the Stars', description: 'Tune Rupture or Fusion Burst team effects build Aemeath’s Crit. DMG and amplify Heavenfall Edict: Finale at the required stacks.' }
    ],
    background: null
  },
  changli: {
    detailsAvailable: true,
    referenceSource: 'https://wuthering.gg/characters/changli',
    role: 'Main DPS',
    maxLevel: 90,
    introduction: "Changli is a counselor serving the Jinzhou Magistrate and a former Secretary-General in the capital. Shrouded in flames, she is fated to burn brightly until her final embers, using fiery determination and a strategic mindset to reach her ultimate goal.",
    stats: { hp: '10387', atk: '462', def: '1099', critRate: '5%', critDMG: '150%', energyRegen: '100%', maxResonanceEnergy: '140' },
    materials: [{ name: 'Rage Tacet Core', quantity: '16' }, { name: 'Pavo Plum', quantity: '20' }, { name: 'Tailored Ring', quantity: '4' }, { name: 'Shell Credit', quantity: '80000', image: '/assets/items/shell-credit.png' }],
    weaponBuild: { name: 'Blazing Brilliance', level: 90, rank: 5, atk: '587.50', secondary: 'Crit. DMG 48.60%', passiveName: 'Blazing Brilliance', passive: 'Increases ATK by 24%. Dealing damage grants Searing Feather, and casting Resonance Skill grants 5 stacks. Each stack increases Resonance Skill DMG Bonus by 8%, up to 14 stacks.' },
    echoBuild: {
      echoes: [{ name: 'Inferno Rider', cost: 4 }, { name: 'Havoc Dreadmane', cost: 3 }, { name: 'Viridblaze Saurian', cost: 3 }, { name: 'Fusion Prism', cost: 1 }, { name: 'Lava Larva', cost: 1 }],
      sonata: 'Molten Rift',
      effects: [{ pieces: '2-Piece', description: 'Fusion DMG increases by 10%.' }, { pieces: '5-Piece', description: 'Fusion DMG increases by 30% for 15 s after releasing Resonance Skill.' }],
      bestStats: null,
      echoAbility: { name: 'Inferno Rider', rank: 5, cooldown: '20 s', description: 'Transform into Inferno Rider for three slashes. The final hit grants the current Resonator Fusion DMG and Basic Attack DMG bonuses. Holding Echo Skill enters Riding Mode.' }
    },
    buildStats: null
  },
  lupa: {
    detailsAvailable: true,
    referenceSource: 'https://wuthering.gg/characters/lupa',
    role: 'Fusion Support',
    maxLevel: 90,
    introduction: "A Gladiator of Septimont and a radiant star of the arena. Fiery and straightforward, Lupa lives like a wild lone wolf and embraces the adrenaline rush of battle.",
    stats: { hp: '11912', atk: '387', def: '1185', critRate: '5%', critDMG: '150%', energyRegen: '100%', maxResonanceEnergy: '140' },
    materials: [{ name: 'Unfading Glory', quantity: '16' }, { name: 'Bloodleaf Viburnum', quantity: '20' }, { name: 'FF Howler Core', quantity: '4' }, { name: 'Shell Credit', quantity: '80000', image: '/assets/items/shell-credit.png' }],
    weaponBuild: { name: 'Wildfire Mark', level: 90, rank: 5, atk: '587.50', secondary: 'Crit. DMG 48.60%', passiveName: 'Wildfire Mark', passive: 'Increases ATK by 24%. Intro Skill or Resonance Liberation increases Resonance Liberation DMG. Heavy Attack DMG extends the effect and grants the team Fusion DMG Bonus.' },
    echoBuild: {
      echoes: [{ name: 'Lioness of Glory', cost: 4 }, { name: "Pilgrim's Shell", cost: 3 }, { name: 'Kerasaur', cost: 3 }, { name: 'Electro Drake', cost: 1 }, { name: 'Fusion Drake', cost: 1 }],
      sonata: 'Flaming Clawprint',
      effects: [{ pieces: '2-Piece', description: 'Fusion DMG increases by 10%.' }, { pieces: '5-Piece', description: 'Casting Resonance Liberation grants the team Fusion DMG Bonus and the caster Resonance Liberation DMG Bonus for 35 s.' }],
      bestStats: null,
      echoAbility: { name: 'Halberd of Glory', rank: 5, cooldown: '20 s', description: 'Summons the Halberd of Glory for an area attack followed by a delayed blast. The equipped Resonator gains Fusion DMG Bonus and Resonance Liberation DMG Bonus.' }
    },
    buildStats: null
  },
  cartethyia: {
    detailsAvailable: true,
    referenceSource: 'https://wuthering.gg/characters/cartethyia',
    role: 'Main DPS',
    maxLevel: 90,
    introduction: 'Cartethyia is a wandering knight who travels across Rinascita. Formerly known as the Blessed Maiden, the vessel of Divinity, and the Queen of Gale and Tide, she went by the name Fleurdelys. Now she is a free and unfettered wandering knight.',
    stats: { hp: '14800', atk: '312', def: '611', critRate: '5%', critDMG: '150%', energyRegen: '100%', maxResonanceEnergy: '140' },
    materials: [{ name: 'Unfading Glory', quantity: '16' }, { name: 'Bamboo Iris', quantity: '20' }, { name: 'FF Tidal Residuum', quantity: '4' }, { name: 'Shell Credit', quantity: '80000', image: '/assets/items/shell-credit.png' }],
    weaponBuild: { name: "Defier's Thorn", level: 90, rank: 5, atk: '412.50', secondary: 'HP 72.23%', passiveName: "Defier's Thorn", passive: 'Increases Max HP by 24%. After casting Intro Skill or Basic Attacks, ignores part of the target DEF when dealing damage. Against a target with Aero Erosion, damage taken is amplified.' },
    echoBuild: {
      echoes: [{ name: 'Reminiscence: Fleurdelys', cost: 4 }, { name: 'Capitaneus', cost: 3 }, { name: "Pilgrim's Shell", cost: 3 }, { name: 'Glacio Drake', cost: 1 }, { name: 'Spectro Drake', cost: 1 }],
      sonata: 'Windward Pilgrimage',
      effects: [{ pieces: '2-Piece', description: 'Aero DMG increases by 10%.' }, { pieces: '5-Piece', description: 'Hitting a target with Aero Erosion increases Crit. Rate by 10% and Aero DMG Bonus by 30% for 10 s.' }],
      bestStats: null,
      echoAbility: { name: 'Windcleaver', rank: 5, cooldown: '20 s', description: 'Summons Windcleaver to attack repeatedly. The equipped Resonator gains Aero DMG Bonus, with an additional bonus for Aero Resonators and Cartethyia.' }
    },
    buildStats: null
  },
  shorekeeper: {
    detailsAvailable: true,
    referenceSource: 'https://wuthering.gg/characters/shorekeeper',
    role: 'Support / Healer',
    maxLevel: 90,
    introduction: 'The Shorekeeper is the guardian of the Black Shores. Desires, bonds, and emotions were things she began to understand only after meeting you.',
    stats: { hp: '16712', atk: '287', def: '1099', critRate: '5%', critDMG: '150%', energyRegen: '100%', maxResonanceEnergy: '140' },
    materials: [{ name: 'Topological Confinement', quantity: '16' }, { name: 'Nova', quantity: '20' }, { name: 'FF Whisperin Core', quantity: '4' }, { name: 'Shell Credit', quantity: '80000', image: '/assets/items/shell-credit.png' }],
    weaponBuild: { name: 'Stellar Symphony', level: 90, rank: 5, atk: '412.50', secondary: 'Energy Regen 77.04%', passiveName: 'Stellar Symphony', passive: 'Increases HP by 24%. Casting Resonance Liberation restores Concerto Energy. Casting a healing Resonance Skill increases nearby party members ATK for 30 s.' },
    echoBuild: {
      echoes: [{ name: 'Fallacy of No Return', cost: 4 }, { name: 'Rocksteady Guardian', cost: 3 }, { name: 'Stonewall Bracer', cost: 3 }, { name: 'Fission Junrock', cost: 1 }, { name: 'Snip Snap', cost: 1 }],
      sonata: 'Rejuvenating Glow',
      effects: [{ pieces: '2-Piece', description: 'Healing Bonus increases by 10%.' }, { pieces: '5-Piece', description: 'Healing allies increases all party members ATK by 15% for 30 s.' }],
      bestStats: null,
      echoAbility: { name: 'Fallacy of No Return', rank: 5, cooldown: '20 s', description: 'Deals Spectro DMG based on Max HP, then grants the wielder Energy Regen and all team members ATK. Holding Echo Skill performs a series of follow-up attacks.' }
    },
    buildStats: null
  },
  lucy: {
    detailsAvailable: true,
    referenceSource: 'https://wuthering.gg/characters/lucy',
    element: 'Spectro',
    rarity: 5,
    weapon: 'Pistols',
    title: 'Netrunner from Night City',
    maxLevel: 90,
    introduction: 'Lucy Kushinada is an Edgerunner and Netrunner from Night City. She keeps her distance from others while carrying the weight of her past.',
    stats: { hp: '11025', atk: '425', def: '1148', critRate: '5%', critDMG: '150%', energyRegen: '100%', maxResonanceEnergy: '140' },
    materials: [{ name: 'Nightmare Flashdrive', quantity: '16' }, { name: 'Past Reveries', quantity: '20' }, { name: 'FF Exoswarm Core', quantity: '4' }, { name: 'Shell Credit', quantity: '80000', image: '/assets/items/shell-credit.png' }],
    weaponBuild: { name: 'Spectral Trigger', level: 90, rank: 5, atk: '587.50', secondary: 'Crit. DMG 48.60%', passiveName: 'Spectral Trigger', passive: 'Boosts ATK. Resonance Skill casts grant Spectro DMG Bonus, and inflicting Hack - Shifting increases Heavy Attack damage and lets it ignore part of enemy DEF.' },
    echoBuild: {
      echoes: [{ name: 'Reminiscence - Nightmare: Adam Smasher', cost: 4 }, { name: 'Rocksteady Guardian', cost: 3 }, { name: 'Autopuppet Scout', cost: 3 }, { name: 'Diggy Duggy', cost: 1 }, { name: 'Golden Junrock', cost: 1 }],
      sonata: 'Spectro DMG Bonus',
      effects: [{ pieces: '2-Piece', description: 'Spectro DMG increases by 10%.' }, { pieces: '2-Piece', description: 'Spectro DMG increases by 10%.' }],
      bestStats: null
    },
    buildStats: null,
    skills: [
      { name: 'Locked Thread', type: 'Normal Attack', description: 'Uses Lucy’s monowire for chained Spectro attacks, with alternate heavy attacks, aerial attacks, and dodge counters.' },
      { name: 'Protocol Breach', type: 'Resonance Skill', description: 'Charges through a target, follows with Pulse Interference, and enters Deadlock when TCP is full.' },
      { name: 'Netrunner', type: 'Resonance Liberation', description: 'Opens a targeting interface to mark enemies and apply selected Spoofing Programs before triggering Override.' },
      { name: 'Depths of Blackwall', type: 'Forte Circuit', description: 'Builds TCP and Root Access, enabling Algorithm Compaction and stronger multi-threading attacks.' },
      { name: 'Data Crash', type: 'Tune Break', description: 'Responds to Hack - Interfered with a Spectro hit and a brief Stagnate effect after the target attacks.' },
      { name: 'Outdated Hallucination', type: 'Intro Skill', description: 'Attacks with Spectro DMG, grants the team Involuntary Sharing, and accelerates Lucy’s next skill setup.' },
      { name: 'Countermeasure Program', type: 'Outro Skill', description: 'Grants the incoming Resonator Basic Attack DMG Amplification and provides team protection and follow-up bonuses.' }
    ],
    passives: [
      { name: 'Ghost Cyberware', description: 'After avoiding damage for a time, Lucy can negate an incoming hit and recover from its interruption.' },
      { name: 'Function Cracking', description: 'Skill takedowns on powerful enemies can build Network Backdoor bonuses for Lucy and Rebecca.' }
    ],
    background: 'Lucy Kushinada is an Edgerunner from Night City and the Netrunner of her crew. Her Forte can hack nearby targets for information, data manipulation, or control, and is especially effective against mechanical constructs.'
  },
  'yangyang-xuanling': {
    detailsAvailable: true,
    referenceSource: 'https://wuthering.gg/characters/yangyang-xuanling',
    element: 'Havoc',
    rarity: 5,
    weapon: 'Sword',
    title: 'Breath of Winds',
    maxLevel: 90,
    introduction: 'Yangyang: Xuanling is a five-star Havoc Sword user. Born into a musical family in Mingting, she serves as an acting Xuan Watcher and fights to protect others.',
    stats: { hp: '11025', atk: '425', def: '1148', critRate: '5%', critDMG: '150%', energyRegen: '100%', maxResonanceEnergy: '140' },
    materials: [{ name: "Solidarity's Loneflame", quantity: '16' }, { name: 'Cloudperch Seed', quantity: '20' }, { name: 'FF Autopuppet Kernel', quantity: '4' }, { name: 'Shell Credit', quantity: '80000', image: '/assets/items/shell-credit.png' }],
    weaponBuild: { name: 'Azure Oath', level: 90, rank: 5, atk: '587.50', secondary: 'Crit. Rate 24.30%', passiveName: 'Azure Oath', passive: 'Grants All-Attribute DMG Bonus. Applying Havoc Bane boosts Heavy Attack damage and lets it ignore part of the target’s DEF.' },
    echoBuild: {
      echoes: [{ name: 'Thousand-Puppet Pavilion', cost: 4 }, { name: 'Fog Lionarch', cost: 3 }, { name: 'Forbidden Bastion', cost: 3 }, { name: 'Smiter', cost: 1 }, { name: 'Kernel Puppet: Joy', cost: 1 }],
      sonata: 'Song of Feathered Trace',
      effects: [{ pieces: '2-Piece', description: 'Energy Regen increases by 10%.' }, { pieces: '5-Piece', description: 'Applying Havoc Bane grants Xuanling’s Feather, increasing Crit. Rate and Heavy Attack DMG for a limited time.' }],
      bestStats: null
    },
    buildStats: null,
    skills: [
      { name: 'Succor and Smite', type: 'Normal Attack', description: 'Switches between Azure and Feather Sword Stances. Her attacks build Melody and apply Havoc Bane.' },
      { name: "Feather's Edge", type: 'Resonance Skill', description: 'Flows between sword stances, restoring Melody and Azure Plume while dealing Havoc DMG.' },
      { name: 'Hush of a Thousand Voices', type: 'Resonance Liberation', description: 'Consumes Melody for a powerful Havoc strike and empowers a follow-up from Shadow of Xuanling.' },
      { name: 'The Way of Ten Thousand Voices', type: 'Forte Circuit', description: 'Builds Feathered Oath and manages Melody and Azure Plume to strengthen her stance attacks.' },
      { name: 'Skybound Feather', type: 'Intro Skill', description: 'Deals Havoc DMG, restores Azure Plume, and applies Havoc Bane.' },
      { name: 'As the Wind Wills', type: 'Outro Skill', description: 'Grants the team a follow-up Havoc damage bonus when they apply Havoc Bane.' }
    ],
    passives: [
      { name: 'Unbroken Vow', description: 'Havoc Bane stacks amplify Yangyang: Xuanling’s damage against the affected target.' },
      { name: 'One Life, One Blade', description: 'Her Resonance Liberation raises Havoc Bane to its maximum; team applications also build Windbound toward a powerful Xuanling follow-up.' }
    ],
    background: 'Yangyang: Xuanling is the second daughter of a renowned musical family in Mingting. A former Midnight Rangers Outrider, she now serves as an acting Xuan Watcher of Xuanfang Hold.'
  },
  lucilla: {
    detailsAvailable: true,
    referenceSource: 'https://wuthering.gg/characters/lucilla',
    element: 'Glacio',
    rarity: 5,
    weapon: 'Rectifier',
    title: 'President of Startorch Academy',
    maxLevel: 90,
    introduction: 'Lucilla is a five-star Glacio Rectifier user and the President of Startorch Academy. She watches over her students as they reach for the stars.',
    stats: { hp: '12237', atk: '375', def: '1197', critRate: '5%', critDMG: '150%', energyRegen: '100%', maxResonanceEnergy: '140' },
    materials: [{ name: "Suncoveter's Reach", quantity: '16' }, { name: 'Forget-Me-Not', quantity: '20' }, { name: 'FF Mech Core', quantity: '4' }, { name: 'Shell Credit', quantity: '80000', image: '/assets/items/shell-credit.png' }],
    weaponBuild: { name: 'Freeze Frame', level: 90, rank: 5, atk: '587.50', secondary: 'Crit. Rate 24.30%', passiveName: 'Freeze Frame', passive: 'Increases ATK. Inflicting Glacio Chafe grants the wielder Glacio DMG Bonus and boosts the team’s ATK for a limited time.' },
    echoBuild: {
      echoes: [{ name: 'Reminiscence: Threnodian - Voidborne Construct', cost: 4 }, { name: 'Ironhoof', cost: 3 }, { name: 'Windlash Coleoid', cost: 3 }, { name: 'Shadow Stepper', cost: 1 }, { name: 'Iceglint Dancer', cost: 1 }],
      sonata: 'Wishes of Quiet Snowfall',
      effects: [{ pieces: '2-Piece', description: 'Glacio DMG increases by 10%.' }, { pieces: '5-Piece', description: 'Inflicting Glacio Chafe builds Snowfall, empowering Resonance Liberation or the incoming Resonator’s Glacio DMG.' }],
      bestStats: null
    },
    buildStats: null,
    skills: [
      { name: 'Snapshot', type: 'Normal Attack', description: 'Builds Trace through camera-focused attacks, with accurate timing improving the final strike.' },
      { name: 'Phantom Frame', type: 'Resonance Skill', description: 'Pulls in nearby targets and uses the Focus Ring to choose between Compensate and Spotlight.' },
      { name: 'Clear As Day', type: 'Resonance Liberation', description: 'Consumes her Photos to enter Reminiscence and unleash a Glacio attack.' },
      { name: 'Memory Palace', type: 'Forte Circuit', description: 'Uses Photos, Trace, and her Resonance Mode to spread Glacio Chafe or improve Echo Skill damage.' },
      { name: 'Clip It', type: 'Intro Skill', description: 'Deals Glacio DMG and applies Glacio Chafe; in Reminiscence it becomes Hard Cut.' },
      { name: 'Montage', type: 'Outro Skill', description: 'Provides a team follow-up effect based on Lucilla’s current Resonance Mode.' }
    ],
    passives: [
      { name: 'Slow Motion', description: 'Deploying Focus Ring slows targets; a successful Spotlight grants mode-dependent Glacio resistance reduction or team Echo Skill bonuses.' },
      { name: 'Remembrance', description: 'Raises the caps for Film Roll and Zoom, and grants additional stacks as Lucilla consumes Photos.' }
    ],
    background: 'Lucilla is the President of Startorch Academy, an idealist who stays grounded while quietly supporting her students as they challenge the sky.'
  },
  hiyuki: {
    detailsAvailable: true,
    referenceSource: 'https://wuthering.gg/characters/hiyuki',
    element: 'Glacio',
    rarity: 5,
    weapon: 'Sword',
    title: 'Miko of Flaming Sakura',
    maxLevel: 90,
    introduction: 'Hiyuki is a five-star Glacio Sword user from Ashinohara. She remains in Lahai-Roi as the last member of the Special Response Force.',
    stats: { hp: '10300', atk: '462', def: '1112', critRate: '5%', critDMG: '150%', energyRegen: '100%', maxResonanceEnergy: '140' },
    materials: [{ name: 'Our Choice', quantity: '16' }, { name: 'Redbell', quantity: '20' }, { name: 'FF Exoswarm Core', quantity: '4' }, { name: 'Shell Credit', quantity: '80000', image: '/assets/items/shell-credit.png' }],
    weaponBuild: { name: 'Frostburn', level: 90, rank: 5, atk: '587.50', secondary: 'Crit. Rate 24.30%', passiveName: 'Frostburn', passive: 'Increases ATK. Applying Glacio Chafe boosts Glacio DMG and lets Resonance Liberation ignore part of enemy DEF; it also amplifies nearby Glacio Chafe damage while Hiyuki is active.' },
    echoBuild: {
      echoes: [{ name: 'Reminiscence: Threnodian - Voidborne Construct', cost: 4 }, { name: 'Ironhoof', cost: 3 }, { name: 'Frostbite Coleoid', cost: 3 }, { name: 'Tremor Warrior', cost: 1 }, { name: 'Iceglint Dancer', cost: 1 }],
      sonata: 'Wishes of Quiet Snowfall',
      effects: [{ pieces: '2-Piece', description: 'Glacio DMG increases by 10%.' }, { pieces: '5-Piece', description: 'Inflicting Glacio Chafe builds Snowfall, empowering Resonance Liberation or the incoming Resonator’s Glacio DMG.' }],
      bestStats: null
    },
    buildStats: null,
    skills: [
      { name: 'Flaming Sakura Blade Art', type: 'Normal Attack', description: 'Attacks in Present Self and Foreclaimed Self forms, applying Glacio Chafe and building her combat resources.' },
      { name: 'Frostblight', type: 'Resonance Skill', description: 'Deals Glacio DMG and empowers her next attack; in Foreclaimed Self it gains ground and aerial variants.' },
      { name: 'Foreclaiming', type: 'Resonance Liberation', description: 'Enters Foreclaimed Self, applies Glacio Chafe, and charges a stronger finishing blade attack.' },
      { name: 'Frostedge', type: 'Intro Skill', description: 'Deals Glacio DMG, applies Glacio Chafe, and restores Dedication in Present Self.' },
      { name: 'Snowlight Blessing', type: 'Outro Skill', description: 'Amplifies nearby teammates’ Glacio damage against targets affected by Glacio Chafe.' }
    ],
    passives: [
      { name: 'Fine Snow', description: 'Builds Snow Rust when the team applies Glacio Chafe or Havoc Bane, unlocking additional combat bonuses.' },
      { name: 'Ephemeral Realm', description: 'After leaving combat or recovering, Hiyuki can restore a Snowforged Blade by waiting outside combat.' }
    ],
    background: 'Hailing from Ashinohara, Hiyuki is the Miko of Flaming Sakura. She now remains in Lahai-Roi as the last and only member of the Special Response Force.'
  }
};

export const characters = characterRecords.map(character => ({ ...character, ...(verifiedCharacterOverrides[character.slug] ?? {}) }));

export const elementsList = ['All', ...elements];
export const rarities = ['All', '4 Star', '5 Star'];
export const weaponTypes = ['All', ...weapons];
