/**
 * Protects the public learning path: ordinary language must come first, while a
 * curious reader can still reach question formation, meaning, evidence, arithmetic,
 * disagreement, original sources, and stated limits without internal research jargon.
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MethodologyPage } from './MethodologyPage';

describe('MethodologyPage', () => {
  it('welcomes a reader without specialist training and teaches through one simple example', () => {
    render(<MethodologyPage />);

    expect(
      screen.getByRole('heading', {
        name: /business idea should make sense before it asks for your trust/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('No specialist training')).toBeInTheDocument();
    expect(
      screen.getByText(/first layer.*understand the question/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/fictional numbers.*not a market claim/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /could a small lunch service work/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/30 meals a day just to cover/i)).toBeInTheDocument();
    expect(screen.getByText(/not a prediction that 30 buyers/i)).toBeInTheDocument();
  });

  it('opens concepts, evidence limits, disagreement, sources, and present unknowns', () => {
    render(<MethodologyPage />);

    expect(screen.getByRole('heading', { name: 'Break-even' })).toBeInTheDocument();
    expect(screen.getByText('How it became more formal')).toBeInTheDocument();
    expect(screen.getAllByText('What it cannot show')).toHaveLength(4);
    expect(
      screen.getByText(/purchase is evidence, not mind-reading/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /good-looking research can still be wrong/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: /cochrane handbook.*searching for and selecting studies/i,
      }),
    ).toHaveAttribute('href', expect.stringContaining('cochrane.org'));
    expect(
      screen.getByText(/not yet shown that ordinary readers understand/i),
    ).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent(
      /candidate grammar|typed inference|warrant|defeater|scalar/i,
    );
  });
});
