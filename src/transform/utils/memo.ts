import { TransformComponent } from '../../runtime';

function withFunction(_: string, value: any) {
  return typeof value === 'function' ? `${value}` : value;
}
/**
 * Returns a sync function returning memoized transform.
 * The memoized value will recompute only when the data reference or options has changed.
 */
export function useMemoTransform<T>(
  callbackFn: TransformComponent<T>,
): TransformComponent<T> {
  const dataCache = new Map();
  return (options) => {
    const key = JSON.stringify(options, withFunction);
    const transform = callbackFn(options);
    return (data) => {
      if (dataCache.has(data)) {
        const cache = dataCache.get(data);
        cache[key] = cache[key] || transform(data);
        return cache[key];
      }
      const cache = {};
      cache[key] = transform(data);
      dataCache.set(data, cache);
      return cache[key];
    };
  };
}

/**
 * Returns a async function returning memoized transform.
 * The memoized value will recompute only when the data reference or options has changed.
 */
export function useAsyncMemoTransform<T>(
  callbackFn: TransformComponent<T>,
): TransformComponent<T> {
  const dataCache = new Map();
  return (options) => {
    const key = JSON.stringify(options, withFunction);
    const transform = callbackFn(options);
    return async (data) => {
      if (dataCache.has(data)) {
        const cache = dataCache.get(data);
        cache[key] = cache[key] || (await transform(data));
        return cache[key];
      }
      const cache = {};
      cache[key] = transform(data);
      dataCache.set(data, cache);
      return cache[key];
    };
  };
}

/**
 * Returns a async function returning memoized connector transform.
 * The memoized value will recompute only when options has changed
 * and ignore data.
 */
export function useMemoConnector<T>(
  callbackFn: TransformComponent<T>,
): TransformComponent<T> {
  const cache = {};
  return (options) => {
    const connector = callbackFn(options);
    const key = JSON.stringify(options, withFunction);
    return async () => {
      cache[key] = cache[key] || (await connector());
      return cache[key];
    };
  };
}
