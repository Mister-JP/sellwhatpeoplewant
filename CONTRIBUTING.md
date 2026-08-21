# Contributing to SellWhatPeopleWant

Thank you for helping build transparent Opportunity Cases for people deciding what
to build.

## Before making a change

1. Read `AGENTS.md` and `docs/engineering/standards.md` completely.
2. Read the applicable architecture decision records, especially ADR 0011 for any
   reader-facing or Opportunity Case work, and the nearby documentation.
3. Inspect the working tree and keep unrelated changes outside your work.
4. Describe the observable behavior or decision the change will introduce.

## During implementation

- Keep the change focused and preserve existing public contracts unless the task
  explicitly changes them.
- Prefer a familiar word or a direct question to a branded method term. Explain the
  human meaning before introducing necessary technical language, and keep the path
  to the exact source or calculation available.
- Add or update rationale comments while the relevant reasoning is fresh.
- Add tests with the behavior rather than postponing them to later cleanup.
- Record durable architectural choices before implementation makes them implicit.

## Before requesting review

Run the repository's `verify` command. It checks formatting, lint rules, strict
TypeScript, tests, and the production deployment build.

Review your own diff for accidental files, secrets, generated artifacts, vague
names, stale comments, unrelated formatting, and undocumented behavior changes.

Use the pull request template as the final completeness check.
