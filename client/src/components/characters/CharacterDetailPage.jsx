import { characters } from '../../data/characters';
import './CharacterDetailPage.css';

const elementColors = { Glacio: '#91d7ff', Fusion: '#ff875f', Electro: '#b99bff', Aero: '#7ee6af', Spectro: '#f7d67a', Havoc: '#ef8fcf' };

function MaterialCard({ material }) {
  return <article className="detail-material"><strong>{material.quantity}</strong><span className="detail-material__icon" aria-hidden="true">✦</span><small>{material.name}</small></article>;
}

function InfoCard({ title, item }) {
  return <article className="detail-info-card"><p>{title}</p><h3>{item.name}</h3><span>{item.detail}</span></article>;
}

function SkillCard({ skill, passive = false }) {
  return <article className="detail-skill"><span className="detail-skill__icon" aria-hidden="true">✦</span><div><small>{passive ? 'PASSIVE SKILL' : skill.type}</small><h3>{skill.name}</h3><p>{skill.description}</p></div></article>;
}

export default function CharacterDetailPage({ slug, navigate }) {
  const character = characters.find(item => item.slug === slug);
  if (!character) return <main className="character-detail character-detail--missing"><p className="signal">ARCHIVE SIGNAL LOST</p><h1>Character Not Found</h1><p>The requested character could not be found.</p><button type="button" onClick={() => navigate('/characters')}>Back to Characters</button></main>;
  const stats = [['HP', character.stats.hp], ['ATK', character.stats.atk], ['DEF', character.stats.def], ['Crit. Rate', character.stats.critRate], ['Crit. DMG', character.stats.critDMG], ['Energy Regen', character.stats.energyRegen], ['Max Resonance Energy', character.stats.maxResonanceEnergy]];
  return <main className="character-detail" style={{ '--detail-element': elementColors[character.element] }}>
    <button className="character-back" type="button" onClick={() => navigate('/characters')}>← Back to Characters</button>
    <section className="detail-hero">
      <div className="detail-art"><div className="detail-art__halo" /><img src={character.image} alt={`${character.name} artwork`} onError={event => { event.currentTarget.style.display = 'none'; }} /></div>
      <div className="detail-summary"><p className="signal">SOLARIS-3 · RESONATOR ARCHIVE</p><h1>{character.name}</h1><p className="detail-title">{character.title}</p><p className="detail-stars">{'★'.repeat(character.rarity)}</p><div className="detail-badges"><span>{character.weapon}</span><span>{character.rarity} Star</span><span>{character.element}</span></div><div className="detail-level"><div><span>LEVEL</span><strong>{character.level}</strong><small>/ 90</small></div><div className="detail-level__bar"><i /></div></div><section><h2>Ascension Materials</h2><div className="detail-materials">{character.materials.map(material => <MaterialCard key={material.name} material={material} />)}</div></section></div>
    </section>
    <section className="detail-section detail-stats"><div><p className="signal">COMBAT DATA</p><h2>Character Stats</h2></div><dl>{stats.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
    <section className="detail-section detail-copy"><p className="signal">INTRODUCTION</p><h2>Introduction</h2><p>{character.description}</p></section>
    <section className="detail-section"><p className="signal">RECOMMENDED BUILD</p><h2>Character Build</h2><div className="detail-info-grid"><InfoCard title="Best Weapon" item={character.weapons[0]} /><InfoCard title="Best Echo Set" item={character.echoes[0]} /><InfoCard title="Best Stats" item={{ name: 'Stat priority', detail: 'Data not available' }} /></div></section>
    <section className="detail-section"><p className="signal">COMBAT ARCHIVE</p><h2>Skills</h2><div className="detail-skill-grid">{character.skills.map(skill => <SkillCard key={skill.name} skill={skill} />)}</div></section>
    <section className="detail-section"><p className="signal">INHERENT ABILITIES</p><h2>Passive Skills</h2><div className="detail-skill-grid">{character.passives.map(skill => <SkillCard key={skill.name} skill={skill} passive />)}</div></section>
    <section className="detail-section detail-copy"><p className="signal">BACKGROUND</p><h2>Background</h2><p>{character.background}</p></section>
  </main>;
}
