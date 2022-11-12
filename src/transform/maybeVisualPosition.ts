import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { column } from './utils/helper';

export type MaybeVisualPositionOptions = Record<string, never>;

/**
 * Set visual position with style.x and style.y.
 */
export const MaybeVisualPosition: TC<MaybeVisualPositionOptions> = () => {
  return (I, mark) => {
    const { data } = mark;
    if (data) return [I, mark];
    const { style, ...restMark } = mark;
    const { x = 0, y = 0, ...rest } = style;
    return [
      [0],
      deepMix({}, restMark, {
        data: [0],
        cartesian: true,
        encode: {
          x: column([x]),
          y: column([y]),
        },
        scale: {
          x: { type: 'identity', independent: true, guide: null }, // hide axis
          y: { type: 'identity', independent: true, guide: null }, // hide axis
        },
        style: rest,
      }),
    ];
  };
};

MaybeVisualPosition.props = {};
