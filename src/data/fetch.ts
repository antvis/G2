import { dsvFormat } from 'd3-dsv';
import { identity } from '../utils/helper';
import { FetchConnector } from '../spec';
import { DataComponent as DC } from '../runtime';

export type FetchOptions = Omit<FetchConnector, 'type'>;

export const Fetch: DC<FetchOptions> = (options) => {
  const { url, callback = identity, format, delimiter = ',' } = options;
  return async () => {
    const response = await fetch(url);
    if (format === 'csv') {
      // @see: https://github.com/d3/d3-dsv#dsv_parse
      const str = await response.text();
      return { data: dsvFormat(delimiter).parse(str, callback) };
    }
    const data = await response.json();
    // @Todo: Remove the `callback`.
    return Array.isArray(data) ? data.map(callback) : data;
  };
};

Fetch.props = {};
