import { rollup } from 'd3-array';
import { DataComponent as DC } from '../runtime';
import { JoinTransform } from '../spec';

function field(key: string | ((d: any) => any)): (d: any) => any {
  return typeof key === 'string' ? (d) => d[key] : key;
}

export type JoinOptions = Omit<JoinTransform, 'type'>;

/**
 * Join data with another dataset by SQL style.
 */
export const Join: DC<JoinOptions> = (options) => {
  // const { fromKey, from, key, unknown = NaN, ...rest } = options;
  const { join, on, select = [], as = select, unknown = NaN } = options;
  const [key, fromKey] = on;
  const fk = field(fromKey);
  const k = field(key);
  const keyData = rollup(
    join,
    ([d]) => d, // Get the first matched.
    (d) => fk(d),
  );
  return (data) =>
    data.map((d) => {
      const source = keyData.get(k(d));
      return {
        ...d,
        ...select.reduce(
          (prev, key, idx) => (
            (prev[as[idx]] = source ? source[key] : unknown), prev
          ),
          {},
        ),
      };
    });
};

Join.props = {};
