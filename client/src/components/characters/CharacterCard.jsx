const elementColors = { Glacio: '#91d7ff', Fusion: '#ff875f', Electro: '#b99bff', Aero: '#7ee6af', Spectro: '#f7d67a', Havoc: '#ef8fcf' };

export default function CharacterCard({ character, index, onNavigate }) {
  const open = () => onNavigate(`/characters/${character.slug}`);
  return <article className="character-card" style={{ '--element-color': elementColors[character.element] }} tabIndex="0" role="link" onClick={open} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } }}>
    <img src={character.image} alt={`${character.name} character artwork`} loading="lazy" />
    <div className="character-card__shade" />
    <div className="character-card__top"><span>{character.element}</span><span>{character.weapon}</span></div>
    <div className="character-card__content"><small>{String(index + 1).padStart(2, '0')} · {character.role}</small><h2>{character.name}</h2><p aria-label={`${character.rarity} star rarity`}>{'★'.repeat(character.rarity)}</p></div>
  </article>;
}
