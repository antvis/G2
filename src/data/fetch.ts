import { autoType as d3AutoType, dsvFormat } from '@antv/vendor/d3-dsv';
import type { DataComponent as DC } from '../runtime';
import type { FetchConnector } from '../spec';
import { identity } from '../utils/helper';

export type FetchOptions = Omit<FetchConnector, 'type'>;

export const Fetch: DC<FetchOptions> = (options) => {
  const {
    value,
    format = value.split('.').pop(),
    delimiter = ',',
    autoType = true,
  } = options;
  return async () => {
    const response = await fetch(value);

    if (format === 'csv') {
      // @see: https://github.com/d3/d3-dsv#dsv_parse
      const str = await response.text();
      return dsvFormat(delimiter).parse(str, autoType ? d3AutoType : identity);
    }
    if (format === 'json') {
      return await response.json();
    }
    throw new Error(`Unknown format: ${format}.`);
  };
};

Fetch.props = {};
