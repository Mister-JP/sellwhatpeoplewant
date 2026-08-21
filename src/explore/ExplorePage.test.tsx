/**
 * Protects the deliberately empty case-library boundary. Until a real publication
 * meets the research standard, this route must not imply decision-ready analysis.
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ExplorePage } from './ExplorePage';

describe('ExplorePage', () => {
  it('states the human-understanding threshold for publishing the first case', () => {
    render(<ExplorePage />);

    expect(
      screen.getByRole('heading', { name: /still doing the work/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/no special training/i)).toBeInTheDocument();
    expect(screen.getByText(/strongest disagreement/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /how we know/i })).toHaveAttribute(
      'href',
      '/methodology',
    );
  });
});
