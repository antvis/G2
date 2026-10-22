import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = process.argv[2];

if (!outputRoot) {
  throw new Error(
    'Expected the TypeScript output directory, for example: lib.',
  );
}

const sourceDirectory = path.join(root, 'src/schema');
const outputDirectory = path.join(root, outputRoot, 'schema');
fs.mkdirSync(outputDirectory, { recursive: true });
fs.copyFileSync(
  path.join(sourceDirectory, 'schema.json'),
  path.join(outputDirectory, 'schema.json'),
);
