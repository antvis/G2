import { Transform } from '../runtime';

export function useMemoTransform(
  callbackFn: Transform,
  deps: any[],
): Transform {
  const dataCache = new Map();
  return (data) => {
    const key = JSON.stringify(deps);
    if (dataCache.has(data)) {
      const cache = dataCache.get(data);
      cache[key] = cache[key] || callbackFn(data);
      return cache[key];
    }
    const cache = {};
    cache[key] = callbackFn(data);
    dataCache.set(data, cache);
    return cache[key];
  };
}

/**
 * @todo Should handle calls in a row? (fn();fn();fn())
 */
export function useAsyncMemoTransform(
  callbackFn: Transform,
  deps: any[],
): Transform {
  const dataCache = new Map();
  return async (data) => {
    const key = JSON.stringify(deps);
    if (dataCache.has(data)) {
      const cache = dataCache.get(data);
      cache[key] = cache[key] || (await callbackFn(data));
      return cache[key];
    }
    const cache = {};
    cache[key] = await callbackFn(data);
    dataCache.set(data, cache);
    return cache[key];
  };
}
