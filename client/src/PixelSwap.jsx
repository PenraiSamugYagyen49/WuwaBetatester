import { useEffect, useMemo, useRef, useState } from 'react';
import './PixelSwap.css';

const MAX_PIXELS = 180;
function buildGrid(width, height, pixelSize, gap, pattern) {
  let size = Math.max(24, pixelSize);
  let columns = Math.max(1, Math.ceil((width + gap) / (size + gap)));
  let rows = Math.max(1, Math.ceil((height + gap) / (size + gap)));
  if (columns * rows > MAX_PIXELS) { size = Math.ceil(size * Math.sqrt((columns * rows) / MAX_PIXELS)); columns = Math.ceil((width + gap) / (size + gap)); rows = Math.ceil((height + gap) / (size + gap)); }
  return Array.from({ length: columns * rows }, (_, id) => {
    const column = id % columns, row = Math.floor(id / columns);
    const x = columns === 1 ? .5 : column / (columns - 1), y = rows === 1 ? .5 : row / (rows - 1);
    const randomDelay = Math.sin((id + 1) * 127.1) * 43758.5453 % 1;
    const delay = pattern === 'random' ? Math.abs(randomDelay) : Math.min(x, 1 - x, y, 1 - y) * 2;
    return { id, left: column * (size + gap), top: row * (size + gap), size, delay };
  });
}

export default function PixelSwap({ firstContent, secondContent, active, onComplete, pixelSize = 40, gap = 0, pixelRadius = 0, pixelSpin = 0, pixelScale = 1, duration = 1400, pixelDuration = 450, pattern = 'edges', fade = true }) {
  const ref = useRef(null), lastActive = useRef(active);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [transition, setTransition] = useState(null);
  useEffect(() => { const measure = () => setBox({ width: ref.current.clientWidth, height: ref.current.clientHeight }); measure(); const observer = new ResizeObserver(measure); observer.observe(ref.current); return () => observer.disconnect(); }, []);
  useEffect(() => { if (active === lastActive.current) return; lastActive.current = active; setTransition({ incoming: active, id: Date.now() }); }, [active]);
  const pixels = useMemo(() => buildGrid(box.width, box.height, pixelSize, gap, pattern), [box, pixelSize, gap, pattern]);
  const incoming = active ? secondContent : firstContent;
  useEffect(() => { if (!transition) return; const timer = setTimeout(() => { setTransition(null); onComplete?.(); }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : duration); return () => clearTimeout(timer); }, [duration, onComplete, transition]);
  return <div ref={ref} className="pixel-swap-route"><div className="pixel-swap-route__view">{incoming}</div>{transition && <div className="pixel-swap-route__grid" aria-hidden="true">{pixels.map(pixel => <div key={`${transition.id}-${pixel.id}`} className="pixel-swap-route__pixel" style={{ left: pixel.left, top: pixel.top, width: pixel.size + 1, height: pixel.size + 1, borderRadius: `${pixelRadius}%`, animationDuration: `${pixelDuration}ms`, animationDelay: `${pixel.delay * (duration - pixelDuration)}ms`, '--pixel-scale': pixelScale, '--pixel-spin': `${pixelSpin}deg`, '--pixel-fade': fade ? 0 : 1 }}/>)}</div>}</div>;
}
