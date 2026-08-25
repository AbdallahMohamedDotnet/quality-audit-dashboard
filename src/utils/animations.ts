'use client';

import { Variants, TargetAndTransition } from 'framer-motion';

// ─── Duration & Easing Tokens ───────────────────────────────
export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
  slower: 0.7,
} as const;

export const easing = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  spring: [0.34, 1.56, 0.64, 1],
  smooth: [0.16, 1, 0.3, 1],
} as const;

// ─── Reusable Animation Variants ────────────────────────────

/** Page/view mount animation */
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: easing.smooth },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: duration.fast },
  },
};

/** Stagger container for child animations */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

/** Fast stagger container */
export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.02,
    },
  },
};

/** Individual stagger child — fade up */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: easing.smooth },
  },
};

/** Individual stagger child — scale in */
export const staggerChildScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: easing.smooth },
  },
};

/** Scroll-triggered reveal — fade up */
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.smooth },
  },
};

/** Scroll-triggered reveal — slide in from side */
export const scrollSlideIn: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.smooth },
  },
};

/** Modal overlay backdrop */
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.fast } },
  exit: { opacity: 0, transition: { duration: duration.fast } },
};

/** Modal content container */
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 26,
      stiffness: 320,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 10,
    transition: { duration: duration.fast },
  },
};

/** Sidebar slide-in (LTR) */
export const sidebarVariants: Variants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', damping: 28, stiffness: 280 },
  },
  exit: {
    x: '-100%',
    transition: { duration: duration.fast, ease: easing.easeIn },
  },
};

/** Sidebar slide-in (RTL) */
export const sidebarVariantsRTL: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', damping: 28, stiffness: 280 },
  },
  exit: {
    x: '100%',
    transition: { duration: duration.fast, ease: easing.easeIn },
  },
};

/** Toast notification */
export const toastVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', damping: 22, stiffness: 350 },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.94,
    transition: { duration: duration.fast },
  },
};

/** Interactive hover & click gestures */
export const cardHover: TargetAndTransition = {
  y: -3,
  scale: 1.015,
  transition: { type: 'spring', stiffness: 400, damping: 20 },
};

export const cardTap: TargetAndTransition = {
  scale: 0.985,
  transition: { duration: duration.instant },
};

export const buttonHover: TargetAndTransition = {
  scale: 1.02,
  transition: { type: 'spring', stiffness: 450, damping: 18 },
};

export const buttonTap: TargetAndTransition = {
  scale: 0.96,
  transition: { duration: duration.instant },
};

/** Table row reveal */
export const tableRowVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.fast, ease: easing.smooth },
  },
};
