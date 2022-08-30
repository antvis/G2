// @ts-nocheck
import { TransformComponent } from '../../runtime';

function withFunction(_: string, value: any) {
  return typeof value === 'function' ? `${value}` : value;
}
/**
 * Returns a sync function returning memoized transform of preprocessor and connector.
 * The memoized value will recompute only when the data reference or options has changed.
 */
export function useMemoPreprocessor<T>(
  Preprocessor: TransformComponent<T>,
): TransformComponent<T> {
  const dataCache = new Map();
  const NewPreprocessor = (options) => {
    const key = JSON.stringify(options, withFunction);
    const transform = Preprocessor(options);
    return ({ data }) => {
      if (dataCache.has(data)) {
        const cache = dataCache.get(data);
        cache[key] = cache[key] || transform(data);
        return cache[key];
      }
      const cache = {};
      cache[key] = transform({ data });
      dataCache.set(data, cache);
      return cache[key];
    };
  };
  NewPreprocessor.props = Preprocessor.props;
  return NewPreprocessor;
}

/**
 * Returns a async function returning memoized transform and connector.
 * The memoized value will recompute only when the data reference or options has changed.
 */
export function useAsyncMemoPreprocessor<T>(
  Preprocessor: TransformComponent<T>,
): TransformComponent<T> {
  const dataCache = new Map();
  const NewPreprocessor = (options) => {
    const key = JSON.stringify(options, withFunction);
    const transform = Preprocessor(options);
    return async ({ data }) => {
      if (dataCache.has(data)) {
        const cache = dataCache.get(data);
        cache[key] = cache[key] || (await transform(data));
        return cache[key];
      }
      const cache = {};
      cache[key] = transform({ data });
      dataCache.set(data, cache);
      return cache[key];
    };
  };
  NewPreprocessor.props = Preprocessor.props;
  return NewPreprocessor;
}

/**
 * Returns a async function returning memoized connector transform.
 * The memoized value will recompute only when options has changed
 * and ignore data.
 */
export function useMemoConnector<T>(
  Connector: TransformComponent<T>,
): TransformComponent<T> {
  const cache = {};
  const NewConnector = (options) => {
    const transform = Connector(options);
    const key = JSON.stringify(options, withFunction);
    return async () => {
      cache[key] = cache[key] || (await transform({}));
      return cache[key];
    };
  };
  NewConnector.props = Connector.props;
  return NewConnector;
}
