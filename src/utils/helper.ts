import { DisplayObject } from '@antv/g';
import { lowerFirst, upperFirst, isPlainObject } from '@antv/util';

export function identity<T>(x: T): T {
  return x;
}

type Func<R> = (x: R, ...args: any[]) => R;
/**
 * Composes functions from left to right.
 */
export function compose<R>(fns: Func<R>[]): Func<R> {
  return fns.reduce(
    (composed, fn) =>
      (x, ...args) =>
        fn(composed(x, ...args), ...args),
    identity,
  );
}

/**
 * Composes single-argument async functions from left to right.
 */
export function composeAsync<R>(
  fns: ((x: R) => Promise<R> | R)[],
): (x: R) => Promise<R> | R {
  return fns.reduce(
    (composed, fn) => async (x) => {
      const value = await composed(x);
      return fn(value);
    },
    identity,
  );
}

export function capitalizeFirst(str: string): string {
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

export function error(message = ''): never {
  throw new Error(message);
}

export function copyAttributes(target: DisplayObject, source: DisplayObject) {
  const { attributes } = source;
  const exclude = new Set(['id', 'className']);
  for (const [key, value] of Object.entries(attributes)) {
    if (!exclude.has(key)) {
      target.attr(key, value);
    }
  }
}

export function defined(x: any) {
  return x !== undefined && x !== null && !Number.isNaN(x);
}

export function random(a: number, b: number): number {
  return a + (b - a) * Math.random();
}

export function useMemo<T = unknown, U = unknown>(
  compute: (key: T) => U,
): (key: T) => U {
  const map = new Map<T, U>();
  return (key) => {
    if (map.has(key)) return map.get(key);
    const value = compute(key);
    map.set(key, value);
    return value;
  };
}

export function appendTransform(node: DisplayObject, transform: any) {
  const { transform: preTransform } = node.style;
  const unset = (d) => d === 'none' || d === undefined;
  const prefix = unset(preTransform) ? '' : preTransform;
  node.style.transform = `${prefix} ${transform}`.trimStart();
}

export function subObject(
  obj: Record<string, any>,
  prefix: string,
): Record<string, any> {
  return maybeSubObject(obj, prefix) || {};
}

export function maybeSubObject(
  obj: Record<string, any>,
  prefix: string,
): Record<string, any> {
  const entries = Object.entries(obj || {})
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, value]) => [lowerFirst(key.replace(prefix, '').trim()), value])
    .filter(([key]) => !!key);
  return entries.length === 0 ? null : Object.fromEntries(entries);
}

export function prefixObject(
  obj: Record<string, any>,
  prefix: string,
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      return [`${prefix}${upperFirst(key)}`, value];
    }),
  );
}

export function filterPrefixObject(
  obj: Record<string, any>,
  prefix: string[],
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) =>
      prefix.find((p) => key.startsWith(p)),
    ),
  );
}

export function omitPrefixObject(
  obj: Record<string, any>,
  ...prefixes: string[]
) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) =>
      prefixes.every((prefix) => !key.startsWith(prefix)),
    ),
  );
}

export function maybePercentage(x: number | string, size: number) {
  if (x === undefined) return null;
  if (typeof x === 'number') return x;
  const px = +x.replace('%', '');
  return Number.isNaN(px) ? null : (px / 100) * size;
}

export function isStrictObject(d: any): boolean {
  return (
    typeof d === 'object' &&
    !(d instanceof Date) &&
    d !== null &&
    !Array.isArray(d)
  );
}

export function isUnset(value) {
  return value === null || value === false;
}

export function deepAssign(
  dist: Record<string, unknown>,
  src: Record<string, unknown>,
  maxLevel = 5,
  level = 0,
): Record<string, unknown> {
  if (level >= maxLevel) return;
  for (const key of Object.keys(src)) {
    const value = src[key];
    if (!isPlainObject(value) || !isPlainObject(dist[key])) {
      dist[key] = value;
    } else {
      deepAssign(
        dist[key] as Record<string, unknown>,
        value as Record<string, unknown>,
        maxLevel,
        level + 1,
      );
    }
  }
  return dist;
}
