/**
 * Renders a system-map view as semantic HTML with a controlled visual sequence.
 * Using ordinary elements instead of a canvas keeps every explanation selectable,
 * indexable, accessible, and responsive while preserving a diagram-like reading
 * path. The public visitor cannot accidentally enter an editing mode.
 */
import type { ReactElement } from 'react';
import type { SystemMapView } from './systemMapDocument';

interface SystemMapDiagramProperties {
  view: SystemMapView;
}

export function SystemMapDiagram({ view }: SystemMapDiagramProperties): ReactElement {
  return (
    <figure className="system-map-diagram" aria-labelledby={`view-${view.id}`}>
      <figcaption>
        <p className="eyebrow">{view.label}</p>
        <h2 id={`view-${view.id}`}>{view.title}</h2>
        <p>{view.summary}</p>
      </figcaption>

      <ol className="system-map-sequence">
        {view.steps.map((step, stepIndex) => (
          <li className={`system-map-step tone-${step.tone}`} key={step.title}>
            <span className="step-number" aria-hidden="true">
              {String(stepIndex + 1).padStart(2, '0')}
            </span>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
            {stepIndex < view.connections.length ? (
              <span className="system-map-connection" aria-hidden="true">
                <span>{view.connections[stepIndex]}</span>
                <span className="connection-line">→</span>
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}
