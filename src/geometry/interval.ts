import { Band } from '@antv/scale';
import { MarkComponent as MC, Vector2 } from '../runtime';
import { IntervalGeometry } from '../spec';
import { baseChannels, baseInference } from './utils';

export type IntervalOptions = Omit<IntervalGeometry, 'type'>;

/**
 * Convert value for each channel to rect shapes.
 */
export const Interval: MC<IntervalOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, series: S } = value;

    // Calc width for each interval.
    // The scales for x and series channels must be band scale.
    const x = scale.x as Band;
    const series = scale.series as Band;
    const groupWidth = x.getBandWidth();
    const ratio = series ? series.getBandWidth() : 1;
    const width = groupWidth * ratio;

    // Calc the points of bounding box for the interval.
    // They are start from left-top corner in clock wise order.
    const P = Array.from(index, (i) => {
      const offset = ((S?.[i] as number) || 0) * groupWidth;
      const x1 = X[i][0] + offset;
      const x2 = x1 + width;
      const [y1, y2] = Y[i];
      const p1 = [x1, y1];
      const p2 = [x2, y1];
      const p3 = [x2, y2];
      const p4 = [x1, y2];
      return [p1, p2, p3, p4].map((d) => coordinate.map(d)) as Vector2[];
    });
    return [index, P];
  };
};

Interval.props = {
  defaultShape: 'rect',
  channels: [
    ...baseChannels(),
    { name: 'x', scale: 'band', required: true },
    { name: 'y', required: true },
    { name: 'series', scale: 'band' },
  ],
  infer: [
    ...baseInference(),
    { type: 'maybeZeroX1' },
    { type: 'maybeZeroY2' },
    { type: 'maybeStackY' },
  ],
  shapes: ['rect', 'hollowRect'],
};
