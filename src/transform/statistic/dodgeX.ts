import { group } from 'd3-array';
import { TransformComponent as TC } from '../../runtime';
import { DodgeXTransform } from '../../spec';
import { merge, column } from '../utils/helper';

export type DodgeXOptions = Omit<DodgeXTransform, 'type'>;

/**
 * Produce series channel to achieve dodge.
 * @todo Sort marks in each groups.
 */
export const DodgeX: TC<DodgeXOptions> = () => {
  return merge(({ data, encode, columnOf, I }) => {
    const { series, color, x } = encode;
    // If series channel is specified, then do nothing.
    if (series !== undefined) return {};

    // If color channel is specified, assume color channel grouping data into series.
    if (color !== undefined) {
      const C = columnOf(data, color);
      return {
        encode: {
          color: column(C),
          series: column(C),
        },
      };
    }

    // Note!!!
    // If x channel is specified, group marks based on x1.
    // In this case, it's impossible to get information about series.
    // Here using index of each mark in each group as series field to avoid overlapping,
    // which may make no sense if data is disordered in each group.
    if (x !== undefined) {
      const X = columnOf(data, x);
      const groups = Array.from(group(I, (i) => X[i]).values());
      const S = new Array(I.length);
      for (const I of groups) {
        for (let i = 0; i < I.length; i++) {
          const index = I[i];
          series[index] = i;
        }
      }
      return {
        encode: {
          x: column(X),
          series: column(S),
        },
      };
    }
    return {};
  });
};

DodgeX.props = {
  category: 'statistic',
};
