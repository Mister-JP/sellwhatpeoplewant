/**
 * Exercises the public learning example and the semantic rules that JSON Schema
 * cannot express alone. The fixture is deliberately small but carries a complete
 * source-to-decision trace, reader explanation, and correction history; tests avoid
 * renderer behavior so failures identify the domain boundary that became unsafe.
 */
import { describe, expect, it } from 'vitest';

import exampleDocument from '../../../architecture/examples/opportunity-case-learning-example.json';
import exportedSchema from '../../../architecture/opportunity-case.schema.json';
import { parseOpportunityCase } from './opportunityCaseDocument';

function cloneExample(): unknown {
  return structuredClone(exampleDocument);
}

function mutableClaims(document: unknown): Record<string, unknown>[] {
  return (document as { claims: Record<string, unknown>[] }).claims;
}

function firstOrThrow<Value>(values: Value[], label: string): Value {
  const first = values[0];
  if (first === undefined) throw new Error(`Expected ${label} in the test fixture.`);
  return first;
}

function addExplainedEconomicModel(document: unknown): void {
  const economicModels = (document as { economicModels: Record<string, unknown>[] })
    .economicModels;
  economicModels.push({
    id: 'MODEL-DISCOVERY-COST',
    alternativeId: 'ALT-DISCOVERY',
    questionItExplores: 'How much participant compensation should be reserved?',
    plainMeaning:
      'A narrow budget illustration for one part of discovery, not a forecast of demand or profit.',
    whatItCanShow: ['How participant count changes the compensation budget.'],
    whatItCannotShow: [
      'Whether participants can be recruited or whether a service opportunity exists.',
    ],
    currency: 'USD',
    priceBasisDate: '2026-08-20',
    horizon: 'One discovery cycle',
    perspective: 'Human research owner',
    inputs: [
      {
        id: 'INPUT-PARTICIPANTS',
        name: 'Participant count',
        plainMeaning: 'The number of people compensated for taking part in the study.',
        unit: 'people',
        value: 8,
        sourceClaimIds: [],
        assumption:
          'Eight is an illustration, not a recruitment target supported by evidence.',
      },
      {
        id: 'INPUT-COMPENSATION',
        name: 'Compensation per participant',
        plainMeaning: 'The direct payment made to each participant for their time.',
        unit: 'USD/person',
        value: 100,
        sourceClaimIds: [],
        assumption: 'The amount is illustrative and must be checked with participants.',
      },
    ],
    formulas: [
      {
        id: 'FORMULA-COMPENSATION',
        expression: 'participant_count * compensation_per_participant',
        outputUnit: 'USD',
        plainMeaning:
          'Total compensation rises by the per-person payment whenever one participant is added.',
        whyItIsUsed:
          'Multiplication represents equal compensation for each person in this narrow illustration.',
        assumptions: ['Each counted participant receives the same direct payment.'],
        limits: [
          'It excludes recruitment, accessibility, staff time, travel, and taxes.',
        ],
        relatedConceptIds: ['CONCEPT-DEADLINE-AND-DEMAND'],
      },
    ],
    scenarios: [
      {
        id: 'SCENARIO-SMALL',
        name: 'Smaller illustration',
        inputOverrides: { 'INPUT-PARTICIPANTS': 6 },
        rationale: 'Shows the arithmetic at a smaller participant count.',
      },
      {
        id: 'SCENARIO-LARGER',
        name: 'Larger illustration',
        inputOverrides: { 'INPUT-PARTICIPANTS': 10 },
        rationale: 'Shows the arithmetic at a larger participant count.',
      },
    ],
    outputs: [
      {
        id: 'OUTPUT-SMALL',
        name: 'Direct participant compensation',
        scenarioId: 'SCENARIO-SMALL',
        value: 600,
        unit: 'USD',
      },
      {
        id: 'OUTPUT-LARGER',
        name: 'Direct participant compensation',
        scenarioId: 'SCENARIO-LARGER',
        value: 1000,
        unit: 'USD',
      },
    ],
    sensitivity: [
      {
        inputId: 'INPUT-PARTICIPANTS',
        testedRange: '6 to 10 people',
        effect: 'Direct compensation changes from USD 600 to USD 1,000.',
      },
    ],
    failureConditions: ['Do not use the illustration if compensation is not equal.'],
    excludedEffects: ['Recruitment, accessibility, staff time, travel, and taxes.'],
    reproducibilityNotes:
      'Apply the stated multiplication to each scenario and preserve the exclusions.',
  });
}

describe('Opportunity Case document', () => {
  it('accepts a bounded case that connects a short answer to concepts and sources', () => {
    const parsed = parseOpportunityCase(cloneExample());

    expect(parsed.id).toBe('OC-US-WCAG-DISCOVERY');
    expect(parsed.readerSummary.conceptIds).toEqual(['CONCEPT-DEADLINE-AND-DEMAND']);
    expect(parsed.concepts[0]?.history[0]?.sourceIds).toEqual(['SRC-ADA-RULE']);
    expect(parsed.inferences[0]?.reasoning).toMatch(/buyer evidence is still missing/i);
    expect(parsed.sources[0]?.url).toMatch(/^https:\/\//);
    expect(parsed.recommendation.recommendedAlternativeId).toBe('ALT-DISCOVERY');
    expect(parsed.publicationGates).toHaveLength(5);
  });

  it('rejects a concept explanation whose history cannot be verified', () => {
    const document = cloneExample() as {
      concepts: { history: { sourceIds: string[] }[] }[];
    };
    const concept = firstOrThrow(document.concepts, 'one concept');
    const historyEntry = firstOrThrow(concept.history, 'one concept history entry');
    historyEntry.sourceIds = ['SRC-UNKNOWN'];

    expect(() => parseOpportunityCase(document)).toThrow(/unknown object/i);
  });

  it('rejects a source appraisal that does not say what the source cannot show', () => {
    const document = cloneExample() as {
      sourceAppraisals: { limitations: string[] }[];
    };
    const appraisal = firstOrThrow(document.sourceAppraisals, 'one source appraisal');
    appraisal.limitations = [];

    expect(() => parseOpportunityCase(document)).toThrow();
  });

  it('rejects a source link that is not a public HTTP or HTTPS verification path', () => {
    const document = cloneExample() as { sources: { url: string }[] };
    const source = firstOrThrow(document.sources, 'one source');
    source.url = 'javascript:alert(1)';

    expect(() => parseOpportunityCase(document)).toThrow();
  });

  it('requires an economic formula to explain its real-world meaning and limits', () => {
    const explainedDocument = cloneExample();
    addExplainedEconomicModel(explainedDocument);

    expect(() => parseOpportunityCase(explainedDocument)).not.toThrow();

    const unexplainedDocument = cloneExample();
    addExplainedEconomicModel(unexplainedDocument);
    const models = (
      unexplainedDocument as {
        economicModels: { formulas: Record<string, unknown>[] }[];
      }
    ).economicModels;
    const model = firstOrThrow(models, 'one economic model');
    const formula = firstOrThrow(model.formulas, 'one economic formula');
    delete formula.plainMeaning;

    expect(() => parseOpportunityCase(unexplainedDocument)).toThrow();
  });

  it('rejects an external claim without claim-level freshness', () => {
    const document = cloneExample();
    delete mutableClaims(document)[0]?.freshnessPolicyId;

    expect(() => parseOpportunityCase(document)).toThrow(/claim-level freshness/i);
  });

  it('rejects a recommendation that names no modeled alternative', () => {
    const document = cloneExample() as {
      recommendation: { recommendedAlternativeId: string };
    };
    document.recommendation.recommendedAlternativeId = 'ALT-UNMODELED';

    expect(() => parseOpportunityCase(document)).toThrow(/unknown object/i);
  });

  it('prevents seller activity from incrementing buyer demand', () => {
    const document = cloneExample();
    mutableClaims(document)[0] = {
      ...mutableClaims(document)[0],
      demandSignal: {
        actorOrigin: 'seller',
        signalKind: 'supply_activity',
        contributesToBuyerDemand: true,
        limitations: [],
      },
    };

    expect(() => parseOpportunityCase(document)).toThrow(/buyer-origin evidence/i);
  });

  it('exports a strict JSON Schema 2020-12 contract', () => {
    expect(exportedSchema.$schema).toBe('https://json-schema.org/draft/2020-12/schema');
    expect(exportedSchema.$id).toContain('/opportunity-case/0.3.0');
    expect(exportedSchema.additionalProperties).toBe(false);
  });
});
