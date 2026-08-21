/** Cross-object graph validation that standard JSON Schema cannot express. */
import type { z } from 'zod';

import { collectKnownIds } from './caseObjectIndex';
import { validateEconomicModels } from './economicModelValidation';
import type { OpportunityCaseStructure } from './opportunityCaseDocument';
import { validateReaderLearning } from './readerLearningValidation';

function issue(context: z.RefinementCtx, path: PropertyKey[], message: string): void {
  context.addIssue({ code: 'custom', path, message });
}

function requireKnown(
  ids: readonly string[],
  known: ReadonlySet<string>,
  context: z.RefinementCtx,
  path: PropertyKey[],
  label: string,
): void {
  if (ids.some((id) => !known.has(id))) {
    issue(context, path, `${label} references an unknown object.`);
  }
}

function validateEvidence(
  document: OpportunityCaseStructure,
  known: ReadonlySet<string>,
  context: z.RefinementCtx,
): void {
  document.sources.forEach((source, sourceIndex) => {
    if (
      !document.sourceAppraisals.some((appraisal) => appraisal.sourceId === source.id)
    ) {
      issue(
        context,
        ['sources', sourceIndex],
        'Every source requires an appraisal explaining its strengths and limitations.',
      );
    }
  });
  document.researchQuestions.forEach((item, index) => {
    requireKnown(
      [...item.answerClaimIds, ...item.relatedConceptIds],
      known,
      context,
      ['researchQuestions', index],
      'Question',
    );
  });
  document.searchProtocols.forEach((item, index) => {
    requireKnown(
      [...item.questionIds, ...item.searcherActorIds],
      known,
      context,
      ['searchProtocols', index],
      'Search protocol',
    );
  });
  document.extractedRecords.forEach((item, index) => {
    requireKnown(
      [item.sourceId, item.extractedByActorId],
      known,
      context,
      ['extractedRecords', index],
      'Extraction',
    );
  });
  document.sourceAppraisals.forEach((item, index) => {
    requireKnown(
      [item.sourceId, ...item.appraisedByActorIds],
      known,
      context,
      ['sourceAppraisals', index],
      'Appraisal',
    );
  });
  document.evidenceFamilies.forEach((item, index) => {
    requireKnown(
      item.sourceIds,
      known,
      context,
      ['evidenceFamilies', index],
      'Evidence family',
    );
  });
}

function validateArguments(
  document: OpportunityCaseStructure,
  known: ReadonlySet<string>,
  context: z.RefinementCtx,
): void {
  document.claims.forEach((item, index) => {
    requireKnown(
      [
        ...item.sourceIds,
        ...item.extractedRecordIds,
        ...item.evidenceFamilyIds,
        ...item.conflictsWithClaimIds,
      ],
      known,
      context,
      ['claims', index],
      'Claim',
    );
  });
  document.inferences.forEach((item, index) => {
    requireKnown(
      [
        ...item.premiseClaimIds,
        item.conclusionClaimId,
        ...item.reasoningSourceIds,
        ...item.relatedConceptIds,
      ],
      known,
      context,
      ['inferences', index],
      'Inference',
    );
  });
  document.transportArguments.forEach((item, index) => {
    requireKnown(
      [...item.sourceClaimIds, item.targetClaimId],
      known,
      context,
      ['transportArguments', index],
      'Transport argument',
    );
  });
  document.typedRelations.forEach((item, index) => {
    requireKnown(
      [item.fromId, item.toId],
      known,
      context,
      ['typedRelations', index],
      'Relation',
    );
  });
}

function validateDecisions(
  document: OpportunityCaseStructure,
  known: ReadonlySet<string>,
  context: z.RefinementCtx,
): void {
  document.alternatives.forEach((item, index) => {
    requireKnown(
      [
        ...item.actorIds,
        ...item.objectiveIds,
        ...item.controlBoundaryIds,
        ...item.hazardTransferIds,
        ...item.chainOfCustodyIds,
        ...item.claimIds,
      ],
      known,
      context,
      ['alternatives', index],
      'Alternative',
    );
  });
  document.testPortfolios.forEach((portfolio, index) => {
    const positions = portfolio.tests
      .map((test) => test.position)
      .sort((left, right) => left - right);
    if (!positions.every((position, positionIndex) => position === positionIndex + 1)) {
      issue(
        context,
        ['testPortfolios', index],
        'Test positions must be unique and sequential from one.',
      );
    }
    portfolio.tests.forEach((test) => {
      requireKnown(
        [
          test.ownerActorId,
          ...test.prerequisites,
          ...(test.studyPlanId === undefined ? [] : [test.studyPlanId]),
        ],
        known,
        context,
        ['testPortfolios', index],
        'Test',
      );
    });
  });
  const decisionRefs = [
    document.decisionFrame.decisionOwnerActorId,
    ...document.decisionFrame.objectiveIds,
    ...document.decisionFrame.alternativeIds,
    document.recommendation.decisionFrameId,
    document.recommendation.recommendedAlternativeId,
    document.recommendation.recommendationClaimId,
    document.recommendation.nextTestPortfolioId,
  ];
  requireKnown(decisionRefs, known, context, ['recommendation'], 'Decision');
  if (
    !document.decisionFrame.alternativeIds.includes(
      document.recommendation.recommendedAlternativeId,
    )
  ) {
    issue(
      context,
      ['recommendation'],
      'Recommended alternative is outside the decision frame.',
    );
  }
}

function validateGovernance(
  document: OpportunityCaseStructure,
  known: ReadonlySet<string>,
  context: z.RefinementCtx,
): void {
  document.freshnessPolicies.forEach((item, index) => {
    requireKnown(
      [item.targetId, item.ownerActorId],
      known,
      context,
      ['freshnessPolicies', index],
      'Freshness policy',
    );
  });
  document.claims.forEach((claim, index) => {
    if (claim.freshnessPolicyId === undefined) return;
    const policy = document.freshnessPolicies.find(
      (item) => item.id === claim.freshnessPolicyId,
    );
    if (policy?.targetId !== claim.id) {
      issue(
        context,
        ['claims', index, 'freshnessPolicyId'],
        'Claim freshness policy must target that claim.',
      );
    }
  });
  document.regulatoryRequirements.forEach((item, index) => {
    requireKnown(
      [item.sourceId, item.freshnessPolicyId],
      known,
      context,
      ['regulatoryRequirements', index],
      'Requirement',
    );
  });
  document.publicationGates.forEach((item, index) => {
    requireKnown(
      [
        ...item.validationResultIds,
        ...item.reviewerActorIds,
        ...item.blockingObjectIds,
      ],
      known,
      context,
      ['publicationGates', index],
      'Publication gate',
    );
  });
  const distinctKinds = new Set(document.publicationGates.map((gate) => gate.gateKind));
  if (distinctKinds.size !== 5) {
    issue(
      context,
      ['publicationGates'],
      'All five distinct publication gates are required.',
    );
  }
}

export function validateCaseGraph(
  document: OpportunityCaseStructure,
  context: z.RefinementCtx,
): void {
  const known = collectKnownIds(document, (id) => {
    issue(context, [], `Duplicate object id: ${id}.`);
  });
  validateReaderLearning(document, known, context);
  validateEvidence(document, known, context);
  validateArguments(document, known, context);
  validateEconomicModels(document, known, context);
  validateDecisions(document, known, context);
  validateGovernance(document, known, context);
}
