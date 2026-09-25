import { useEffect, useState } from 'react';
import WebThreads from './WebThreads';
import PixelSwap from './PixelSwap';
import LineSidebar from './LineSidebar';
import LineWaves from './LineWaves';
import DepthText from './DepthText';
import HomeArtPanels from './HomeArtPanels';
import CharactersPage from './components/characters/CharactersPage';
import CharacterDetailPage from './components/characters/CharacterDetailPage';
import WeaponsPage from './components/weapons/WeaponsPage';
import WeaponDetailPage from './components/weapons/WeaponDetailPage';
import EchoesPage from './components/echoes/EchoesPage';
import EchoDetailPage from './components/echoes/EchoDetailPage';
import ItemsPage from './components/items/ItemsPage';
import ItemDetailPage from './components/items/ItemDetailPage';
import GameGuidePage from './components/guide/GameGuidePage';
import { characters } from './data/characters';
import { weapons } from './data/weapons';
import { echoes } from './data/echoes';
import items from './data/items.json';
import './index.css';
import './Archive.css';
import './CharactersEffect.css';
import './CharactersLayoutFix.css';
import './components/characters/CharacterDetailPage.css';
import './HomeHeroLayout.css';
import './MenuOverlay.css';

const navigation = [['Resonators', '/characters', 'Resonator archive'], ['Echoes', '/echoes', 'Echo database'], ['Weapons', '/weapons', 'Weapon archive'], ['Items', '/items', 'Material inventory'], ['Game Guide', '/guide', 'Field guide']];
const menuItems = [['Resonators', '/characters'], ['Weapons', '/weapons'], ['Echoes', '/echoes'], ['Items', '/items'], ['Game Guide', '/guide']];
const entries = { Echoes: ['Fallacy of No Return', 'Bell-Borne Geochelone', 'Impermanence Heron'], Weapons: ['Stellar Symphony', 'Ages of Harvest', 'Stringmaster'], Items: ['Whisperin Core', 'Howler Core', 'Waveworn Residue'], 'Game Guide': ['Getting Started', 'Combat Basics', 'Echo Tuning'] };
const menuPreviews = [
  { eyebrow: 'RESONATOR ARCHIVE', description: 'Meet the people shaping the signal across Solaris-3.', icon: '✦', heroImage: '/menu-art/aemeath-splash.jpg', records: characters.filter(item => item.image).slice(0, 3), count: `${characters.length} RESONATORS` },
  { eyebrow: 'ARMAMENT ARCHIVE', description: 'Browse signature weapons, combat styles, and field gear.', icon: '⌁', records: weapons.slice(0, 3), count: `${weapons.length} WEAPONS` },
  { eyebrow: 'ECHO DATABASE', description: 'Discover the echoes, sonata effects, and powers found in the wild.', icon: '◉', records: echoes.slice(0, 3), count: `${echoes.length} ECHOES & SONATA EFFECTS` },
  { eyebrow: 'MATERIAL INVENTORY', description: 'Track the materials and supplies used to strengthen your team.', icon: '◇', records: items.slice(0, 3), count: `${items.length.toLocaleString()} ITEMS` },
  { eyebrow: 'FIELD GUIDE', description: 'Learn the systems, combat basics, and routes through Solaris-3.', icon: '⌖', heroImage: 'https://i.ytimg.com/vi/lN9IXcqF09I/hqdefault.jpg', records: [{ name: 'Getting Started' }, { name: 'Combat Basics' }, { name: 'Echo Tuning' }], count: 'TRANSMISSION LIBRARY' }
];

function MenuPreview({ index }) {
  const preview = menuPreviews[index] ?? menuPreviews[0];
  const hero = preview.records[0];
  return <section className={`menu-preview menu-preview--${index}`} key={index} aria-live="polite">
    <div className="menu-preview__art" aria-hidden="true"><span className="menu-preview__orbit" /><span className="menu-preview__watermark">{String(index + 1).padStart(2, '0')}</span>{(preview.heroImage || hero?.image) && <img src={preview.heroImage || hero.image} alt="" onError={event => { event.currentTarget.style.display = 'none'; }} />}<span className="menu-preview__sigil">{preview.icon}</span><i className="menu-preview__scan" /></div>
    <div className="menu-preview__copy"><p className="menu-preview__eyebrow"><span>{preview.icon}</span>{preview.eyebrow}</p><p className="menu-preview__description">{preview.description}</p><div className="menu-preview__records">{preview.records.map((record, tileIndex) => <article className="menu-preview__record" key={record.id ?? record.name}><span className="menu-preview__thumb">{record.image ? <img src={record.image} alt="" loading="lazy" /> : <i>{['✦', '⌁', '◈'][tileIndex]}</i>}</span><span><small>{String(tileIndex + 1).padStart(2, '0')} / SIGNAL</small><b>{record.name}</b></span></article>)}</div><p className="menu-preview__count">{preview.count}<span>↗</span></p></div>
  </section>;
}

function pageForPath(path) {
  if (path === '/') return 'Home';
  if (path === '/characters' || path.startsWith('/characters/')) return 'Resonators';
  if (path === '/weapons' || path.startsWith('/weapons/')) return 'Weapons';
  if (path === '/echoes' || path.startsWith('/echoes/')) return 'Echoes';
  if (path === '/items' || path.startsWith('/items/')) return 'Items';
  return navigation.find(([, item]) => item === path)?.[0] ?? 'Home';
}

function ArchivePage({ page, description }) {
  return <section className="archive-content"><p className="signal">SOLARIS-3 ARCHIVE</p><h1>{page}</h1><p>{description}. This page is part of Data Center Solaris3 and stays inside this website.</p><div className="archive-grid">{(entries[page] ?? []).map((entry, index) => <article key={entry}><span>{String(index + 1).padStart(2, '0')}</span><h2>{entry}</h2><button type="button">Open archive <b>→</b></button></article>)}</div></section>;
}

function Page({ path, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(0);
  useEffect(() => { if (!menuOpen) return undefined; const closeOnEscape = event => { if (event.key === 'Escape') setMenuOpen(false); }; window.addEventListener('keydown', closeOnEscape); return () => window.removeEventListener('keydown', closeOnEscape); }, [menuOpen]);
  const page = pageForPath(path);
  const detailSlug = path.startsWith('/characters/') ? decodeURIComponent(path.slice('/characters/'.length)) : null;
  const weaponSlug = path.startsWith('/weapons/') ? decodeURIComponent(path.slice('/weapons/'.length)) : null;
  const echoSlug = path.startsWith('/echoes/') ? decodeURIComponent(path.slice('/echoes/'.length)) : null;
  const itemSlug = path.startsWith('/items/') ? decodeURIComponent(path.slice('/items/'.length)) : null;
  const active = navigation.find(([label]) => label === page);
  const chooseMenu = (_index, label) => { setMenuOpen(false); const target = menuItems.find(([item]) => item === label)?.[1]; if (target) navigate(target); };

  return <main className={`landing-page ${page === 'Resonators' ? 'characters-route' : ''}`}>
    {page === 'Home' && <HomeArtPanels />}
    <div className="threads-layer" aria-hidden="true"><WebThreads color1="#0085ff" color2="#2183c6" color3="#b9f7ff" speed={.2} threadCount={6} frequency={5} spread={.18} taper={1} position={.5} fanMode="center" glow={.02} falloff={.6} thickness={1.1} brightness={.9} opacity={1} mirror grain grainIntensity={.05} mouseInteraction={false} /></div>
    <div className="aurora" aria-hidden="true" />
    <header className="topbar"><LineWaves speed={2} innerLineCount={32} outerLineCount={36} warpIntensity={1} rotation={-45} edgeFadeWidth={0} colorCycleSpeed={1} brightness={.2} color1="#000000" color2="#94a3b8" color3="#ffffff" enableMouseInteraction={false} /><a className="brand" href="/" onClick={event => { event.preventDefault(); navigate('/'); }} aria-label="Data Center Solaris3 home"><span className="brand-symbol">✦</span><span>Solaris3<small>Data Center</small></span></a><button className="list-button" type="button" onClick={() => setMenuOpen(true)}>List <span>+</span></button></header>
    {page === 'Home' ? <section className="center-content"><p className="signal">BLACK SHORES · DATABASE ACCESS</p><h1><DepthText text="Data Center" layers={34} depth={2.4} faceColor="#f0fcff" depthColor="#16acff" tilt={7.5} pointerTracking smoothing={0.14} perspective={900} autoOrbit orbitSpeed={0.35} fontSize="inherit" fontWeight={600} shadow /><br /><em><DepthText text="Solaris3" layers={34} depth={2.4} faceColor="#9beeff" depthColor="#16acff" tilt={7.5} pointerTracking smoothing={0.14} perspective={900} autoOrbit orbitSpeed={0.35} fontSize="inherit" fontWeight={600} shadow /></em></h1><p className="intro">A living archive of Resonators, combat data, and signals from across Solaris-3.</p></section> : detailSlug ? <CharacterDetailPage slug={detailSlug} navigate={navigate} /> : weaponSlug ? <WeaponDetailPage slug={weaponSlug} navigate={navigate} /> : echoSlug ? <EchoDetailPage slug={echoSlug} navigate={navigate} /> : itemSlug ? <ItemDetailPage slug={itemSlug} navigate={navigate} /> : page === 'Resonators' ? <CharactersPage navigate={navigate} /> : page === 'Weapons' ? <WeaponsPage navigate={navigate} /> : page === 'Echoes' ? <EchoesPage navigate={navigate} /> : page === 'Items' ? <ItemsPage navigate={navigate} /> : page === 'Game Guide' ? <GameGuidePage /> : <ArchivePage page={page} description={active?.[2]} />}
    <footer><span>© SOLARIS3 DATA CENTER</span><span>{page === 'Home' ? 'SCROLL TO EXPLORE ↓' : 'INTERNAL ARCHIVE · ONLINE'}</span></footer>
    {menuOpen && <div className="list-overlay" role="dialog" aria-modal="true" aria-label="Site menu"><LineWaves speed={.7} innerLineCount={32} outerLineCount={37} warpIntensity={1} rotation={-45} edgeFadeWidth={0} colorCycleSpeed={1} brightness={.2} color1="#007ce4" color2="#000000" color3="#03c9f0" enableMouseInteraction={false} /><div className="list-overlay__grid" aria-hidden="true" /><span className="list-overlay__corner list-overlay__corner--tl" aria-hidden="true" /><span className="list-overlay__corner list-overlay__corner--br" aria-hidden="true" /><button className="list-overlay__close" type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><span>×</span><small>ESC</small></button><div className="list-overlay__layout"><div className="list-overlay__navigation"><p className="list-overlay__kicker">SOLARIS-3 <span>/</span> DATA CENTER</p><LineSidebar items={menuItems.map(([label]) => label)} accentColor="#effcff" textColor="#a7c1cf" markerColor="#32f2e8" showIndex showMarker proximityRadius={100} maxShift={8} markerLength={24} tickScale={.5} scaleTick itemGap={15} fontSize={2.2} smoothing={240} defaultActive={activeMenu} onActiveChange={setActiveMenu} onItemClick={chooseMenu} /><div className="list-overlay__hints"><span><b>↑↓</b> NAVIGATE</span><span><b>ENTER</b> SELECT</span></div></div><MenuPreview index={activeMenu} /></div><div className="list-overlay__footer"><span>FIELD DATABASE <i>•</i> ONLINE</span><span>SOLARIS3 <i>•</i> ARCHIVE v1.0</span></div></div>}
  </main>;
}

export default function App() {
  const [slots, setSlots] = useState(() => ({ false: location.pathname, true: '/' }));
  const [active, setActive] = useState(false);
  const [busy, setBusy] = useState(false);
  const changePath = next => { if (busy || next === slots[String(active)]) return; setSlots(current => ({ ...current, [String(!active)]: next })); setBusy(true); setActive(current => !current); };
  const navigate = path => { history.pushState({}, '', path); window.scrollTo({ top: 0, behavior: 'auto' }); changePath(path); };
  useEffect(() => { const pop = () => { window.scrollTo({ top: 0, behavior: 'auto' }); changePath(location.pathname); }; addEventListener('popstate', pop); return () => removeEventListener('popstate', pop); });
  return <PixelSwap firstContent={<Page path={slots.false} navigate={navigate} />} secondContent={<Page path={slots.true} navigate={navigate} />} active={active} onComplete={() => setBusy(false)} pixelSize={40} gap={0} pixelRadius={0} pixelSpin={0} pixelScale={1} duration={1200} pixelDuration={450} pattern="random" fade />;
}
