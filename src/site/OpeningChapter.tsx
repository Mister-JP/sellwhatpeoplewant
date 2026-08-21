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
          <span>Illustrative research map</span>
          <span>Questions · people · choices · costs · doubts · tests</span>
          <span>Not a market claim</span>
        </div>
        <div className="opening-copy">
          <p className="eyebrow">
            Business understanding for anyone curious enough to ask
          </p>
          <h1 id="home-title">Understand a business idea from the ground up.</h1>
          <p className="hero-definition">
            You should not need an economics degree, a business education, or a large
            attention span to understand what people may need and what it would take to
            serve them. We investigate one possible business at a time and explain it as
            a clear, source-linked case that anyone can follow.
          </p>
          <p className="hero-trust">
            We begin with the human question. Then we open the path beneath it: what
            important words mean, why those ideas exist, what people actually did, how
            the numbers work, where the sources came from, who disagrees, and what we
            still do not know.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="/methodology">
              See how we know <span aria-hidden="true">→</span>
            </a>
            <a className="text-action" href="#product">
              See what a case contains
            </a>
          </div>
        </div>

        <div className="hero-proof-strip" aria-label="Opportunity Case essentials">
          <span>
            <strong>A human question</strong>
            <small>Start with the decision, not a wall of information.</small>
          </span>
          <span>
            <strong>Ideas explained</strong>
            <small>
              Learn what a concept means, why it exists, and where it stops.
            </small>
          </span>
          <span>
            <strong>Evidence you can follow</strong>
            <small>
              Open the source, date, context, and reasoning behind a statement.
            </small>
          </span>
          <span>
            <strong>Open ends left open</strong>
            <small>
              See disagreement, uncertainty, and what would change the answer.
            </small>
          </span>
        </div>
      </section>

      <section className="case-anatomy" id="product" aria-labelledby="product-title">
        <header>
          <p className="section-index">What you will receive</p>
          <h2 id="product-title">A case you can understand—and take apart.</h2>
          <p>
            Each case starts like a careful conversation: one question, the people and
            place it concerns, what the world seems to show, and what must be true for
            the business to work. Read the clear account, or follow any important idea
            all the way to its evidence, history, arithmetic, and limits.
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
          <p className="section-index">How we investigate</p>
          <h2 id="method-title">Good questions are made, not found.</h2>
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
