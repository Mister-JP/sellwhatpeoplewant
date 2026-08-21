# Learn

This area owns public explanations of the product rather than operational product
features. `methodology/MethodologyPage.tsx` demonstrates how the research works in
ordinary language through a concrete question. `system-map/SystemMapPage.tsx` lets a
reader inspect the larger research-and-learning path one part at a time.

The system map validates `architecture/public-system-map.json` at the model edge,
then renders one focused view at a time with semantic HTML. Components here may
depend on that validated content model and shared site styles. The content model
must not depend on React, browser APIs, diagram libraries, or hosting details.

Preserve searchable text, accessible reading order, responsive presentation, and
the absence of public editing controls. Begin with recognizable human situations and
questions. Necessary technical language should be explained in place; deeper sources,
concept history, calculations, disagreements, and unknowns should remain reachable
without blocking the first reading.
