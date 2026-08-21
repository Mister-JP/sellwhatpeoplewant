/** Domain-specific modules for products, field services, and accessibility. */
import { z } from 'zod';

import { identifierSchema, nonEmptyTextSchema } from './common';

export const productConfigurationSchema = z.strictObject({
  id: identifierSchema,
  manufacturer: nonEmptyTextSchema,
  model: nonEmptyTextSchema,
  revision: nonEmptyTextSchema,
  firmwareAppCloudVersions: z.array(nonEmptyTextSchema),
  componentsAndRadios: z.array(nonEmptyTextSchema),
  powerBatteryDisplayAccessories: z.array(nonEmptyTextSchema),
  packageLabelsInstructionsClaims: z.array(nonEmptyTextSchema),
  intendedAndProhibitedUses: z.array(nonEmptyTextSchema).min(1),
  authorizationAndLifecycle: nonEmptyTextSchema,
  sampleDifferences: z.array(nonEmptyTextSchema),
  configurationHash: nonEmptyTextSchema,
  supersedesId: identifierSchema.optional(),
});

export const serviceTaskSchema = z.strictObject({
  id: identifierSchema,
  task: nonEmptyTextSchema,
  productClasses: z.array(nonEmptyTextSchema).min(1),
  competence: z.array(nonEmptyTextSchema).min(1),
  toolsAndParts: z.array(nonEmptyTextSchema),
  locationAndEnergyState: nonEmptyTextSchema,
  diagnostics: z.array(nonEmptyTextSchema),
  allowedOperations: z.array(nonEmptyTextSchema).min(1),
  exclusionsAndRejectionIndicators: z.array(nonEmptyTextSchema).min(1),
  handoffAndCustody: nonEmptyTextSchema,
  qualityAndWarranty: nonEmptyTextSchema,
  hazardsAndIncidentProcedure: z.array(nonEmptyTextSchema).min(1),
});

export const hazardTransferSchema = z.strictObject({
  id: identifierSchema,
  hazard: nonEmptyTextSchema,
  sourceActorPlaceTime: nonEmptyTextSchema,
  receivingActorPlaceTime: nonEmptyTextSchema,
  dispositions: z
    .array(
      z.enum([
        'reduced',
        'eliminated',
        'transferred',
        'delayed',
        'concentrated',
        'distributed',
        'externalized',
        'created',
        'unknown',
      ]),
    )
    .min(1),
  mechanism: nonEmptyTextSchema,
  controls: z.array(nonEmptyTextSchema),
  residualRisk: nonEmptyTextSchema,
  affectedParties: z.array(nonEmptyTextSchema).min(1),
  authorityOrReviewerActorId: identifierSchema,
});

export const custodyEventSchema = z.strictObject({
  id: identifierSchema,
  objectAndConfiguration: nonEmptyTextSchema,
  transferorActorId: identifierSchema,
  custodianActorId: identifierSchema,
  timeAndPlace: nonEmptyTextSchema,
  condition: nonEmptyTextSchema,
  authority: nonEmptyTextSchema,
  disposition: z.enum(['accepted', 'rejected', 'retained', 'transferred', 'disposed']),
  controls: z.array(nonEmptyTextSchema),
  nextDisposition: nonEmptyTextSchema,
});

export const chainOfCustodySchema = z.strictObject({
  id: identifierSchema,
  objectVersion: nonEmptyTextSchema,
  eventIds: z.array(identifierSchema).min(1),
  gaps: z.array(nonEmptyTextSchema),
  currentCustodianActorId: identifierSchema,
  accessAndHandlingPolicy: nonEmptyTextSchema,
  terminationOrDisposal: nonEmptyTextSchema,
});

export const evaluationScopeSchema = z.strictObject({
  id: identifierSchema,
  criticalJourneys: z.array(nonEmptyTextSchema).min(1),
  pageTemplateAndSampleLogic: nonEmptyTextSchema,
  contentDocumentAndApplicationStates: z.array(nonEmptyTextSchema).min(1),
  authenticationLanguagesThirdParties: z.array(nonEmptyTextSchema),
  browserAndAssistiveTechnologyMatrix: z.array(nonEmptyTextSchema).min(1),
  automatedAndManualChecks: z.array(nonEmptyTextSchema).min(1),
  disabledUserParticipantScope: nonEmptyTextSchema,
  exclusions: z.array(nonEmptyTextSchema),
  residualCoverage: nonEmptyTextSchema,
});

export const outputAccessibilityResultSchema = z.strictObject({
  id: identifierSchema,
  artifactAndVersion: nonEmptyTextSchema,
  formats: z.array(nonEmptyTextSchema).min(1),
  criteria: z.array(nonEmptyTextSchema).min(1),
  methods: z.array(nonEmptyTextSchema).min(1),
  assistiveTechnologies: z.array(nonEmptyTextSchema),
  humanReview: nonEmptyTextSchema,
  userScope: nonEmptyTextSchema,
  findings: z.array(nonEmptyTextSchema),
  unresolvedBarriers: z.array(nonEmptyTextSchema),
});

export const domainModulesSchema = z.strictObject({
  physicalProduct: z
    .strictObject({
      moduleVersion: nonEmptyTextSchema,
      configurations: z.array(productConfigurationSchema),
    })
    .optional(),
  fieldServiceSafety: z
    .strictObject({
      moduleVersion: nonEmptyTextSchema,
      serviceTasks: z.array(serviceTaskSchema),
      hazardTransfers: z.array(hazardTransferSchema),
      custodyEvents: z.array(custodyEventSchema),
      chainsOfCustody: z.array(chainOfCustodySchema),
    })
    .optional(),
  digitalAccessibility: z
    .strictObject({
      moduleVersion: nonEmptyTextSchema,
      evaluationScopes: z.array(evaluationScopeSchema),
      outputAccessibilityResults: z.array(outputAccessibilityResultSchema),
    })
    .optional(),
  jurisdictionSpecific: z.record(nonEmptyTextSchema, z.unknown()),
});
