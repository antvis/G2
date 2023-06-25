import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { constant, visualColumn } from './utils/helper';

export type MaybeGradientOptions = Record<string, never>;

/**
 * Add 3 constant encode for size channel.
 * This is useful for point geometry.
 */
export const MaybeGradient: TC<MaybeGradientOptions> = () => {
  return (I, mark) => {
    const { style = {}, encode } = mark;
    const { series } = encode;
    const { gradient } = style;
    if (!gradient || series) return [I, mark];
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
