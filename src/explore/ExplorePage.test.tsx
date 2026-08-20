/**
 * Protects the deliberately empty case-library boundary. Until a real publication
 * meets the research standard, this route must not imply decision-ready analysis.
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ExplorePage } from './ExplorePage';

describe('ExplorePage', () => {
  it('states that the first Opportunity Case is still in research', () => {
    render(<ExplorePage />);

    expect(
      screen.getByRole('heading', { name: /case library is in research/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/trace the material claims/i)).toBeInTheDocument();
  });
});
