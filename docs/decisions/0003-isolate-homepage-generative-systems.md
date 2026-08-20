# ADR 0003: Isolate the homepage generative systems

- Status: Accepted
- Date: 2026-08-15
- Owners: Project maintainers
- Supersedes: None
- Superseded by: ADR 0005 for the opening chapter; retained for the fluid renderer

## Context

The home and About page needs one metaphor for a request joining collective
intelligence and another for the richer public want-state. The selected works use
different models and visual languages: three.js GPGPU flocking and Amanda
Ghassaei's GPU-IO fluid simulation. Both are MIT-licensed and need no external
visual assets.

## Decision

Use two independent decorative canvas components. The first retains separation,
alignment, and cohesion from GPGPU Birds. The second retains GPU-IO's
incompressible-fluid pipeline and Lagrangian particle trails. Separate lifecycle,
visibility, sizing, and static fallbacks. Do not merge or layer the simulations.
A solid-color semantic section forms the break. Product meaning remains ordinary
selectable HTML.

## Alternatives considered

### One blended canvas

This would weaken both works' identities, couple performance decisions, and make
the conceptual transition less clear.

### Static exported imagery only

Static images would be lighter but lose the local-rules-to-shared-pattern
metaphor. Static compositions remain fallbacks rather than the primary treatment.

### A new approximation without the selected runtimes

An approximation could reduce dependency size but would no longer honestly use
the two selected works.

## Consequences

- The homepage adds two client dependencies and must monitor bundle and runtime cost.
- Each system can be tuned, paused, disabled, or replaced independently.
- Reduced motion and WebGL failure still produce complete visual chapters.
- License notices and restrained public credits must remain with the adaptation.

## Validation

Keep this decision while desktop and mobile checks show stable scrolling,
readable text, bounded GPU work, distinct chapter identities, and complete static
fallbacks. Reconsider if field performance data shows unacceptable battery,
memory, or interaction cost.
