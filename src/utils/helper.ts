import { Coordinate } from '@antv/coord';

export function isTranspose(coordinate: Coordinate): boolean {
  const { transformations } = coordinate.getOptions();
  const transposes = transformations
    .map(([type]) => type)
    .filter((type) => type === 'transpose');
  return transposes.length % 2 !== 0;
}

export function isPolar(coordinate: Coordinate): boolean {
  const { transformations } = coordinate.getOptions();
  return transformations.some(([type]) => type === 'polar');
}

export function identity<T>(x: T): T {
  return x;
}

/**
 * Composes single-argument functions from left to right.
 */
export function compose<R>(fns: ((x: R) => R)[]): (x: R) => R {
  return fns.reduce((composed, fn) => (x) => fn(composed(x)), identity);
}

export function capitalizeFirst(str: string): string {
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

export function error(message = ''): never {
  throw new Error(message);
}
