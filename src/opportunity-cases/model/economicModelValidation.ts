/**
 * Checks references that make an economic model reproducible as one connected
 * object. JSON Schema can require the fields, but it cannot know whether a scenario,
 * output, sensitivity result, source claim, or concept belongs to this case and this
 * model. These checks preserve those links without interpreting the economics.
 */
import type { z } from 'zod';

import type { OpportunityCaseStructure } from './opportunityCaseDocument';

function addIssue(
  context: z.RefinementCtx,
  path: PropertyKey[],
  message: string,
): void {
  context.addIssue({ code: 'custom', path, message });
}

function validateModelReferences(
  model: OpportunityCaseStructure['economicModels'][number],
  known: ReadonlySet<string>,
  context: z.RefinementCtx,
  modelIndex: number,
): void {
  const inputReferences = model.inputs.flatMap((input) => [
    ...input.sourceClaimIds,
    ...(input.freshnessPolicyId === undefined ? [] : [input.freshnessPolicyId]),
  ]);
  const conceptReferences = model.formulas.flatMap(
    (formula) => formula.relatedConceptIds,
  );
  const references = [model.alternativeId, ...inputReferences, ...conceptReferences];
  if (references.some((identifier) => !known.has(identifier))) {
    addIssue(
      context,
      ['economicModels', modelIndex],
      'Economic model references an unknown object.',
    );
  }
}

function validateModelScenarios(
  model: OpportunityCaseStructure['economicModels'][number],
  context: z.RefinementCtx,
  modelIndex: number,
): void {
  const inputIds = new Set(model.inputs.map((input) => input.id));
  const scenarioIds = new Set(model.scenarios.map((scenario) => scenario.id));
  const hasUnknownInput = model.scenarios.some((scenario) =>
    Object.keys(scenario.inputOverrides).some((inputId) => !inputIds.has(inputId)),
  );
  if (hasUnknownInput) {
    addIssue(
      context,
      ['economicModels', modelIndex, 'scenarios'],
      'Model scenarios may override only inputs defined by that model.',
    );
  }
  if (model.outputs.some((output) => !scenarioIds.has(output.scenarioId))) {
    addIssue(
      context,
      ['economicModels', modelIndex, 'outputs'],
      'Model outputs must name a scenario defined by that model.',
    );
  }
  if (model.sensitivity.some((result) => !inputIds.has(result.inputId))) {
    addIssue(
      context,
      ['economicModels', modelIndex, 'sensitivity'],
      'Sensitivity results must name an input defined by that model.',
    );
  }
}

export function validateEconomicModels(
  document: OpportunityCaseStructure,
  known: ReadonlySet<string>,
  context: z.RefinementCtx,
): void {
  document.economicModels.forEach((model, modelIndex) => {
    validateModelReferences(model, known, context, modelIndex);
    validateModelScenarios(model, context, modelIndex);
  });
}
