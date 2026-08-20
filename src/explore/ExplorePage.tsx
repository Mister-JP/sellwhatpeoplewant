/**
 * Holds the public case-library route until the first Opportunity Case meets the
 * research standard. A sparse boundary is more honest than publishing an invented
 * or under-researched case that could be mistaken for decision-ready analysis.
 */
import type { ReactElement } from 'react';
import './explore.css';

export function ExplorePage(): ReactElement {
  return (
    <main className="explore-page" id="main-content">
      <section className="explore-coming-soon">
        <p className="eyebrow">Opportunity cases</p>
        <h1>The case library is in research.</h1>
        <p>
          We are selecting one geography and one bounded opportunity family for the
          first publication. Nothing appears here until readers can trace the material
          claims, change the central assumptions, understand the strongest failure case,
          and see the cheapest next test.
        </p>
        <a href="/#how-it-works">Read the research method →</a>
      </section>
    </main>
  );
}
