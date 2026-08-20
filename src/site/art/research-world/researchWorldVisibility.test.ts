/**
 * Protects the renderer handoff between the fixed research sculpture and the fluid
 * chapter. These pure boundary checks avoid testing WebGL internals while proving
 * the condition that disposes the first renderer before the second one takes over.
 */
import { describe, expect, it } from 'vitest';
import { researchChapterIsVisible } from './researchWorldVisibility';

describe('research-world chapter visibility', () => {
  it('keeps the renderer active while any chapter content remains onscreen', () => {
    expect(researchChapterIsVisible({ top: -700, bottom: 1 }, 900)).toBe(true);
  });

  it('releases the renderer when the chapter has completely left the viewport', () => {
    expect(researchChapterIsVisible({ top: -901, bottom: 0 }, 900)).toBe(false);
  });
});
