/** Composes the opportunity-research North Star as two distinct editorial chapters. */
import type { ReactElement } from 'react';
import { OpeningChapter } from './OpeningChapter';
import { SharedStateChapter } from './SharedStateChapter';

export function HomePage(): ReactElement {
  return (
    <main id="main-content">
      <OpeningChapter />
      <section className="editorial-break" aria-label="From idea to inspectable case">
        <p>An idea becomes useful when its assumptions become visible.</p>
        <p>A case earns trust when the world can correct it.</p>
      </section>
      <SharedStateChapter />
    </main>
  );
}
