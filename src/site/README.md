# Public site shell

This area owns the common header, footer, and public landing page. It does not own
the system-map content model, hosting integration, or future demand records.

`HomePage.tsx`, `SiteHeader.tsx`, and `SiteFooter.tsx` are composed by
`src/app/App.tsx`. The combined home/About page defines the human reader, the
Opportunity Case, research method, evidence and conflict safeguards, local-inference
boundary, and decision-value North Star. The case library remains empty until a
real publication meets that standard. `src/site/art/research-world` owns the
fixed-camera Three.js pencil sculpture. Its paper-textured spheres, generic evidence
medallions, drafting strokes, interruptions, and modernist color planes illustrate
evidence, assumptions, constraints, and unknowns but never encode market values or
confidence. The shell
uses ordinary anchors so its URLs remain crawlable and portable across hosts.
`src/site/art` also isolates the retained fluid renderer. Both visual systems are
decorative, non-overlapping, pause outside their scope, and have static fallbacks.
Brand assets live under `public/brand`, and global visual tokens live in
`src/styles/public.css`.

Preserve the white, navy, red, and supporting-blue brand system; the public-data
promise; semantic navigation; and usable mobile layouts.
