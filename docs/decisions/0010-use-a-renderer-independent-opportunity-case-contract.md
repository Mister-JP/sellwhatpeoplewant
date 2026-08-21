# ADR 0010: Use a renderer-independent Opportunity Case contract

- Status: Accepted
- Date: 2026-08-20
- Last updated: 2026-08-21
- Owners: Project maintainers
- Supersedes: None
- Superseded by: None

## Context

ADR 0004 makes the Opportunity Case the primary product, but it deliberately stops
short of defining how a case is represented. Future pages, research agents,
validators, exports, and corrections need to interpret the same sources, claims,
reasoning, economic models, alternatives, challenges, freshness rules, publication
checks, and domain extensions.

The first contract treated reader explanation mostly as a renderer concern and gave
the structure a branded technical label. That framing creates exactly the wrong
boundary: it gives the project its own vocabulary while allowing an evidence-complete
case to remain difficult for an ordinary person to understand. The explanation of a
question, concept, or formula must travel with the evidence it explains.

If a React component, prose page, or TypeScript interface becomes the implicit source
of truth, each consumer can silently invent a different methodology. A contract that
cannot validate cross-references and methodological invariants would also make an
invalid case look structurally complete.

## Decision

Define the public Opportunity Case model as a renderer-independent, versioned domain
contract. Author it as modular strict Zod schemas and inferred TypeScript types under
`src/opportunity-cases/model`. Validate untrusted data once at the boundary, then pass
the validated document to renderers and analysis code.

Make reader understanding a contract requirement rather than a presentation option.
Each case must include a short human summary, the starting point and narrowing of its
questions, and at least one plain-language concept explanation with history, present
agreement, open debate, limits, sources, and relationships. Economic models and
formulas must explain their ordinary meaning, purpose, assumptions, and limits in
addition to exposing reproducible expressions and inputs.

Export the root schema as standard JSON Schema 2020-12 under `architecture/` so agents
and non-TypeScript systems can inspect the same field-level contract. Cross-object and
methodological invariants that JSON Schema cannot express remain executable Zod
refinements and are documented beside the export. A representative JSON case and
negative tests exercise both structural and semantic validation.

The contract is versioned; it never labels a case globally `valid`. Validation results
apply to particular checks and artifacts. Shared case objects live in the core, while
domain-specific data enters through named, versioned modules. React imports the model;
the model does not import React.

Use ordinary property names when they preserve the same precision. For example,
sources expose a verified `url`, reasoning steps explain their `reasoning`, and
questions state the `decisionItInforms`. Standard technical detail may remain in the
deeper audit layer, but the product does not name or market its own research jargon.

## Alternatives considered

### Make JSON Schema the only authored source

This would improve language neutrality, but executable cross-reference checks and
strong application types would require a second generated toolchain. The current
codebase already validates public content with Zod and Zod can export JSON Schema.

### Use TypeScript interfaces only

Interfaces disappear at runtime and cannot reject malformed authored JSON or serve
external agents. They would document intent without enforcing it.

### Define case shapes inside page components

This would optimize the contract for one presentation and couple methodological
changes to UI code. It would also prevent other renderers from being equal consumers.

### Use one unstructured extensions object

This would be easy to evolve but would hide the universal proof obligations that make
cases comparable and inspectable. Extensions remain available only at explicit module
boundaries.

## Consequences

- Model modules and tests are public application code; research derivation remains in
  the private sibling repository.
- A case cannot pass structural validation without its reader summary and concept
  explanations, even when its source graph is otherwise complete.
- A schema export must be regenerated and reviewed whenever a structural contract
  changes.
- Some invariants require executable validation and therefore need a machine-readable
  validator catalogue in addition to JSON Schema.
- Page components can share case primitives without becoming the source of truth.
- Contract version changes require migration or explicit coexistence, not silent
  reinterpretation of historical cases.

## Validation

Accept this decision when one representative case validates, deliberately malformed
cases fail for the intended reasons, unexplained formulas fail validation, the JSON
Schema export is reproducible, and no model module depends on React. Reconsider it if
schema export loses material semantics, ordinary readers still require a separate
technical translation to understand the first layer, external consumers cannot use
the representation, or version migration becomes unworkable.
