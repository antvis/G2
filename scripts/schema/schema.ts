// Build-time schema definition; excluded from the published runtime sources.
import type { AnySchemaObject } from 'ajv';
import { catalog } from './definitions/catalog';
import { createSchema } from './definitions/create';

export const G2Schema: AnySchemaObject = createSchema(catalog);
