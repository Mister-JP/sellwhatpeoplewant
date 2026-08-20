# ADR 0004: Make Opportunity Cases the primary product

- Status: Accepted
- Date: 2026-08-19
- Owners: Project maintainers
- Supersedes: Product framing in the initial public site
- Superseded by: None

## Context

The initial public site framed SellWhatPeopleWant as an agent-first common demand
graph. A research correction established that volunteered opinions, reviews,
queries, and transactions can be useful signals but cannot be treated as objective
market demand. Real decisions require evidence that crosses prices, behaviour,
alternatives, regulation, operations, financing, logistics, local context, and
failure conditions.

The new North Star makes the human decision—not the graph—the product boundary.
The public experience must remain engaging and accessible while allowing serious
readers and agents to inspect the reasoning beneath it.

## Decision

SellWhatPeopleWant is a human-facing opportunity-research lab. Its primary product
is the Opportunity Case: a bounded, evidence-backed, visually understandable, and
continuously correctable argument about whether a business may work in a named
place, for named customers, under named conditions.

Every case must expose the opportunity and the strongest argument against it. It
must distinguish observed fact, sourced estimate, calculation, interpretation,
hypothesis, and recommendation; preserve provenance and uncertainty; make material
assumptions editable; show failure and ruin conditions; state local inference
limits; and identify the cheapest lawful next test.

Humans are the primary audience and final decision-makers. Agents may search,
extract, calculate, translate, monitor, compare, and consume structured cases, but
the product is not an agent-only protocol. The first stage is a small portfolio of
exceptional cases, not a demand database, social feed, marketplace, or simulator.

## Alternatives considered

### Continue with the common demand graph

A demand graph could accumulate useful signals, but it would invite the product to
overstate selected observations as market truth and would leave the execution,
economics, regulatory, and failure analysis a real decision requires outside the
core artifact.

### Publish a conventional business-idea directory

A directory would be easier to populate, but listings and rankings reward volume
and promotion. They do not provide reproducible calculations, disconfirming
evidence, local limits, or a disciplined next experiment.

### Build the real-world business simulator first

Simulation may become valuable after case models and execution data are credible.
Building it first would encode weak assumptions and distract from proving the
research standard.

## Consequences

- The homepage, case-library status, system map, metadata, and agent-readable copy
  must describe Opportunity Cases rather than a live or planned demand graph.
- The existing art-led chapters may remain because they are decorative and the
  product meaning stays in semantic HTML.
- Case data and interfaces will need explicit claim types, provenance, assumptions,
  scenarios, local scope, conflicts, and revision history before implementation.
- Attention metrics cannot stand in for decision usefulness, correction quality,
  uncertainty reduced, or realized outcomes compared with prior assumptions.

## Validation

The decision remains valid if the first portfolio lets serious readers reproduce
material calculations, trace claims, identify decisive uncertainty, make a cheaper
test, and submit a correction without destroying the audit trail. Reconsider it if
Opportunity Cases do not improve real decisions or cannot be maintained as source
conditions change.
