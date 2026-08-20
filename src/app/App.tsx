/**
 * Selects the small set of public research pages without introducing a routing
 * framework before navigation requirements warrant one. Ordinary anchors keep the
 * opportunity cases and method discoverable to humans, agents, and search engines.
 */
import type { ReactElement } from 'react';
import { ExplorePage } from '../explore/ExplorePage';
import { SystemMapPage } from '../learn/system-map/SystemMapPage';
import { HomePage } from '../site/HomePage';
import { SiteFooter } from '../site/SiteFooter';
import { SiteHeader } from '../site/SiteHeader';

function CurrentPage(): ReactElement {
  if (window.location.pathname === '/explore') {
    return <ExplorePage />;
  }

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
