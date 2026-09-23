import { weapons } from '../../data/weapons';
import './Weapons.css';
import './WeaponAssets.css';

function Material({ item }) {
  return <article className="weapon-material"><strong>{item.quantity}</strong><span>✦</span><small>{item.name}</small></article>;
}

export default function WeaponDetailPage({ slug, navigate }) {
  const weapon = weapons.find(item => item.slug === slug);

  if (!weapon) {
    return <main className="weapon-detail weapon-detail--missing"><p className="signal">ARCHIVE SIGNAL LOST</p><h1>Weapon Not Found</h1><p>The requested weapon could not be found.</p><button onClick={() => navigate('/weapons')}>Back to Weapons</button></main>;
  }

  const levelLabel = weapon.maxLevel ? `${weapon.level} / ${weapon.maxLevel}` : weapon.level;
  const rankLabel = weapon.maxRank ? `${weapon.rank} / ${weapon.maxRank}` : weapon.rank;
  const rankProgress = weapon.maxRank ? `${(weapon.rank / weapon.maxRank) * 100}%` : '20%';

  return <main className={`weapon-detail rarity-${weapon.rarity}`}>
    <button className="weapon-back" onClick={() => navigate('/weapons')}>← Back to Weapons</button>
    <section className="weapon-detail__hero">
      <div className="weapon-showcase"><img src={weapon.image} alt={weapon.name} onError={event => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling.hidden = false; }} /><span hidden aria-hidden="true">✦</span></div>
      <div>
        <p className="signal">SOLARIS-3 · ARMAMENT ARCHIVE</p><h1>{weapon.name}</h1><p className="weapon-stars">{'★'.repeat(weapon.rarity)}</p>
        <div className="weapon-badges"><span>{weapon.type}</span><span>{weapon.rarity} Star</span></div>
        <div className="weapon-stat-pair"><div><small>ATK</small><strong>{weapon.stats.atk}</strong></div><div><small>SECONDARY STAT</small><strong>{weapon.stats.secondary}</strong></div></div>
        <div className="weapon-control"><div><span>LEVEL</span><strong>{levelLabel}</strong></div><i /></div>
        <div className="weapon-control"><div><span>RANK</span><strong>{rankLabel}</strong></div><i style={{ width: rankProgress }} /></div>
      </div>
    </section>
    {weapon.showAscension !== false && weapon.ascensionMaterials?.length > 0 && <section className="weapon-section"><p className="signal">ASCENSION</p><h2>Ascension Materials</h2><div className="weapon-materials">{weapon.ascensionMaterials.map(item => <Material key={item.name} item={item} />)}</div></section>}
    <section className="weapon-section weapon-copy"><p className="signal">WEAPON SKILL</p><h2>{weapon.skill.name}</h2><p>{weapon.skill.description}</p></section>
    <section className="weapon-section weapon-copy"><p className="signal">ABOUT</p><h2>About</h2><p>{weapon.about}</p></section>
  </main>;
}
