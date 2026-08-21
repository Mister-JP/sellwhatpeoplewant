/**
 * Protects the public explanation from subtle content drift. These tests focus on
 * the semantic story rather than CSS pixels because a polished diagram with a
 * missing transition would communicate the wrong product more convincingly.
 */
import { describe, expect, it } from 'vitest';
import candidateSystemMap from '../../../architecture/public-system-map.json';
import { parseSystemMapDocument } from './systemMapDocument';

describe('parseSystemMapDocument', () => {
  it('accepts the current set of focused public views', () => {
    // The authored JSON is the representative fixture so changes made outside
    // TypeScript pass through the exact same validation boundary as production.
    const systemMap = parseSystemMapDocument(candidateSystemMap);

    expect(systemMap.views.map((systemMapView) => systemMapView.id)).toEqual([
      'whole-case',
      'evidence',
      'concepts',
      'economics',
      'correction',
      'decision-value',
    ]);
  });

  it('rejects a view that cannot connect every adjacent step', () => {
    const invalidSystemMap = structuredClone(candidateSystemMap);
    const firstView = invalidSystemMap.views[0];

    if (firstView === undefined) {
      throw new Error('The representative system map requires one view.');
    }

    // Removing a label models the most likely hand-editing failure: adding a box
    // without explaining how the previous state becomes the next state.
    firstView.connections.pop();

    expect(() => parseSystemMapDocument(invalidSystemMap)).toThrow(
      /requires one connection between each step/,
    );
  });
});
