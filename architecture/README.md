# Public research-and-learning content

This directory owns the renderer-independent explanation of how an ordinary
business question becomes an Opportunity Case a reader can understand, inspect,
and correct. It does not contain implementation infrastructure choices, database
design, permissions, or accepted backend specifications.

`public-system-map.json` is the authoritative content rendered at
`/learn/system-map`. Each view is a small ordered story for people first, while
remaining legible to agents, search engines, and assistive technology. React
validates the document before rendering it, but the meaning remains independent of
React and the hosting provider.

`opportunity-case.schema.json` is the generated JSON Schema 2020-12 export of the
current Opportunity Case structural contract. Regenerate it with
`pnpm schema:opportunity-case`; executable cross-object invariants remain in the
companion Zod parser under `src/opportunity-cases/model`.

Preserve these invariants when editing the document:

- Begin with the observation and question in language an ordinary reader can follow.
- Explain an important concept before naming it, then offer its history, use, limits,
  disagreements, and source path for readers who want to go deeper.
- Keep evidence traceable and say why a source helps and what it cannot establish.
- Explain what a calculation is trying to represent before showing the exact formula;
  keep its assumptions and alternatives visible and editable.
- Preserve competing explanations, failure conditions, local limits, open questions,
  and visible revision history.
- End with a conditional answer and a cheaper next test, including a disciplined no.

The retired Excalidraw prototype and its separate system-overview artifacts were
removed after ADR 0002 replaced the editor with semantic HTML.
