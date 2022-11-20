import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { column } from './utils/helper';

export type MaybeVisualPositionOptions = Record<string, never>;

/**
 * Set visual position with style.x and style.y.
 * The priority of style.x, style.y is higher than data.
 */
export const MaybeVisualPosition: TC<MaybeVisualPositionOptions> = () => {
  return (I, mark) => {
    const { data, style = {}, ...restMark } = mark;
    const { x: x0, y: y0, ...rest } = style;
    if (x0 == undefined || y0 == undefined) return [I, mark];
    const x = x0 || 0;
    const y = y0 || 0;
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
