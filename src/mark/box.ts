import { Band } from '@antv/scale';
import { Vector2, MarkComponent as MC } from '../runtime';
import { BoxMark } from '../spec';
import { BoxShape, BoxViolin } from '../shape';
import { MaybeZeroX } from '../transform';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  tooltip1d,
} from './utils';

const shape = {
  box: BoxShape,
  violin: BoxViolin,
};

export type BoxOptions = Omit<BoxMark, 'type'>;

/**
 * Convert value for each channel to box shapes.
 *
 * p0           p2          p1
 *    ──────────┬──────────
 *              │
 *              │
 *              │
 *              │
 *              │
 *              │
 *              │ p3
 * p4 ┌─────────┴──────────┐ p5
 *    │                    │
 *    │                    │
 * p8 ├────────────────────┤ p9
 *    │                    │
 *    │        p10         │
 * p7 └─────────┬──────────┘ p6
 *              │
 *              │
 *              │
 *              │
 *              │
 *              │
 *              │
 *              │
 *   ───────────┴───────────
 * p12         p11           p13
 */
export const Box: MC<BoxOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, y1: Y1, y2: Y2, y3: Y3, y4: Y4, series: S } = value;

    // Calc width for each box.
    // The scales for x and series channels must be band scale.
    const xScale = scale.x as Band;
    const series = scale.series as Band;

    const P = Array.from(index, (i) => {
      const groupWidth = xScale.getBandWidth(xScale.invert(+X[i]));
      const ratio = series ? series.getBandWidth(series.invert(+S?.[i])) : 1;
      const width = groupWidth * ratio;
      const offset = (+S?.[i] || 0) * groupWidth;

      const x = +X[i] + offset + width / 2;
      const [low, q1, median, q3, high] = [
        +Y[i],
        +Y1[i],
        +Y2[i],
        +Y3[i],
        +Y4[i],
      ];

      const P13 = [
        [x - width / 2, high],
        [x + width / 2, high],
        [x, high],
        [x, q3], // idx = 3
        [x - width / 2, q3],
        [x + width / 2, q3],
        [x + width / 2, q1],
        [x - width / 2, q1],
        [x - width / 2, median], // idx = 8
        [x + width / 2, median],
        [x, q1], // idx = 10
        [x, low],
        [x - width / 2, low],
        [x + width / 2, low],
      ];

      return P13.map((d) => coordinate.map(d)) as Vector2[];
    });
    return [index, P];
  };
};

Box.props = {
  defaultShape: 'box',
  defaultLabelShape: 'label',
  composite: false,
  shape,
  channels: [
    ...baseGeometryChannels({ shapes: Object.keys(shape) }),
    { name: 'x', scale: 'band', required: true },
    { name: 'y', required: true },
    { name: 'series', scale: 'band' },
  ],
  preInference: [...basePreInference(), { type: MaybeZeroX }],
  postInference: [...basePostInference(), ...tooltip1d()],
  interaction: {
    shareTooltip: true,
  },
};
