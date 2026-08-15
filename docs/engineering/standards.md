# Engineering standards

## Purpose

SellWhatPeopleWant is intended to become long-lived public infrastructure. The
code should therefore optimize for accurate reasoning by future contributors,
including agents that arrive without the original conversation in context. These
standards turn that goal into concrete review rules.

The standard is not “maximum abstraction” or “maximum documentation.” It is the
smallest design whose intent, boundaries, and invariants remain obvious after the
original author is gone.

## Repository organization

Organize code by product responsibility rather than by generic technical bucket.
A feature should keep its domain contract, behavior, and focused tests close
together. Shared directories are reserved for concepts that are genuinely used
across multiple product areas.

Every major directory requires a short README covering:

- What responsibility belongs here.
- What explicitly does not belong here.
- Its public entry points.
- The direction of its dependencies.
- The invariants a contributor must preserve.

Avoid catch-all locations named `helpers`, `utils`, `common`, `misc`, or
`services`. If a function cannot be placed according to its purpose, its purpose
has not been named clearly enough.

## Module and function size

A production module should normally remain below 250 lines, excluding generated
content and unavoidable declarative data. Crossing that threshold requires the
author to reconsider whether the module contains more than one reason to change.
It is a review trigger rather than permission to create meaningless fragments.

A function should usually fit on one screen and perform one describable operation.
Long orchestration functions should expose named stages. Deeply nested conditions
should be replaced with clearer domain decisions, early outcomes, or a state
model—not mechanically moved into opaque helper functions.

Do not split code solely to satisfy a number. A slightly longer cohesive parser is
better than several files that force the reader to jump around without clarifying
the design.

## Naming

Names carry domain knowledge and must be searchable.

- Use complete words: `demandObservation`, not `obs`; `canonicalNeed`, not `cn`.
- Name booleans as claims: `hasMatchingSupply`, `isPermissionGranted`.
- Name functions by their result or effect: `resolveCanonicalNeed`,
  `recordDemandObservation`, `buildAgentManifest`.
- Include units in numeric names when ambiguity is possible:
  `subscriptionDurationDays`, `requestTimeoutMilliseconds`.
- Avoid generic nouns such as `item`, `thing`, `payload`, `processor`, `handler`,
  or `manager` when a domain-specific name exists.
- Do not use single-letter variables, including loop counters. Prefer
  `observationIndex`, `candidateNeed`, or iteration methods that name the value.

Names should distinguish raw observations, canonical interpretations, derived
views, and external representations. Treating these as interchangeable would
erase a core product boundary.

## Abstraction and dependencies

Start concrete. Extract an abstraction only when it expresses a stable domain
concept, isolates an external dependency, or removes repetition without hiding
meaning. Similar-looking code is not automatically the same responsibility.

Prefer pure domain functions and explicit data flow. Keep framework objects,
browser APIs, databases, network clients, and hosting-specific types at adapters
around the domain core. This allows the public website, agent interface, storage,
and deployment platform to evolve independently.

Dependencies point inward:

```text
UI and transport adapters → application operations → domain model
storage and external tools → defined ports ────────────────┘
```

Do not create interfaces for every function. Create a port when the domain needs
to remain independent from a real external capability or when multiple real
implementations exist.

## Comments and durable rationale

Good comments preserve information that the code cannot express economically.
They are especially important at normalization rules, canonicalization decisions,
privacy boundaries, provenance handling, agent instructions, persistence formats,
and deployment seams.

A non-trivial module comment should answer:

1. Why does this module exist?
2. What responsibility does it own?
3. What invariant must callers preserve?
4. Which tempting alternative is intentionally not implemented here?
5. What future change would invalidate the current design?

Long comments are appropriate when they explain a consequential algorithm,
protocol rule, compatibility constraint, or architectural trade-off. Use short
comments when the rationale is short. Length is not the goal; preserved reasoning
is the goal.

Bad comment:

```ts
// Loop over needs.
for (const need of needs) {
```

Useful comment:

```ts
// Observations remain separate even after their text resolves to the same need.
// Collapsing observations here would destroy provenance and make later changes to
// the canonical interpretation impossible to replay safely.
for (const demandObservation of demandObservations) {
```

Use decision records for choices that affect several modules or constrain future
work. Link to the ADR from a local comment only when a reader needs that context
to safely modify the code.

## TypeScript expectations

- Enable strict type checking from the first commit.
- Do not use `any`. Use `unknown` at untrusted boundaries and narrow it explicitly.
- Model meaningful states so invalid combinations are difficult to represent.
- Prefer discriminated unions for finite workflows and outcomes.
- Keep external wire formats separate from validated domain types.
- Avoid type assertions except at a documented, tested boundary.
- Export the smallest public surface and keep implementation details private.

## Error handling and validation

Validate data that crosses a trust boundary: browser input, network requests,
stored documents, environment configuration, imported diagram files, and external
tool output. Return actionable errors tied to the violated contract.

Do not add fallback branches for states prohibited by validated types and local
invariants. Excess defensive code makes the real failure model harder to see.
Use exhaustive checks for finite domain states so new variants fail loudly during
development.

## Testing strategy

Use the smallest test that can prove the behavior:

- **Unit tests** for pure transformations, validation, canonicalization rules,
  selectors, and state transitions.
- **Component tests** for meaningful user interactions and accessibility, not
  framework implementation details.
- **Integration tests** for persistence round-trips, import/export, routing,
  agent representations, and other system boundaries.
- **End-to-end smoke tests** for the few workflows whose failure would make the
  deployed product unusable.

Tests must use descriptive scenario names, realistic domain examples, and clear
arrange/act/assert structure when the separation helps comprehension. Avoid shared
mutable fixtures and broad mocks that allow impossible behavior.

Coverage is a signal, not the objective. Critical domain invariants require direct
tests even when incidental coverage already reaches those lines.

### Test documentation

Tests are durable explanations of product guarantees, not disposable verification
scripts. A reader should be able to understand what risk a test protects, why its
scenario is representative, and how its assertions prove the intended behavior
without reverse-engineering implementation details.

Every non-trivial test file begins with a module comment covering:

1. The behavior or boundary exercised by the suite.
2. Why failure would matter to the product or its users.
3. Which implementation details are intentionally excluded from the test.
4. Why notable fixtures, fakes, clocks, or environmental assumptions are valid.

Each test must have a descriptive scenario name that expresses its precondition,
operation, and expected outcome. Add comments inside a test when they preserve
reasoning that names and structure cannot express clearly. In particular, explain:

- Why a fixture value is significant rather than arbitrary.
- Which invariant a group of assertions establishes.
- Why a mock or fake accurately represents the external boundary.
- Which historical defect a regression test prevents, with an issue reference
  when one exists.
- Why an apparently unusual assertion or omitted assertion is intentional.

Use visible Arrange, Act, and Assert sections for tests with meaningful setup,
multiple collaborators, asynchronous behavior, or a non-obvious proof. Small tests
whose structure is already unmistakable do not need ceremonial section comments.

Bad test comment:

```ts
// Call the function and check the result.
const canonicalNeed = resolveCanonicalNeed(demandObservation);
expect(canonicalNeed.identifier).toBe(expectedIdentifier);
```

Useful test comment:

```ts
// These observations differ only in wording. Resolving them to one canonical
// need protects the non-repetition invariant, while the separate observation
// identifiers below prove that provenance has not been collapsed with meaning.
const resolution = resolveDemandObservations(demandObservations);

expect(resolution.canonicalNeeds).toHaveLength(1);
expect(resolution.observations).toHaveLength(2);
```

Test comments are maintained with the same discipline as production comments.
If behavior, fixtures, or proof strategy changes, update the explanation in the
same change. A test with stale rationale is considered incorrect even when it
continues to pass.

## Automated quality gates

The initial application scaffold must provide one command for each concern and a
combined verification command:

```text
format:check
lint
typecheck
test
build
verify
```

The default toolchain should include deterministic formatting, type-aware linting,
strict TypeScript, fast unit/component tests, and a production build. Browser tests
should be added as soon as a critical workflow exists.

Warnings are not a successful result. Continuous integration must run the same
commands contributors run locally and should fail on warnings, type errors, test
failures, or an invalid production build.

## Review standard

A change is ready only when a reviewer can answer yes to all of the following:

- Is the product behavior and boundary clear?
- Are names precise and searchable?
- Is the implementation smaller than the problem rather than larger than it?
- Do comments preserve rationale instead of narrating syntax?
- Are external inputs validated exactly once at an appropriate boundary?
- Do tests demonstrate the important behavior and failure modes?
- Could the hosting provider, renderer, or storage adapter change without
  rewriting unrelated domain logic?
- Are documentation and decision records consistent with the code?
