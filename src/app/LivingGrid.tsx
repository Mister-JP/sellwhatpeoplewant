/**
 * Lets the public surface reveal a localized grid around the reader's pointer.
 * The effect communicates latent structure becoming visible without affecting
 * content, interaction, or reduced-motion users. CSS owns the rendering; this
 * component supplies only viewport coordinates as presentation variables.
 */
import { useEffect, type ReactElement } from 'react';

export function LivingGrid(): ReactElement | null {
  useEffect(() => {
    const updateGridFocus = (pointerEvent: PointerEvent): void => {
      document.documentElement.style.setProperty(
        '--grid-focus-x',
        `${String(pointerEvent.clientX)}px`,
      );
      document.documentElement.style.setProperty(
        '--grid-focus-y',
        `${String(pointerEvent.clientY)}px`,
      );
    };

    window.addEventListener('pointermove', updateGridFocus, { passive: true });

    return (): void => {
      window.removeEventListener('pointermove', updateGridFocus);
    };
  }, []);

  return null;
}
