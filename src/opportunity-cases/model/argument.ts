/** Claim, inference, transport, challenge, and typed-relation contracts. */
import { z } from 'zod';

import {
  identifierSchema,
  isoDateTimeSchema,
  nonEmptyTextSchema,
  scopeSchema,
} from './common';

export const claimKindSchema = z.enum([
  'observed_fact',
  'sourced_estimate',
  'calculation',
  'interpretation',
  'causal',
  'hypothesis',
  'normative',
  'recommendation',
]);

export const confidenceSchema = z.strictObject({
  mode: z.enum(['qualitative', 'probability', 'interval', 'not_assigned']),
  label: nonEmptyTextSchema.optional(),
  value: z.number().min(0).max(1).optional(),
  lower: z.number().optional(),
  upper: z.number().optional(),
  basis: nonEmptyTextSchema,
});

export const claimSchema = z.strictObject({
  id: identifierSchema,
  claimKind: claimKindSchema,
  statement: nonEmptyTextSchema,
  scope: scopeSchema,
  sourceIds: z.array(identifierSchema),
  extractedRecordIds: z.array(identifierSchema),
  evidenceFamilyIds: z.array(identifierSchema),
  confidence: confidenceSchema,
  assumptions: z.array(nonEmptyTextSchema),
  exceptions: z.array(nonEmptyTextSchema),
  conflictsWithClaimIds: z.array(identifierSchema),
  freshnessPolicyId: identifierSchema.optional(),
  demandSignal: z
    .strictObject({
      actorOrigin: z.enum(['buyer', 'seller', 'builder', 'crawler', 'mixed']),
      signalKind: z.enum([
        'explicit_statement',
        'observed_behavior',
        'transaction',
        'attention',
        'supply_activity',
      ]),
      contributesToBuyerDemand: z.boolean(),
      limitations: z.array(nonEmptyTextSchema),
    })
    .optional(),
});

export const inferenceSchema = z.strictObject({
  id: identifierSchema,
  inferenceKind: z.enum([
    'deductive',
    'inductive',
    'abductive',
    'causal',
    'transport',
    'calculation',
    'normative',
    'decision',
  ]),
  premiseClaimIds: z.array(identifierSchema).min(1),
  conclusionClaimId: identifierSchema,
  reasoning: nonEmptyTextSchema,
  reasoningSourceIds: z.array(identifierSchema),
  relatedConceptIds: z.array(identifierSchema).min(1),
  assumptions: z.array(nonEmptyTextSchema),
  exceptions: z.array(nonEmptyTextSchema),
  alternativeExplanations: z.array(nonEmptyTextSchema),
  criticalQuestions: z.array(nonEmptyTextSchema),
});

export const transportArgumentSchema = z.strictObject({
  id: identifierSchema,
  sourceClaimIds: z.array(identifierSchema).min(1),
  sourceContext: nonEmptyTextSchema,
  targetContext: nonEmptyTextSchema,
  relevantSimilarities: z.array(nonEmptyTextSchema),
  relevantDifferences: z.array(nonEmptyTextSchema),
  transportAssumptions: z.array(nonEmptyTextSchema).min(1),
  targetClaimId: identifierSchema,
  residualLimits: z.array(nonEmptyTextSchema),
});

export const challengeSchema = z.strictObject({
  id: identifierSchema,
  targetIds: z.array(identifierSchema).min(1),
  challengeKind: z.enum([
    'source',
    'scope',
    'inference',
    'causal',
    'transport',
    'economic',
    'regulatory',
    'safety',
    'ethical',
    'accessibility',
    'freshness',
    'alternative',
  ]),
  statement: nonEmptyTextSchema,
  severity: z.enum(['minor', 'material', 'critical']),
  raisedByActorId: identifierSchema,
  raisedAt: isoDateTimeSchema,
  independence: z.enum(['independent', 'role_separated', 'same_author', 'unknown']),
  status: z.enum(['open', 'answered', 'accepted', 'partially_accepted', 'rejected']),
  response: nonEmptyTextSchema.optional(),
  responseEvidenceIds: z.array(identifierSchema),
  affectedObjectIds: z.array(identifierSchema),
});

export const typedRelationSchema = z.strictObject({
  id: identifierSchema,
  relationType: z.enum([
    'supports',
    'challenges',
    'qualifies',
    'conflicts_with',
    'depends_on',
    'invalidates',
    'supersedes',
    'governs',
    'informs',
    'evaluates',
  ]),
  fromId: identifierSchema,
  toId: identifierSchema,
  rationale: nonEmptyTextSchema,
});
