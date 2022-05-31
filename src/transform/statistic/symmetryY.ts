import { extent } from 'd3-array';
import { TransformComponent as TC } from '../../runtime';
import { SymmetryYTransform } from '../../spec';
import { column, field, merge } from '../utils/helper';
import { createGroups } from './utils';

export type SymmetryYOptions = Omit<SymmetryYTransform, 'type'>;

/**
 * The SymmetryY transform apply offset for y channels, say to transform
 * them to be symmetry.
 */
export const SymmetryY: TC<SymmetryYOptions> = (options = {}) => {
  const { groupBy = 'x' } = options;
  return merge((context) => {
    const { I, data, encode, columnOf } = context;
    const { x, ...rest } = encode;

    // Extract and create new channels starts with y, such as y, y1.
    const Yn = Object.entries(rest)
      .filter(([k]) => k.startsWith('y'))
      .map(([k, encode]) => [k, columnOf(data, encode)] as const);
    const newYn = Yn.map(([k, V]) => {
      const newV = new Array(I.length);
      return [k, field(newV, V)] as const;
    });

    // Group marks into series by specified keys.
    const groups = createGroups(groupBy, context);
    const MY = new Array(groups.length);
    for (let i = 0; i < groups.length; i++) {
      const I = groups[i];
      const Y = I.flatMap((i) => Yn.map(([, V]) => +V[i]));
      const [minY, maxY] = extent(Y);
      MY[i] = (minY + maxY) / 2;
    }

    const maxMiddleY = Math.max(...MY);
    for (let m = 0; m < groups.length; m++) {
      const offset = maxMiddleY - MY[m];
      const I = groups[m];
      for (const i of I) {
        for (let j = 0; j < Yn.length; j++) {
          const [, V] = Yn[j];
          const [, newV] = newYn[j];
          newV[i] = +V[i] + offset;
        }
      }
    }

    return {
      encode: Object.fromEntries(newYn.map(([k, v]) => [k, column(v)])),
    };
  });
};

SymmetryY.props = {
  category: 'statistic',
};
