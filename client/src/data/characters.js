import portraits from './portrait-manifest.json';

const names = ['Sanhua','Zhezhi','Carlotta','Yangyang: Xuanling','Lucilla','Hiyuki','Suisui','Encore','Changli','Brant','Lupa','Galbrena','Mornye','Aemeath','Shorekeeper','Jinhsi','Camellya','Yinlin','Jiyan','Rover','Verina','Sigrika','Suoming','Zani','Rebecca','Qiuyuan','Roccia','Qingxiao','Lynae','Luuk','Jingran','Hsin','Denia','Ciaccona','Chisa','Cantarella','Augusta','Iuno','Phoebe','Calcharo','Danjin','Jianxin','Yangyang','Lumi','Xiangli Yao','Phrolova','Cartethyia','Rover Spectro','Rover Havoc'];
const elements = ['Glacio','Fusion','Electro','Aero','Spectro','Havoc'];
const weapons = ['Sword','Broadblade','Pistols','Gauntlets','Rectifier'];
const roles = ['Main DPS','Sub DPS','Support'];
const portraitById = Object.fromEntries(portraits.map(({ Slug, File }) => [Slug, File]));
export const portraitFiles = portraits.map(({ File }) => File);

const characterRecords = names.map((name, index) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  name,
  title: 'Archive profile',
  element: elements[index % elements.length],
  rarity: index % 3 === 0 ? 4 : 5,
  weapon: weapons[index % weapons.length],
  role: roles[index % roles.length],
  image: portraitById[name.toLowerCase().replace(/[^a-z0-9]+/g, '-')] ?? (name.startsWith('Rover') ? portraitById.rover : `/characters/character-${String((index % 10) + 1).padStart(2, '0')}.jpg`),
  level: 90,
  description: `Archive profile for ${name}. Detailed official combat information is not available in this database yet.`,
  stats: { hp: 'Data not available', atk: 'Data not available', def: 'Data not available', critRate: 'Data not available', critDMG: 'Data not available', energyRegen: 'Data not available', maxResonanceEnergy: 'Data not available' },
  materials: [{ name: 'Ascension material', quantity: '—' }, { name: 'Elite material', quantity: '—' }, { name: 'Shell Credit', quantity: '—' }],
  weapons: [{ name: 'Recommended weapon', detail: 'Data not available' }],
  echoes: [{ name: 'Recommended Echo Set', detail: 'Data not available' }],
  skills: [{ name: 'Normal Attack', type: 'Combat skill', description: 'Data not available' }, { name: 'Resonance Skill', type: 'Combat skill', description: 'Data not available' }, { name: 'Resonance Liberation', type: 'Combat skill', description: 'Data not available' }],
  passives: [{ name: 'Inherent Skill', description: 'Data not available' }],
  background: 'Background information has not been added to this archive yet.'
}));

const verifiedCharacterOverrides = {
  aemeath: {
    title: 'Digital Ghost Among the Stars',
    element: 'Fusion',
    rarity: 5,
    weapon: 'Sword',
    role: 'Main DPS',
    description: 'Aemeath is a 5-Star Fusion Resonator who wields a Sword. Once an Exostrider Synchronist of Rabelle College, she now persists as a digital ghost among the stars.',
    stats: { hp: '11025', atk: '425', def: '1148', critRate: '5%', critDMG: '150%', energyRegen: '100%', maxResonanceEnergy: '140' },
    materials: [{ name: 'Our Choice', quantity: '16' }, { name: 'Moss Amber', quantity: '20' }, { name: 'FF Exoswarm Core', quantity: '4' }, { name: 'Shell Credit', quantity: '80000' }],
    weapons: [{ name: 'Everbright Polestar', detail: 'Level 90 · ATK 587.50 · Crit. Rate 24.30%' }],
    echoes: [{ name: 'Trailblazing Star', detail: 'Recommended 4-piece Sonata Effect' }],
    skills: [{ name: 'Echo Ability: Sigillum', type: 'Recommended Echo', description: 'Summons Sigillum for two Fusion DMG attacks. When equipped by Aemeath in the main slot, it increases Resonance Liberation DMG Bonus.' }],
    passives: [{ name: 'Build note', description: 'Recommended build data is shown from the referenced Aemeath profile.' }],
    background: 'Once an Exostrider Synchronist of Rabelle College, Aemeath is now a digital ghost who sings quietly amongst the stars.'
  }
};

export const characters = characterRecords.map(character => ({ ...character, ...(verifiedCharacterOverrides[character.slug] ?? {}) }));

export const elementsList = ['All', ...elements];
export const rarities = ['All', '4 Star', '5 Star'];
export const weaponTypes = ['All', ...weapons];
