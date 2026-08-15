# Architecture decision records

Architecture decision records preserve the reasons behind consequential choices
that cannot be recovered reliably from code alone.

Create an ADR when a decision:

- Establishes or changes a system boundary.
- Selects a major dependency, protocol, persistence format, or hosting capability.
- Introduces a constraint future contributors might otherwise remove.
- Resolves a meaningful trade-off with credible alternatives.

Copy `0000-template.md`, assign the next four-digit number, and use a short title.
Records begin as **Proposed** and become **Accepted**, **Rejected**, or
**Superseded** after review. Never rewrite an accepted decision to hide history;
add a new record that supersedes it.
