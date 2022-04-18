import { identity } from '../utils/helper';
import { TransformComponent as TC } from '../runtime';
import { FetchTransform } from '../spec';
import { useAsyncMemoTransform } from './utils/memo';

export type FetchOptions = Omit<FetchTransform, 'type'>;

const Transform: TC<FetchOptions> = (options) => {
  const { url, callback = identity } = options;
  return async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data.map(callback);
  };
};

/**
 * Fetch resource in different format asynchronously across the network.
 * @todo Support more formats (e.g., csv, dsv).
 */
export const Fetch = useAsyncMemoTransform(Transform);

Fetch.props = {};
