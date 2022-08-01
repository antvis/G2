import { dsvFormat } from 'd3-dsv';
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
  const { url, callback = identity, format, delimiter = ',' } = options;
  return merge(async () => {
    const response = await fetch(url);
    if (format === 'csv') {
      // Detail to see: https://github.com/d3/d3-dsv#dsv_parse
      const str = await response.text();
      return { data: dsvFormat(delimiter).parse(str, callback) };
    }
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
