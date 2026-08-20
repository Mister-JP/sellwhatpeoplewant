/**
 * Defines the exact viewport boundary at which the first WebGL renderer must yield
 * to the retained fluid chapter. Releasing the first renderer at this boundary keeps
 * the two decorative GPU systems isolated instead of merely hiding one canvas.
 */

export interface ChapterViewportBounds {
  top: number;
  bottom: number;
}

/** Returns whether any part of the research-world chapter remains in the viewport. */
export function researchChapterIsVisible(
  chapterBounds: ChapterViewportBounds,
  viewportHeight: number,
): boolean {
  return chapterBounds.bottom > 0 && chapterBounds.top < viewportHeight;
}
