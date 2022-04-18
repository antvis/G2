import { TransformComponent as TC } from '../runtime';
import { RenameTransform } from '../spec';
import { useMemoTransform } from './utils/memo';

export function isEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}

export type RenameOptions = Omit<RenameTransform, 'type'>;

const Transform: TC<RenameOptions> = (options) => {
  const { map } = options;
  return (data) => {
    if (!map || isEmpty(map)) return data;
    const rename = (v: any) =>
      Object.entries(v).reduce(
        (datum, [key, value]) => ((datum[map[key] || key] = value), datum),
        {},
      );
    return data.map(rename);
  };
};

/**
 * Immutable data rename by specified fields.
 */
export const Rename = useMemoTransform(Transform);

Rename.props = {};
