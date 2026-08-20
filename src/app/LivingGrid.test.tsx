/**
 * Verifies that the decorative grid follows pointer position through CSS variables
 * without creating interactive DOM. The test excludes visual rendering because the
 * effect's readability and restraint are checked in a real browser.
 */
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LivingGrid } from './LivingGrid';

describe('LivingGrid', () => {
  it('updates the presentation coordinates when the pointer moves', () => {
    const { container } = render(<LivingGrid />);

    fireEvent.pointerMove(window, { clientX: 320, clientY: 180 });

    expect(container).toBeEmptyDOMElement();
    expect(document.documentElement.style.getPropertyValue('--grid-focus-x')).toBe(
      '320px',
    );
    expect(document.documentElement.style.getPropertyValue('--grid-focus-y')).toBe(
      '180px',
    );
  });
});
