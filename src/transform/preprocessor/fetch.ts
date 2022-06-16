import { identity } from '../../utils/helper';
import { TransformComponent as TC } from '../../runtime';
import { FetchTransform } from '../../spec';
import { merge } from '../utils/helper';

export type FetchOptions = Omit<FetchTransform, 'type'>;

/**
 * Fetch resource in different format asynchronously across the network.
 * @todo Support more formats (e.g., csv, dsv).
 */
export const Fetch: TC<FetchOptions> = (options) => {
  const { url, callback = identity } = options;
  return merge(async () => {
    const response = await fetch(url);
    const data = await response.json();
    // todo: suggested to remove the `callback`, use `connector` transform instead.
    return {
      data: Array.isArray(data) ? data.map(callback) : data,
    };
  });
};

Fetch.props = {
  category: 'preprocessor',
};
