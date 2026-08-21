/** Alternatives, economics, tests, decisions, and evaluation contracts. */
import { z } from 'zod';

import {
  identifierSchema,
  intentStatusSchema,
  isoDateSchema,
  nonEmptyTextSchema,
} from './common';

export const alternativeSchema = z.strictObject({
  id: identifierSchema,
  name: nonEmptyTextSchema,
  mechanism: nonEmptyTextSchema,
  actorIds: z.array(identifierSchema).min(1),
  objectiveIds: z.array(identifierSchema).min(1),
  constraints: z.array(nonEmptyTextSchema),
  controlBoundaryIds: z.array(identifierSchema),
  hazardTransferIds: z.array(identifierSchema),
  chainOfCustodyIds: z.array(identifierSchema),
  claimIds: z.array(identifierSchema),
  statusQuo: z.boolean(),
});

export const modelInputSchema = z.strictObject({
  id: identifierSchema,
  name: nonEmptyTextSchema,
  plainMeaning: nonEmptyTextSchema,
  unit: nonEmptyTextSchema,
  value: z.number().optional(),
  lower: z.number().optional(),
  upper: z.number().optional(),
  sourceClaimIds: z.array(identifierSchema),
  assumption: nonEmptyTextSchema.optional(),
  freshnessPolicyId: identifierSchema.optional(),
});

const modelFormulaSchema = z.strictObject({
  id: identifierSchema,
  expression: nonEmptyTextSchema,
  outputUnit: nonEmptyTextSchema,
  plainMeaning: nonEmptyTextSchema,
  whyItIsUsed: nonEmptyTextSchema,
  assumptions: z.array(nonEmptyTextSchema),
  limits: z.array(nonEmptyTextSchema).min(1),
  relatedConceptIds: z.array(identifierSchema).min(1),
});

export const economicModelSchema = z.strictObject({
  id: identifierSchema,
  alternativeId: identifierSchema,
  questionItExplores: nonEmptyTextSchema,
  plainMeaning: nonEmptyTextSchema,
  whatItCanShow: z.array(nonEmptyTextSchema).min(1),
  whatItCannotShow: z.array(nonEmptyTextSchema).min(1),
  currency: z.string().length(3),
  priceBasisDate: isoDateSchema,
  horizon: nonEmptyTextSchema,
  perspective: nonEmptyTextSchema,
  inputs: z.array(modelInputSchema).min(1),
  formulas: z.array(modelFormulaSchema).min(1),
  scenarios: z
    .array(
      z.strictObject({
        id: identifierSchema,
        name: nonEmptyTextSchema,
        inputOverrides: z.record(identifierSchema, z.number()),
        rationale: nonEmptyTextSchema,
      }),
    )
    .min(2),
  outputs: z.array(
    z.strictObject({
      id: identifierSchema,
      name: nonEmptyTextSchema,
      scenarioId: identifierSchema,
      value: z.number(),
      unit: nonEmptyTextSchema,
    }),
  ),
  sensitivity: z.array(
    z.strictObject({
      inputId: identifierSchema,
      testedRange: nonEmptyTextSchema,
      effect: nonEmptyTextSchema,
    }),
  ),
  failureConditions: z.array(nonEmptyTextSchema).min(1),
  excludedEffects: z.array(nonEmptyTextSchema),
  reproducibilityNotes: nonEmptyTextSchema,
});

export const studyPlanSchema = z.strictObject({
  id: identifierSchema,
  decisionItInforms: nonEmptyTextSchema,
  population: nonEmptyTextSchema,
  samplingAndRecruitment: nonEmptyTextSchema,
  heterogeneity: z.array(nonEmptyTextSchema),
  measures: z.array(nonEmptyTextSchema).min(1),
  analysis: nonEmptyTextSchema,
  stoppingRule: nonEmptyTextSchema,
  missingness: nonEmptyTextSchema,
  ethicsAndPrivacy: nonEmptyTextSchema,
  generalizationBoundary: nonEmptyTextSchema,
  intentStatus: intentStatusSchema,
});

export const testPortfolioSchema = z.strictObject({
  id: identifierSchema,
  tests: z
    .array(
      z.strictObject({
        id: identifierSchema,
        position: z.number().int().positive(),
        studyPlanId: identifierSchema.optional(),
        prerequisites: z.array(identifierSchema),
        costAndDelay: nonEmptyTextSchema,
        reversibility: nonEmptyTextSchema,
        possibleResults: z.array(nonEmptyTextSchema).min(2),
        resultToAction: z.array(nonEmptyTextSchema).min(2),
        stopRules: z.array(nonEmptyTextSchema).min(1),
        promotionRules: z.array(nonEmptyTextSchema).min(1),
        orderingRationale: nonEmptyTextSchema,
        ownerActorId: identifierSchema,
      }),
    )
    .min(1),
});

export const decisionFrameSchema = z.strictObject({
  id: identifierSchema,
  decisionOwnerActorId: identifierSchema,
  decision: nonEmptyTextSchema,
  objectiveIds: z.array(identifierSchema).min(1),
  alternativeIds: z.array(identifierSchema).min(2),
  constraints: z.array(nonEmptyTextSchema),
  horizon: nonEmptyTextSchema,
  riskPosture: nonEmptyTextSchema,
  irreversibleActions: z.array(nonEmptyTextSchema),
});

export const recommendationSchema = z.strictObject({
  id: identifierSchema,
  decisionFrameId: identifierSchema,
  recommendedAlternativeId: identifierSchema,
  recommendationClaimId: identifierSchema,
  conditions: z.array(nonEmptyTextSchema).min(1),
  stopConditions: z.array(nonEmptyTextSchema).min(1),
  nextTestPortfolioId: identifierSchema,
  validUntil: isoDateSchema,
  residualRisks: z.array(nonEmptyTextSchema).min(1),
});

export const evaluationPlanSchema = z.strictObject({
  id: identifierSchema,
  predictionIds: z.array(identifierSchema),
  outcomeMeasures: z.array(nonEmptyTextSchema).min(1),
  observationDates: z.array(isoDateSchema).min(1),
  comparisonMethod: nonEmptyTextSchema,
  revisionTrigger: nonEmptyTextSchema,
  ownerActorId: identifierSchema,
});
