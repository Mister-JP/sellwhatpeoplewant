/**
 * Coordinates animation permission for the retained fluid chapter. It animates only
 * while visible, the document is active, and reduced motion is not requested.
 * The hook deliberately owns no renderer so lifecycle policy remains separate
 * from GPU-IO setup and can be tested or replaced independently.
 */
import { useEffect, useState, type RefObject } from 'react';

export interface CalmCanvasState {
  isAnimationAllowed: boolean;
  prefersReducedMotion: boolean;
}

function reducedMotionIsRequested(): boolean {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function useCalmCanvas(element: RefObject<HTMLElement | null>): CalmCanvasState {
  const [isVisible, setIsVisible] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(!document.hidden);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    reducedMotionIsRequested(),
  );

  useEffect(() => {
    const observedElement = element.current;
    if (observedElement === null) return;

    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry?.isIntersecting ?? false);
      },
      { rootMargin: '180px 0px' },
    );
    observer.observe(observedElement);
    return () => {
      observer.disconnect();
    };
  }, [element]);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = (): void => {
      setPrefersReducedMotion(motionPreference.matches);
    };
    const updateDocumentVisibility = (): void => {
      setIsDocumentVisible(!document.hidden);
    };

    motionPreference.addEventListener('change', updateMotionPreference);
    document.addEventListener('visibilitychange', updateDocumentVisibility);
    return () => {
      motionPreference.removeEventListener('change', updateMotionPreference);
      document.removeEventListener('visibilitychange', updateDocumentVisibility);
    };
  }, []);

  return {
    isAnimationAllowed: isVisible && isDocumentVisible && !prefersReducedMotion,
    prefersReducedMotion,
  };
}
