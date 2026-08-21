/** Indexes every addressable object in an Opportunity Case proof graph. */
import type { OpportunityCaseStructure } from './opportunityCaseDocument';

interface Identified {
  id: string;
}

function directObjects(document: OpportunityCaseStructure): Identified[] {
  return [
    { id: document.id },
    ...document.actors,
    ...document.objectives,
    ...document.concepts,
    ...document.researchQuestions,
    ...document.searchProtocols,
    ...document.sources,
    ...document.extractedRecords,
    ...document.sourceAppraisals,
    ...document.evidenceFamilies,
    ...document.missingEvidenceAssessments,
    ...document.claims,
    ...document.inferences,
    ...document.transportArguments,
    ...document.uncertainties,
    ...document.alternatives,
    ...document.economicModels,
    ...document.studyPlans,
    ...document.testPortfolios,
    document.decisionFrame,
    document.recommendation,
    ...document.freshnessPolicies,
    ...document.regulatoryRequirements,
    ...document.applicabilityDecisions,
    ...document.controlBoundaries,
    ...document.challenges,
    ...document.agentRuns,
    ...document.typedRelations,
    ...document.validationResults,
    ...document.publicationGates,
    ...document.changeSets,
    document.evaluationPlan,
  ];
}

function nestedObjects(document: OpportunityCaseStructure): Identified[] {
  return [
    ...document.economicModels.flatMap((model) => [
      ...model.inputs,
      ...model.formulas,
      ...model.scenarios,
      ...model.outputs,
    ]),
    ...document.testPortfolios.flatMap((portfolio) => portfolio.tests),
    ...domainObjects(document),
  ];
}

function domainObjects(document: OpportunityCaseStructure): Identified[] {
  return [
    ...productObjects(document),
    ...serviceObjects(document),
    ...accessibilityObjects(document),
  ];
}

function productObjects(document: OpportunityCaseStructure): Identified[] {
  return document.domainModules.physicalProduct?.configurations ?? [];
}

function serviceObjects(document: OpportunityCaseStructure): Identified[] {
  const service = document.domainModules.fieldServiceSafety;
  return [
    ...(service?.serviceTasks ?? []),
    ...(service?.hazardTransfers ?? []),
    ...(service?.custodyEvents ?? []),
    ...(service?.chainsOfCustody ?? []),
  ];
}

function accessibilityObjects(document: OpportunityCaseStructure): Identified[] {
  const accessibility = document.domainModules.digitalAccessibility;
  return [
    ...(accessibility?.evaluationScopes ?? []),
    ...(accessibility?.outputAccessibilityResults ?? []),
  ];
}

export function collectKnownIds(
  document: OpportunityCaseStructure,
  onDuplicate: (id: string) => void,
): Set<string> {
  const known = new Set<string>();
  for (const object of [...directObjects(document), ...nestedObjects(document)]) {
    if (known.has(object.id)) onDuplicate(object.id);
    known.add(object.id);
  }
  return known;
}
