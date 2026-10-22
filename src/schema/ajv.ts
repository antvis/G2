import Ajv, { type ErrorObject } from 'ajv';
import schema from './schema.generated.js';

export type SchemaValidationError = ErrorObject<
  string,
  Record<string, any>,
  unknown
>;

const validateWithAjv = new Ajv({
  allErrors: true,
  strict: true,
  discriminator: true,
  verbose: true,
}).compile(schema);

export function schemaErrors(value: unknown): SchemaValidationError[] {
  if (validateWithAjv(value)) return [];
  return [...(validateWithAjv.errors || [])];
}
