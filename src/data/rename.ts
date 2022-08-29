import { DataComponent as DC } from '../runtime';
import { RenameTransform } from '../spec';

export function isEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}

export type RenameOptions = Omit<RenameTransform, 'type'>;

/**
 * Immutable data rename by specified fields.
 */
export const Rename: DC<RenameOptions> = (options) => {
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

Rename.props = {};
