export default function EchoCard({ echo, onNavigate }) {
  const open = () => onNavigate(`/echoes/${echo.slug}`);
  return <article className="echo-card" role="link" tabIndex="0" onClick={open} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } }}>
    <div className="echo-card__image"><img src={echo.image} alt="" onError={event => { event.currentTarget.onerror = () => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling.hidden = false; }; event.currentTarget.src = echo.imageFallback; }} /><span hidden aria-hidden="true">◈</span></div>
    <div className="echo-card__head"><span>Cost {echo.cost}</span><small title={echo.sonataEffects[0]}>{echo.sonataEffects[0]}</small></div><h2>{echo.name}</h2>
  </article>;
}
