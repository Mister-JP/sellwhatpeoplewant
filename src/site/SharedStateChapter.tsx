/**
 * States the lab's trust mechanisms and epistemic limits over the retained GPU-IO
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
          <p className="section-index">The research standard</p>
          <h2 id="standard-title">Trust comes from what remains inspectable.</h2>
          <p>
            The clear story comes first. Beneath it, readers can inspect the evidence,
            methods, formulas, uncertainty, conflicts, local limits, and revision
            history that produced the judgment.
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
        <p className="section-index">What evidence can—and cannot—establish</p>
        <h2 id="boundary-title">No signal becomes demand by itself.</h2>
        <div>
          <p>
            Demand changes with price, trust, availability, place, timing, and
            alternatives. Reviews, searches, interviews, purchases, shortages,
            procurement, and trade flows can each add evidence; none can decide a case
            alone.
          </p>
          <p>
            Even a verified purchase proves only that one transaction occurred. It does
            not establish representative demand, truthful reporting, long-term
            performance, or willingness to repurchase at today’s price.
          </p>
        </div>
      </section>

      <div className="decision-boundaries" aria-label="Decision safeguards">
        <section className="conclusion-boundary" aria-labelledby="conclusion-title">
          <div>
            <p className="section-index">Argument, not advertisement</p>
            <h2 id="conclusion-title">The honest answer may be no.</h2>
          </div>
          <p>
            A case may end “promising,” “only under these conditions,” “not presently
            investable,” or “insufficient evidence.” These are current research
            judgments—not forecasts, guarantees, or investment advice.
          </p>
        </section>

        <section
          className="participation-boundary"
          aria-labelledby="participation-title"
        >
          <div>
            <p className="section-index">Correctable in public</p>
            <h2 id="participation-title">
              Evidence can change the case. Popularity cannot.
            </h2>
          </div>
          <p>
            Readers can challenge a source, correct a price, question a formula, add
            local context, submit contrary evidence, or report a lawful test. Discussion
            belongs beside the claim it can improve—not in a generic comment feed.
          </p>
        </section>

        <section className="local-boundary" aria-labelledby="local-title">
          <div>
            <p className="section-index">Global comparison · local conclusion</p>
            <h2 id="local-title">An analogue is not a local fact.</h2>
          </div>
          <p>
            Every case names the geography and time window its evidence supports.
            Prices, laws, labor, logistics, financing, infrastructure, and customer
            behaviour must survive local scrutiny.
          </p>
        </section>

        <section className="current-stage" aria-labelledby="stage-title">
          <div>
            <p className="section-index">Current stage</p>
            <h2 id="stage-title">The standard comes before the library.</h2>
          </div>
          <p>
            The first cases are still being researched. We will publish when readers can
            trace material claims, reproduce central calculations, inspect the strongest
            counter-case, and understand the next useful test.
          </p>
          <a href="/explore">View the case-library status →</a>
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
