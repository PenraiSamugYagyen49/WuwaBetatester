import { useMemo, useState } from 'react';
import { weaponRarities, weapons, weaponTypes } from '../../data/weapons';
import WeaponCard from './WeaponCard';
import ArchiveDepthTitle from '../ArchiveDepthTitle';
import './Weapons.css';
import './WeaponAssets.css';

export default function WeaponsPage({ navigate }) {
  const [filters, setFilters] = useState({ search: '', rarity: 'All', type: 'All' });
  const results = useMemo(() => weapons.filter(weapon => weapon.name.toLowerCase().includes(filters.search.toLowerCase()) && (filters.rarity === 'All' || `${weapon.rarity}-Star` === filters.rarity) && (filters.type === 'All' || weapon.type === filters.type)), [filters]);
  const update = (key, value) => setFilters(current => ({ ...current, [key]: value }));
  return <main className="weapons-page"><section className="weapons-hero"><p className="signal">SOLARIS-3 · ARMAMENT ARCHIVE</p><ArchiveDepthTitle firstLine="Wuthering Waves" secondLine="Weapons" /></section><section className="weapon-filters" aria-label="Weapon filters"><label><span>SEARCH</span><input type="search" placeholder="Enter name" value={filters.search} onChange={event => update('search', event.target.value)} /></label><label><span>RARITY</span><select value={filters.rarity} onChange={event => update('rarity', event.target.value)}>{weaponRarities.map(item => <option key={item}>{item}</option>)}</select></label><label><span>WEAPON TYPE</span><select value={filters.type} onChange={event => update('type', event.target.value)}>{weaponTypes.map(item => <option key={item}>{item}</option>)}</select></label></section><p className="weapon-count">{results.length} WEAPONS FOUND</p><section className="weapon-grid">{results.map(weapon => <WeaponCard key={weapon.id} weapon={weapon} onNavigate={navigate} />)}</section></main>;
}
