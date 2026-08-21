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
        <p className="eyebrow">The first public case</p>
        <h1>We are still doing the work.</h1>
        <p>
          We will not fill this page with polished-looking business ideas. The first
          case will appear when someone with no special training can understand the
          question, follow each important concept and source, check what the numbers
          mean, see the strongest disagreement, and know what should be tested next.
        </p>
        <div className="explore-actions">
          <a href="/methodology">See how we know →</a>
          <a href="/#product">See what the case will contain</a>
        </div>
      </section>
    </main>
  );
}
