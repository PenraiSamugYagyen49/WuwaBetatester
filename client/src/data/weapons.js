const rawBase = 'https://raw.githubusercontent.com/ryanbenson/wuthering-waves-assets/master/images/weapons';
const slugify = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const assetKey = name => name.replace(/[^a-zA-Z0-9]/g, '');
const fileOverrides = { 'Red Spring':'CamellyaSigTmp.jpg', 'The Last Dance':'CarlottaSignature.jpg', 'Scale: Slasher':'ScaleSlasher.webp' };

// Canonical 4★ / 5★ entries from wuthering.gg/weapons. 3★ and lower are intentionally excluded.
const fiveStar = [
  ['Lustrous Razor','Broadblade'],['Emerald of Genesis','Sword'],['Static Mist','Pistols'],['Abyss Surges','Gauntlet'],['Cosmic Ripples','Rectifier'],['Verdant Summit','Broadblade'],['Stringmaster','Rectifier'],['Ages of Harvest','Broadblade'],['Blazing Brilliance','Sword'],['Rime-Draped Sprouts','Gauntlet'],['Verity\'s Handle','Gauntlet'],['Stellar Symphony','Rectifier'],['Red Spring','Sword'],['Tragicomedy','Pistols'],['The Last Dance','Pistols'],['Unflickering Valor','Broadblade'],['Luminous Hymn','Rectifier'],['Whispers of Sirens','Rectifier'],['Bloodpact\'s Pledge','Broadblade'],['Blazing Justice','Broadblade'],['Woodland Aria','Sword'],['Defier\'s Thorn','Sword'],['Wildfire Mark','Pistols'],['Lethean Elegy','Rectifier'],['Moongazer\'s Sigil','Rectifier'],['Thunderflare Dominion','Broadblade'],['Lux & Umbra','Sword'],['Emerald Sentence','Sword'],['Kumokiri','Sword'],['Spectrum Blaster','Pistols'],['Starfield Calibrator','Rectifier'],['Radiance Cleaver','Broadblade'],['Laser Shearer','Gauntlet'],['Phasic Homogenizer','Rectifier'],['Pulsation Bracer','Gauntlet'],['Boson Astrolabe','Rectifier'],['Everbright Polestar','Rectifier'],['Daybreaker\'s Spine','Sword'],['Solsworn Ciphers','Pistols'],['Forged Dwarf Star','Broadblade'],['Frostburn','Sword'],['Spectral Trigger','Pistols'],['Skull Thrasher','Gauntlet'],['Freeze Frame','Pistols'],['Azure Oath','Sword'],['Firstlight\'s Herald','Rectifier'],['Thousandfold Deliverance','Sword']
];
const fourStar = [
  ['Glint of Clouds','Sword'],['Autumntrace','Broadblade'],['Lumingloss','Sword'],['Thunderbolt','Pistols'],['Stonard','Gauntlet'],['Augment','Gauntlet'],['Discord','Rectifier'],['Overture','Pistols'],['Cadenza','Pistols'],['Marcato','Gauntlet'],['Variation','Rectifier'],['Broadblade#41','Broadblade'],['Sword#18','Sword'],['Pistols#26','Pistols'],['Gauntlets#21D','Gauntlet'],['Rectifier#25','Rectifier'],['Dauntless Evernight','Broadblade'],['Commando of Conviction','Sword'],['Undying Flame','Sword'],['Amity Accord','Broadblade'],['Jinzhou Keeper','Rectifier'],['Helios Cleaver','Broadblade'],['Lunar Cutter','Sword'],['Novaburst','Pistols'],['Hollow Mirage','Gauntlet'],['Comet Flare','Pistols'],['Waning Redshift','Pistols'],['Endless Collapse','Broadblade'],['Relativistic Jet','Pistols'],['Celestial Spiral','Gauntlet'],['Fusion Accretion','Broadblade'],['Somnoire Anchor','Rectifier'],['Call of the Abyss','Sword'],['Meditations on Mercy','Rectifier'],['Fables of Wisdom','Rectifier'],['Romance in Farewell','Sword'],['Legend of Drunken Hero','Broadblade'],['Waltz in Masquerade','Pistols'],['Ocean\'s Gift','Rectifier'],['Aureate Zenith','Gauntlet'],['Feather Edge','Sword'],['Solar Flame','Sword'],['Aether Strike','Sword'],['Radiant Dawn','Sword']
];
const allWeapons = [...fiveStar.map(([name,type]) => [name,5,type]), ...fourStar.map(([name,type]) => [name,4,type])];
const statsFor = (rarity, index) => ({ atk: rarity === 5 ? 587 : 412, secondary: index % 3 === 0 ? 'Crit. Rate 24.30%' : index % 3 === 1 ? 'ATK 18.00%' : 'Energy Regen 32.00%' });

export const weapons = allWeapons.map(([name, rarity, type], index) => {
  const asset = fileOverrides[name] ?? `${assetKey(name)}.png`;
  return { id:slugify(name),slug:slugify(name),name,rarity,type,image:`${rawBase}/${asset}`,stats:statsFor(rarity,index),level:90,rank:1,ascensionMaterials:[{name:'Weapon material',quantity:'—'},{name:'Elite material',quantity:'—'},{name:'Shell Credit',quantity:'—'}],skill:{name:'Weapon Effect',description:'Data not available. Add verified weapon effect information to the weapon data source.'},about:'Weapon archive entry. Official lore and detailed stats have not been added yet.' };
});

const everbrightPolestar = weapons.find(weapon => weapon.slug === 'everbright-polestar');
if (everbrightPolestar) {
  Object.assign(everbrightPolestar, {
    stats: { atk: '374.68', secondary: 'Crit. Rate 18.00%' },
    level: 60,
    maxLevel: null,
    rank: 1,
    maxRank: null,
    showAscension: false,
    ascensionMaterials: [],
    skill: {
      name: 'Starchaser',
      description: 'Increases All-Attribute DMG Bonus by 12%. When Tune Rupture – Shifting or Fusion Burst is inflicted, Resonance Liberation DMG ignores 32% DEF and 10% Fusion RES for 8 seconds.'
    },
    about: 'A starlit weapon linked to a solitary journey across a silent sea, preserving its radiance through the dark.'
  });
}

export const weaponRarities = ['All', '5-Star', '4-Star'];
export const weaponTypes = ['All', 'Sword', 'Broadblade', 'Gauntlet', 'Pistols', 'Rectifier'];
