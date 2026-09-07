import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// Register plugins once globally
gsap.registerPlugin(useGSAP);

// Export configured gsap and useGSAP hook
export { gsap, useGSAP };

/**
 * Check if user prefers reduced motion
 */
export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Standard Animation Timing Tokens
 */
export const MOTION_DURATIONS = {
  micro: 0.15,
  button: 0.18,
  dropdown: 0.22,
  card: 0.35,
  modal: 0.3,
  page: 0.4,
  stagger: 0.05,
} as const;

/**
 * Standard Professional Easing Curves
 */
export const MOTION_EASINGS = {
  smooth: 'power2.out',
  snappy: 'power3.out',
  inOut: 'power2.inOut',
  spring: 'back.out(1.2)',
  subtle: 'sine.out',
} as const;

/**
 * Page Entrance Animation Preset
 */
export function pageEnter(
  target: gsap.DOMTarget,
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  } = {}
) {
  if (isReducedMotion()) {
    return gsap.set(target, { autoAlpha: 1, y: 0 });
  }

  return gsap.fromTo(
    target,
    { autoAlpha: 0, y: options.y ?? 12 },
    {
      autoAlpha: 1,
      y: 0,
      duration: options.duration ?? MOTION_DURATIONS.page,
      delay: options.delay ?? 0,
      ease: options.ease ?? MOTION_EASINGS.smooth,
      clearProps: 'transform,opacity,visibility',
    }
  );
}

/**
 * Fade Up Element Animation
 */
export function fadeUp(
  target: gsap.DOMTarget,
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  } = {}
) {
  if (isReducedMotion()) {
    return gsap.set(target, { autoAlpha: 1, y: 0 });
  }

  return gsap.fromTo(
    target,
    { autoAlpha: 0, y: options.y ?? 16 },
    {
      autoAlpha: 1,
      y: 0,
      duration: options.duration ?? MOTION_DURATIONS.card,
      delay: options.delay ?? 0,
      ease: options.ease ?? MOTION_EASINGS.smooth,
      clearProps: 'transform,opacity,visibility',
    }
  );
}

/**
 * Standard Stagger In Animation for Grid/Lists
 */
export function staggerIn(
  elements: gsap.DOMTarget,
  options: {
    y?: number;
    x?: number;
    stagger?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  } = {}
) {
  if (isReducedMotion()) {
    return gsap.set(elements, { autoAlpha: 1, y: 0, x: 0 });
  }

  return gsap.fromTo(
    elements,
    {
      autoAlpha: 0,
      y: options.y !== undefined ? options.y : 14,
      x: options.x !== undefined ? options.x : 0,
    },
    {
      autoAlpha: 1,
      y: 0,
      x: 0,
      duration: options.duration ?? MOTION_DURATIONS.card,
      stagger: options.stagger !== undefined ? options.stagger : MOTION_DURATIONS.stagger,
      delay: options.delay ?? 0,
      ease: options.ease ?? MOTION_EASINGS.smooth,
      clearProps: 'transform,opacity,visibility',
    }
  );
}

/**
 * Scale In Entrance for Modals, Popovers, Badges
 */
export function scaleIn(
  target: gsap.DOMTarget,
  options: {
    scale?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  } = {}
) {
  if (isReducedMotion()) {
    return gsap.set(target, { autoAlpha: 1, scale: 1 });
  }

  return gsap.fromTo(
    target,
    { autoAlpha: 0, scale: options.scale ?? 0.96 },
    {
      autoAlpha: 1,
      scale: 1,
      duration: options.duration ?? MOTION_DURATIONS.modal,
      delay: options.delay ?? 0,
      ease: options.ease ?? MOTION_EASINGS.snappy,
      clearProps: 'transform,opacity,visibility',
    }
  );
}

/**
 * Interactive Tactile Card Hover Micro-Interaction
 */
export function cardHover(element: HTMLElement, isEntering: boolean) {
  if (isReducedMotion()) return;

  gsap.to(element, {
    y: isEntering ? -2 : 0,
    scale: isEntering ? 1.005 : 1,
    duration: 0.2,
    ease: 'power2.out',
    overwrite: 'auto',
  });
}

/**
 * Interactive Tactile Button Press Micro-Interaction
 */
export function buttonPress(element: HTMLElement, isPressed: boolean) {
  if (isReducedMotion()) return;

  gsap.to(element, {
    scale: isPressed ? 0.98 : 1,
    duration: 0.12,
    ease: 'power2.out',
    overwrite: 'auto',
  });
}

/**
 * Chart Drawing / Stagger Reveal
 */
export function chartReveal(
  elements: gsap.DOMTarget,
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
  } = {}
) {
  if (isReducedMotion()) {
    return gsap.set(elements, { autoAlpha: 1, scaleY: 1 });
  }

  return gsap.fromTo(
    elements,
    { autoAlpha: 0, scaleY: 0, transformOrigin: 'bottom center' },
    {
      autoAlpha: 1,
      scaleY: 1,
      duration: options.duration ?? 0.6,
      stagger: options.stagger ?? 0.04,
      delay: options.delay ?? 0.1,
      ease: 'power2.out',
      clearProps: 'transform,opacity,visibility',
    }
  );
}

/**
 * Helper to animate numbers smoothly using GSAP
 */
export function animateNumber(
  target: { value: number },
  endValue: number,
  options: {
    duration?: number;
    ease?: string;
    onUpdate?: () => void;
    onComplete?: () => void;
  } = {}
) {
  if (isReducedMotion()) {
    target.value = endValue;
    if (options.onUpdate) options.onUpdate();
    if (options.onComplete) options.onComplete();
    return null;
  }

  return gsap.to(target, {
    value: endValue,
    duration: options.duration || 0.8,
    ease: options.ease || MOTION_EASINGS.smooth,
    onUpdate: options.onUpdate,
    onComplete: options.onComplete,
  });
}