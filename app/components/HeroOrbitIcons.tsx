"use client";

import { useEffect, useRef, useState } from "react";

interface IconState {
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

const ICONS = [
  { id: 1, label: 'CBSE',     emoji: '🏛️', angleDeg: 30  },
  { id: 2, label: 'ICSE',     emoji: '📘', angleDeg: 90  },
  { id: 3, label: 'TS Board', emoji: '🎓', angleDeg: 150 },
  { id: 4, label: 'JEE',      emoji: '⚗️', angleDeg: 210 },
  { id: 5, label: 'EAMCET',   emoji: '🔬', angleDeg: 270 },
  { id: 6, label: 'NEET',     emoji: '🧬', angleDeg: 330 },
];

const ORBIT_RX = 280;
const ORBIT_RY = 220;

type Phase = 'entry' | 'idle' | 'scrolling' | 'exited';

function getRestPosition(angleDeg: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: ORBIT_RX * Math.sin(angleRad),
    y: -ORBIT_RY * Math.cos(angleRad),
  };
}

const easeOutSpring = (t: number) => {
  const c4 = (2 * Math.PI) / 3;
  return t === 0 ? 0 : t === 1 ? 1 :
    Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

export default function HeroOrbitIcons() {
  const [phase, setPhase] = useState<Phase>('entry');
  const [iconStates, setIconStates] = useState<IconState[]>(
    ICONS.map(() => ({ x: 0, y: 0, scale: 0.2, opacity: 0 }))
  );
  const [scrollY, setScrollY] = useState(0);

  const animFrameRef = useRef<number>(0);
  const entryStartRef = useRef<number>(0);
  const phaseRef = useRef<Phase>('entry');
  phaseRef.current = phase;

  // ─── ENTRY ANIMATION (rAF spring easing) ───
  useEffect(() => {
    entryStartRef.current = performance.now();

    const animate = () => {
      const now = performance.now();
      const entryElapsed = now - entryStartRef.current;

      let allComplete = true;
      const newStates: IconState[] = [];

      for (let i = 0; i < ICONS.length; i++) {
        const icon = ICONS[i];
        const rest = getRestPosition(icon.angleDeg);
        const delay = i * 100;
        const duration = 1200;
        const elapsed = entryElapsed - delay;

        if (elapsed < 0) {
          allComplete = false;
          newStates.push({ x: 0, y: 0, scale: 0.2, opacity: 0 });
          continue;
        }

        const t = Math.min(elapsed / duration, 1);
        const ep = easeOutSpring(t);

        if (t < 1) allComplete = false;

        newStates.push({
          x: rest.x * ep,
          y: rest.y * ep,
          scale: 0.2 + (0.8 * ep),
          opacity: ep,
        });
      }

      setIconStates(newStates);

      if (!allComplete) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setPhase('idle');
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // ─── SCROLL LISTENER ───
  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      setScrollY(sy);

      const currentPhase = phaseRef.current;

      if (currentPhase === 'idle' && sy > 5) {
        setPhase('scrolling');
      } else if (currentPhase === 'scrolling') {
        const sp = Math.min(sy / 400, 1);
        if (sy <= 5) {
          setPhase('idle');
        } else if (sp >= 1) {
          setPhase('exited');
        }
      } else if (currentPhase === 'exited') {
        const sp = Math.min(sy / 400, 1);
        if (sp < 1) {
          setPhase('scrolling');
        }
        if (sy <= 5) {
          setPhase('idle');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollProgress = Math.min(scrollY / 400, 1);
  const bounceDelays = ['0s', '0.4s', '0.8s', '1.2s', '1.6s', '2.0s'];
  const isScrollPhase = phase === 'scrolling' || phase === 'exited';
  const isPaused = phase === 'scrolling' || phase === 'exited';

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'visible', zIndex: 10 }}>
      {ICONS.map((icon, i) => {
        let x: number, y: number, scale: number, opacity: number;

        if (isScrollPhase) {
          const angleRad = ((icon.angleDeg + scrollProgress * 360) * Math.PI) / 180;
          const rx = ORBIT_RX + scrollProgress * 180;
          const ry = ORBIT_RY + scrollProgress * 140;
          x = rx * Math.sin(angleRad);
          y = -ry * Math.cos(angleRad);
          opacity = scrollProgress > 0.7 ? 1 - ((scrollProgress - 0.7) / 0.3) : 1;
          scale = scrollProgress > 0.6 ? 1 - ((scrollProgress - 0.6) / 0.4) : 1;
        } else {
          x = iconStates[i].x;
          y = iconStates[i].y;
          scale = iconStates[i].scale;
          opacity = iconStates[i].opacity;
        }

        if (phase === 'exited') {
          opacity = 0;
          scale = 0;
        }

        return (
          <div
            key={icon.id}
            className="absolute top-1/2 left-1/2"
            style={{
              width: 80,
              height: 80,
              marginTop: -40,
              marginLeft: -40,
              transform: `translate(${x}px, ${y}px)`,
              opacity,
            }}
          >
            {/* ── Pulse layer ── */}
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                width: 80,
                height: 80,
                marginTop: -40,
                marginLeft: -40,
                animationName: phase === 'idle' ? 'iconPulse' : 'none',
                animationDuration: '43s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: '3s',
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            >
              {/* ── Bounce + card layer ── */}
              <div
                className="absolute top-1/2 left-1/2"
                style={{
                  width: 80,
                  height: 80,
                  marginTop: -40,
                  marginLeft: -40,
                  animationName: phase === 'idle' ? 'iconBounce' : 'none',
                  animationDuration: '2.4s',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: bounceDelays[i],
                  animationPlayState: isPaused ? 'paused' : 'running',
                  borderRadius: 16,
                  background: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(61, 214, 140, 0.25)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(61, 214, 140, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  transform: `scale(${scale})`,
                }}
              >
                <span style={{ fontSize: 24, lineHeight: 1 }}>{icon.emoji}</span>
                <span
                  className="font-body"
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#3DD68C',
                  }}
                >
                  {icon.label}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
