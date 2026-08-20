# ADR 0008: Lock the research-world camera

- Status: Accepted
- Date: 2026-08-19
- Owners: Project maintainers
- Supersedes: Camera behavior in ADR 0007
- Superseded by: None

## Context

Mapping page scroll to a camera path made the decorative world appear to scroll away
with the document. That weakened the intended sense of looking through one fixed
window at an enormous research structure and made the background compete with the
editorial reading flow.

## Decision

Use one locked camera position and target for the entire opening chapter. Scrolling
moves semantic HTML over a viewport-fixed canvas but never pans, dollies, zooms, rolls,
or changes the Three.js perspective. Extremely slow movement inside the structure may
continue to keep the world alive, provided the overall composition remains stable.

Track the opening chapter boundary separately from camera behavior. The research world
is visible while any part of that chapter is in scope and becomes hidden immediately
when the next visual chapter takes over. Do not blend the two renderers.

## Alternatives considered

### Reduce the camera travel

Smaller movement would still make the graph appear attached to scroll. The requested
effect is a stable observation window, not restrained scrollytelling.

### Use CSS sticky positioning alone

The multi-section chapter and its stacking contexts caused browsers to release the
sticky canvas before the visual handoff. A fixed canvas with explicit chapter-boundary
visibility is more deterministic.

## Consequences

- Scroll listeners update only chapter visibility, not scene composition.
- The same graph framing remains behind the hero, product anatomy, and method sections.
- The camera module becomes a fixed placement function rather than a path interpolator.
- Reduced-motion and static fallbacks follow the same chapter visibility boundary.

## Validation

Capture the hero and at least two later opening-section scroll positions and confirm
that the WebGL composition has not changed. Confirm that it disappears before the
retained second visual chapter and that no console or WebGL warnings occur.
