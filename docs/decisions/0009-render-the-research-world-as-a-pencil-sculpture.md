# ADR 0009: Render the research world as a pencil sculpture

- Status: Accepted
- Date: 2026-08-19
- Owners: Project maintainers
- Supersedes: Visual treatment in ADR 0007
- Superseded by: None

## Context

The physically shaded research observatory in ADR 0007 produced dark faceted nodes,
thick metallic rods, glass shells, and mechanical greebles. Although dimensional, it
looked like an arbitrary molecular machine and did not match the approved art direction:
a modernist pencil drawing that depicts a real spherical 3D sculpture using ivory paper,
graphite construction lines, and restrained cobalt, cyan, coral, and amber planes.

## Decision

Keep the fixed camera and semantic boundary from ADR 0008, but replace the observatory's
visual system. Use real spherical Three.js geometry with matte paper textures, faint
wire overlays, thin drafting strokes, partial color insets, flat ribbons, and small
original raster pencil evidence medallions. Connections are authored as an inspectable argument:
paired lines corroborate, single lines associate, dashed lines expose assumptions, and
coral interruptions show constraints. The graph remains asymmetric, incomplete, and
non-quantitative.

Use the approved dark concept image as the checked-in fallback. Do not use bloom,
faceted rocks, pipes, collars, fasteners, glass machinery, chemistry motifs, numbered
process columns, or a solved central node. The retained fluid chapter remains unchanged.

## Alternatives considered

### Keep the mechanical scene and change its colors

Palette changes would not correct its dominant material and shape language. The thick
rods and greebles would still read as a machine rather than a drawn research argument.

### Display only the approved concept image

The still is the closest literal match and remains the resilient fallback, but it would
remove the subtle spatial life requested for the primary rendering.

### Convert the artwork into an explanatory infographic

Explicit columns and labels make the logic obvious but destroy the spatial artwork. The
semantic page copy explains the method; the background only needs a coherent grammar.

## Consequences

- The scene becomes lighter because it drops environment maps, bloom, transmission,
  high-detail mechanical geometry, and the photographic evidence atlas.
- One generated, checked-in texture atlas keeps the detailed pencil evidence miniatures
  original, optimized, and visually consistent.
- The same authored node model can later receive a light material palette without
  changing the argument or camera.
- Visual regression captures, not geometry counts alone, determine fidelity.

## Validation

Compare desktop and mobile captures with the approved dark reference. Confirm abundant
spherical nodes, ivory graphite surfaces, restrained color ribbons, a quiet left reading
lane, fixed framing across scroll positions, an immediate handoff before the fluid
chapter, and an exact static fallback for reduced motion or WebGL failure.
