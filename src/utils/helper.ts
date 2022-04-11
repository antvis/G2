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

type Flow = {
  set(key: string, normalize?, callback?): Flow;
  setAsync(key: string, normalize?, callback?): Promise<Flow>;
};
/**
 * @todo Combine with the `Container` util
 */
export function flow(
  target: Record<keyof any, any>,
  source: Record<keyof any, any>,
): Flow {
  return {
    set(key: string, normalize?, callback?) {
      if (source[key] === undefined) return this;

      const value = normalize ? normalize.call(null, source[key]) : source[key];
      if (callback) callback.call(null, value);
      else if (typeof target[key] === 'function') target[key](value);
      else target[key] = value;

      return this;
    },
    async setAsync(key: string, normalize?, callback?) {
      if (source[key] === undefined) return this;

      const value = normalize
        ? await normalize.call(null, source[key])
        : source[key];
      if (callback) callback.call(null, value);
      else if (typeof target[key] === 'function') target[key](value);
      else target[key] = value;

      return this;
    },
  };
}
