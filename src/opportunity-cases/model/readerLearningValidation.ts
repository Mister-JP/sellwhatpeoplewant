/**
 * Keeps every reader-facing explanation connected to the case objects that support
 * it. The summary and concept prose remain human-readable, while these checks prevent
 * a renderer from presenting a source, claim, or related idea that does not exist.
 */
import type { z } from 'zod';

import type { OpportunityCaseStructure } from './opportunityCaseDocument';

function requireKnown(
  identifiers: readonly string[],
  known: ReadonlySet<string>,
  context: z.RefinementCtx,
  path: PropertyKey[],
  label: string,
): void {
  if (identifiers.some((identifier) => !known.has(identifier))) {
    context.addIssue({
      code: 'custom',
      path,
      message: `${label} references an unknown object.`,
    });
  }
}

export function validateReaderLearning(
  document: OpportunityCaseStructure,
  known: ReadonlySet<string>,
  context: z.RefinementCtx,
): void {
  requireKnown(
    document.readerSummary.conceptIds,
    known,
    context,
    ['readerSummary', 'conceptIds'],
    'Reader summary',
  );
  document.concepts.forEach((concept, conceptIndex) => {
    const historySourceIds = concept.history.flatMap(
      (historyEntry) => historyEntry.sourceIds,
    );
    requireKnown(
      [
        ...concept.sourceIds,
        ...historySourceIds,
        ...concept.relatedConceptIds,
        ...concept.relatedClaimIds,
      ],
      known,
      context,
      ['concepts', conceptIndex],
      'Concept explanation',
    );
  });
}
