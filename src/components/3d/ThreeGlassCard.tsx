import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ThreeGlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  tiltIntensity?: number;
  glowColor?: string;
}

export const ThreeGlassCard: React.FC<ThreeGlassCardProps> = ({
  children,
  className = '',
  tiltIntensity = 8,
  glowColor = 'rgba(59, 130, 246, 0.15)',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -tiltIntensity;
    const rY = ((x - centerX) / centerX) * tiltIntensity;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div style={{ perspective: '1000px' }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`relative overflow-hidden rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-sm p-6 transition-colors duration-150 ${className}`}
        {...props}
      >
        {/* Dynamic 3D Glare Light */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, ${glowColor}, transparent 70%)`,
          }}
        />

        <div className="relative z-20">{children}</div>
      </motion.div>
    </div>
  );
};