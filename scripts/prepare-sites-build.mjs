/**
 * Shapes Vite's static output into the small worker-and-client contract consumed
 * by OpenAI Sites. Keeping this deterministic packaging seam outside product code
 * prevents hosting details from leaking into React while retaining the existing
 * framework, lockfile, and local development workflow.
 */
import { cp, mkdir, readdir, rename } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectDirectory = process.cwd();
const distributionDirectory = resolve(projectDirectory, 'dist');
const clientDirectory = resolve(distributionDirectory, 'client');
const serverDirectory = resolve(distributionDirectory, 'server');
const hostingMetadataDirectoryName = '.openai';
const generatedDirectoryNames = new Set([
  hostingMetadataDirectoryName,
  'client',
  'server',
]);

await mkdir(clientDirectory, { recursive: true });
await mkdir(serverDirectory, { recursive: true });

const distributionEntries = await readdir(distributionDirectory, {
  withFileTypes: true,
});

for (const distributionEntry of distributionEntries) {
  if (generatedDirectoryNames.has(distributionEntry.name)) {
    continue;
  }

  await rename(
    resolve(distributionDirectory, distributionEntry.name),
    resolve(clientDirectory, distributionEntry.name),
  );
}

await cp(
  resolve(projectDirectory, 'worker', 'index.js'),
  resolve(serverDirectory, 'index.js'),
);
