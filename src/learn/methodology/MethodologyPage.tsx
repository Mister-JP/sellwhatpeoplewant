/**
 * Publishes the lab's human-facing explanation at the legacy `/methodology` URL.
 * The visible experience is called "How we know" so implementation vocabulary
 * never becomes an admission requirement for understanding the work.
 */
import type { ReactElement } from 'react';

import { MethodologyNav } from './MethodologyComponents';
import { MethodologySections } from './MethodologySections';
import './methodology.css';

function MethodologyIntroduction(): ReactElement {
  return (
    <header className="methodology-introduction">
      <p className="methodology-series">How we know</p>
      <h1>A business idea should make sense before it asks for your trust.</h1>
      <p className="methodology-subtitle">
        We explain each case in ordinary language, then leave every door open: follow a
        source, learn a concept, see why a question was asked, check the arithmetic, or
        examine what could prove us wrong.
      </p>
      <dl className="methodology-metadata" aria-label="How to read our work">
        <div>
          <dt>Begin with</dt>
          <dd>A question a person can recognize</dd>
        </div>
        <div>
          <dt>Education assumed</dt>
          <dd>No specialist training</dd>
        </div>
        <div>
          <dt>Go deeper through</dt>
          <dd>Meaning, history, sources, numbers, disagreement</dd>
        </div>
        <div>
          <dt>End with</dt>
          <dd>A useful next test or an honest reason to stop</dd>
        </div>
      </dl>
      <section
        className="methodology-promise"
        aria-labelledby="methodology-promise-title"
      >
        <h2 id="methodology-promise-title">Our promise to the reader</h2>
        <div>
          <p>
            If you read only the first layer, you should still understand the question,
            the present answer, and why it matters. We will not use a technical label as
            a substitute for an explanation.
          </p>
          <p>
            If you keep going, you should be able to reconstruct how we got there: what
            humans were trying to understand, what has been learned before, which
            evidence bears on this case, what remains uncertain, and why the next step
            follows.
          </p>
        </div>
      </section>
      <aside className="methodology-status-note">
        <strong>Where this stands today</strong>
        <p>
          The first complete public case is still being built. This page describes the
          experience we intend to prove with real readers; it is not a badge of truth, a
          promise that a business will succeed, or a substitute for qualified advice.
        </p>
      </aside>
    </header>
  );
}

export function MethodologyPage(): ReactElement {
  return (
    <main className="methodology-page" id="main-content">
      <MethodologyIntroduction />
      <div className="methodology-body">
        <MethodologyNav />
        <MethodologySections />
      </div>
    </main>
  );
}
