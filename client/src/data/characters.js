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
  Iuno: ['Aero', 'Gauntlets', 5], Phoebe: ['Spectro', 'Rectifier', 5], Danjin: ['Havoc', 'Sword', 4],
  Jianxin: ['Aero', 'Gauntlets', 5], Yangyang: ['Aero', 'Sword', 4], Lumi: ['Electro', 'Broadblade', 4], 'Xiangli Yao': ['Electro', 'Gauntlets', 5],
  Phrolova: ['Havoc', 'Rectifier', 5], Cartethyia: ['Aero', 'Sword', 5], 'Rover Spectro': ['Spectro', 'Sword', 5, 'Rover (Spectro)'], 'Rover Havoc': ['Havoc', 'Sword', 5, 'Rover (Havoc)']
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
  }
};

export const characters = characterRecords.map(character => ({ ...character, ...(verifiedCharacterOverrides[character.slug] ?? {}) }));

export const elementsList = ['All', ...elements];
export const rarities = ['All', '4 Star', '5 Star'];
export const weaponTypes = ['All', ...weapons];
