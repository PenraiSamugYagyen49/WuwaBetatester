import { elementsList, rarities, weaponTypes } from '../../data/characters';

function SelectField({ label, value, options, onChange }) { return <label className="character-filter__field"><span>{label}</span><select value={value} onChange={event => onChange(event.target.value)}>{options.map(option => <option key={option}>{option}</option>)}</select></label>; }

export default function CharacterFilters({ filters, onChange, onReset, isActive }) {
  return <section className="character-filters" aria-label="Resonator filters"><label className="character-filter__search"><span>SEARCH ARCHIVE</span><input value={filters.search} onChange={event => onChange('search', event.target.value)} placeholder="Enter resonator name..." type="search" /></label><SelectField label="ELEMENT" value={filters.element} options={elementsList} onChange={value => onChange('element', value)} /><SelectField label="RARITY" value={filters.rarity} options={rarities} onChange={value => onChange('rarity', value)} /><SelectField label="WEAPON" value={filters.weapon} options={weaponTypes} onChange={value => onChange('weapon', value)} />{isActive && <button className="character-filter__reset" type="button" onClick={onReset}>Reset filters</button>}</section>;
}
