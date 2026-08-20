/**
 * Presents the opportunity-research method as a short Learn article rather than
 * an application dashboard. Tabs let a reader inspect one safeguard at a time
 * while the authored JSON remains useful to humans, agents, and search engines.
 */
import { useState, type ReactElement } from 'react';
import { currentSystemMap } from './currentSystemMap';
import { SystemMapDiagram } from './SystemMapDiagram';
import './system-map.css';

export function SystemMapPage(): ReactElement {
  const [activeViewIdentifier, setActiveViewIdentifier] = useState(
    currentSystemMap.views[0]?.id ?? '',
  );
  const activeView =
    currentSystemMap.views.find(
      (systemMapView) => systemMapView.id === activeViewIdentifier,
    ) ?? currentSystemMap.views[0];

  if (activeView === undefined) {
    throw new Error('The public system map requires at least one view.');
  }

  return (
    <main className="learn-page" id="main-content">
      <header className="learn-introduction">
        <p className="eyebrow">Learn · system map</p>
        <h1>The case before the platform.</h1>
        <p className="learn-deck">{currentSystemMap.principle}</p>
        <p>
          This map leaves out cloud vendors, databases, permissions, and implementation
          details. It shows the smallest research loop the first publication must make
          credible.
        </p>
      </header>

      <nav className="map-tabs" aria-label="System map views">
        {currentSystemMap.views.map((systemMapView) => (
          <button
            aria-controls="active-system-map"
            aria-selected={systemMapView.id === activeView.id}
            className={systemMapView.id === activeView.id ? 'is-active' : undefined}
            key={systemMapView.id}
            onClick={() => {
              setActiveViewIdentifier(systemMapView.id);
            }}
            role="tab"
            type="button"
          >
            {systemMapView.label}
          </button>
        ))}
      </nav>

      <section id="active-system-map" role="tabpanel">
        <SystemMapDiagram view={activeView} />
      </section>

      <aside className="agent-note">
        <p className="eyebrow">For research agents</p>
        <p>
          Help search, extract, calculate, translate, monitor, and compare. Preserve
          claim types, provenance, uncertainty, and local limits. Humans remain the
          primary audience and final judges of what to do.
        </p>
      </aside>
    </main>
  );
}
