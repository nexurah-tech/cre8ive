import { useRef, useCallback, useState, useEffect, type ReactNode } from 'react';

interface BorderGlowProps {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
}

function throttle<T extends (...args: Parameters<T>) => void>(fn: T, ms: number): T {
  let last = 0;
  return ((...args: Parameters<T>) => {
    const now = performance.now();
    if (now - last >= ms) { last = now; fn(...args); }
  }) as T;
}

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor: string, intensity: number): string {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers: [number, number, number, number, number, boolean][] = [
    [0, 0, 0, 1, 100, true], [0, 0, 1, 0, 60, true], [0, 0, 3, 0, 50, true],
    [0, 0, 6, 0, 40, true], [0, 0, 15, 0, 30, true], [0, 0, 25, 2, 20, true],
    [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false], [0, 0, 3, 0, 50, false], [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false], [0, 0, 25, 2, 20, false], [0, 0, 50, 2, 10, false],
  ];
  return layers.map(([x, y, blur, spread, alpha, inset]) => {
    const a = Math.min(alpha * intensity, 100);
    return `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
  }).join(', ');
}

function easeOutCubic(x: number) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x: number) { return x * x * x; }

interface AnimateOpts {
  start?: number; end?: number; duration?: number; delay?: number;
  ease?: (t: number) => number; onUpdate: (v: number) => void; onEnd?: () => void;
}

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }: AnimateOpts) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  const timer = setTimeout(() => requestAnimationFrame(tick), delay);
  return () => clearTimeout(timer);
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors: string[]): string[] {
  const gradients: string[] = [];
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    gradients.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`);
  }
  gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
  return gradients;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = '',
  style = {},
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity = 0.5,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const borderLayerRef = useRef<HTMLDivElement>(null);
  const fillLayerRef = useRef<HTMLDivElement>(null);
  const glowLayerRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [sweepActive, setSweepActive] = useState(false);
  // Use refs for per-frame values — no setState = no re-renders
  const cursorAngleRef = useRef(45);
  const edgeProximityRef = useRef(0);

  const getCenterOfElement = useCallback((el: HTMLElement) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenterOfElement]);

  const getCursorAngle = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }, [getCenterOfElement]);

  // Apply imperative DOM updates — no setState, no re-render on pointer move
  const applyGlowStyles = useCallback(() => {
    const angle = cursorAngleRef.current;
    const proximity = edgeProximityRef.current;
    const visible = isHovered || sweepActive;
    const { edgeSensitivity: es = 30, coneSpread: cs = 25 } = {};
    const _edgeSensitivity = edgeSensitivity;
    const _colorSensitivity = _edgeSensitivity + 20;
    const borderOpacity = visible
      ? Math.max(0, (proximity * 100 - _colorSensitivity) / (100 - _colorSensitivity))
      : 0;
    const glowOpacity = visible
      ? Math.max(0, (proximity * 100 - _edgeSensitivity) / (100 - _edgeSensitivity))
      : 0;
    const angleDeg = `${angle.toFixed(3)}deg`;
    if (borderLayerRef.current) {
      borderLayerRef.current.style.opacity = String(borderOpacity);
      borderLayerRef.current.style.maskImage = `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`;
      borderLayerRef.current.style.webkitMaskImage = borderLayerRef.current.style.maskImage;
    }
    if (fillLayerRef.current) {
      fillLayerRef.current.style.opacity = String(borderOpacity * fillOpacity);
      const coneMask = `conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`;
      const fullMask = [
        'linear-gradient(to bottom, black, black)',
        'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
        'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
        'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
        'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
        'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
        coneMask,
      ].join(', ');
      fillLayerRef.current.style.maskImage = fullMask;
      fillLayerRef.current.style.webkitMaskImage = fullMask;
    }
    if (glowLayerRef.current) {
      glowLayerRef.current.style.opacity = String(glowOpacity);
      const glowMask = `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`;
      glowLayerRef.current.style.maskImage = glowMask;
      glowLayerRef.current.style.webkitMaskImage = glowMask;
    }
  }, [isHovered, sweepActive, edgeSensitivity, coneSpread, fillOpacity]);

  // Throttled pointer move handler — max 30fps for glow calc (visually imperceptible)
  const handlePointerMove = useCallback(throttle((e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    edgeProximityRef.current = getEdgeProximity(card, x, y);
    cursorAngleRef.current = getCursorAngle(card, x, y);
    applyGlowStyles();
  }, 33), [getEdgeProximity, getCursorAngle, applyGlowStyles]);

  useEffect(() => {
    applyGlowStyles();
  }, [applyGlowStyles]);

  useEffect(() => {
    if (!animated) return;
    const angleStart = 110;
    const angleEnd = 465;
    setSweepActive(true);
    cursorAngleRef.current = angleStart;

    animateValue({ duration: 500, onUpdate: v => { edgeProximityRef.current = v / 100; applyGlowStyles(); } });
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: v => {
      cursorAngleRef.current = (angleEnd - angleStart) * (v / 100) + angleStart;
      applyGlowStyles();
    }});
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: v => {
      cursorAngleRef.current = (angleEnd - angleStart) * (v / 100) + angleStart;
      applyGlowStyles();
    }});
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => { edgeProximityRef.current = v / 100; applyGlowStyles(); },
      onEnd: () => setSweepActive(false),
    });
  }, [animated, applyGlowStyles]);

  const meshGradients = buildMeshGradients(colors);
  const borderBg = meshGradients.map(g => `${g} border-box`);
  const fillBg = meshGradients.map(g => `${g} padding-box`);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={`relative grid isolate ${className}`}
      style={{
        background: backgroundColor,
        borderRadius: `${borderRadius}px`,
        transform: 'translate3d(0, 0, 0.01px)',
        boxShadow: 'rgba(0,0,0,0.1) 0 1px 2px, rgba(0,0,0,0.1) 0 2px 4px, rgba(0,0,0,0.1) 0 4px 8px, rgba(0,0,0,0.1) 0 8px 16px, rgba(0,0,0,0.1) 0 16px 32px, rgba(0,0,0,0.1) 0 32px 64px',
        ...style,
      }}
    >
      {/* mesh gradient border — opacity/mask driven imperatively via ref */}
      <div
        ref={borderLayerRef}
        className="absolute inset-0 rounded-[inherit] -z-[1]"
        style={{
          border: '1px solid transparent',
          background: [
            `linear-gradient(${backgroundColor} 0 100%) padding-box`,
            'linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box',
            ...borderBg,
          ].join(', '),
          opacity: 0,
          maskImage: `conic-gradient(from 45deg at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
          WebkitMaskImage: `conic-gradient(from 45deg at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
          transition: 'opacity 0.25s ease-out',
        }}
      />

      {/* mesh gradient fill near edges */}
      <div
        ref={fillLayerRef}
        className="absolute inset-0 rounded-[inherit] -z-[1]"
        style={{
          border: '1px solid transparent',
          background: fillBg.join(', '),
          maskImage: 'linear-gradient(to bottom, black, black)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, black)',
          maskComposite: 'subtract, add, add, add, add, add',
          WebkitMaskComposite: 'source-over, source-over, source-over, source-over, source-over, source-over',
          opacity: 0,
          mixBlendMode: 'soft-light',
          transition: 'opacity 0.25s ease-out',
        } as React.CSSProperties}
      />

      {/* outer glow */}
      <span
        ref={glowLayerRef}
        className="absolute pointer-events-none z-[1] rounded-[inherit]"
        style={{
          inset: `${-glowRadius}px`,
          maskImage: `conic-gradient(from 45deg at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
          WebkitMaskImage: `conic-gradient(from 45deg at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
          opacity: 0,
          mixBlendMode: 'plus-lighter',
          transition: 'opacity 0.25s ease-out',
        } as React.CSSProperties}
      >
        <span
          className="absolute rounded-[inherit]"
          style={{
            inset: `${glowRadius}px`,
            boxShadow: buildBoxShadow(glowColor, glowIntensity),
          }}
        />
      </span>

      <div className="flex flex-col relative h-full w-full z-[1]">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
