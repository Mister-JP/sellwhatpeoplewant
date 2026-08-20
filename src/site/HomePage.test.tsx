/**
 * Protects the homepage's tangible product explanation and epistemic boundaries.
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
        name: /we research business ideas/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/not a market claim/i)).toBeInTheDocument();
    expect(screen.getByText(/we do not sell certainty/i)).toBeInTheDocument();
    expect(
      screen.getByText(/trace material claims to their origin/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /demand evidence/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/observed facts, sourced estimates/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /no signal becomes demand by itself/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /honest answer may be no/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /standard comes before the library/i }),
    ).toBeInTheDocument();
  });
});
