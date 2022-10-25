import { DisplayObject } from '@antv/g';
import { lowerFirst } from '@antv/util';

export function identity<T>(x: T): T {
  return x;
}

/**
 * Composes single-argument sync functions from left to right.
 */
export function compose<R>(fns: ((x: R) => R)[]): (x: R) => R {
  return fns.reduce((composed, fn) => (x) => fn(composed(x)), identity);
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
    if (!exclude.has(key)) target.attr(key, value);
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
  const prefix = preTransform === 'none' ? '' : preTransform;
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
  const entries = Object.entries(obj)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, value]) => [lowerFirst(key.replace(prefix, '').trim()), value])
    .filter(([key]) => key !== undefined);
  return entries.length === 0 ? null : Object.fromEntries(entries);
}
