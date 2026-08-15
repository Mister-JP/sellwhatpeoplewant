# Public site shell

This area owns the common header, footer, and public landing page. It does not own
the system-map content model, hosting integration, or future demand records.

`HomePage.tsx`, `SiteHeader.tsx`, and `SiteFooter.tsx` are composed by
`src/app/App.tsx`. The shell uses ordinary anchors so its URLs remain crawlable and
portable across hosts. Brand assets live under `public/brand`, while global visual
tokens live in `src/styles/public.css`.

Preserve the white, navy, red, and supporting-blue brand system; the public-data
promise; semantic navigation; and usable mobile layouts.
