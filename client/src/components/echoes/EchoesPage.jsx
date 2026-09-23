import { useMemo, useState } from 'react';
import { echoCosts, echoes, sonataEffects } from '../../data/echoes';
import EchoCard from './EchoCard';
import './Echoes.css';
import './EchoAssets.css';

export default function EchoesPage({ navigate }) {
  const [filters, setFilters] = useState({ search: '', cost: 'Any', sonata: 'All' });
  const results = useMemo(() => echoes.filter(echo => echo.name.toLowerCase().includes(filters.search.toLowerCase()) && (filters.cost === 'Any' || String(echo.cost) === filters.cost) && (filters.sonata === 'All' || echo.sonataEffects.includes(filters.sonata))), [filters]);
  return <main className="echoes-page"><section className="echoes-hero"><p className="signal">SOLARIS-3 · ECHO ARCHIVE</p><h1>Wuthering Waves<br />Echoes</h1><p>All Echoes in Wuthering Waves.</p></section><section className="echo-filters"><label><span>SEARCH</span><input type="search" placeholder="Enter name" value={filters.search} onChange={event => setFilters(current => ({ ...current, search: event.target.value }))} /></label><label><span>COST</span><select value={filters.cost} onChange={event => setFilters(current => ({ ...current, cost: event.target.value }))}>{echoCosts.map(item => <option key={item}>{item}</option>)}</select></label><div className="sonata-filter"><span>SONATA EFFECT</span><div>{sonataEffects.map(effect => <button type="button" key={effect.id} aria-label={effect.name === 'All' ? 'All Sonata Effects' : effect.name} title={effect.name === 'All' ? 'All Sonata Effects' : effect.name} className={filters.sonata === effect.name ? 'is-active' : ''} onClick={() => setFilters(current => ({ ...current, sonata: effect.name }))}>{effect.image ? <img src={effect.image} alt="" /> : <i aria-hidden="true">◈</i>}<small>{effect.name}</small></button>)}</div></div></section><p className="echo-count">{results.length ? `${results.length} ECHOES FOUND` : 'NO ECHOES FOUND.'}</p><section className="echo-grid">{results.map(echo => <EchoCard key={echo.id} echo={echo} onNavigate={navigate} />)}</section></main>;
}
