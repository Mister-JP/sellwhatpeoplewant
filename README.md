# SellWhatPeopleWant

Business research that an ordinary reader can understand, question, and verify.

This is the public repository for SellWhatPeopleWant. We investigate possible
businesses and publish the reasoning as Opportunity Cases: clear accounts of who
might need something, what people do now, how the business could work, what the
numbers mean, what could defeat the idea, and what evidence should come next.

The product is meant for people, not only economists, business-school graduates, or
professional researchers. A reader gets the understandable story first and can then
follow any important claim into its source, any unfamiliar idea into its meaning and
history, and any calculation into its assumptions. The goal is not only to deliver a
conclusion. It is to leave the reader better able to ask and investigate the next
question.

## First-stage public product

The first implementation is a combined home and About page plus a plain-language
account of how the research works. It defines the human reader, Opportunity Case,
learning promise, evidence boundaries, conflicts, local limits, and decision-value
North Star. Editorial visual systems support the story without carrying claims that
are absent from the text.

The case library at `/explore` remains an explicit in-research notice. It shows no
representative or invented opportunity analysis before the first publication can
meet the stated standard.

The explanatory system map remains available at `/learn/system-map`. Both public
surfaces are semantic, responsive HTML with no canvas or authoring controls.

Requirements:

- Node.js 22.12 or newer
- pnpm 10 or newer

Start the site:

```sh
pnpm install
pnpm dev
```

Open `http://localhost:5173` for the home/About page,
`http://localhost:5173/methodology` for a worked explanation of how we know,
`http://localhost:5173/explore` for the case-library status, and
`http://localhost:5173/learn/system-map` for the research-and-learning map. The map
lives in `architecture/public-system-map.json`, keeping its meaning independent of
React and any drawing library.

## Current boundaries

- `architecture/public-system-map.json` owns the public product explanation.
- `src/learn/system-map` validates and renders that explanation as semantic HTML.
- `src/learn/methodology` shows the research approach through ordinary questions and
  a concrete worked example.
- `src/explore` owns the deliberately empty case-library boundary.
- `src/site` owns the landing page and shared public navigation.
- `public/brand` owns the supplied logo, favicon, and touch icon.
- `src/site/art/research-world` owns the illustrative, scroll-driven Three.js world.
- `src/site/art` owns the independently disposable visual renderers.
- `worker` and `scripts/prepare-sites-build.mjs` adapt the static Vite build to
  OpenAI Sites without introducing hosting concepts into product components.

The previous Excalidraw experiment was removed after ADR 0002 superseded it. The
public system map contains no canvas runtime, editing controls, repository
persistence endpoint, or diagram-scene artifact. The homepage canvas is decorative
art and does not alter that semantic system-map boundary.

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for artwork attribution and
[docs/homepage-content-inventory.md](docs/homepage-content-inventory.md) for the
research-grounded content inventory and outline.

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
