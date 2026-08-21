# ADR 0011: Make reader understanding part of every Opportunity Case

- Status: Accepted
- Date: 2026-08-21
- Owners: Project maintainers
- Supersedes: The active framing of the Opportunity Case Grammar 0.x
- Superseded by: None

## Context

ADR 0004 made the Opportunity Case the human-facing product. The first attempt to
make its research repeatable was presented as the "Opportunity Case Grammar." That
name and the surrounding specialist vocabulary made a plain human activity sound
like a private system readers first had to learn. It protected useful disciplines,
but its presentation worked against the larger purpose of the platform.

Most people do not approach a possible business as economists or professional
analysts. They begin with ordinary questions: Who needs this? What do they do now?
Why is it expensive? Where would the money go? What could make it fail? Good research
should meet a reader there and then open paths into sources, concepts, history,
calculations, disagreements, and unresolved questions. It should reveal how an
apparently finished conclusion was built by people from incomplete knowledge.

The platform therefore has two inseparable responsibilities. It must help someone
make a real decision, and it must help that person understand the reasoning well
enough to question, verify, transfer, and improve it.

## Decision

Every Opportunity Case will be both a decision aid and a public learning path.

The first layer uses direct language, concrete examples, and the reader's existing
understanding of people, money, work, time, and trade-offs. It explains what is
happening and why it matters before introducing a technical term, model, or formula.

From that clear account, the reader can go deeper wherever curiosity or consequence
requires it. A case must provide paths to:

- the source behind a material statement and the reason that source deserves weight;
- the question the researchers asked, why they asked it, and plausible questions they
  could have asked instead;
- the everyday meaning, practical use, history, limits, and live disagreements around
  a necessary business concept;
- the human relationship represented by a formula, why that calculation was chosen,
  which assumptions control it, and how the conclusion changes with other inputs;
- competing explanations, counterexamples, local limits, and observations that would
  change the conclusion; and
- the boundary between what is observed, what is inferred, what is assumed, and what
  remains unknown.

Mathematical and technical detail remains available when it improves accuracy. It
cannot substitute for explaining the thought behind it. Familiar technical terms may
be used when they help readers join a wider conversation, but they are defined in
place and connected to a deeper explanation. The product will not invent branded
method jargon where ordinary language is more precise.

Researchers may begin from widely accepted findings, but those findings are treated
as provisional shared ground rather than permanent truth. The case explains how that
ground became accepted, how well it travels to the present setting, and where it is
still disputed.

Observed behaviour, including what people spend money or effort on, can reveal
constraints and trade-offs that statements alone miss. It does not reveal a person's
single "true preference" without interpretation. Words, purchases, non-purchases,
substitutions, prices, institutions, and lived conditions are considered together.

The archived Opportunity Case Grammar documents remain available as history. Their
useful practices—traceable sources, explicit assumptions, calculations, challenges,
uncertainty, and revision—remain required under direct names. "Grammar 0.x" is no
longer an active product, publication standard, navigation label, or reader-facing
concept.

## Alternatives considered

### Keep the Grammar internally and translate it only in the interface

This would preserve two conceptual systems: the one researchers use and the one
readers see. The translation layer would make it too easy for the actual research to
remain specialist-first while the interface merely simplifies its conclusions.

### Remove technical depth in the name of accessibility

That would make the work easier to read but harder to verify. The goal is layered
understanding: a clear account first, with sources, reasoning, calculations, and
technical detail available underneath.

### Publish conclusions with citations and let readers learn elsewhere

A citation can verify a statement without explaining why the question mattered, how
the source was interpreted, what a concept means, or where the argument remains open.
It would preserve information access without building understanding.

## Consequences

- Landing, methodology, case, and empty-state pages must model the same direct,
  non-intimidating voice they promise.
- Case records need reader explanations for important concepts and calculations,
  paths from material claims to their sources, and a visible account of how the main
  question was formed.
- Progressive disclosure is required: depth stays available without forcing every
  reader through every detail before the central idea becomes clear.
- Source quality is explained in context instead of hidden in an unexplained score.
- Negative conclusions, disagreements, and open questions remain visible because
  intellectual honesty is part of the lesson.
- Archived research may preserve historical terminology, but active documentation
  must clearly point contributors to the current plain-language research practice.
- Agents may help tailor explanations and retrieve depth, but may not replace the
  evidence trail with an answer that asks for trust.

## Validation

The decision is working when a reader without formal business or economics training
can explain the central case in their own words, find the support for a material
claim, describe what an important calculation means, identify a serious uncertainty,
and ask a useful next question. It should also remain possible for an experienced
reader to inspect the exact sources, assumptions, calculations, and disagreements.

Reconsider the implementation if plain explanations become condescending, if depth
is hidden or removed, if concept links become a glossary detached from the case, or
if the teaching layer makes a weak business conclusion appear more certain than the
evidence allows.
