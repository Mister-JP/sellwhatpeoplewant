/** The footer repeats the public-data promise where every page can expose it. */
import type { ReactElement } from 'react';

export function SiteFooter(): ReactElement {
  return (
    <footer className="site-footer">
      <p>Human demand, made visible.</p>
      <p>Publicly readable by people and their agents.</p>
    </footer>
  );
}
