const rarityClass = rarity => `rarity-${rarity}`;
export default function WeaponCard({ weapon, onNavigate }) {
  const open = () => onNavigate(`/weapons/${weapon.slug}`);
  return <article className={`weapon-card ${rarityClass(weapon.rarity)}`} role="link" tabIndex="0" onClick={open} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } }}><div className="weapon-card__image"><img src={weapon.image} alt="" onError={event => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling.hidden = false; }} /><span hidden aria-hidden="true">✦</span></div><small>{weapon.type}</small><h2>{weapon.name}</h2><p>{'★'.repeat(weapon.rarity)}</p></article>;
}
