import { TransformComponent as TC } from '../../runtime';
import { FoldTransform } from '../../spec';
import { merge } from '../utils/helper';

export function isEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}

export type FoldOptions = Omit<FoldTransform, 'type'>;

/**
 * Collapses (or “folds”) one or more data fields into two properties: `key` (contains the original data field name) and `value` (contains the original data value.)
 */
export const Fold: TC<FoldOptions> = (options) => {
  const { fields, as = [] } = options;
  return merge(({ data }) => {
    if (!fields || isEmpty(fields)) return { data };
    const [k = 'key', v = 'value'] = as;
    return {
      data: data.reduce((r, d) => {
        for (let i = 0; i < fields.length; i++) {
          r.push({ ...d, [k]: fields[i], [v]: d[fields[i]] });
        }
        return r;
      }, []),
    };
  });
};

Fold.props = {
  category: 'preprocessor',
};
