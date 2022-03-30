import { identity } from '../utils/helper';
import { TransformComponent as TC } from '../runtime';
import { FetchTransform } from '../spec';
import { useAsyncMemoTransform } from './utils';

export type FetchOptions = Omit<FetchTransform, 'type'>;

/**
 * Fetch resource in different format asynchronously across the network.
 * @todo Support more formats (e.g., csv, dsv).
 */
export const Fetch: TC<FetchOptions> = (options) => {
  const { url, callback = identity } = options;
  return useAsyncMemoTransform(async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data.map(callback);
  }, [options]);
};

Fetch.props = {};
