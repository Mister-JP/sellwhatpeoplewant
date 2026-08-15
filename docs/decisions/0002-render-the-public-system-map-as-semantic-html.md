# ADR 0002: Render the public system map as semantic HTML

- Status: Accepted
- Date: 2026-08-14
- Owners: Project maintainers
- Supersedes: ADR 0001
- Superseded by: None

## Context

The Excalidraw prototype proved useful for brainstorming, but its editor chrome,
free-form canvas geometry, large client dependency, and dense all-at-once view did
not suit the public product. Visitors need a focused explanation inside a normal
website, and agents need content they can discover, parse, quote, and navigate as
ordinary web information. The public map also needs deterministic layout and
responsive behavior without exposing authoring or repository controls.

The product meaning already lives in a small renderer-independent JSON document.
The remaining decision is how to turn that document into the public explanation.

## Decision

Render the public system map as semantic React, HTML, and CSS. Divide the product
story into a small set of tabs, with each tab presenting one ordered sequence of
steps and connections. Keep the authoritative story in
`architecture/public-system-map.json` and validate it before rendering.

Do not ship a diagram editor, canvas runtime, scene format, repository persistence
endpoint, or diagramming-library dependency in the public application. Text must
remain selectable, indexable, accessible to assistive technology, and readable
without interpreting pixels or proprietary drawing data.

## Alternatives considered

### Read-only Excalidraw

View mode could hide most editing controls, but it would retain a large canvas
runtime and weaker document semantics for a presentation that is fundamentally a
short ordered argument.

### Static exported image

An image would give exact placement but would make text less accessible, less
searchable, harder to update, and difficult to adapt across viewport sizes.

### Custom SVG

SVG provides deterministic graphics, but ordinary HTML better expresses the
current linear stories and requires less custom accessibility and responsive
layout work.

## Consequences

- Public pages stay lightweight and expose no authoring controls.
- Search engines, agents, screen readers, and humans receive the same words and
  reading order.
- Each view remains intentionally linear; future non-linear operational graphs
  may require a different renderer under a separate product boundary.
- Visual changes must preserve semantic order and must not introduce meaning that
  is absent from the validated JSON document.
- Excalidraw code, artifacts, persistence tooling, and dependency are removed.

## Validation

The decision remains valid while the map is clearer as a handful of ordered
stories than as a free-form graph. Component tests protect tab behavior and the
absence of editing actions. Schema tests protect step-to-connection completeness,
and desktop/mobile browser checks protect readable responsive presentation.
