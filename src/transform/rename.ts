import { TransformComponent as TC } from '../runtime';
import { RenameTransform } from '../spec';
import { useMemoTransform } from './utils';

export function isEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}

export function renameKey(obj: any, oldKey: string, newKey: string) {
  // check if old key = new key
  if (oldKey !== newKey) {
    Object.defineProperty(
      obj,
      newKey, // modify old key
      Object.getOwnPropertyDescriptor(obj, oldKey), // fetch description from object
    );
    delete obj[oldKey]; // delete old key
  }
  return obj;
}

export type RenameOptions = Omit<RenameTransform, 'type'>;

/**
 * Immutable data rename by specified fields.
 */
export const Rename: TC<RenameOptions> = (options) => {
  const { map } = options;
  return useMemoTransform(
    (data) => {
      if (!map || isEmpty(map)) return data;
      const rename = (v: any) =>
        Object.entries(map).reduce(
          (datum, [oldF, newF]) => renameKey(datum, oldF, newF),
          v,
        );
      return data.map(rename);
    },
    [options],
  );
};

Rename.props = {};
