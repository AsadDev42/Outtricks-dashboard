import React, { useEffect, useRef } from 'react';
import { useCursor } from '../../context/CursorContext';
import { useAppearance } from '../../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const { settings, getComputedGlowColor } = useCursor();
  const { reducedMotion } = useAppearance();
  const { style, glowIntensity, size, motion, effects } = settings;

  // Refs for zero-rerender DOM manipulation
  const mousePos = useRef({ x: -100, y: -100 });
  const smoothPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isVisible = useRef(false);
  const isMouseDown = useRef(false);
  const isHovering = useRef(false);
  const isText = useRef(false);

  // Trail history (fixed 5 points, zero heap allocations in RAF)
  const trailCoords = useRef<[number, number][]>([
    [-100, -100],
    [-100, -100],
    [-100, -100],
    [-100, -100],
    [-100, -100],
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ripplesContainerRef = useRef<HTMLDivElement>(null);

  const glowColorHex = getComputedGlowColor();

  // Size scale
  const sizeScales = {
    sm: 0.8,
    md: 1.0,
    lg: 1.25,
    xl: 1.5,
  };
  const scale = sizeScales[size] || 1.0;

  // Setup passive pointer listeners with ZERO React state calls
  useEffect(() => {
    if (style === 'default' && glowIntensity === 'none' && !effects.clickRipple && !effects.trailEffect) {
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    if (style !== 'default') {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible.current) {
        isVisible.current = true;
        if (containerRef.current) containerRef.current.style.opacity = '1';
      }

      // Check hovered element fast
      const target = e.target as HTMLElement | null;
      if (target) {
        isHovering.current = Boolean(
          target.closest('button, a, [role="button"], input[type="button"], select, .cursor-pointer')
        );
        isText.current = Boolean(
          target.closest('input[type="text"], input[type="email"], input[type="password"], input[type="search"], textarea, [contenteditable="true"]')
        );
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown.current = true;
      if (cursorRef.current) cursorRef.current.classList.add('is-active');

      // Click ripple effect
      if (effects.clickRipple && ripplesContainerRef.current && !reducedMotion) {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        ripple.style.borderColor = glowColorHex;
        ripplesContainerRef.current.appendChild(ripple);
        setTimeout(() => {
          ripple.remove();
        }, 500);
      }
    };

    const onMouseUp = () => {
      isMouseDown.current = false;
      if (cursorRef.current) cursorRef.current.classList.remove('is-active');
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (containerRef.current) containerRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      if (containerRef.current) containerRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [style, glowIntensity, effects.clickRipple, effects.trailEffect, glowColorHex, reducedMotion]);

  // 60+ FPS Animation Loop via requestAnimationFrame
  useEffect(() => {
    if (style === 'default' && glowIntensity === 'none' && !effects.clickRipple && !effects.trailEffect) {
      return;
    }

    let animationId: number;

    const renderLoop = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // When text field is hovered, hide custom cursor graphics so native text caret shines
      if (containerRef.current) {
        if (isText.current) {
          containerRef.current.style.opacity = '0';
        } else if (isVisible.current) {
          containerRef.current.style.opacity = '1';
        }
      }

      // Smooth tracking physics
      if (motion === 'standard' || reducedMotion) {
        smoothPos.current.x = targetX;
        smoothPos.current.y = targetY;
      } else if (motion === 'smooth') {
        smoothPos.current.x += (targetX - smoothPos.current.x) * 0.55;
        smoothPos.current.y += (targetY - smoothPos.current.y) * 0.55;
      } else if (motion === 'very-smooth') {
        smoothPos.current.x += (targetX - smoothPos.current.x) * 0.32;
        smoothPos.current.y += (targetY - smoothPos.current.y) * 0.32;
      }

      // Trailing ring physics
      ringPos.current.x += (targetX - ringPos.current.x) * 0.35;
      ringPos.current.y += (targetY - ringPos.current.y) * 0.35;

      const sx = smoothPos.current.x;
      const sy = smoothPos.current.y;
      const rx = ringPos.current.x;
      const ry = ringPos.current.y;

      // Update Cursor Element Direct Transform
      if (cursorRef.current) {
        const hoverScale = isHovering.current ? 1.3 : (isMouseDown.current ? 0.85 : 1.0);
        cursorRef.current.style.transform = `translate3d(${sx}px, ${sy}px, 0) scale(${scale * hoverScale})`;
      }

      // Update Glow Aura Direct Transform
      if (glowRef.current) {
        const glowScale = isHovering.current ? 1.4 : 1.0;
        glowRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(${glowScale})`;
      }

      // Update Focus Ring Direct Transform
      if (ringRef.current) {
        const ringScale = isHovering.current ? 1.5 : 1.0;
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${scale * ringScale})`;
      }

      // Update Lightweight Trail Trajectory
      if ((style === 'trail' || effects.trailEffect) && !reducedMotion) {
        // Shift trail points
        for (let i = 4; i > 0; i--) {
          trailCoords.current[i][0] = trailCoords.current[i - 1][0];
          trailCoords.current[i][1] = trailCoords.current[i - 1][1];
        }
        trailCoords.current[0][0] = targetX;
        trailCoords.current[0][1] = targetY;

        for (let i = 0; i < 5; i++) {
          const el = trailRefs.current[i];
          if (el) {
            const tx = trailCoords.current[i][0];
            const ty = trailCoords.current[i][1];
            const tScale = (1 - (i + 1) * 0.18) * scale;
            el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${Math.max(0.2, tScale)})`;
          }
        }
      }

      animationId = requestAnimationFrame(renderLoop);
    };

    animationId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [style, glowIntensity, size, motion, effects.trailEffect, scale, reducedMotion]);

  if (style === 'default' && glowIntensity === 'none' && !effects.clickRipple && !effects.trailEffect) {
    return null;
  }

  // Glow Radius mapping
  const glowRadiusMap = {
    none: '0px',
    subtle: '20px',
    soft: '36px',
    medium: '55px',
    strong: '80px',
    neon: '110px',
  };
  const glowRadius = glowRadiusMap[glowIntensity] || '0px';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none transition-opacity duration-150"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {/* Click Ripples Container */}
      <div ref={ripplesContainerRef} className="absolute inset-0 pointer-events-none" />

      {/* Ambient Glow Aura */}
      {glowIntensity !== 'none' && (
        <div
          ref={glowRef}
          className="absolute -top-12 -left-12 w-24 h-24 rounded-full pointer-events-none blur-md transition-transform duration-75 ease-out"
          style={{
            background: `radial-gradient(circle, ${glowColorHex}66 0%, ${glowColorHex}00 70%)`,
            width: glowRadius,
            height: glowRadius,
            marginLeft: `calc(-${glowRadius} / 2)`,
            marginTop: `calc(-${glowRadius} / 2)`,
          }}
        />
      )}

      {/* Trailing Particles for Trail Cursor */}
      {(style === 'trail' || effects.trailEffect) && !reducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {[0, 1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              ref={(el) => (trailRefs.current[idx] = el)}
              className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full pointer-events-none shadow-xs"
              style={{
                backgroundColor: glowColorHex,
                opacity: 0.65 - idx * 0.12,
              }}
            />
          ))}
        </div>
      )}

      {/* Trailing Secondary Ring (for focus-ring, magnetic, ring styles) */}
      {(style === 'focus-ring' || style === 'magnetic' || style === 'ring') && (
        <div
          ref={ringRef}
          className="absolute -top-4 -left-4 w-8 h-8 rounded-full border-2 pointer-events-none transition-transform duration-75 ease-out"
          style={{
            borderColor: glowColorHex,
            backgroundColor: style === 'magnetic' ? `${glowColorHex}15` : 'transparent',
          }}
        />
      )}

      {/* Main Cursor Element */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 pointer-events-none will-change-transform"
      >
        {/* Style 1: Precision Crosshair */}
        {(style === 'precision' || style === 'crosshair') && (
          <div className="relative -top-3 -left-3 w-6 h-6 flex items-center justify-center">
            <div className="absolute w-full h-[1.5px]" style={{ backgroundColor: glowColorHex }} />
            <div className="absolute h-full w-[1.5px]" style={{ backgroundColor: glowColorHex }} />
            <div className="w-1.5 h-1.5 rounded-full ring-1 ring-black/40 z-10 custom-cursor-element" style={{ backgroundColor: '#FFFFFF' }} />
          </div>
        )}

        {/* Style 2: Minimal Blue Glow / Soft Glow / Neon / Neon Glow / Minimal Glow */}
        {(style === 'glow' || style === 'minimal-glow' || style === 'soft-glow' || style === 'neon' || style === 'neon-glow') && (
          <div className="relative -top-1 -left-1">
            <svg
              className="w-5 h-5 drop-shadow-md"
              viewBox="0 0 24 24"
              fill={(style === 'neon' || style === 'neon-glow') ? glowColorHex : '#FFFFFF'}
              stroke={glowColorHex}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
              <path d="m13 13 6 6" />
            </svg>
          </div>
        )}

        {/* Style 3: Dot Cursor */}
        {style === 'dot' && (
          <div
            className="relative -top-1.5 -left-1.5 w-3 h-3 rounded-full shadow-md ring-2 ring-white/60 custom-cursor-element"
            style={{ backgroundColor: glowColorHex }}
          />
        )}

        {/* Style 4: Electric Pulse Cursor */}
        {style === 'pulse' && (
          <div className="relative -top-2 -left-2 w-4 h-4 flex items-center justify-center">
            <div
              className="absolute w-full h-full rounded-full animate-ping opacity-75 custom-cursor-element"
              style={{ backgroundColor: glowColorHex }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full shadow-sm custom-cursor-element"
              style={{ backgroundColor: '#FFFFFF', boxShadow: `0 0 0 2px ${glowColorHex}` }}
            />
          </div>
        )}

        {/* Style 5: Spotlight Cursor */}
        {style === 'spotlight' && (
          <div className="relative -top-2 -left-2 w-4 h-4 flex items-center justify-center">
            <div
              className="absolute w-24 h-24 rounded-full -top-10 -left-10 blur-md pointer-events-none"
              style={{ background: `radial-gradient(circle, ${glowColorHex}55 0%, transparent 70%)` }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full shadow-md custom-cursor-element"
              style={{ backgroundColor: '#FFFFFF', boxShadow: `0 0 0 2px ${glowColorHex}` }}
            />
          </div>
        )}

        {/* Style 6: Ring Cursor */}
        {style === 'ring' && (
          <div className="relative -top-3 -left-3 w-6 h-6 flex items-center justify-center">
            <div
              className="w-6 h-6 rounded-full border-2"
              style={{ borderColor: glowColorHex }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full absolute custom-cursor-element"
              style={{ backgroundColor: '#FFFFFF' }}
            />
          </div>
        )}

        {/* Style 7: Focus Ring & Magnetic Center Target */}
        {(style === 'focus-ring' || style === 'magnetic') && (
          <div
            className="relative -top-1 -left-1 w-2 h-2 rounded-full shadow-sm ring-1 ring-black/40 custom-cursor-element"
            style={{ backgroundColor: '#FFFFFF' }}
          />
        )}

        {/* Style 8: Trail Cursor Pointer */}
        {style === 'trail' && (
          <div
            className="relative -top-1.5 -left-1.5 w-3 h-3 rounded-full shadow-md custom-cursor-element"
            style={{ backgroundColor: glowColorHex }}
          />
        )}
      </div>

      {/* Injected CSS for click ripple animation */}
      <style>{`
        .cursor-ripple {
          position: absolute;
          width: 8px;
          height: 8px;
          margin-left: -4px;
          margin-top: -4px;
          border-radius: 9999px;
          border: 2px solid;
          pointer-events: none;
          animation: cursor-ripple-anim 0.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
        @keyframes cursor-ripple-anim {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
