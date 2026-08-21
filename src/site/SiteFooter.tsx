/** The footer repeats the public research promise on every page. */
import type { ReactElement } from 'react';

export function SiteFooter(): ReactElement {
  return (
    <footer className="site-footer">
      <div>
        <strong>SellWhatPeopleWant</strong>
        <p>Business research explained from the ground up.</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="/#about">About</a>
        <a href="/methodology">How we know</a>
        <a href="/learn/system-map">How the site works</a>
        <a href="https://github.com/Mister-JP/sellwhatpeoplewant">GitHub</a>
      </nav>
      <p className="footer-status">First case · in research</p>
    </footer>
  );
}
