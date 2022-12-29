import { DataComponent as DC } from '../runtime';
import { FoldTransform } from '../spec';

export function isEmpty(obj: any) {
  return !obj || Object.keys(obj).length === 0;
}

export type FoldOptions = Omit<FoldTransform, 'type'>;

/**
 * Collapses (or “folds”) one or more data fields into two
 * properties: `key` (contains the original data field name)
 * and `value` (contains the original data value.)
 */
export const Fold: DC<FoldOptions> = (options) => {
  const { fields, key = 'key', value = 'value' } = options;
  return (data) => {
    if (isEmpty(fields)) return data;
    return data.flatMap((d) =>
      fields.map((f) => ({ ...d, [key]: f, [value]: d[f] })),
    );
  };
};

Fold.props = {};
