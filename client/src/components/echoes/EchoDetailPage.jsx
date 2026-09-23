import { echoes, sonataEffects as sonataCatalog } from '../../data/echoes';
import './Echoes.css';
import './EchoAssets.css';
import './EchoDetail.css';

function StatList({ title, rows, range = false }) {
  return <section className="echo-stat-panel">
    <p className="signal">ECHO DATA</p>
    <h2>{title}</h2>
    {rows?.length ? <dl>{rows.map(row => <div className={row.selected ? 'is-selected' : ''} key={row.name}><dt>{row.name}{row.selected && <small>DEFAULT</small>}</dt><dd>{range ? row.range : row.value}</dd></div>)}</dl> : <p className="echo-data-empty">Verified {range ? 'sub-stat ranges' : 'main stats'} have not been added for this Echo.</p>}
  </section>;
}

function EchoImage({ echo, className = '' }) {
  return <img className={className} src={echo.image} alt={echo.name} onError={event => {
    if (event.currentTarget.dataset.fallback !== 'used') {
      event.currentTarget.dataset.fallback = 'used';
      event.currentTarget.src = echo.imageFallback;
    } else {
      event.currentTarget.style.display = 'none';
      event.currentTarget.nextElementSibling.hidden = false;
    }
  }} />;
}

export default function EchoDetailPage({ slug, navigate }) {
  const echo = echoes.find(item => item.slug === slug);
  if (!echo) return <main className="echo-detail echo-detail--missing"><p className="signal">ARCHIVE SIGNAL LOST</p><h1>Echo Not Found</h1><p>This Echo is not in the local archive.</p><button className="echo-back" onClick={() => navigate('/echoes')}>← Back to Echoes</button></main>;

  const setDetails = (echo.sonataEffects ?? []).map(name => ({ name, ...echo.sonataDetails?.find(effect => effect.name === name) }));
  const sourceUrl = `${echo.source ?? 'https://wuthering.gg/echos'}/${echo.slug}`;

  return <main className="echo-detail">
    <button className="echo-back" onClick={() => navigate('/echoes')}>← Back to Echoes</button>
    <section className="echo-detail__hero">
      <div className="echo-showcase"><EchoImage echo={echo} /><span hidden aria-hidden="true">◈</span></div>
      <div className="echo-overview"><p className="signal">SOLARIS-3 · ECHO ARCHIVE</p><h1>{echo.name}</h1>
        <p className="echo-class">{echo.echoClass ? `${echo.echoClass} Class` : 'Class details unavailable'}</p>
        <div className="echo-badges"><span>Cost {echo.cost}</span><span>{echo.sonataEffects.length} Possible Sonata {echo.sonataEffects.length === 1 ? 'Effect' : 'Effects'}</span></div>
        <div className="echo-controls">
          <div className="echo-control"><div><span>RANK</span><strong>{echo.rank ?? '—'}{echo.rank ? ' / 5' : ''}</strong></div>{echo.rank && <i style={{ '--echo-progress': `${echo.rank * 20}%` }} />}</div>
          <div className="echo-control"><div><span>LEVEL</span><strong>{echo.level ?? '—'}{echo.level ? ' / 25' : ''}</strong></div>{echo.level && <i style={{ '--echo-progress': `${echo.level * 4}%` }} />}</div>
        </div>
      </div>
    </section>

    <section className="echo-stats"><StatList title="All Possible Main Stats" rows={echo.mainStats} /><StatList title="Sub-Stats Ranges" rows={echo.subStats} range /></section>

    <section className="echo-ability echo-detail-panel"><p className="signal">COMBAT DATA&nbsp; / &nbsp;01</p><h2>Echo Ability</h2>
      {echo.ability ? <div className="echo-ability__content"><span aria-hidden="true">◈</span><div><small>RANK {echo.ability.rank}</small><p>{echo.ability.description}</p></div></div> : <p className="echo-data-empty">Verified Echo Ability details have not been added for this Echo.</p>}
    </section>

    <section className="echo-sonata"><div className="echo-sonata__heading"><p className="signal">SET BONUSES&nbsp; / &nbsp;02</p><h2>Possible Sonata Effects</h2></div>
      <div className="echo-sonata__grid">{setDetails.map((effect, index) => {
        const icon = sonataCatalog.find(item => item.name === effect.name)?.image;
        return <article className="echo-sonata-card" key={`${effect.name}-${index}`}><header>{icon ? <img src={icon} alt="" /> : <span aria-hidden="true">◈</span>}<h3>{effect.name}</h3></header>
          {effect.twoPiece && effect.fivePiece ? <div className="echo-sonata-card__bonuses"><p><b>2 SET</b><span>{effect.twoPiece}</span></p><p><b>5 SET</b><span>{effect.fivePiece}</span></p></div> : <p className="echo-data-empty">Set bonus details have not been verified for this Echo.</p>}
        </article>;
      })}</div>
    </section>
    <p className="echo-source">Details transcribed from <a href={sourceUrl} target="_blank" rel="noreferrer">Wuthering.gg <span aria-hidden="true">↗</span></a>. Unverified fields are left blank in this local archive.</p>
  </main>;
}
