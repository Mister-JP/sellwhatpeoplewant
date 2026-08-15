/**
 * Keeps the public navigation plain enough for browsers, crawlers, and agents to
 * understand without client-side route conventions. Normal anchors also make the
 * eventual hosting boundary portable across static and serverless providers.
 */
import type { ReactElement } from 'react';

export function SiteHeader(): ReactElement {
  return (
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="SellWhatPeopleWant home">
        <img src="/brand/logo-mark.png" alt="" aria-hidden="true" />
        <span className="wordmark-text" aria-hidden="true">
          <strong>Sell What</strong>
          <strong>
            <em>People</em> Want
          </strong>
        </span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="/#demand">Demand</a>
        <a href="/#sellers">Sellers</a>
        <a href="/learn/system-map">Learn</a>
        <a href="/#about">About</a>
      </nav>
      <a
        className="source-link"
        href="https://github.com/Mister-JP/sellwhatpeoplewant"
        rel="noreferrer"
      >
        Open source
      </a>
    </header>
  );
}
