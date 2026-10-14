import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Initializes IntersectionObserver to reveal elements as they enter the viewport.
 * Elements with the class `.reveal-on-scroll` will gain `.is-revealed` when visible.
 * Respects prefers-reduced-motion by immediately revealing all elements.
 */
export function useScrollReveal() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If reduced motion is requested or IntersectionObserver not supported, reveal all immediately
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Animate once by default as specified in requirements
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px', // trigger slightly before it reaches the viewport bottom
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
    elements.forEach((el) => observer.observe(el));

    // Also observe dynamically mounted elements with a MutationObserver if needed
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
      newElements.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [prefersReducedMotion]);
}
