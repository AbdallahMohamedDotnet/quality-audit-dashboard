'use client';

import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { pageVariants, staggerContainer, staggerFast, staggerChild, staggerChildScale } from '@/utils/animations';

interface AnimatedPageProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps view pages with standard smooth entrance transitions.
 */
export function AnimatedPage({ children, className = '', ...props }: AnimatedPageProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`space-y-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGridProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  fast?: boolean;
}

/**
 * Grid/List container that staggers its children's entrance.
 */
export function StaggerGrid({ children, className = '', fast = false, ...props }: StaggerGridProps) {
  return (
    <motion.div
      variants={fast ? staggerFast : staggerContainer}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  scale?: boolean;
}

/**
 * Child item inside a StaggerGrid.
 */
export function StaggerItem({ children, className = '', scale = false, ...props }: StaggerItemProps) {
  return (
    <motion.div
      variants={scale ? staggerChildScale : staggerChild}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
