# Learn

This area owns public explanations of the product rather than operational product
features. Its current entry point is `system-map/SystemMapPage.tsx`.

The system map validates `architecture/public-system-map.json` at the model edge,
then renders one focused view at a time with semantic HTML. Components here may
depend on that validated content model and shared site styles. The content model
must not depend on React, browser APIs, diagram libraries, or hosting details.

Preserve searchable text, accessible reading order, responsive presentation, and
the absence of public editing controls.
