# ADR 0001: Use Excalidraw for the architecture studio

- Status: Superseded
- Date: 2026-08-14
- Owners: Project maintainers
- Supersedes: None
- Superseded by: ADR 0002

## Context

The project needs a diagramming surface that supports two different readers and
two different modes of contribution. Humans need a calm, direct-manipulation
canvas for brainstorming and understanding the system. Coding agents need a
deterministic representation whose elements, positions, connections, and labels
can be inspected and changed without unreliable visual automation.

An initial Mermaid-to-draw.io experiment produced a dense result with poor control
over layout and routing. Native draw.io XML would provide deterministic control,
but it would remain a separate authoring format and editor rather than naturally
becoming part of the public product. React Flow offers excellent structured graph
control but defaults toward a technical node-editor interaction model that is
heavier than the desired brainstorming experience.

The project is open source and the architecture explanation is expected to become
part of the website. The selected editor must therefore be embeddable, locally
usable, persistable in the repository, and permissively licensed for production.

## Decision

Use the MIT-licensed Excalidraw React component as the local architecture authoring
surface and as the basis of a read-only public architecture view.

The Excalidraw scene is the visual-layout representation, not the sole semantic
description of the system. Stable element identifiers will connect visual elements
to a separate, compact architecture model intended for validation, documentation,
agent consumption, and future alternative renderers.

The initial implementation must maintain an explicit separation between:

- The architecture domain model and its validation.
- Excalidraw scene conversion and persistence.
- The local editing interface.
- The public read-only presentation.

## Alternatives considered

### Mermaid embedded in draw.io

Mermaid is concise and agent-friendly for small directed flows, but its automatic
layout becomes difficult to control in a dense cross-layer architecture. The
imported result did not provide the desired collaborative editing experience.

### Native draw.io XML

Native XML provides exact positions, pages, and connector routing while remaining
editable in draw.io. It is a viable interchange or fallback format, but embedding
the editor and evolving it as part of the product would be less natural than using
a React component inside the application.

### React Flow

React Flow has a strong typed graph model and deterministic programmatic control.
It remains a candidate for future operational graph interfaces, but its node-port
interaction model is more technical than the desired early architecture studio.

### tldraw

tldraw provides a highly polished infinite canvas, but its current SDK requires a
production license key and is source-available rather than permissively open
source. That conflicts with the project's licensing and downstream-use goals.

### Fabric.js, React Konva, or a custom SVG editor

These primitives would provide complete rendering control, but the project would
need to build and maintain selection, text editing, bindings, history, grouping,
and accessibility before it could focus on its actual product.

## Consequences

- Contributors receive a friendly, full-featured canvas without building an
  editor from primitives.
- The same React application can expose an authoring experience locally and a
  simplified read-only explanation publicly.
- Excalidraw scene JSON becomes a versioned project artifact and requires schema
  validation, migrations, deterministic normalization, and round-trip tests.
- Excalidraw-specific structures must not leak into the architecture domain model.
- Some formal diagram behavior, such as advanced automatic routing or semantic
  graph queries, must be supplied by the project or a separate renderer.
- Large public pages should avoid shipping the complete editing interface when a
  lightweight read-only representation is sufficient.

## Validation

The decision remains valid if a first studio prototype demonstrates that:

- A human can move, connect, label, group, undo, and save elements naturally.
- An agent can make deterministic element-level changes through repository data.
- A saved scene round-trips without losing bindings or stable identifiers.
- The architecture model can produce useful machine-readable output independent
  of Excalidraw.
- The public view is readable on desktop and mobile without exposing editing
  controls.

Reconsider this decision if scene migrations are unreliable, the embedded editor
cannot meet accessibility requirements, public bundle cost remains unacceptable
after read-only optimization, or maintaining two linked representations produces
more errors than value.
