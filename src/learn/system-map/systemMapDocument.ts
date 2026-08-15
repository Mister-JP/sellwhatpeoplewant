/**
 * Defines the small, renderer-independent story shown by the public system map.
 * The model stores narrative order rather than canvas coordinates because each
 * tab is a reading sequence. That makes the same content usable by the visual
 * page, screen readers, search engines, and future machine-facing endpoints.
 */
import { z as schemaBuilder } from 'zod';

const systemMapStepSchema = schemaBuilder
  .object({
    title: schemaBuilder.string().min(1),
    detail: schemaBuilder.string().min(1),
    tone: schemaBuilder.enum(['sky', 'sand', 'violet', 'mint', 'coral']),
  })
  .strict();

const systemMapViewSchema = schemaBuilder
  .object({
    id: schemaBuilder.string().min(1),
    label: schemaBuilder.string().min(1),
    title: schemaBuilder.string().min(1),
    summary: schemaBuilder.string().min(1),
    steps: schemaBuilder.array(systemMapStepSchema).min(2).max(5),
    connections: schemaBuilder.array(schemaBuilder.string().min(1)),
  })
  .strict()
  .superRefine((systemMapView, refinementContext) => {
    // A linear story has exactly one transition between each pair of steps. A
    // mismatched label count would make the visual map imply a transition that
    // the semantic document never described, so reject it at the content edge.
    if (systemMapView.connections.length !== systemMapView.steps.length - 1) {
      refinementContext.addIssue({
        code: 'custom',
        message: `View ${systemMapView.id} requires one connection between each step.`,
        path: ['connections'],
      });
    }
  });

export const systemMapDocumentSchema = schemaBuilder
  .object({
    title: schemaBuilder.string().min(1),
    principle: schemaBuilder.string().min(1),
    views: schemaBuilder.array(systemMapViewSchema).min(1),
  })
  .strict();

export type SystemMapDocument = schemaBuilder.infer<typeof systemMapDocumentSchema>;
export type SystemMapView = SystemMapDocument['views'][number];

/** Validates authored map content before any public page renders it. */
export function parseSystemMapDocument(candidateDocument: unknown): SystemMapDocument {
  return systemMapDocumentSchema.parse(candidateDocument);
}
