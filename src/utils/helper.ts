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
