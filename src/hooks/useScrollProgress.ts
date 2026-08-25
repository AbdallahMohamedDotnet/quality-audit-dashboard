'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks window scroll position, scroll direction, and whether the page is scrolled past a threshold.
 */
export function useScrollProgress(threshold: number = 10) {
  const [scrollY, setScrollY] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);
      setScrollDirection(currentY > lastScrollY ? 'down' : 'up');
      setIsScrolled(currentY > threshold);
      lastScrollY = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { scrollY, scrollDirection, isScrolled };
}
