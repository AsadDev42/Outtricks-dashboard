import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { motionVariants } from '../../lib/motion';

export interface MotionFadeProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'fadeSlideUp' | 'scalePop' | 'slideInRight';
  delay?: number;
  className?: string;
}

export const MotionFade: React.FC<MotionFadeProps> = ({
  children,
  variant = 'fadeSlideUp',
  delay = 0,
  className = '',
  ...props
}) => {
  const selectedVariant = motionVariants[variant];

  return (
    <motion.div
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      exit={selectedVariant.exit}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};