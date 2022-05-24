import { TransformComponent as TC } from '../../runtime';
import { RenameTransform } from '../../spec';
import { merge } from '../utils/helper';

export function isEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}

export type RenameOptions = Omit<RenameTransform, 'type'>;

/**
 * Immutable data rename by specified fields.
 */
export const Rename: TC<RenameOptions> = (options) => {
  const { map } = options;
  return merge(({ data }) => {
    if (!map || isEmpty(map)) return data;
    const rename = (v: any) =>
      Object.entries(v).reduce(
        (datum, [key, value]) => ((datum[map[key] || key] = value), datum),
        {},
      );
    return { data: data.map(rename) };
  });
};

Rename.props = {
  type: 'connector',
};
