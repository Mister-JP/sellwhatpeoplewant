/**
 * States the lab's trust mechanisms and knowledge limits over the retained GPU-IO
 * chapter. The canvas remains decorative; every promise and limitation is present
 * in semantic HTML for readers, crawlers, and assistive technology.
 */
/* eslint-disable max-lines-per-function -- The chapter is one continuous editorial argument. */
import { lazy, Suspense, type ReactElement } from 'react';
import { trustPrinciples } from './homeContent';

const FluidCurrentCanvas = lazy(async () =>
  import('./art/FluidCurrentCanvas').then((module) => ({
    default: module.FluidCurrentCanvas,
  })),
);

export function SharedStateChapter(): ReactElement {
  return (
    <div className="fluid-chapter">
      <Suspense
        fallback={
          <div className="fluid-art fluid-loading-fallback" aria-hidden="true" />
        }
      >
        <FluidCurrentCanvas />
      </Suspense>

      <section
        className="research-standard"
        id="research-standard"
        aria-labelledby="standard-title"
      >
        <header>
          <p className="section-index">How we know</p>
          <h2 id="standard-title">The answer is only the first layer.</h2>
          <p>
            The clear story comes first. From there, every reader gets a choice: stop
            when the idea makes sense, or go deeper into the concepts, evidence,
            calculations, disagreements, and history that shaped our present view.
          </p>
        </header>
        <div className="trust-principles">
          {trustPrinciples.map(([title, detail], principleIndex) => (
            <article key={title}>
              <span>{String(principleIndex + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="evidence-boundary" aria-labelledby="boundary-title">
        <p className="section-index">Words, actions, and incentives</p>
        <h2 id="boundary-title">What people do matters. It is not a mind reader.</h2>
        <div>
          <p>
            Business is one place where human needs and constraints become visible in
            action: people pay, switch, wait, repair, improvise, or do without. Those
            actions often teach us more than opinions alone because something real was
            at stake.
          </p>
          <p>
            But a purchase is not a confession of someone’s deepest values. Price,
            income, habit, convenience, available alternatives, and other people’s
            choices all matter. Words are evidence. Actions are evidence. Neither tells
            the whole human story by itself.
          </p>
        </div>
      </section>

      <div className="decision-boundaries" aria-label="Decision safeguards">
        <section className="conclusion-boundary" aria-labelledby="conclusion-title">
          <div>
            <p className="section-index">Useful, not promotional</p>
            <h2 id="conclusion-title">“No” can be a valuable answer.</h2>
          </div>
          <p>
            A case may find a promising path, a path that works only under narrow
            conditions, too little evidence, or a reason to stop. Our job is to make the
            present understanding clear—not to sell excitement or certainty.
          </p>
        </section>

        <section
          className="participation-boundary"
          aria-labelledby="participation-title"
        >
          <div>
            <p className="section-index">Open to correction</p>
            <h2 id="participation-title">Show us what we missed.</h2>
          </div>
          <p>
            A reader may find a better source, a changed price, a mistaken assumption, a
            missing local fact, or a stronger explanation. The correction belongs beside
            the part it changes, with the old reasoning still visible.
          </p>
        </section>

        <section className="local-boundary" aria-labelledby="local-title">
          <div>
            <p className="section-index">Place and time matter</p>
            <h2 id="local-title">What worked elsewhere may not work here.</h2>
          </div>
          <p>
            Prices, laws, labor, logistics, financing, infrastructure, and habits can
            change across a street or across a year. A comparison can help us ask a
            question; it cannot quietly become a local fact.
          </p>
        </section>

        <section className="current-stage" aria-labelledby="stage-title">
          <div>
            <p className="section-index">Current stage</p>
            <h2 id="stage-title">The first case is still being built.</h2>
          </div>
          <p>
            We will publish when an ordinary reader can understand the question, follow
            the important ideas and sources, see what the numbers mean, examine the
            strongest disagreement, and know what should be tested next.
          </p>
          <a href="/explore">Follow the first case →</a>
        </section>
      </div>

      <p className="art-credit">
        Generative foundation:{' '}
        <a href="https://apps.amandaghassaei.com/gpu-io/examples/fluid/">
          GPU-IO Fluid Simulation by Amanda Ghassaei
        </a>
        . Adapted under the MIT license.
      </p>
    </div>
  );
}
