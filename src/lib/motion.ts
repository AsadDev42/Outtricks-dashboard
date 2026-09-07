import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

// Export motion primitives for convenient re-use across the platform
export { motion, AnimatePresence, LayoutGroup };

/**
 * UI/UX Pro Max & Motion Physics Presets
 */
export const transitions = {
  gentle: {
    type: 'spring',
    stiffness: 260,
    damping: 24,
  },
  snappy: {
    type: 'spring',
    stiffness: 420,
    damping: 32,
  },
  bouncy: {
    type: 'spring',
    stiffness: 380,
    damping: 18,
  },
  smoothFade: {
    duration: 0.22,
    ease: [0.16, 1, 0.3, 1], // easeOutExpo
  },
} as const;

export const motionVariants = {
  fadeSlideUp: {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.18, ease: 'easeIn' } },
  },
  scalePop: {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 360, damping: 26 } },
    exit: { opacity: 0, scale: 0.94, transition: { duration: 0.15 } },
  },
  slideInRight: {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 320, damping: 28 } },
    exit: { opacity: 0, x: 24, transition: { duration: 0.18 } },
  },
} as const;

export const interactiveGestures = {
  subtleHover: {
    whileHover: { scale: 1.015, transition: { duration: 0.15 } },
    whileTap: { scale: 0.985 },
  },
  buttonTap: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.97 },
  },
  cardLift: {
    whileHover: { y: -2, transition: { duration: 0.2 } },
    whileTap: { y: 0 },
  },
} as const;