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
        <img src="/brand/logo-mark.svg" alt="" aria-hidden="true" />
        <span className="wordmark-text" aria-hidden="true">
          <strong>Sell What</strong>
          <strong>
            <em>People</em> Want
          </strong>
        </span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="/#product">Opportunity cases</a>
        <a href="/#how-it-works">How we research</a>
        <a href="/#research-standard">Research standard</a>
        <a href="/explore">Cases · soon</a>
      </nav>
    </header>
  );
}
