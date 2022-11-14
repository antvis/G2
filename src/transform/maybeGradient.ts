import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { column, columnOf, constant, visualColumn } from './utils/helper';

export type MaybeGradientOptions = Record<string, never>;

/**
 * Add 3 constant encode for size channel.
 * This is useful for point geometry.
 */
export const MaybeGradient: TC<MaybeGradientOptions> = () => {
  return (I, mark) => {
    const { style = {} } = mark;
    const { gradient } = style;
    if (!gradient) return [I, mark];
    return [
      I,
      deepMix({}, mark, {
        encode: {
          series: visualColumn(constant(I, undefined)),
        },
      }),
    ];
  };
};

MaybeGradient.props = {};
