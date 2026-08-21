/** Composes the opportunity-research North Star as two distinct editorial chapters. */
import type { ReactElement } from 'react';
import { OpeningChapter } from './OpeningChapter';
import { SharedStateChapter } from './SharedStateChapter';

export function HomePage(): ReactElement {
  return (
    <main id="main-content">
      <OpeningChapter />
      <section className="editorial-break" aria-label="From idea to inspectable case">
        <p>A clear explanation should not ask you to trust the person explaining.</p>
        <p>It should show you how to check—and how to keep going.</p>
      </section>
      <SharedStateChapter />
    </main>
  );
}
