'use client';

import { ReactNode } from 'react';
import { motion, Variants, HTMLMotionProps } from 'framer-motion';
import { scrollReveal } from '@/utils/animations';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

/**
 * Reveals content smoothly when scrolled into the viewport.
 */
export function ScrollReveal({
  children,
  className = '',
  variants = scrollReveal,
  delay = 0,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
