/**
 * Protects the homepage's tangible product explanation and knowledge limits.
 * Browser QA covers decorative canvases; this suite proves that the same meaning
 * remains complete without WebGL, screenshots, or generated hero artwork.
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('presents the human-facing Opportunity Case and its research boundary', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', {
        name: /understand a business idea from the ground up/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/not a market claim/i)).toBeInTheDocument();
    expect(
      screen.getByText(/should not need an economics degree/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/why those ideas exist/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /ideas with a history/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/numbers become sentences again/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /not a mind reader/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /no.*valuable answer/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /first case is still being built/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /see how we know/i })).toHaveAttribute(
      'href',
      '/methodology',
    );
  });
});
