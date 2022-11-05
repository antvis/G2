import { rollup } from 'd3-array';
import { DataComponent as DC } from '../runtime';
import { LookupTransform } from '../spec';

function field(key: string | ((d: any) => any)): (d: any) => any {
  return typeof key === 'string' ? (d) => d[key] : key;
}

export type LookupOptions = Omit<LookupTransform, 'type'>;

/**
 * Lookup value from `from` data.
 */
export const Lookup: DC<LookupOptions> = (options) => {
  const { fromKey, from, key, unknown = NaN, ...rest } = options;
  const fields = Object.entries(rest);
  const fk = field(fromKey);
  const k = field(key);
  const keyData = rollup(
    from,
    ([d]) => d,
    (d) => fk(d),
  );
  return (data) =>
    data.map((d) => {
      const source = keyData.get(k(d));
      return {
        ...d,
        ...Object.fromEntries(
          fields.map(([sKey, tKey]) => [tKey, source ? source[sKey] : unknown]),
        ),
      };
    });
};

Lookup.props = {};
