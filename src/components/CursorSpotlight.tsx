import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Interactive Cursor Spotlight
 * - Subtle radial-gradient spotlight following the cursor on desktop.
 * - Updates CSS variables --mouse-x and --mouse-y for reactive card border highlights.
 * - Automatically disabled on touch / mobile devices and when reduced motion is preferred.
 * - Strictly pointer-events-none to prevent click/text blocking.
 */
export const CursorSpotlight: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isSupported, setIsSupported] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion;
  });
  const [opacity, setOpacity] = useState(0);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateSupport = (e: MediaQueryListEvent) => {
      setIsSupported(e.matches && !prefersReducedMotion);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateSupport);
    } else {
      mediaQuery.addListener(updateSupport);
    }

    if (!mediaQuery.matches || prefersReducedMotion) {
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', updateSupport);
        } else {
          mediaQuery.removeListener(updateSupport);
        }
      };
    }

    let rafId: number | null = null;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (opacity === 0) {
        setOpacity(1);
      }

      // Update CSS variables on documentElement for cards to use for border glow
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    const handlePointerLeave = () => {
      setOpacity(0);
    };

    const animate = () => {
      // Smooth interpolation for spotlight
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion, opacity]);

  if (!isSupported) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden transition-opacity duration-500 ease-out"
      style={{ opacity }}
    >
      <div
        ref={spotlightRef}
        className="absolute -top-[250px] -left-[250px] w-[500px] h-[500px] rounded-full pointer-events-none will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.03) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
    </div>
  );
};
