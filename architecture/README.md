# Public system-map content

This directory owns the renderer-independent explanation of how an Opportunity
Case is researched and corrected. It does not contain implementation infrastructure
choices, database design, permissions, or accepted backend specifications.

`public-system-map.json` is the authoritative content rendered at
`/learn/system-map`. Each view is a small ordered story for humans, agents, search
engines, and assistive technology. React validates the document before rendering
it, but the meaning remains independent of React and the hosting provider.

Preserve these invariants when editing the document:

- Every case begins with a bounded decision, geography, customer, and time window.
- Signals remain typed evidence with provenance and selection limits, not ground truth.
- Material economics and scenario assumptions remain visible and editable.
- Disconfirming evidence, failure conditions, and local inference limits are core.
- Discussion produces specific, reviewable corrections with visible revision history.
- The outcome is a better decision and cheaper next test, including a disciplined no.

The retired Excalidraw prototype and its separate system-overview artifacts were
removed after ADR 0002 replaced the editor with semantic HTML.
