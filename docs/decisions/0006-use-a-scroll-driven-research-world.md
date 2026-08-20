# ADR 0006: Use a scroll-driven research world

- Status: Accepted
- Date: 2026-08-19
- Owners: Project maintainers
- Supersedes: ADR 0005
- Superseded by: ADR 0007

## Context

The editorial D3 trace correctly avoided unsupported market claims but remained an
abstract methodology chart. It asked a new visitor to interpret anonymous lines
before showing what the company sells. The public product now needs a tangible
Opportunity Case example and an art system with enough scale and depth to carry the
full first chapter rather than one framed hero diagram.

## Decision

Replace the D3 trace with two coordinated but independent layers:

1. Semantic HTML explains one explicitly hypothetical Opportunity Case, including
   the evidence required, the case against, and the cheapest next test.
2. A lazy Three.js backdrop fills the first chapter and moves a non-interactive
   camera through a deterministic world of differently shaped evidence, assumptions,
   constraints, and unknowns.

The canvas is decorative and labelled by adjacent HTML as illustrative rather than
a market claim. Shape and color work together; node quantity and size never encode
truth, confidence, or demand. The existing GPU-IO chapter remains isolated after the
editorial break, and the two render loops do not intentionally overlap.

## Alternatives considered

### Enlarge the D3 chart

More chart detail would make the page denser without making the product tangible.
The defect is not chart resolution; it is that a method trace is not an example of
the research artifact readers receive.

### Use a stock molecular image

The supplied references demonstrate macro perspective and lighting, but their stock
marks and generic molecule semantics are unsuitable. The production scene is
original, code-generated, and tied to the research grammar.

### Replace the retained fluid chapter

The fluid renderer remains compatible with the deeper inspectable-reasoning chapter.
Replacing it would widen scope without correcting the opening product explanation.

## Consequences

- Three.js returns as a direct, pinned dependency in a lazy art chunk.
- Reduced motion, unavailable WebGL, or context loss uses a checked-in static frame.
- The canvas has no pointer listeners, labels, or product meaning unavailable in HTML.
- The scene uses instancing and fixed geometry instead of a live force simulation.
- Hero artwork remains a separate review decision; generated options are not silently
  promoted into the public hero.

## Validation

Keep this decision while the page explains the product without WebGL, the scene stays
decorative and smooth across desktop and mobile, the fluid handoff is stable, and no
reader could reasonably interpret the world as measured demand or a confidence score.
