import flru from 'flru';

const cache = flru(3);
/**
 * A decorator to return new function with LRU cache.
 */
export function lru<T = any, V = any>(
  fn: (...args: T[]) => V,
  keyFn: (...args: T[]) => string = (...args) => `${args[0]}`,
  maxSize = 16,
) {
  const cache = flru(maxSize);

  return (...args) => {
    const key = keyFn(...args);
    let v = cache.get(key);

    if (cache.has(key)) return cache.get(key);

    v = fn(...args);
    cache.set(key, v);

    return v;
  };
}
