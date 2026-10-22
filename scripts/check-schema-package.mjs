import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const requiredFiles = [
  'lib/schema/index.js',
  'lib/schema/index.d.ts',
  'lib/schema/schema.json',
  'esm/schema/index.js',
];
const generatorOutputs = [
  'lib/schema/schema.js',
  'lib/schema/definitions',
  'esm/schema/schema.js',
  'esm/schema/definitions',
];

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    throw new Error(`Missing schema package output: ${relativePath}`);
  }
}

for (const relativePath of generatorOutputs) {
  if (fs.existsSync(path.join(root, relativePath))) {
    throw new Error(
      `Schema generator leaked into package output: ${relativePath}`,
    );
  }
}

const { validate } = require(path.join(root, 'lib/schema/index.js'));
if (!validate({ type: 'point' }).ok) {
  throw new Error('Built CommonJS schema entry failed its smoke test.');
}

const schema = JSON.parse(
  fs.readFileSync(path.join(root, 'lib/schema/schema.json'), 'utf8'),
);
if (schema.title !== 'G2Schema') {
  throw new Error('Built JSON Schema asset is invalid.');
}
