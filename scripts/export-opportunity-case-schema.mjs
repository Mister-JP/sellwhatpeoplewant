/** Reproducibly exports the renderer-independent Opportunity Case JSON Schema. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { createServer } from 'vite';
import { toJSONSchema } from 'zod';
import { format } from 'prettier';

const schemaPath = resolve('architecture/opportunity-case.schema.json');
const publicDirectory = resolve('public/methodology');
const publicSchemaPath = resolve(publicDirectory, 'opportunity-case.schema.json');
const examplePath = resolve(
  'architecture/examples/opportunity-case-learning-example.json',
);
const publicExamplePath = resolve(publicDirectory, 'opportunity-case.example.json');
const checkOnly = process.argv.includes('--check');
const server = await createServer({
  appType: 'custom',
  configFile: false,
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false, ws: false },
});

try {
  const model = await server.ssrLoadModule(
    '/src/opportunity-cases/model/opportunityCaseDocument.ts',
  );
  const schema = toJSONSchema(model.opportunityCaseStructureSchema, {
    target: 'draft-2020-12',
  });
  schema.$id = 'https://sellwhatpeoplewant.com/schemas/opportunity-case/0.3.0';
  schema.title = 'SellWhatPeopleWant Opportunity Case 0.3.0';
  schema.description =
    'Structural contract for an inspectable, versioned Opportunity Case with a plain-language summary, concept explanations, and verifiable sources. Cross-object evidence and reasoning checks are enforced by the companion Zod parser.';
  const generated = await format(JSON.stringify(schema), {
    parser: 'json',
    printWidth: 88,
  });
  const example = await readFile(examplePath, 'utf8');

  if (checkOnly) {
    const [current, publicSchema, publicExample] = await Promise.all([
      readFile(schemaPath, 'utf8'),
      readFile(publicSchemaPath, 'utf8'),
      readFile(publicExamplePath, 'utf8'),
    ]);
    if (current !== generated || publicSchema !== generated) {
      throw new Error(
        'Opportunity Case JSON Schema is stale. Run pnpm schema:opportunity-case.',
      );
    }
    if (publicExample !== example) {
      throw new Error(
        'Public Opportunity Case example is stale. Run pnpm schema:opportunity-case.',
      );
    }
  } else {
    await mkdir(publicDirectory, { recursive: true });
    await Promise.all([
      writeFile(schemaPath, generated, 'utf8'),
      writeFile(publicSchemaPath, generated, 'utf8'),
      writeFile(publicExamplePath, example, 'utf8'),
    ]);
  }
} finally {
  await server.close();
}
