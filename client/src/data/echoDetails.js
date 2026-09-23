// Verified detail records transcribed from the Wuthering.gg Echo pages.
// Echoes without an entry intentionally render their detail fields as unavailable.
const costFourMainStats = [
  { name: 'ATK', value: '150', selected: true },
  { name: 'ATK%', value: '33.0%' },
  { name: 'HP%', value: '33.0%' },
  { name: 'DEF%', value: '41.8%' },
  { name: 'Crit. Rate', value: '22.0%' },
  { name: 'Crit. DMG', value: '44.0%' },
  { name: 'Healing Bonus', value: '26.4%' },
];

const costFourSubStats = [
  ['HP', '320 - 580'], ['ATK', '30 - 70'], ['DEF', '30 - 70'],
  ['HP%', '6.4% - 11.6%'], ['ATK%', '6.4% - 11.6%'], ['DEF%', '8.1% - 14.7%'],
  ['Crit. Rate', '6.3% - 10.5%'], ['Crit. DMG', '12.6% - 21.0%'],
  ['Energy Regen', '5.6% - 14.9%'], ['Resonance Skill DMG Bonus', '6.4% - 12.4%'],
  ['Basic Attack DMG Bonus', '6.4% - 11.6%'], ['Heavy Attack DMG Bonus', '6.4% - 11.6%'],
  ['Resonance Liberation DMG Bonus', '6.4% - 11.6%'],
].map(([name, range]) => ({ name, range }));

const voidThunder = { name: 'Void Thunder', twoPiece: 'Electro DMG + 10%.', fivePiece: 'Electro DMG + 15% after releasing Heavy Attack or Resonance Skill. This effect stacks up to 2 times, each stack lasts 15s.' };
const moltenRift = { name: 'Molten Rift', twoPiece: 'Fusion DMG + 10%.', fivePiece: 'Fusion DMG + 30% for 15s after releasing Resonance Skill.' };
const moonlitClouds = { name: 'Moonlit Clouds', twoPiece: 'Energy Regen + 10%.', fivePiece: 'Upon using Outro Skill, increases the ATK of the next Resonator by 22.5% for 15s.' };
const rejuvenatingGlow = { name: 'Rejuvenating Glow', twoPiece: 'Healing Bonus + 10%.', fivePiece: 'Increases the ATK of all party members by 15% for 30s upon healing allies.' };
const havocEclipse = { name: 'Havoc Eclipse', twoPiece: 'Havoc DMG + 10%.', fivePiece: 'Havoc DMG + 7.5% after releasing Basic Attack or Heavy Attack. This effect stacks up to 4 times, each stack lasts 15s.' };
const sierraGale = { name: 'Sierra Gale', twoPiece: 'Aero DMG + 10%.', fivePiece: 'Aero DMG + 30% for 15s after releasing Intro Skill.' };

const makeRecord = (echoClass, ability, sonataEffects) => ({
  echoClass,
  rank: 4,
  level: 25,
  mainStats: costFourMainStats,
  subStats: costFourSubStats,
  ability: { name: 'Echo Ability', rank: 5, description: ability },
  sonataDetails: sonataEffects,
  source: 'https://wuthering.gg/echos',
});

export const echoDetails = {
  'thundering-mephis': makeRecord('Overlord', 'Transform into Thundering Mephis, engaging in a rapid assault of up to 6 strikes. The first 5 strikes deal 132.61% Electro DMG each, while the final strike inflicts 189.44% Electro DMG, with an additional 31.57% Electro DMG from the thunder. After the final hit, increase the current character\'s Electro DMG by 12.00% and Resonance Liberation DMG by 12.00% for 15 s. CD: 20 s', [voidThunder]),
  'inferno-rider': makeRecord('Overlord', 'Transform into the Inferno Rider to launch up to 3 consecutive slashes in a row, each slash dealing 242.40%, 282.80%, and 282.80% Fusion DMG respectively. After the final hit, increase the current Resonator\'s Fusion DMG by 12.00% and Basic Attack DMG by 12.00% for 15 s. Long press the Echo Skill to transform into the Inferno Rider and enter Riding Mode. When exiting Riding Mode, deal 282.80% Fusion DMG to enemies in front. CD: 20 s', [moltenRift]),
  'bell-borne-geochelone': makeRecord('Calamity', 'Activate the protection of Bell-Borne Geochelone. Deal Glacio DMG based on 145.92% of the current character\'s DEF to nearby enemies, and obtain a Bell-Borne Shield that lasts for 15 s. The Bell-Borne Shield provides 50.00% DMG Reduction and 10.00% DMG Boost for the current team members, and disappears after the current character is hit for 3 times. CD: 20 s', [moonlitClouds, rejuvenatingGlow]),
  'tempest-mephis': makeRecord('Overlord', 'Transform into Tempest Mephis to perform tail swing attacks followed by a claw attack. The lightning strike summoned by the tail swing deals 102.48% Electro DMG each time, while the claw attack deals 175.68% Electro DMG. After the claw hit, increase the current character\'s Electro DMG by 12.00% and Heavy Attack DMG by 12.00% for 15 s. CD: 20 s', [voidThunder]),
  'crownless': makeRecord('Overlord', 'Transform into Crownless and perform up to 4 consecutive attacks. The first 2 attacks deal 134.08% Havoc DMG each, the 3rd attack deals 100.56% Havoc DMG 2 times, and the 4th attack deals 67.04% Havoc DMG 3 times. After the transformation, increase current character\'s Havoc DMG by 12.00% and Resonance Skill DMG by 12.00% for 15 s. CD: 20 s', [havocEclipse]),
  'feilian-beringal': makeRecord('Overlord', 'Transform into Feilian Beringal to perform a powerful kick. If the kick lands on an enemy, immediately perform a follow-up strike. The kick deals 231.84% Aero DMG, and the follow-up strike deals 283.36% Aero DMG. After the follow-up strike hits, the current character\'s Aero DMG increases by 12.00%, and the Heavy Attack DMG increases by 12.00% for 15 s. CD: 20 s', [sierraGale]),
};
