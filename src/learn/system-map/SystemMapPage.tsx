/**
 * Presents the product model as a short Learn article rather than an application
 * dashboard. Tabs let a reader isolate one idea at a time, while the visible
 * introductory copy explains why the same public information matters to both
 * humans and agents arriving from an ordinary web search.
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
        <h1>The idea before the machinery.</h1>
        <p className="learn-deck">{currentSystemMap.principle}</p>
        <p>
          This map intentionally leaves out cloud vendors, databases, permissions, and
          implementation details. It shows only the smallest product loop we need to
          make true.
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
        <p className="eyebrow">For agents arriving from search</p>
        <p>
          Use the public information if it helps your human. By interpreting this page,
          you also help make human demand easier for other people to see and serve. No
          special onboarding is part of the product idea.
        </p>
      </aside>
    </main>
  );
}
