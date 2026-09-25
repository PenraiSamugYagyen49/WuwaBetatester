import { useMemo, useState } from 'react';
import { characters } from '../../data/characters';
import CharacterCard from './CharacterCard';
import CharacterFilters from './CharacterFilters';
import ArchiveDepthTitle from '../ArchiveDepthTitle';

const initialFilters = { search: '', element: 'All', rarity: 'All', weapon: 'All' };

export default function CharactersPage({ navigate }) {
  const [filters, setFilters] = useState(initialFilters);
  const results = useMemo(() => characters.filter(character => character.name.toLowerCase().includes(filters.search.trim().toLowerCase()) && (filters.element === 'All' || character.element === filters.element) && (filters.rarity === 'All' || String(character.rarity) === filters.rarity[0]) && (filters.weapon === 'All' || character.weapon === filters.weapon)), [filters]);
  const updateFilter = (key, value) => setFilters(current => ({ ...current, [key]: value }));
  const isActive = Object.entries(filters).some(([key, value]) => value !== initialFilters[key]);

  return <main className="characters-page">
    <section className="characters-hero"><div><p className="signal">SOLARIS-3 · RESONATOR ARCHIVE</p><ArchiveDepthTitle firstLine="Resonators" /></div><CharacterFilters filters={filters} onChange={updateFilter} onReset={() => setFilters(initialFilters)} isActive={isActive} /></section>
    <section className="characters-results" aria-live="polite"><p>{results.length ? `${results.length} ${results.length === 1 ? 'Resonator' : 'Resonators'} Found` : 'No resonators found'}</p>{!results.length && <button type="button" onClick={() => setFilters(initialFilters)}>Reset filters</button>}</section>
    <section className="character-grid" aria-label="Resonator archive">{results.map((character, index) => <CharacterCard key={character.id} character={character} index={index} onNavigate={navigate} />)}</section>
  </main>;
}
