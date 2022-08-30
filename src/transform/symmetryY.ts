import { deepMix } from '@antv/util';
import { extent } from 'd3-array';
import { TransformComponent as TC } from '../runtime';
import { SymmetryYTransform } from '../spec';
import { columnOf, column } from './utils/helper';
import { createGroups } from './utils/order';

export type SymmetryYOptions = Omit<SymmetryYTransform, 'type'>;

/**
 * The SymmetryY transform apply offset for y channels, say to transform
 * them to be symmetry.
 */
export const SymmetryY: TC<SymmetryYOptions> = (options = {}) => {
  const { groupBy = 'x' } = options;
  return (I, mark) => {
    const { encode } = mark;
    const { x, ...rest } = encode;

    // Extract and create new channels starts with y, such as y, y1.
    const Yn = Object.entries(rest)
      .filter(([k]) => k.startsWith('y'))
      .map(([k]) => [k, columnOf(encode, k)[0]] as const);
    const newYn = Yn.map(([k]) => [k, new Array(I.length)] as const);

    // Group marks into series by specified keys.
    const groups = createGroups(groupBy, I, mark);
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

    return [
      I,
      deepMix({}, mark, {
        encode: Object.fromEntries(
          newYn.map(([k, v]) => [k, column(v, columnOf(encode, k)[1])]),
        ),
      }),
    ];
  };
};

SymmetryY.props = {};
