/**
 * Protects the locked research-world framing across common viewport shapes. Wide
 * screens need a more distant camera to preserve the approved sparse composition;
 * the test intentionally excludes page scroll because scroll is not a camera input.
 */
import { PerspectiveCamera } from 'three';
import { describe, expect, it } from 'vitest';
import { placeResearchWorldCamera } from './researchWorldCamera';

describe('research-world camera', () => {
  it('moves back and frames the sculpture on the right of a 16:9 viewport', () => {
    const camera = new PerspectiveCamera(38, 16 / 9, 0.08, 90);

    placeResearchWorldCamera(camera, 16 / 9);

    expect(camera.position.toArray()).toEqual([-5.5, 0.25, 34]);
    expect(camera.rotation.z).toBe(0);
  });

  it('keeps the closer authored framing on a tall viewport', () => {
    const camera = new PerspectiveCamera(38, 1, 0.08, 90);

    placeResearchWorldCamera(camera, 1);

    expect(camera.position.z).toBe(30);
  });

  it('keeps the sculpture right-aligned on a standard landscape viewport', () => {
    const camera = new PerspectiveCamera(38, 1.6, 0.08, 90);

    placeResearchWorldCamera(camera, 1.6);

    expect(camera.position.toArray()).toEqual([-2.5, 0.25, 32]);
  });
});
