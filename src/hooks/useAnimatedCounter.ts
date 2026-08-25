'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Animates a number from 0 (or previous target) to `target` over `durationMs`.
 * Returns the current interpolated numeric value.
 */
export function useAnimatedCounter(
  target: number,
  durationMs: number = 1000,
  enabled: boolean = true
): number {
  const [current, setCurrent] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const fromRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled || isNaN(target)) {
      setCurrent(target);
      return;
    }

    const startVal = fromRef.current;
    const endVal = target;
    startTimeRef.current = null;

    if (startVal === endVal) {
      setCurrent(endVal);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextVal = startVal + (endVal - startVal) * eased;

      // Retain decimals if target is floating point, otherwise round
      const isFloat = target % 1 !== 0;
      setCurrent(isFloat ? parseFloat(nextVal.toFixed(1)) : Math.round(nextVal));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        fromRef.current = endVal;
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs, enabled]);

  return current;
}
