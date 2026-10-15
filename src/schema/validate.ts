import type { G2Spec } from '../spec';
import { schemaErrors, type SchemaValidationError } from './ajv.js';
import { inspectJSON } from './json.js';
import { joinPath } from './path.js';

export type SchemaDiagnostic = {
  path: string;
  keyword: string;
  message: string;
  params: Record<string, unknown>;
};

export type ValidateSchemaResult =
  | { ok: true; diagnostics: SchemaDiagnostic[]; value: G2Spec }
  | { ok: false; diagnostics: SchemaDiagnostic[] };

const COMPOSITE_KEYWORDS = new Set(['anyOf', 'oneOf', 'allOf', 'if', 'not']);

function errorPath(error: SchemaValidationError): string {
  const { instancePath, keyword, params } = error;
  if (keyword === 'required') {
    return joinPath(instancePath, String(params.missingProperty));
  }
  if (keyword === 'additionalProperties') {
    return joinPath(instancePath, String(params.additionalProperty));
  }
  if (keyword === 'discriminator') {
    return joinPath(instancePath, String(params.tag));
  }
  return instancePath;
}

function diagnosticsFromAjv(
  errors: SchemaValidationError[],
): SchemaDiagnostic[] {
  const diagnostics = errors
    .filter(({ keyword }) => !COMPOSITE_KEYWORDS.has(keyword))
    .map((error) => ({
      path: errorPath(error),
      keyword: error.keyword,
      message: error.message || 'The value does not match the G2 schema.',
      params: error.params,
    }));

  return diagnostics.filter(
    (diagnostic) =>
      diagnostic.keyword !== 'type' ||
      !diagnostics.some(
        (candidate) =>
          candidate.path !== diagnostic.path &&
          candidate.path.startsWith(`${diagnostic.path}/`),
      ),
  );
}

/** Validates unknown input without mutating or silently normalizing it. */
export function validate(spec: unknown): ValidateSchemaResult {
  const jsonIssues = inspectJSON(spec);
  if (jsonIssues.length) {
    return {
      ok: false,
      diagnostics: jsonIssues.map(({ path, type, message }) => ({
        path,
        keyword: 'jsonSerializable',
        message,
        params: { type },
      })),
    };
  }

  const errors = schemaErrors(spec);
  if (errors.length) {
    const diagnostics = diagnosticsFromAjv(errors);
    return { ok: false, diagnostics };
  }
  return { ok: true, diagnostics: [], value: spec as G2Spec };
}
