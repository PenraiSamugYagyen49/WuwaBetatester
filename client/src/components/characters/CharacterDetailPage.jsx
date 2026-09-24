import { characters } from '../../data/characters';
import './CharacterDetailPage.css';

const elementColors = { Glacio: '#91d7ff', Fusion: '#ff875f', Electro: '#b99bff', Aero: '#7ee6af', Spectro: '#f7d67a', Havoc: '#ef8fcf' };
const statLabels = [['hp', 'HP'], ['atk', 'ATK'], ['def', 'DEF'], ['critRate', 'Crit. Rate'], ['critDMG', 'Crit. DMG'], ['energyRegen', 'Energy Regen'], ['maxResonanceEnergy', 'Max Resonance Energy']];

function Section({ signal, title, children }) {
  return <section className="detail-section"><p className="signal">{signal}</p><h2>{title}</h2>{children}</section>;
}

function CharacterStats({ stats }) {
  return <dl>{statLabels.filter(([key]) => stats[key] != null).map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{stats[key]}</dd></div>)}</dl>;
}

export default function CharacterDetailPage({ slug, navigate }) {
  const character = characters.find(item => item.slug === slug);
  const back = <button className="character-back" type="button" onClick={() => navigate('/characters')}>← Back to Resonators</button>;

  if (!character) return <main className="character-detail character-detail--missing">{back}<p className="signal">ARCHIVE SIGNAL LOST</p><h1>Resonator Not Found</h1><p>The requested Resonator could not be found.</p></main>;
  if (!character.detailsAvailable) return <main className="character-detail character-detail--missing">{back}<p className="signal">ARCHIVE PROFILE INCOMPLETE</p><h1>{character.name}</h1><p>Resonator data unavailable. A verified profile has not been added to this archive yet.</p></main>;

  const color = elementColors[character.element] ?? '#83e4e9';
  const level = character.maxLevel;
  const build = character.echoBuild;
  const echoCost = build?.echoes.reduce((sum, echo) => sum + echo.cost, 0) ?? 0;

  return <main className="character-detail" style={{ '--detail-element': color }}>
    {back}
    <section className="detail-hero">
      <div className="detail-art"><div className="detail-art__halo" />{character.image && <img src={character.image} alt={`${character.name} artwork`} onError={event => { event.currentTarget.style.display = 'none'; }} />}</div>
      <div className="detail-summary"><p className="signal">SOLARIS-3 · RESONATOR ARCHIVE</p><h1>{character.referenceName}</h1>{character.title && <p className="detail-title">{character.title}</p>}<p className="detail-stars" aria-label={`${character.rarity} star`}>{'★'.repeat(character.rarity)}</p><div className="detail-badges"><span>{character.weapon}</span><span>{character.rarity} Star</span><span>{character.element}</span></div>{level && <div className="detail-level"><div><span>MAX LEVEL</span><strong>{level}</strong></div><div className="detail-level__bar"><i /></div></div>}
        {character.materials && <><h2>Ascension Materials</h2><div className="detail-materials">{character.materials.map(material => <article className="detail-material" key={material.name}><strong>{material.quantity}</strong>{material.image ? <img className="detail-material__image" src={material.image} alt="" /> : <span className="detail-material__icon" aria-hidden="true">✦</span>}<small>{material.name}</small></article>)}</div></>}
      </div>
    </section>
    {character.stats && <Section signal="COMBAT DATA" title="Base Stats"><div className="detail-stats"><CharacterStats stats={character.stats} /></div></Section>}
    {!character.stats && <Section signal="REFERENCE PROFILE" title="Resonator Details"><p className="detail-copy">The reference list confirms this Resonator’s element, weapon type, and rarity. It does not provide level, ascension, combat stats, skills, or build details here.</p></Section>}
    {character.introduction && <Section signal="INTRODUCTION" title="Introduction"><div className="detail-copy"><p>{character.introduction}</p></div></Section>}
    {character.weaponBuild && <Section signal={`RECOMMENDED WEAPON · LEVEL MAX · RANK ${character.weaponBuild.rank}`} title="Best Weapon"><article className="detail-info-card"><p>{character.weapon.toUpperCase()} · LEVEL {character.weaponBuild.level} · RANK {character.weaponBuild.rank}</p><h3>{character.weaponBuild.name}</h3><span>ATK {character.weaponBuild.atk} · {character.weaponBuild.secondary}</span><p className="detail-card-subtitle">{character.weaponBuild.passiveName}</p><span>{character.weaponBuild.passive}</span></article></Section>}
    {build && <>
      <Section signal="RECOMMENDED BUILD" title={`Best Echo Set for ${character.name}`}><p className="detail-copy">{build.echoes.length} Echoes · {echoCost} total cost · {build.sonata}</p><div className="detail-info-grid">{build.echoes.map(echo => <article className="detail-info-card" key={echo.name}><p>{build.sonata} · COST {echo.cost}</p><h3>{echo.name}</h3></article>)}</div><div className="detail-info-grid detail-sonata-effects">{build.effects.map(effect => <article className="detail-info-card" key={effect.pieces}><p>{effect.pieces} SONATA EFFECT</p><span>{effect.description}</span></article>)}</div></Section>
      <Section signal="BUILD PRIORITY" title={`Best Stats for ${character.name}`}>{build.bestStats ? <ul className="detail-stat-priority">{build.bestStats.map(stat => <li key={stat}>{stat}</li>)}</ul> : <p className="detail-copy">Verified stat priority data is unavailable.</p>}</Section>
      {build.echoAbility && <Section signal="RECOMMENDED ECHO ABILITY" title="Echo Ability"><article className="detail-info-card"><p>RANK {build.echoAbility.rank} · COOLDOWN {build.echoAbility.cooldown}</p><h3>{build.echoAbility.name}</h3><span>{build.echoAbility.description}</span></article></Section>}
    </>}
    {character.buildStats !== undefined && <Section signal="BUILD DATA" title="Build Stats"><p className="detail-copy">{character.buildStats ? 'Calculated recommended build stats.' : 'Combined build stats are unavailable because verified Echo substat values are not provided.'}</p>{character.buildStats && <CharacterStats stats={character.buildStats} />}</Section>}
    {character.skills?.length > 0 && <Section signal="COMBAT ARCHIVE" title="Skills"><div className="detail-skill-grid">{character.skills.map(skill => <article className="detail-skill" key={skill.name}><div><small>{skill.type}</small><h3>{skill.name}</h3><p>{skill.description}</p></div></article>)}</div></Section>}
    {character.passives?.length > 0 && <Section signal="INHERENT ABILITIES" title="Passive Skills"><div className="detail-skill-grid">{character.passives.map(skill => <article className="detail-skill" key={skill.name}><div><small>PASSIVE SKILL</small><h3>{skill.name}</h3><p>{skill.description}</p></div></article>)}</div></Section>}
    {character.background && <Section signal="BACKGROUND" title="Background"><div className="detail-copy"><p>{character.background}</p></div></Section>}
  </main>;
}
