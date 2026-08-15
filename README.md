# SellWhatPeopleWant

The common demand graph for agents serving humans.

This is the public repository for the SellWhatPeopleWant product. Technology,
data architecture, and deployment decisions remain deliberately open while the
smallest public product loop is made clear.

## Public product story

The first implementation is a public website shell and a focused system map under
`/learn/system-map`. The map is semantic, responsive HTML: visitors can read and
switch views, but there are no canvas tools, repository controls, or download
actions on the public surface.

Requirements:

- Node.js 22.12 or newer
- pnpm 10 or newer

Start the site:

```sh
pnpm install
pnpm dev
```

Open `http://localhost:5173` for the home page and
`http://localhost:5173/learn/system-map` for the product explanation. The public
story lives in `architecture/public-system-map.json`, keeping its meaning
independent of React and any drawing library.

## Current boundaries

- `architecture/public-system-map.json` owns the public product explanation.
- `src/learn/system-map` validates and renders that explanation as semantic HTML.
- `src/site` owns the landing page and shared public navigation.
- `public/brand` owns the supplied logo, favicon, and touch icon.
- `worker` and `scripts/prepare-sites-build.mjs` adapt the static Vite build to
  OpenAI Sites without introducing hosting concepts into product components.

The previous Excalidraw experiment was removed after ADR 0002 superseded it. The
public site contains no canvas runtime, editing controls, repository persistence
endpoint, or diagram-scene artifact.

Run the complete local quality gate before proposing a change:

```sh
pnpm verify
```

That command checks formatting, lint rules, TypeScript, tests, and the production
build. See [architecture/README.md](architecture/README.md) for artifact ownership
and status.

## Engineering governance

Every contributor must begin with [AGENTS.md](AGENTS.md). Detailed engineering
standards live in [docs/engineering/standards.md](docs/engineering/standards.md),
and durable technical decisions are recorded under [docs/decisions](docs/decisions).

## Hosting

The current production target is OpenAI Sites. `.openai/hosting.json` stores only
the Sites project identifier and logical storage bindings; it contains no secrets.
`pnpm build` produces the worker-and-client artifact consumed by Sites. Hosting is
an adapter boundary rather than a commitment for future data or application
architecture.
