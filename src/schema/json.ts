import { joinPath } from './path.js';

export type JSONIssue = {
  path: string;
  type: string;
  message: string;
};

function valueType(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'number' && !Number.isFinite(value)) {
    return 'non-finite number';
  }
  if (typeof value === 'object') {
    return value?.constructor?.name || 'object';
  }
  return typeof value;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function inspect(
  value: unknown,
  path: string,
  ancestors: Set<unknown>,
  issues: JSONIssue[],
): void {
  const type = typeof value;
  if (
    type === 'undefined' ||
    type === 'function' ||
    type === 'symbol' ||
    type === 'bigint' ||
    (type === 'number' && !Number.isFinite(value as number))
  ) {
    const received = valueType(value);
    issues.push({
      path,
      type: received,
      message: `Value of type ${received} is not JSON serializable.`,
    });
    return;
  }
  if (value === null || type !== 'object') return;
  if (!Array.isArray(value) && !isPlainObject(value)) {
    const received = valueType(value);
    issues.push({
      path,
      type: received,
      message: `Value of type ${received} is not a plain JSON value.`,
    });
    return;
  }
  if (ancestors.has(value)) {
    issues.push({
      path,
      type: 'circular reference',
      message: 'Circular references are not JSON serializable.',
    });
    return;
  }

  ancestors.add(value);
  for (const [key, child] of Object.entries(value)) {
    inspect(child, joinPath(path, key), ancestors, issues);
  }
  ancestors.delete(value);
}

export function inspectJSON(value: unknown): JSONIssue[] {
  const issues: JSONIssue[] = [];
  inspect(value, '', new Set(), issues);
  return issues;
}
