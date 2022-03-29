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
      let { start = 0, end = data.length } = options;

      if (start < 0) start = 0;
      if (start > data.length - 1) start = data.length - 1;
      if (end > data.length) end = data.length;
      if (end < 0) end = 0;
      if (start > end) {
        [start, end] = [end, start];
      }

      return pick(data).filter((_, i) => i >= start && i < end);
    },
    [options],
  );
};

Subset.props = {};
