import schema from './schema.generated.js';
import { schemaErrors, type SchemaValidationError } from './ajv.js';
import { inspectJSON } from './json.js';
import { joinPath, valueAtPath } from './path.js';

type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };

export type JsonPatchOperation =
  | { op: 'add' | 'replace' | 'test'; path: string; value: JSONValue }
  | { op: 'remove'; path: string }
  | { op: 'copy' | 'move'; from: string; path: string };

export type SchemaFixSuggestion = {
  path: string;
  title: string;
  patch: JsonPatchOperation[];
};

type SchemaNode = {
  $ref?: string;
  enum?: readonly JSONValue[];
  const?: JSONValue;
  properties?: Record<string, SchemaNode>;
  oneOf?: SchemaNode[];
};

function resolveSchema(node: SchemaNode): SchemaNode {
  if (!node.$ref?.startsWith('#/')) return node;
  return (valueAtPath(schema, node.$ref.slice(1)) as SchemaNode) || node;
}

function discriminatorCandidates(
  parentSchema: SchemaNode | undefined,
  property: string,
): string[] {
  return (parentSchema?.oneOf || []).flatMap((option) => {
    const value = resolveSchema(option).properties?.[property]?.const;
    return typeof value === 'string' ? [value] : [];
  });
}

function editDistance(a: string, b: string): number {
  const distance = Array.from({ length: a.length + 1 }, () =>
    Array<number>(b.length + 1).fill(0),
  );
  for (let i = 0; i <= a.length; i++) distance[i][0] = i;
  for (let j = 0; j <= b.length; j++) distance[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      distance[i][j] = Math.min(
        distance[i - 1][j] + 1,
        distance[i][j - 1] + 1,
        distance[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        distance[i][j] = Math.min(distance[i][j], distance[i - 2][j - 2] + 1);
      }
    }
  }
  return distance[a.length][b.length];
}

function nearest(value: string, candidates: readonly string[]): string | null {
  if (value.length < 3) return null;
  let result: string | null = null;
  let distance = Infinity;
  let secondDistance = Infinity;
  for (const candidate of candidates) {
    const current = editDistance(value, candidate);
    if (current < distance) {
      secondDistance = distance;
      result = candidate;
      distance = current;
    } else if (current < secondDistance) {
      secondDistance = current;
    }
  }
  const threshold = Math.max(1, Math.floor(value.length / 3));
  return distance <= threshold && distance < secondDistance ? result : null;
}

function replaceSuggestion(
  value: unknown,
  path: string,
  candidates: readonly string[],
): SchemaFixSuggestion | null {
  if (typeof value !== 'string') return null;
  const candidate = nearest(value, candidates);
  return candidate
    ? {
        path,
        title: `Replace ${JSON.stringify(value)} with ${JSON.stringify(
          candidate,
        )}`,
        patch: [{ op: 'replace', path, value: candidate }],
      }
    : null;
}

function suggestionFromError(
  error: SchemaValidationError,
  spec: unknown,
): SchemaFixSuggestion | null {
  const { instancePath, keyword, params } = error;
  const parentSchema = error.parentSchema as SchemaNode | undefined;

  if (keyword === 'additionalProperties') {
    const property = String(params.additionalProperty);
    const path = joinPath(instancePath, property);
    const candidate = nearest(
      property,
      Object.keys(parentSchema?.properties || {}),
    );
    if (
      candidate &&
      valueAtPath(spec, joinPath(instancePath, candidate)) === undefined
    ) {
      return {
        path,
        title: `Rename ${JSON.stringify(property)} to ${JSON.stringify(
          candidate,
        )}`,
        patch: [
          { op: 'move', from: path, path: joinPath(instancePath, candidate) },
        ],
      };
    }
    return {
      path,
      title: `Remove unsupported property ${JSON.stringify(property)}`,
      patch: [{ op: 'remove', path }],
    };
  }

  if (keyword === 'discriminator' && params.error === 'mapping') {
    const property = String(params.tag);
    const path = joinPath(instancePath, property);
    return replaceSuggestion(
      params.tagValue,
      path,
      discriminatorCandidates(parentSchema, property),
    );
  }

  if (keyword === 'enum' || keyword === 'const') {
    const candidates = (
      keyword === 'enum'
        ? params.allowedValues || parentSchema?.enum || []
        : [params.allowedValue ?? parentSchema?.const]
    ).filter((item: unknown): item is string => typeof item === 'string');
    return replaceSuggestion(
      valueAtPath(spec, instancePath),
      instancePath,
      candidates,
    );
  }

  return null;
}

/** Suggests optional JSON Patch operations without mutating the input. */
export function suggestSchemaFixes(spec: unknown): SchemaFixSuggestion[] {
  if (inspectJSON(spec).length) return [];
  const suggestions = schemaErrors(spec)
    .map((error) => suggestionFromError(error, spec))
    .filter((item): item is SchemaFixSuggestion => item !== null);
  return Array.from(
    new Map(
      suggestions.map((suggestion) => [
        JSON.stringify(suggestion.patch),
        suggestion,
      ]),
    ).values(),
  );
}
