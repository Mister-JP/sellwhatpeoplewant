/** Freshness, regulation, accountability, publication, and correction contracts. */
import { z } from 'zod';

import {
  identifierSchema,
  isoDateSchema,
  isoDateTimeSchema,
  nonEmptyTextSchema,
} from './common';

export const freshnessPolicySchema = z.strictObject({
  id: identifierSchema,
  targetId: identifierSchema,
  volatilityClass: z.enum(['stable', 'periodic', 'volatile', 'event_driven']),
  authoritativeRefreshSources: z.array(nonEmptyTextSchema).min(1),
  maximumAgeDays: z.number().int().positive(),
  eventTriggers: z.array(nonEmptyTextSchema),
  lastCheckedAt: isoDateTimeSchema,
  ownerActorId: identifierSchema,
  invalidationAction: nonEmptyTextSchema,
});

export const regulatoryRequirementSchema = z.strictObject({
  id: identifierSchema,
  authority: nonEmptyTextSchema,
  instrumentAndSection: nonEmptyTextSchema,
  jurisdiction: nonEmptyTextSchema,
  effectiveFrom: isoDateSchema,
  effectiveTo: isoDateSchema.optional(),
  regulatedObjectOrActivity: nonEmptyTextSchema,
  triggerFacts: z.array(nonEmptyTextSchema).min(1),
  obligation: nonEmptyTextSchema,
  exceptions: z.array(nonEmptyTextSchema),
  sourceId: identifierSchema,
  sourceVersion: nonEmptyTextSchema,
  freshnessPolicyId: identifierSchema,
});

export const applicabilityDecisionSchema = z.strictObject({
  id: identifierSchema,
  requirementIds: z.array(identifierSchema).min(1),
  exactFactsOrConfigurationId: identifierSchema,
  outcome: z.enum(['applies', 'does_not_apply', 'unclear', 'not_reviewed']),
  rationale: nonEmptyTextSchema,
  reviewerActorId: identifierSchema,
  reviewerLimits: z.array(nonEmptyTextSchema),
  decidedAt: isoDateTimeSchema,
  unresolvedQuestions: z.array(nonEmptyTextSchema),
  affectedActionIds: z.array(identifierSchema).min(1),
});

export const controlBoundarySchema = z.strictObject({
  id: identifierSchema,
  actorId: identifierSchema,
  controlledObjectsAndActivities: z.array(nonEmptyTextSchema),
  externalDependencies: z.array(nonEmptyTextSchema),
  duties: z.array(nonEmptyTextSchema).min(1),
  handoffs: z.array(nonEmptyTextSchema),
  failureAndEscalation: nonEmptyTextSchema,
  residualAccountability: nonEmptyTextSchema,
});

export const publicationGateSchema = z.strictObject({
  id: identifierSchema,
  gateKind: z.enum([
    'scope_provenance',
    'evidence_inference',
    'economics_decision',
    'adversarial_safety',
    'public_artifact_accessibility',
  ]),
  outcome: z.enum(['pass', 'fail', 'conditional', 'not_run']),
  validationResultIds: z.array(identifierSchema).min(1),
  reviewerActorIds: z.array(identifierSchema).min(1),
  decidedAt: isoDateTimeSchema,
  rationale: nonEmptyTextSchema,
  blockingObjectIds: z.array(identifierSchema),
});

export const changeSetSchema = z.strictObject({
  id: identifierSchema,
  previousVersion: nonEmptyTextSchema,
  newVersion: nonEmptyTextSchema,
  changeKind: z.enum(['minor', 'material', 'critical', 'withdrawal']),
  changedAt: isoDateTimeSchema,
  changedByActorIds: z.array(identifierSchema).min(1),
  reason: nonEmptyTextSchema,
  changedObjectIds: z.array(identifierSchema).min(1),
  invalidatedObjectIds: z.array(identifierSchema),
  replacementObjectIds: z.array(identifierSchema),
  reviewIds: z.array(identifierSchema),
  publicNotice: nonEmptyTextSchema,
});

export const agentRunSchema = z.strictObject({
  id: identifierSchema,
  actorId: identifierSchema,
  modelAndToolIdentity: nonEmptyTextSchema,
  procedureOrPrompt: nonEmptyTextSchema,
  sourceIdsAccessed: z.array(identifierSchema),
  transformations: z.array(nonEmptyTextSchema),
  startedAt: isoDateTimeSchema,
  endedAt: isoDateTimeSchema,
  reviewerActorId: identifierSchema.optional(),
  limitations: z.array(nonEmptyTextSchema),
});
