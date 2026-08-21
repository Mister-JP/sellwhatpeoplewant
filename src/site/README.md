# Public site shell

This area owns the common header, footer, and public landing page. It does not own
the research-and-learning map, hosting integration, or future case records.

`HomePage.tsx`, `SiteHeader.tsx`, and `SiteFooter.tsx` are composed by
`src/app/App.tsx`. The combined home/About page introduces business research from an
ordinary reader's point of view. It starts with a recognizable human question and
lets the reader move deeper into concept meaning and history, sources, calculations,
disagreement, uncertainty, and the next useful test. The clear explanation must work
without specialist training, while the deeper paths must never collapse into “trust
us.” The case library remains empty until a real publication meets that promise with
real readers. `src/site/art/research-world` owns the
fixed-camera Three.js pencil sculpture. Its paper-textured spheres, generic evidence
medallions, drafting strokes, interruptions, and modernist color planes illustrate
evidence, assumptions, constraints, and unknowns but never encode market values or
confidence. The shell
uses ordinary anchors so its URLs remain crawlable and portable across hosts.
`src/site/art` also isolates the retained fluid renderer. Both visual systems are
decorative, non-overlapping, pause outside their scope, and have static fallbacks.
Brand assets live under `public/brand`, and global visual tokens live in
`src/styles/public.css`.

Preserve the white, navy, red, and supporting-blue brand system; the human-first
reading path; honest boundaries around actions and purchases; semantic navigation;
and usable mobile layouts. The `/methodology` URL remains for compatibility, but its
public name is “How we know.”
