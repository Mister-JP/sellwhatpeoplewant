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
        <a href="/#product">What we publish</a>
        <a href="/methodology">How we know</a>
        <a href="/#research-standard">What we promise</a>
        <a href="/explore">First case · in research</a>
      </nav>
    </header>
  );
}
