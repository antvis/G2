import { Band } from '@antv/scale';
import { Vector2, MarkComponent as MC } from '../../runtime';
import { SchemaGeometry } from '../../spec';
import { baseChannels, baseInference } from '../utils';

export type SchemaOptions = Omit<SchemaGeometry, 'type'>;

/**
 * Convert value for each channel to schema shapes.
 */
export const Schema: MC<SchemaOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, series: S } = value;

    // Calc width for each box.
    // The scales for x and series channels must be band scale.
    const xScale = scale.x as Band;
    const series = scale.series as Band;

    /**
     * Calc the key points of box.
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
    const P = Array.from(index, (i) => {
      const groupWidth = xScale.getBandWidth(xScale.invert(X[i][0]));
      const ratio = series ? series.getBandWidth(series.invert(+S?.[i])) : 1;
      const width = groupWidth * ratio;
      const offset = (+S?.[i] || 0) * groupWidth;

      const x = X[i][0] + offset + groupWidth / 2;

      const [low, q1, median, q3, high] = Y[i];

      const P14 = [
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

      return P14.map((d) => coordinate.map(d)) as Vector2[];
    });
    return [index, P];
  };
};

Schema.props = {
  defaultShape: 'box',
  channels: [
    ...baseChannels(),
    { name: 'x', scale: 'band', required: true },
    { name: 'y', required: true },
    { name: 'series', scale: 'band' },
  ],
  infer: [...baseInference()],
  shapes: ['box'],
};
