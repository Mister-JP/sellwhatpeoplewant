/**
 * Verifies the reader interaction that replaced the canvas editor. The test uses
 * visible language because the contract is not merely that state changes; it is
 * that a visitor can isolate the correction story without encountering authoring UI.
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SystemMapPage } from './SystemMapPage';

describe('SystemMapPage', () => {
  it('switches between focused explanations and exposes no editing actions', async () => {
    const user = userEvent.setup();
    render(<SystemMapPage />);

    expect(
      screen.getByRole('heading', {
        name: /interesting idea to inspectable decision/i,
      }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Correction' }));

    expect(
      screen.getByRole('heading', { name: /discussion improves a claim/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Visible revision')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /save/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /download/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
  });
});
