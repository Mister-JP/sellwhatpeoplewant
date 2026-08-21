/** Source, extraction, appraisal, search, and evidence-family contracts. */
import { z } from 'zod';

import {
  identifierSchema,
  intentStatusSchema,
  isoDateSchema,
  isoDateTimeSchema,
  nonEmptyTextSchema,
  scopeSchema,
} from './common';

export const sourceKindSchema = z.enum([
  'primary_authoritative',
  'primary_empirical',
  'primary_commercial',
  'secondary_synthesis',
  'secondary_analysis',
  'expert_testimony',
  'stakeholder_testimony',
  'lived_experience',
  'dataset',
  'model_output',
]);

export const sourceArtifactSchema = z.strictObject({
  id: identifierSchema,
  title: nonEmptyTextSchema,
  creators: z.array(nonEmptyTextSchema).min(1),
  publisher: nonEmptyTextSchema.optional(),
  sourceKind: sourceKindSchema,
  url: z.httpUrl(),
  publishedAt: isoDateSchema.optional(),
  accessedAt: isoDateTimeSchema,
  version: nonEmptyTextSchema.optional(),
  jurisdiction: nonEmptyTextSchema.optional(),
  preservedHash: nonEmptyTextSchema.optional(),
  accessLimitations: z.array(nonEmptyTextSchema),
  conflicts: z.array(nonEmptyTextSchema),
});

export const searchProtocolSchema = z.strictObject({
  id: identifierSchema,
  questionIds: z.array(identifierSchema).min(1),
  intentStatus: intentStatusSchema,
  sourcesSearched: z.array(nonEmptyTextSchema).min(1),
  queries: z.array(nonEmptyTextSchema).min(1),
  inclusionRules: z.array(nonEmptyTextSchema).min(1),
  exclusionRules: z.array(nonEmptyTextSchema),
  searchStartedAt: isoDateTimeSchema,
  searchEndedAt: isoDateTimeSchema,
  searcherActorIds: z.array(identifierSchema).min(1),
  stoppingRule: nonEmptyTextSchema,
  deviations: z.array(nonEmptyTextSchema),
});

export const extractedRecordSchema = z.strictObject({
  id: identifierSchema,
  sourceId: identifierSchema,
  locatorWithinSource: nonEmptyTextSchema,
  extraction: nonEmptyTextSchema,
  extractionMode: z.enum(['verbatim_excerpt', 'structured_value', 'paraphrase']),
  extractedByActorId: identifierSchema,
  extractedAt: isoDateTimeSchema,
  transformation: nonEmptyTextSchema.optional(),
  checkedByActorId: identifierSchema.optional(),
});

export const sourceAppraisalSchema = z.strictObject({
  id: identifierSchema,
  sourceId: identifierSchema,
  claimFitness: z.array(nonEmptyTextSchema).min(1),
  strengths: z.array(nonEmptyTextSchema).min(1),
  limitations: z.array(nonEmptyTextSchema).min(1),
  biasRisks: z.array(nonEmptyTextSchema),
  scope: scopeSchema,
  appraisedByActorIds: z.array(identifierSchema).min(1),
  appraisedAt: isoDateTimeSchema,
});

export const missingEvidenceAssessmentSchema = z.strictObject({
  id: identifierSchema,
  questionId: identifierSchema,
  missingEvidence: nonEmptyTextSchema,
  likelyDirection: z.enum(['supports', 'weakens', 'mixed', 'unknown']),
  materiality: z.enum(['low', 'medium', 'high', 'decisive']),
  reasonMissing: nonEmptyTextSchema,
  mitigation: nonEmptyTextSchema,
});

export const evidenceFamilySchema = z.strictObject({
  id: identifierSchema,
  label: nonEmptyTextSchema,
  sourceIds: z.array(identifierSchema).min(1),
  independenceAssessment: nonEmptyTextSchema,
  sharedDependencies: z.array(nonEmptyTextSchema),
  actorOrigin: z.enum([
    'buyer',
    'seller',
    'builder',
    'crawler',
    'regulator',
    'researcher',
    'operator',
    'mixed',
  ]),
});
