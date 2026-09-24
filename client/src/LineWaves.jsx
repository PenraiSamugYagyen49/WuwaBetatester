import { useEffect, useRef } from 'react';
import './LineWaves.css';

const hexToRgb = hex => { const value = hex.replace('#', ''); return [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16)]; };
const mix = (a, b, amount) => a.map((value, index) => Math.round(value + (b[index] - value) * amount));

export default function LineWaves({ speed = 2, innerLineCount = 32, outerLineCount = 36, warpIntensity = 1, rotation = -45, edgeFadeWidth = 0, colorCycleSpeed = 1, brightness = .2, color1 = '#000000', color2 = '#94a3b8', color3 = '#ffffff', enableMouseInteraction = true, mouseInfluence = 2 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current, context = canvas.getContext('2d');
    let frame, width = 0, height = 0, mouse = { x: .5, y: .5 };
    const palette = [hexToRgb(color1), hexToRgb(color2), hexToRgb(color3)];
    const resize = () => { const rect = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2); width = rect.width; height = rect.height; canvas.width = width * dpr; canvas.height = height * dpr; context.setTransform(dpr, 0, 0, dpr, 0, 0); };
    let lastDraw = 0, visible = false;
    const draw = time => {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden || time - lastDraw < 40) return;
      lastDraw = time;
      context.clearRect(0, 0, width, height);
      const lines = innerLineCount + outerLineCount;
      const radians = rotation * Math.PI / 180, diagonal = Math.hypot(width, height), centerX = width / 2, centerY = height / 2;
      context.lineWidth = 1;
      for (let line = 0; line < lines; line += 1) {
        const ratio = line / Math.max(lines - 1, 1), offset = (ratio - .5) * diagonal;
        const colorPosition = (ratio + time * .00008 * colorCycleSpeed) % 1;
        const color = colorPosition < .5 ? mix(palette[0], palette[1], colorPosition * 2) : mix(palette[1], palette[2], (colorPosition - .5) * 2);
        context.beginPath();
        for (let step = 0; step <= 72; step += 1) {
          const progress = step / 72, distance = (progress - .5) * diagonal * 1.35;
          const wave = Math.sin(progress * 10 + line * .31 + time * .001 * speed) * (3 + ratio * 9) * warpIntensity;
          const mouseDistance = Math.hypot(progress - mouse.x, ratio - mouse.y);
          const mouseWarp = enableMouseInteraction ? Math.max(0, 1 - mouseDistance * 2.4) * Math.sin(progress * 16 + time * .004) * mouseInfluence * 9 : 0;
          const x = centerX + Math.cos(radians) * distance - Math.sin(radians) * (offset + wave + mouseWarp);
          const y = centerY + Math.sin(radians) * distance + Math.cos(radians) * (offset + wave + mouseWarp);
          if (step === 0) context.moveTo(x, y); else context.lineTo(x, y);
        }
        const edgeAlpha = edgeFadeWidth ? Math.min(1, ratio / edgeFadeWidth, (1 - ratio) / edgeFadeWidth) : 1;
        context.strokeStyle = `rgba(${color.join(',')},${brightness * edgeAlpha})`;
        context.stroke();
      }
    };
    const move = event => { const rect = canvas.getBoundingClientRect(); mouse = { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height }; };
    resize(); const observer = new ResizeObserver(resize); observer.observe(canvas); if (enableMouseInteraction) canvas.addEventListener('pointermove', move);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    intersection.observe(canvas); frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); canvas.removeEventListener('pointermove', move); };
  }, [speed, innerLineCount, outerLineCount, warpIntensity, rotation, edgeFadeWidth, colorCycleSpeed, brightness, color1, color2, color3, enableMouseInteraction, mouseInfluence]);
  return <canvas ref={canvasRef} className="line-waves" aria-hidden="true" />;
}
