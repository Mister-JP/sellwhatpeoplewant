# ADR 0007: Use evidence specimens as visual anchors

- Status: Accepted
- Date: 2026-08-19
- Owners: Project maintainers
- Supersedes: ADR 0006
- Superseded by: ADR 0008

## Context

The initial scroll-driven research world used faceted nodes and screen-space lines.
Its abstract grammar was semantically safe, but the thin connections and mostly
uniform objects read as a flat graph illustration. More importantly, the world did
not show the kinds of fragmented material an Opportunity Case actually connects:
products, prices, market gaps, logistics, costs, interviews, rules, failures, and
real-world tests.

## Decision

Retain the non-interactive scroll camera and semantic HTML boundary, but rebuild the
world as a dimensional research observatory. Use physically shaded solids, cylindrical
connections, authored light pools, environmental reflections, fog, restrained bloom,
and spherical image specimens distributed through depth.

The specimens come from one optimized, original texture atlas. They illustrate the
categories of evidence a case may examine, not completed research or measured market
data. They contain no semantic labels or fabricated values. Adjacent HTML continues
to own the product promise, evidentiary caveats, and accessible reading order.

## Alternatives considered

### Increase the number of abstract nodes

Additional nodes would make the scene denser without explaining what the connections
represent, and could make quantity look like confidence.

### Put a single large hero illustration behind the graph

One backdrop would preserve the separation between image and network. It would not
make products, economics, constraints, and tests feel like connected parts of one
research argument.

### Place live charts or case data inside WebGL

The first cases are not yet published. Fabricating live-looking data would undermine
the research standard, while rendering factual content in WebGL would weaken semantics,
accessibility, and correction workflows.

## Consequences

- The art chunk gains postprocessing and higher-detail geometry but remains lazy.
- One compressed texture request supplies nine visual artifacts.
- Desktop shows nine specimens; compact viewports show six with a smaller node field.
- The images wrap inner artifact spheres enclosed by glass and mechanical braces,
  making them visibly illustrative specimens rather than UI panels.
- Reduced motion, unavailable WebGL, and context loss retain the static fallback.
- Future real case media belongs in semantic case interfaces, not this decorative atlas.

## Validation

Keep this decision while desktop and mobile renders show material depth, the atlas
loads without WebGL warnings, copy remains legible, the production build stays within
acceptable bounds, and visitors cannot mistake decorative specimens for published
evidence. Reconsider if the postprocessing harms scroll performance or the images are
interpreted as factual case results.
