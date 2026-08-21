/** Root Opportunity Case contract and executable cross-object invariants. */
import { z } from 'zod';

import {
  challengeSchema,
  claimSchema,
  inferenceSchema,
  transportArgumentSchema,
  typedRelationSchema,
} from './argument';
import { validateCaseGraph } from './caseValidation';
import {
  actorSchema,
  caseStatusSchema,
  identifierSchema,
  isoDateSchema,
  isoDateTimeSchema,
  nonEmptyTextSchema,
  scopeSchema,
  uncertaintySchema,
  validationResultSchema,
} from './common';
import {
  alternativeSchema,
  decisionFrameSchema,
  economicModelSchema,
  evaluationPlanSchema,
  recommendationSchema,
  studyPlanSchema,
  testPortfolioSchema,
} from './decision';
import {
  evidenceFamilySchema,
  extractedRecordSchema,
  missingEvidenceAssessmentSchema,
  searchProtocolSchema,
  sourceAppraisalSchema,
  sourceArtifactSchema,
} from './evidence';
import { domainModulesSchema } from './extensions';
import {
  agentRunSchema,
  applicabilityDecisionSchema,
  changeSetSchema,
  controlBoundarySchema,
  freshnessPolicySchema,
  publicationGateSchema,
  regulatoryRequirementSchema,
} from './governance';
import {
  conceptSchema,
  readerSummarySchema,
  researchQuestionSchema,
} from './readerLearning';

const mandateSchema = z.strictObject({
  commissioner: nonEmptyTextSchema,
  decisionOwnerActorId: identifierSchema,
  question: nonEmptyTextSchema,
  intendedUse: nonEmptyTextSchema,
  excludedUses: z.array(nonEmptyTextSchema),
  proportionality: z.enum(['P0', 'P1', 'P2', 'P3']),
  ethicsAndConflicts: z.array(nonEmptyTextSchema),
});

const objectiveSchema = z.strictObject({
  id: identifierSchema,
  statement: nonEmptyTextSchema,
  measure: nonEmptyTextSchema,
  direction: z.enum(['maximize', 'minimize', 'satisfy', 'avoid']),
});

export const opportunityCaseStructureSchema = z.strictObject({
  schemaVersion: z.literal('0.3.0'),
  id: identifierSchema,
  version: nonEmptyTextSchema,
  title: nonEmptyTextSchema,
  subtitle: nonEmptyTextSchema,
  status: caseStatusSchema,
  issuedAt: isoDateTimeSchema,
  evidenceCutoff: isoDateSchema,
  supersedesVersion: nonEmptyTextSchema.optional(),
  readerSummary: readerSummarySchema,
  mandate: mandateSchema,
  scope: scopeSchema,
  actors: z.array(actorSchema).min(1),
  objectives: z.array(objectiveSchema).min(1),
  concepts: z.array(conceptSchema).min(1),
  researchQuestions: z.array(researchQuestionSchema).min(1),
  searchProtocols: z.array(searchProtocolSchema),
  sources: z.array(sourceArtifactSchema).min(1),
  extractedRecords: z.array(extractedRecordSchema),
  sourceAppraisals: z.array(sourceAppraisalSchema).min(1),
  evidenceFamilies: z.array(evidenceFamilySchema),
  missingEvidenceAssessments: z.array(missingEvidenceAssessmentSchema),
  claims: z.array(claimSchema).min(1),
  inferences: z.array(inferenceSchema),
  transportArguments: z.array(transportArgumentSchema),
  uncertainties: z.array(uncertaintySchema),
  alternatives: z.array(alternativeSchema).min(2),
  economicModels: z.array(economicModelSchema),
  studyPlans: z.array(studyPlanSchema),
  testPortfolios: z.array(testPortfolioSchema).min(1),
  decisionFrame: decisionFrameSchema,
  recommendation: recommendationSchema,
  freshnessPolicies: z.array(freshnessPolicySchema),
  regulatoryRequirements: z.array(regulatoryRequirementSchema),
  applicabilityDecisions: z.array(applicabilityDecisionSchema),
  controlBoundaries: z.array(controlBoundarySchema),
  challenges: z.array(challengeSchema),
  agentRuns: z.array(agentRunSchema),
  typedRelations: z.array(typedRelationSchema),
  validationResults: z.array(validationResultSchema),
  publicationGates: z.array(publicationGateSchema).length(5),
  changeSets: z.array(changeSetSchema),
  evaluationPlan: evaluationPlanSchema,
  domainModules: domainModulesSchema,
});

export type OpportunityCaseStructure = z.infer<typeof opportunityCaseStructureSchema>;

function addIssue(
  context: z.RefinementCtx,
  path: PropertyKey[],
  message: string,
): void {
  context.addIssue({ code: 'custom', path, message });
}

function validateMethod(
  document: OpportunityCaseStructure,
  context: z.RefinementCtx,
): void {
  document.claims.forEach((claim, index) => {
    const external =
      claim.claimKind === 'observed_fact' || claim.claimKind === 'sourced_estimate';
    if (external && claim.sourceIds.length === 0) {
      addIssue(
        context,
        ['claims', index, 'sourceIds'],
        'External claims require source provenance.',
      );
    }
    if (external && claim.freshnessPolicyId === undefined) {
      addIssue(
        context,
        ['claims', index, 'freshnessPolicyId'],
        'External claims require claim-level freshness.',
      );
    }
    const demand = claim.demandSignal;
    if (demand?.contributesToBuyerDemand === true && demand.actorOrigin !== 'buyer') {
      addIssue(
        context,
        ['claims', index, 'demandSignal'],
        'Only buyer-origin evidence may increment buyer demand.',
      );
    }
  });
  const materialOpenChallenge = document.challenges.some(
    (challenge) => challenge.status === 'open' && challenge.severity !== 'minor',
  );
  const published = document.status === 'published';
  if (published && materialOpenChallenge) {
    addIssue(
      context,
      ['status'],
      'A published case cannot retain an open material challenge.',
    );
  }
}

export const opportunityCaseDocumentSchema = opportunityCaseStructureSchema.superRefine(
  (document, context) => {
    validateCaseGraph(document, context);
    validateMethod(document, context);
  },
);

export type OpportunityCaseDocument = z.infer<typeof opportunityCaseDocumentSchema>;

export function parseOpportunityCase(input: unknown): OpportunityCaseDocument {
  return opportunityCaseDocumentSchema.parse(input);
}
