import { TransformComponent as TC } from '../runtime';
import { SubsetTransform } from '../spec';
import { Pick } from './pick';
import { useMemoTransform } from './utils';

export type SubsetOptions = Omit<SubsetTransform, 'type'>;

/**
 * Immutable data sort by specified fields.
 */
export const Subset: TC<SubsetOptions> = (options) => {
  return useMemoTransform(
    (data) => {
      const { fields: F = [] } = options;
      const pick = Pick({ fields: F });
      let { start: s = 0, end: e = data.length } = options;

      if (s < 0 || s > data.length - 1) s = 0;

      if (e < 0 || e > data.length) e = data.length;

      if (s > e) {
        [s, e] = [e, s];
      }

      return (pick(data) as any[]).filter((_, i) => i >= s && i < e);
    },
    [options],
  );
};

Subset.props = {};
