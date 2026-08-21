# Opportunity Case model

This module is the renderer-independent public contract for Opportunity Case 0.3.
It keeps the evidence, reasoning, decision, correction, and reader-explanation
objects together without importing React.

## Boundary

Use `parseOpportunityCase` once when authored JSON or external data enters the
application. Renderers consume the returned `OpportunityCaseDocument`; they do not
re-interpret or weaken the schema. The Zod parser also enforces cross-reference and
research-integrity rules that JSON Schema alone cannot express.

`opportunityCaseStructureSchema` is exported only to generate the structural JSON
Schema. It is not a substitute for `opportunityCaseDocumentSchema`, which adds the
executable validators.

## Reader understanding

Every case begins with `readerSummary`: the question, a short answer, what is known,
what is not known, and the next useful action. Research questions preserve their
starting point, why they matter, how they were narrowed, and what they cannot answer.

Every case also explains at least one important concept in ordinary language. A
concept records why it matters in this case, how it developed, what is well
established, what remains debated, common misunderstandings, limits, sources, and
relationships to claims or other concepts. This material is part of the case rather
than optional page copy, so readers can move from a quick answer to verification and
deeper study in any renderer.

Economic inputs, models, and formulas must explain their human meaning and limits.
An expression is reproducible only when its inputs are traceable; it is understandable
only when the case also says why the relationship is being used and what it cannot
establish.

## Versioning

The root document carries both `schemaVersion` and case `version`. A contract change
requires an explicit schema version and migration decision. A case correction creates
a new case version plus `changeSets`; it does not silently overwrite historical claims.

The current domain modules cover physical-product configuration, field-service safety
and custody, and digital-accessibility evaluation. `jurisdictionSpecific` is an
explicit module boundary, not permission to bypass the source, reasoning, explanation,
and correction requirements shared by every case.
