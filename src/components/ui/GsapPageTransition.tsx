import React, { useRef } from 'react';
import { useGSAP, pageEnter } from '../../lib/gsap';

export interface GsapPageTransitionProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
}

export const GsapPageTransition: React.FC<GsapPageTransitionProps> = ({
  children,
  className = '',
  y = 12,
  duration = 0.35,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      pageEnter(containerRef.current, { y, duration, delay });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {children}
    </div>
  );
};
