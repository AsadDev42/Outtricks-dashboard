import React, { useRef } from 'react';
import { useGSAP, gsap } from '../../lib/gsap';

export interface GsapStaggerProps {
  children: React.ReactNode;
  className?: string;
  itemSelector?: string;
  stagger?: number;
  duration?: number;
  y?: number;
  delay?: number;
}

export const GsapStagger: React.FC<GsapStaggerProps> = ({
  children,
  className = '',
  itemSelector = '> *',
  stagger = 0.05,
  duration = 0.45,
  y = 14,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      let targets: Element[] = [];
      try {
        if (!itemSelector || itemSelector === '> *' || itemSelector === ':scope > *') {
          targets = Array.from(containerRef.current.children);
        } else {
          const selector = itemSelector.startsWith('>') ? `:scope ${itemSelector}` : itemSelector;
          targets = Array.from(containerRef.current.querySelectorAll(selector));
        }
      } catch {
        targets = Array.from(containerRef.current.children);
      }

      if (targets.length === 0) return;

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: y },
        {
          autoAlpha: 1,
          y: 0,
          duration: duration,
          stagger: stagger,
          delay: delay,
          ease: 'power2.out',
          clearProps: 'transform,opacity,visibility',
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};