import { echoDetails } from './echoDetails.js';

const rawBase = 'https://raw.githubusercontent.com/ryanbenson/wuthering-waves-assets/master/images/echoes';
const setBase = `${rawBase}/sets`;
const slugify = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const assetKey = name => name.replace(/[^a-zA-Z0-9]/g, '');
const setAsset = { 'Havoc Eclipse':'SunSinkingEclipse', 'Flamewing\'s Shadow':'FlamewingsShadow', 'Heart of Evil\'s Purge':'HeartofEvilsPurge', 'Pact of Neonlight Leap':'PactofNeonlightLeap', 'Rite of Gilded Revelation':'RiteofGildedRevelation', 'Song of Feathered Trace':'SongofFeatheredTrace', 'Sound of True Name':'SoundofTrueName', 'Thread of Severed Fate':'ThreadofSeveredFate', 'Tidebreaking Courage':'TidebreakingCourage', 'Trailblazing Star':'TrailblazingStar', 'Wishes of Quiet Snowfall':'WishesofQuietSnowfall', 'Gusts of Welkin':'GustsofWelkin', 'Dream of the Lost':'DreamoftheLost', 'Crown of Valor':'CrownofValor', 'Eternal Radiance':'EternalRadiance', 'Freezing Frost':'FreezingFrost', 'Frosty Resolve':'FrostyResolve', 'Moonlit Clouds':'MoonlitClouds', 'Molten Rift':'MoltenRift', 'Rejuvenating Glow':'RejuvenatingGlow', 'Sierra Gale':'SierraGale', 'Void Thunder':'VoidThunder', 'Celestial Light':'CelestialLight', 'Lingering Tunes':'LingeringTunes', 'Midnight Veil':'MidnightVeil', 'Empyrean Anthem':'EmpyreanAnthem', 'Windward Pilgrimage':'WindwardPilgrimage', 'Flaming Clawprint':'FlamingClawprint', 'Law of Harmony':'LawofHarmony', 'Halo of Starry Radiance':'HaloofStarryRadiance', 'Chromatic Foam':'ChromaticFoam', 'Reel of Spliced Memories':'ReelofSplicedMemories', 'Lamp of Nether Road':'LampofNetherRoad' };

// name | cost | Sonata effects — referenced from wuthering.gg/echos.
const catalog = `Thundering Mephis|4|Void Thunder
Inferno Rider|4|Molten Rift
Bell-Borne Geochelone|4|Moonlit Clouds,Rejuvenating Glow
Tempest Mephis|4|Void Thunder
Crownless|4|Havoc Eclipse
Feilian Beringal|4|Sierra Gale
Lampylumen Myriad|4|Freezing Frost
Mourning Aix|4|Celestial Light
Mech Abomination|4|Lingering Tunes
Impermanence Heron|4|Moonlit Clouds
Dreamless|4|Havoc Eclipse
Jue|4|Celestial Light
Fallacy of No Return|4|Rejuvenating Glow
Lorelei|4|Midnight Veil
Sentry Construct|4|Frosty Resolve
Dragon of Dirge|4|Tidebreaking Courage
Hecate|4|Empyrean Anthem
Nightmare: Feilian Beringal|4|Sierra Gale
Nightmare: Impermanence Heron|4|Midnight Veil
Nightmare: Thundering Mephis|4|Void Thunder
Nightmare: Tempest Mephis|4|Void Thunder,Empyrean Anthem
Nightmare: Crownless|4|Havoc Eclipse
Nightmare: Inferno Rider|4|Molten Rift
Nightmare: Mourning Aix|4|Eternal Radiance
Nightmare: Lampylumen Myriad|4|Frosty Resolve,Empyrean Anthem
Reminiscence: Fleurdelys|4|Gusts of Welkin,Windward Pilgrimage
Nightmare: Kelpie|4|Gusts of Welkin,Windward Pilgrimage
Lioness of Glory|4|Flaming Clawprint
Nightmare: Hecate|4|Dream of the Lost
Reminiscence: Fenrico|4|Dream of the Lost,Law of Harmony
The False Sovereign|4|Crown of Valor
Lady of the Sea|4|Crown of Valor
Hyvatia|4|Pact of Neonlight Leap,Rite of Gilded Revelation
Reactor Husk|4|Halo of Starry Radiance,Chromatic Foam
Sigillum|4|Trailblazing Star
Nameless Explorer|4|Sound of True Name,Reel of Spliced Memories
Calamity Effigy|4|Heart of Evil's Purge,Lamp of Nether Road
Violet-Feathered Heron|3|Molten Rift,Void Thunder
Cyan-Feathered Heron|3|Sierra Gale,Celestial Light
Stonewall Bracer|3|Rejuvenating Glow,Moonlit Clouds
Flautist|3|Lingering Tunes,Void Thunder
Tambourinist|3|Freezing Frost,Havoc Eclipse
Chasm Guardian|3|Lingering Tunes,Rejuvenating Glow
Rocksteady Guardian|3|Rejuvenating Glow,Celestial Light
Viridblaze Saurian|3|Moonlit Clouds,Molten Rift
Roseshroom|3|Freezing Frost,Havoc Eclipse
Spearback|3|Lingering Tunes,Moonlit Clouds
Havoc Dreadmane|3|Molten Rift,Havoc Eclipse
Hoochief|3|Rejuvenating Glow,Sierra Gale
Carapace|3|Moonlit Clouds,Sierra Gale
Autopuppet Scout|3|Celestial Light,Freezing Frost
Glacio Dreadmane|3|Moonlit Clouds,Freezing Frost
Lumiscale Construct|3|Void Thunder,Freezing Frost
Lightcrusher|3|Celestial Light
Questless Knight|3|Frosty Resolve,Midnight Veil
Diurnus Knight|3|Eternal Radiance,Tidebreaking Courage
Nocturnus Knight|3|Midnight Veil,Empyrean Anthem
Abyssal Patricius|3|Empyrean Anthem,Frosty Resolve
Abyssal Gladius|3|Tidebreaking Courage,Midnight Veil,Thread of Severed Fate
Abyssal Mercator|3|Frosty Resolve,Eternal Radiance
Chop Chop|3|Tidebreaking Courage,Empyrean Anthem,Dream of the Lost
Vitreum Dancer|3|Empyrean Anthem,Eternal Radiance
Cuddle Wuddle|3|Midnight Veil,Frosty Resolve
Rage Against the Statue|3|Eternal Radiance,Gusts of Welkin,Law of Harmony
Hurriclaw|3|Tidebreaking Courage,Gusts of Welkin,Crown of Valor
Capitaneus|3|Gusts of Welkin,Eternal Radiance,Windward Pilgrimage
Pilgrim's Shell|3|Windward Pilgrimage,Flaming Clawprint
Kerasaur|3|Windward Pilgrimage,Flaming Clawprint,Flamewing's Shadow
Corrosaurus|3|Flaming Clawprint,Flamewing's Shadow
Nightmare: Violet-Feathered Heron|3|Crown of Valor
Nightmare: Cyan-Feathered Heron|3|Law of Harmony
Nightmare: Viridblaze Saurian|3|Flamewing's Shadow
Nightmare: Roseshroom|3|Thread of Severed Fate
Flora Reindeer|3|Rite of Gilded Revelation,Reel of Spliced Memories
Mining Reindeer|3|Pact of Neonlight Leap,Reel of Spliced Memories
Ironhoof|3|Pact of Neonlight Leap,Wishes of Quiet Snowfall,Reel of Spliced Memories
Spacetrek Explorer|3|Halo of Starry Radiance,Chromatic Foam,Sound of True Name
Sabercat Reaver|3|Pact of Neonlight Leap,Halo of Starry Radiance,Sound of True Name
Sabercat Prowler|3|Pact of Neonlight Leap,Halo of Starry Radiance,Sound of True Name
Frostbite Coleoid|3|Halo of Starry Radiance,Wishes of Quiet Snowfall
Windlash Coleoid|3|Rite of Gilded Revelation,Wishes of Quiet Snowfall
Kronablight|3|Trailblazing Star,Chromatic Foam
Glommoth|3|Trailblazing Star,Wishes of Quiet Snowfall
Voidwing Moth|3|Reel of Spliced Memories
Fog Lionarch|3|Song of Feathered Trace,Heart of Evil's Purge,Lamp of Nether Road
Forbidden Bastion|3|Song of Feathered Trace,Heart of Evil's Purge,Lamp of Nether Road
Vanguard Junrock|1|Rejuvenating Glow,Void Thunder,Lingering Tunes
Fission Junrock|1|Moonlit Clouds,Void Thunder,Rejuvenating Glow
Electro Predator|1|Molten Rift,Void Thunder
Fusion Warrior|1|Sierra Gale,Void Thunder,Molten Rift
Havoc Warrior|1|Celestial Light,Havoc Eclipse
Snip Snap|1|Lingering Tunes,Rejuvenating Glow,Molten Rift
Zig Zag|1|Moonlit Clouds,Lingering Tunes,Celestial Light
Whiff Whaff|1|Rejuvenating Glow,Moonlit Clouds,Sierra Gale
Tick Tack|1|Lingering Tunes,Rejuvenating Glow,Havoc Eclipse
Glacio Predator|1|Celestial Light,Freezing Frost
Gulpuff|1|Celestial Light,Freezing Frost
Glacio Prism|1|Havoc Eclipse,Moonlit Clouds,Freezing Frost
Fusion Prism|1|Freezing Frost,Lingering Tunes,Molten Rift
Spectro Prism|1|Molten Rift,Void Thunder,Celestial Light
Havoc Prism|1|Void Thunder,Celestial Light,Havoc Eclipse
Aero Predator|1|Void Thunder,Sierra Gale
Cruisewing|1|Rejuvenating Glow,Moonlit Clouds,Celestial Light
Sabyr Boar|1|Moonlit Clouds,Sierra Gale,Freezing Frost
Excarat|1|Freezing Frost,Havoc Eclipse
Baby Viridblaze Saurian|1|Lingering Tunes,Void Thunder,Molten Rift
Baby Roseshroom|1|Sierra Gale,Havoc Eclipse
Hoartoise|1|Celestial Light,Freezing Frost
Fusion Dreadmane|1|Rejuvenating Glow,Molten Rift
Hooscamp|1|Lingering Tunes,Sierra Gale
Diamondclaw|1|Moonlit Clouds,Lingering Tunes
Chirpuff|1|Havoc Eclipse,Sierra Gale
Traffic Illuminator|1|Void Thunder,Sierra Gale,Molten Rift
Clang Bang|1|Celestial Light,Freezing Frost
Lava Larva|1|Lingering Tunes,Molten Rift
Dwarf Cassowary|1|Sierra Gale,Rejuvenating Glow
Galescourge Stalker|1|Frosty Resolve,Empyrean Anthem
Voltscourge Stalker|1|Empyrean Anthem,Midnight Veil
Frostscourge Stalker|1|Midnight Veil,Eternal Radiance
Chop Chop: Headless|1|Eternal Radiance,Tidebreaking Courage
Chop Chop: Leftless|1|Frosty Resolve,Tidebreaking Courage
Chop Chop: Rightless|1|Tidebreaking Courage,Frosty Resolve
Fae Ignis|1|Midnight Veil,Eternal Radiance,Dream of the Lost
Nimbus Wraith|1|Empyrean Anthem,Midnight Veil,Flamewing's Shadow
Hocus Pocus|1|Frosty Resolve,Empyrean Anthem
Lottie Lost|1|Tidebreaking Courage,Frosty Resolve
Diggy Duggy|1|Eternal Radiance,Tidebreaking Courage
Chest Mimic|1|Midnight Veil,Empyrean Anthem,Frosty Resolve
Golden Junrock|1|Eternal Radiance,Frosty Resolve,Law of Harmony
Calcified Junrock|1|Tidebreaking Courage,Empyrean Anthem,Crown of Valor
Aero Prism|1|Eternal Radiance,Tidebreaking Courage
La Guardia|1|Gusts of Welkin,Midnight Veil,Flaming Clawprint
Sagittario|1|Gusts of Welkin,Eternal Radiance,Flaming Clawprint
Sacerdos|1|Gusts of Welkin,Windward Pilgrimage
Aero Drake|1|Gusts of Welkin,Tidebreaking Courage,Flaming Clawprint
Electro Drake|1|Gusts of Welkin,Midnight Veil,Flaming Clawprint
Glacio Drake|1|Gusts of Welkin,Windward Pilgrimage
Fusion Drake|1|Flaming Clawprint,Windward Pilgrimage
Spectro Drake|1|Flaming Clawprint,Windward Pilgrimage
Havoc Drake|1|Flaming Clawprint,Windward Pilgrimage,Thread of Severed Fate
Devotee's Flesh|1|Gusts of Welkin,Windward Pilgrimage,Flaming Clawprint`.split('\n').map(row => { const [name, cost, sets] = row.split('|'); return { name, cost:Number(cost), sonataEffects:sets.split(',') }; });

export const echoes = catalog.map(({ name,cost,sonataEffects }) => {
  const id = slugify(name);
  const details = echoDetails[id] ?? {};
  return { id,slug:id,name,image:`${rawBase}/${assetKey(name)}.webp`,imageFallback:`${rawBase}/${assetKey(name)}.png`,cost,sonataEffects,...details };
});
const usedSets = [...new Set(catalog.flatMap(echo => echo.sonataEffects))];
export const sonataEffects = [{ id:'all',name:'All',image:null }, ...usedSets.map(name => ({ id:slugify(name),name,image:`${setBase}/${setAsset[name] ?? assetKey(name)}.webp` }))];
export const echoCosts = ['Any','1','3','4'];
