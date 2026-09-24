import { useRef, useState } from 'react';
import './LineSidebar.css';

export default function LineSidebar({ items, accentColor = '#07b4e8', textColor = '#000', markerColor = '#000', showIndex = true, showMarker = true, proximityRadius = 100, maxShift = 30, markerLength = 60, markerGap = 0, tickScale = .5, scaleTick = true, itemGap = 20, fontSize = 2, smoothing = 100, defaultActive = 0, onItemClick, onActiveChange }) {
  const [active, setActive] = useState(defaultActive);
  const [pointerY, setPointerY] = useState(-9999);
  const root = useRef(null);
  const move = event => setPointerY(event.clientY - root.current.getBoundingClientRect().top);
  return <aside ref={root} className="line-sidebar" onPointerMove={move} onPointerLeave={() => setPointerY(-9999)} style={{ '--line-accent': accentColor, '--line-text': textColor, '--line-marker': markerColor, '--line-gap': `${itemGap}px`, '--line-font-size': `${fontSize}rem`, '--line-smoothing': `${smoothing}ms` }}>
    {items.map((label, index) => { const distance = Math.abs(pointerY - (index * (fontSize * 35 + itemGap) + 25)); const proximity = Math.max(0, 1 - distance / proximityRadius); const shift = proximity * maxShift; return <button key={label} type="button" className={active === index ? 'line-sidebar__item is-active' : 'line-sidebar__item'} aria-current={active === index ? 'page' : undefined} style={{ '--shift': `${shift}px`, '--tick-scale': scaleTick ? tickScale + proximity * (1 - tickScale) : 1, '--marker-length': `${markerLength + markerGap}px` }} onPointerEnter={() => { setActive(index); onActiveChange?.(index); }} onFocus={() => { setActive(index); onActiveChange?.(index); }} onClick={() => { setActive(index); onActiveChange?.(index); onItemClick?.(index, label); }} onKeyDown={event => { const next = event.key === 'ArrowDown' ? Math.min(items.length - 1, index + 1) : event.key === 'ArrowUp' ? Math.max(0, index - 1) : -1; if (next >= 0) { event.preventDefault(); root.current.querySelectorAll('button')[next]?.focus(); } }}><span className="line-sidebar__tick" />{showIndex && <small>{String(index + 1).padStart(2, '0')}</small>}<span>{label}</span>{showMarker && active === index && <i />}</button>; })}
  </aside>;
}
