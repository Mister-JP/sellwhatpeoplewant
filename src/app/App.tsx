/**
 * Selects the small set of public pages without introducing a routing framework
 * before navigation requirements warrant one. The host only needs an SPA fallback;
 * ordinary anchors keep URLs crawlable and keep a later server-rendered migration
 * straightforward.
 */
import type { ReactElement } from 'react';
import { SystemMapPage } from '../learn/system-map/SystemMapPage';
import { HomePage } from '../site/HomePage';
import { SiteFooter } from '../site/SiteFooter';
import { SiteHeader } from '../site/SiteHeader';

function CurrentPage(): ReactElement {
  if (window.location.pathname === '/learn/system-map') {
    return <SystemMapPage />;
  }

  return <HomePage />;
}

export function App(): ReactElement {
  return (
    <div className="public-site">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <CurrentPage />
      <SiteFooter />
    </div>
  );
}
