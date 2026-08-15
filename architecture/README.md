# Public system-map content

This directory owns the renderer-independent explanation of how the product is
intended to work. It does not contain implementation architecture, infrastructure
choices, database design, permissions, or accepted backend specifications.

`public-system-map.json` is the authoritative content rendered at
`/learn/system-map`. Each view is a small ordered story for humans, agents, search
engines, and assistive technology. React validates the document before rendering
it, but the meaning remains independent of React and the hosting provider.

Preserve these invariants when editing the document:

- Ordinary web discovery comes before any contribution.
- A useful visit adds only demand meaning that is not already represented.
- Equivalent demand accumulates instead of producing repetitive posts.
- Seller participation is a platform-led interview, a public explanation, and an
  external buying link.
- The resulting public demand helps people find what serves them and helps other
  people find worthwhile work.

The retired Excalidraw prototype and its separate system-overview artifacts were
removed after ADR 0002 replaced the editor with semantic HTML.
