/**
 * Draws a compact demand curve from representative price observations. The SVG
 * is decorative beside a readable table, so exact values remain available to
 * assistive technology without requiring interpretation of the graphic.
 */
import type { ReactElement } from 'react';
import type { DemandSnapshot } from './demandSnapshots';

interface DemandCurveProperties {
  demandCurve: DemandSnapshot['demandCurve'];
}

export function DemandCurve({ demandCurve }: DemandCurveProperties): ReactElement {
  const maximumPeople = Math.max(
    ...demandCurve.map((demandPoint) => demandPoint.people),
  );
  const pointCoordinates = demandCurve
    .map((demandPoint, demandPointIndex) => {
      const xCoordinate = 10 + (demandPointIndex / (demandCurve.length - 1)) * 280;
      const yCoordinate = 105 - (demandPoint.people / maximumPeople) * 85;
      return `${String(xCoordinate)},${String(yCoordinate)}`;
    })
    .join(' ');

  return (
    <div className="demand-curve">
      <svg aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 300 120">
        <defs>
          <linearGradient id="curve-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ef424b" stopOpacity="0.22" />
            <stop offset="1" stopColor="#ef424b" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          className="curve-area"
          points={`${pointCoordinates} 290,110 10,110`}
        />
        <polyline className="curve-line" points={pointCoordinates} />
      </svg>
      <div className="curve-axis" aria-label="Demand by maximum price">
        {demandCurve.map((demandPoint) => (
          <span key={demandPoint.price}>
            <strong>${demandPoint.price}</strong>
            {Math.round(demandPoint.people / 100) / 10}k
          </span>
        ))}
      </div>
    </div>
  );
}
