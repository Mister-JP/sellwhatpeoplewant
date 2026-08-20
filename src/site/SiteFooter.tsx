/** The footer repeats the public research promise on every page. */
import type { ReactElement } from 'react';

export function SiteFooter(): ReactElement {
  return (
    <footer className="site-footer">
      <div>
        <strong>SellWhatPeopleWant</strong>
        <p>Transparent opportunity research for people deciding what to build.</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="/#about">About</a>
        <a href="/learn/system-map">System logic</a>
        <a href="https://github.com/Mister-JP/sellwhatpeoplewant">GitHub</a>
      </nav>
      <p className="footer-status">Stage 01 · publish exceptional cases</p>
    </footer>
  );
}
