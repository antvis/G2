import fs from 'node:fs';
import path from 'node:path';
import Ajv, { type AnySchemaObject } from 'ajv';

const root = path.resolve(__dirname, '..');
const schemaFilename = path.join(root, 'src/schema/schema.json');
const runtimeModuleFilename = path.join(root, 'src/schema/schema.generated.ts');
const checkOnly = process.argv.includes('--check');
const runtimeOnly = process.argv.includes('--runtime');

function jsonSource(schema: AnySchemaObject): string {
  return `${JSON.stringify(schema, null, 2)}\n`;
}

function runtimeModuleSource(schema: AnySchemaObject): string {
  return `const schema: Record<string, any> = ${JSON.stringify(
    schema,
    null,
    2,
  )};\n\nexport default schema;\n`;
}

function assertValidSchema(schema: AnySchemaObject): void {
  new Ajv({
    allErrors: true,
    strict: true,
    discriminator: true,
  }).compile(schema);
}

function readCanonicalSchema(): AnySchemaObject {
  if (!fs.existsSync(schemaFilename)) {
    throw new Error(
      'Missing src/schema/schema.json. Run pnpm generate:schema.',
    );
  }

  return JSON.parse(fs.readFileSync(schemaFilename, 'utf8'));
}

function writeRuntimeModule(schema: AnySchemaObject): void {
  fs.writeFileSync(runtimeModuleFilename, runtimeModuleSource(schema));
}

async function main(): Promise<void> {
  if (checkOnly && runtimeOnly) {
    throw new Error('--check and --runtime cannot be used together.');
  }

  if (runtimeOnly) {
    const schema = readCanonicalSchema();
    assertValidSchema(schema);
    writeRuntimeModule(schema);
    return;
  }

  const { G2Schema } = await import('./schema/schema');
  assertValidSchema(G2Schema);

  const expectedJsonSource = jsonSource(G2Schema);
  if (checkOnly) {
    const currentJsonSource = fs.existsSync(schemaFilename)
      ? fs.readFileSync(schemaFilename, 'utf8')
      : '';
    if (currentJsonSource !== expectedJsonSource) {
      console.error(
        'src/schema/schema.json is stale. Run pnpm generate:schema.',
      );
      process.exitCode = 1;
    }
    return;
  }

  fs.writeFileSync(schemaFilename, expectedJsonSource);
  writeRuntimeModule(G2Schema);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
