/**
 * Introduces the product through one tangible, explicitly hypothetical case. The
 * semantic copy owns every claim; the lazy Three.js world remains decorative and
 * illustrates evidence, assumptions, constraints, and unknowns without scoring them.
 */
/* eslint-disable max-lines-per-function -- The chapter is one continuous editorial argument. */
import { lazy, Suspense, type ReactElement } from 'react';
import { caseAnatomy, researchSteps } from './homeContent';

const ResearchWorldBackdrop = lazy(async () =>
  import('./art/research-world/ResearchWorldBackdrop').then((module) => ({
    default: module.ResearchWorldBackdrop,
  })),
);

export function OpeningChapter(): ReactElement {
  return (
    <div className="research-world-chapter" id="about">
      <Suspense
        fallback={<div className="research-world-fallback" aria-hidden="true" />}
      >
        <ResearchWorldBackdrop />
      </Suspense>
      <div className="research-world-glass" aria-hidden="true" />

      <section className="opening-hero" aria-labelledby="home-title">
        <div className="world-note">
          <span>Illustrative evidence observatory</span>
          <span>Products · prices · routes · costs · risks · tests</span>
          <span>Not a market claim</span>
        </div>
        <div className="opening-copy">
          <p className="eyebrow">
            Evidence-backed opportunity research for people deciding what to build
          </p>
          <h1 id="home-title">
            We research business ideas before you risk money on them.
          </h1>
          <p className="hero-definition">
            SellWhatPeopleWant investigates one possible business in one market and
            publishes the result as an Opportunity Case: a source-linked, editable
            argument you can audit. Each case identifies the buyer and apparent gap,
            tests real alternatives, maps the execution path, models the economics,
            makes the strongest case against itself, and ends with the cheapest useful
            experiment—not a promise.
          </p>
          <p className="hero-trust">
            We do not sell certainty. Every material claim links to its source. Every
            calculation exposes its inputs. Assumptions, conflicts, unknowns, and
            evidence that could reverse the conclusion remain visible.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#product">
              See what a case contains <span aria-hidden="true">↓</span>
            </a>
            <a className="text-action" href="#research-standard">
              Read our research standard
            </a>
          </div>
        </div>

        <div className="hero-proof-strip" aria-label="Opportunity Case essentials">
          <span>
            <strong>Source-linked evidence</strong>
            <small>Trace material claims to their origin and date.</small>
          </span>
          <span>
            <strong>Editable economics</strong>
            <small>Change price, cost, capital, and volume assumptions.</small>
          </span>
          <span>
            <strong>The case against</strong>
            <small>Inspect contrary evidence and conditions that could kill it.</small>
          </span>
          <span>
            <strong>A testable next step</strong>
            <small>Learn before committing inventory, debt, or hiring.</small>
          </span>
        </div>
      </section>

      <section className="case-anatomy" id="product" aria-labelledby="product-title">
        <header>
          <p className="section-index">The product</p>
          <h2 id="product-title">One decision. The whole case around it.</h2>
          <p>
            Every Opportunity Case is bounded by a place, customer, time window,
            proposition, and decision at stake. It connects what we can observe to what
            must be true for the business to work—without disguising inference as fact.
          </p>
        </header>
        <div className="case-anatomy-grid">
          {caseAnatomy.map((part, partIndex) => (
            <article key={part.title}>
              <span>{String(partIndex + 1).padStart(2, '0')}</span>
              <h3>{part.title}</h3>
              <p>{part.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="research-method"
        id="how-it-works"
        aria-labelledby="method-title"
      >
        <header>
          <p className="section-index">How a case is built</p>
          <h2 id="method-title">A promising idea must survive the evidence.</h2>
        </header>
        <ol>
          {researchSteps.map(([stage, question, explanation], stageIndex) => (
            <li key={stage}>
              <span>
                {String(stageIndex + 1).padStart(2, '0')} / {stage}
              </span>
              <strong>{question}</strong>
              <p>{explanation}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
