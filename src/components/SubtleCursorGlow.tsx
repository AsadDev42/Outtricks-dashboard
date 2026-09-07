import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const SubtleCursorGlow: React.FC = () => {
  const { theme, reducedMotion } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  const glowRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Respect accessibility reduced motion
    if (reducedMotion) return;

    // Disable on touch-only mobile devices
    const isTouchOnly = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse) and (hover: none)').matches;
    if (isTouchOnly) return;

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (glowRef.current) {
        // Center the 300px glow circle exactly at the cursor coordinate (no offset, no lag)
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      setIsVisible(true);
      setIsIdle(false);

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      // Softly dim after 1.5s of stillness
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 1500);
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
      setIsIdle(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  const isDark = theme === 'dark';

  return (
    <div
      ref={glowRef}
      className={`pointer-events-none fixed top-0 left-0 z-0 transition-opacity duration-300 ease-out ${
        isVisible ? (isIdle ? 'opacity-40' : 'opacity-100') : 'opacity-0'
      }`}
      style={{ 
        willChange: 'transform',
        transform: 'translate3d(-1000px, -1000px, 0) translate(-50%, -50%)'
      }}
      aria-hidden="true"
    >
      {/* 
        300px x 300px Ultra-Soft Feathered Cursor Radial Glow
        - Center aligned with exact cursor coordinate (0 offset, 0 lag)
        - Light Mode: Subtle 20-25% boosted Outtricks blue aura (rgba(37,99,235,0.10))
        - Dark Mode: Enhanced deep blue radiant glow (rgba(59,130,246,0.23))
      */}
      <div 
        className="w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          filter: isDark ? 'blur(55px)' : 'blur(50px)',
          background: isDark
            ? 'radial-gradient(circle, var(--color-primary-glow, rgba(255, 255, 255, 0.05)) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 75%)'
            : 'radial-gradient(circle, rgba(37, 99, 235, 0.10) 0%, rgba(37, 99, 235, 0.04) 35%, transparent 75%)'
        }}
      />
    </div>
  );
};
