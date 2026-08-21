/**
 * Plain-language context for readers who want the answer first and the reasoning
 * behind it second. These objects belong in the domain contract because a clear
 * explanation must travel with the evidence instead of being improvised by each
 * page. They do not replace sources or calculations; they explain their meaning,
 * history, limits, and relevance in ordinary language.
 */
import { z } from 'zod';

import { identifierSchema, nonEmptyTextSchema } from './common';

export const readerSummarySchema = z.strictObject({
  question: nonEmptyTextSchema,
  shortAnswer: nonEmptyTextSchema,
  whyItMatters: nonEmptyTextSchema,
  whatIsKnown: z.array(nonEmptyTextSchema).min(1),
  whatIsNotKnown: z.array(nonEmptyTextSchema).min(1),
  nextStep: nonEmptyTextSchema,
  conceptIds: z.array(identifierSchema).min(1),
});

export const researchQuestionSchema = z.strictObject({
  id: identifierSchema,
  question: nonEmptyTextSchema,
  startingPoint: nonEmptyTextSchema,
  whyItMatters: nonEmptyTextSchema,
  howItWasNarrowed: nonEmptyTextSchema,
  whatItDoesNotAnswer: z.array(nonEmptyTextSchema).min(1),
  decisionItInforms: nonEmptyTextSchema,
  priority: z.enum(['background', 'material', 'decisive']),
  answerClaimIds: z.array(identifierSchema),
  relatedConceptIds: z.array(identifierSchema).min(1),
});

const conceptHistoryEntrySchema = z.strictObject({
  period: nonEmptyTextSchema,
  whatChanged: nonEmptyTextSchema,
  whyItChanged: nonEmptyTextSchema,
  sourceIds: z.array(identifierSchema).min(1),
});

/**
 * Explains one idea without pretending that present-day terminology appeared
 * fully formed or that expert agreement is permanent. Source and relationship
 * identifiers keep the explanation open to verification by deeper readers.
 */
export const conceptSchema = z.strictObject({
  id: identifierSchema,
  name: nonEmptyTextSchema,
  plainMeaning: nonEmptyTextSchema,
  whyItMattersHere: nonEmptyTextSchema,
  history: z.array(conceptHistoryEntrySchema).min(1),
  whatIsWellEstablished: z.array(nonEmptyTextSchema).min(1),
  whatIsStillDebated: z.array(nonEmptyTextSchema).min(1),
  commonMisunderstandings: z.array(nonEmptyTextSchema).min(1),
  limits: z.array(nonEmptyTextSchema).min(1),
  sourceIds: z.array(identifierSchema).min(1),
  relatedConceptIds: z.array(identifierSchema),
  relatedClaimIds: z.array(identifierSchema).min(1),
});
