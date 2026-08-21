/** Shared identifiers, scopes, actors, and uncertainty primitives for case documents. */
import { z } from 'zod';

export const identifierSchema = z.string().trim().min(1).max(160);
export const nonEmptyTextSchema = z.string().trim().min(1);
export const isoDateSchema = z.iso.date();
export const isoDateTimeSchema = z.iso.datetime({ offset: true });

export const caseStatusSchema = z.enum([
  'protocol',
  'researching',
  'challenged',
  'candidate',
  'published',
  'corrected',
  'withdrawn',
]);

export const intentStatusSchema = z.enum(['prospective', 'amended', 'retrospective']);

export const actorSchema = z.strictObject({
  id: identifierSchema,
  name: nonEmptyTextSchema,
  role: nonEmptyTextSchema,
  organization: nonEmptyTextSchema.optional(),
  qualification: nonEmptyTextSchema.optional(),
  accountable: z.boolean(),
  conflicts: z.array(nonEmptyTextSchema),
});

export const scopeSchema = z.strictObject({
  jurisdictions: z.array(nonEmptyTextSchema).min(1),
  populations: z.array(nonEmptyTextSchema).min(1),
  periodStart: isoDateSchema.optional(),
  periodEnd: isoDateSchema.optional(),
  includedContexts: z.array(nonEmptyTextSchema),
  excludedContexts: z.array(nonEmptyTextSchema),
  generalizationBoundary: nonEmptyTextSchema,
});

export const uncertaintySchema = z.strictObject({
  id: identifierSchema,
  targetId: identifierSchema,
  description: nonEmptyTextSchema,
  mode: z.enum(['qualitative', 'range', 'probability', 'distribution']),
  value: z.union([z.number(), nonEmptyTextSchema]).optional(),
  lower: z.number().optional(),
  upper: z.number().optional(),
  basis: nonEmptyTextSchema,
  calibrationProvenance: nonEmptyTextSchema.optional(),
  decisionMateriality: z.enum(['low', 'medium', 'high', 'decisive']),
  reducibleByIds: z.array(identifierSchema),
});

export const validationResultSchema = z.strictObject({
  id: identifierSchema,
  validatorId: identifierSchema,
  targetIds: z.array(identifierSchema).min(1),
  outcome: z.enum(['pass', 'fail', 'conditional', 'not_applicable', 'not_run']),
  checkedAt: isoDateTimeSchema,
  checkedByActorId: identifierSchema,
  rationale: nonEmptyTextSchema,
  limitations: z.array(nonEmptyTextSchema),
});

export type CaseActor = z.infer<typeof actorSchema>;
export type CaseScope = z.infer<typeof scopeSchema>;
