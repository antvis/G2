import { TransformComponent as TC } from '../runtime';
import { SubsetTransform } from '../spec';
import { useMemoTransform } from './utils';

function constrain(options: SubsetOptions, data: any[]) {
  let { start = 0, end = data.length } = options;
  if (start < 0) start = 0;
  if (start > data.length - 1) start = data.length - 1;
  if (end > data.length) end = data.length;
  if (end < 0) end = 0;
  if (start > end) {
    [start, end] = [end, start];
  }
  return { start, end };
}

export type SubsetOptions = Omit<SubsetTransform, 'type'>;

/**
 * Immutable data sort by specified fields.
 */
export const Subset: TC<SubsetOptions> = (options) => {
  return useMemoTransform(
    (data) => {
      const { fields = [] } = options;
      const { start, end } = constrain(options, data);
      const pick = (v: any) =>
        fields.reduce((datum, field) => {
          if (field in v) {
            datum[field] = v[field];
          }
          return datum;
        }, {});
      return data.filter((_, i) => i >= start && i < end).map(pick);
    },
    [options],
  );
};

Subset.props = {};
