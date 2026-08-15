# SellWhatPeopleWant Engineering Contract

This file is the mandatory starting point for every human or automated contributor.
Read it completely before inspecting, creating, or changing implementation files.

## Product invariant

SellWhatPeopleWant is an agent-native, human-readable shared information layer.
Its central rule is: preserve meaningful new information and do not repeat what
is already represented. Implementation choices must keep the system predictable,
inspectable, portable, and understandable to agents and humans.

## Required reading

Before changing code, read:

1. `docs/engineering/standards.md`
2. Every applicable decision record under `docs/decisions/`
3. The nearest README for the area being changed

If these documents disagree, this file wins, followed by the most recent accepted
decision record, followed by the engineering standards.

## Non-negotiable implementation rules

- Use descriptive names. Single-letter or cryptic names such as `i`, `n`, `a`,
  `b`, `tmp`, `data`, `obj`, `util`, and `manager` are forbidden unless the word
  is genuinely the domain term. Name collections by their contents and functions
  by the outcome they produce.
- Keep modules cohesive and small. A production file above 250 lines is a design
  review trigger. Split by responsibility, not by arbitrary line count.
- Keep dependency direction visible. User interface code may depend on domain
  contracts; domain contracts must not depend on rendering or hosting details.
- Prefer the smallest clear implementation. Do not introduce a framework,
  abstraction, wrapper, configuration layer, or defensive branch without a real
  requirement that can be named.
- Validate untrusted input at system boundaries. Inside a validated boundary,
  rely on explicit types and invariants rather than checks for impossible states.
- Preserve errors with enough context to act on them. Never silently catch,
  discard, or replace a useful failure.
- Do not leave dead code, commented-out code, placeholder implementations, or
  TODO comments without an issue or decision reference.

## Commenting contract

Comments are part of the design and are reviewed as strictly as code.

- Every non-trivial module begins with a module comment explaining its purpose,
  boundary, key invariant, and important non-obvious trade-off.
- Public domain types and non-obvious public functions require documentation that
  explains meaning, guarantees, failure behavior, and why the abstraction exists.
- Complex algorithms and integration boundaries require substantial rationale
  comments. Explain why the approach is correct, what alternatives were rejected,
  and which assumption would require revisiting it.
- Comments must not narrate syntax, repeat names, speculate, or preserve history
  that belongs in version control or a decision record.
- When code changes, update or remove every affected comment in the same change.
  A stale comment is a correctness defect.

## Testing and quality gates

- Every behavior change includes an appropriate test. Every bug fix begins with
  or adds a regression test that fails without the fix.
- Every non-trivial test file begins with a comment explaining the behavior under
  test, why that behavior matters, the boundary exercised, and important choices
  made by the test setup.
- Test comments must explain the protected invariant, reason for the scenario,
  significance of fixtures, and how the assertions demonstrate the requirement.
  Do not merely narrate calls or restate assertions.
- Use explicit Arrange, Act, and Assert sections when a test has enough setup or
  indirection that its proof is not immediately obvious. Explain why mocks or
  fakes are valid substitutes at that boundary.
- Prefer tests of public behavior and domain invariants over implementation
  details. Snapshot-only coverage is not sufficient for important behavior.
- Keep unit tests beside their implementation. Keep cross-boundary and browser
  tests in clearly named integration or end-to-end directories.
- Before considering work complete, run every available repository check:
  formatting, linting, type checking, tests, build, and relevant browser checks.
- Never weaken a quality rule or delete a failing test merely to make checks pass.

## Change discipline

- Keep each change focused. Do not mix unrelated cleanup with requested work.
- Preserve user changes and inspect the working tree before editing.
- Record consequential, durable technical choices as an ADR using
  `docs/decisions/0000-template.md` before implementation depends on them.
- Update nearby documentation whenever behavior, commands, interfaces, or
  architectural boundaries change.
- In the final handoff, state what changed, what was verified, and any remaining
  risk or decision. Do not claim verification that was not performed.
