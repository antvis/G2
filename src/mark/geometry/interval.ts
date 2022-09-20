import { Band } from '@antv/scale';
import { MarkComponent as MC, Vector2 } from '../../runtime';
import { IntervalGeometry } from '../../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from '../utils';

export type IntervalOptions = Omit<IntervalGeometry, 'type'>;

/**
 * Convert value for each channel to rect shapes.
 * p0        p1
 *    ┌────┐
 *    │    │
 *    │    │
 * p3 └────┘ p2
 */
export const Interval: MC<IntervalOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, y1: Y1, series: S } = value;

    // Calc width for each interval.
    // The scales for x and series channels must be band scale.
    const x = scale.x as Band;
    const series = scale.series as Band;

    // Calc the points of bounding box for the interval.
    // They are start from left-top corner in clock wise order.
    const P = Array.from(index, (i) => {
      const groupWidth = x.getBandWidth(x.invert(+X[i]));
      const ratio = series ? series.getBandWidth(series.invert(+S?.[i])) : 1;
      const width = groupWidth * ratio;
      const offset = (+S?.[i] || 0) * groupWidth;
      const x1 = +X[i] + offset;
      const x2 = x1 + width;
      const y1 = +Y[i];
      const y2 = +Y1[i];
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
  defaultLabelShape: 'label',
  channels: [
    ...baseGeometryChannels(),
    { name: 'x', scale: 'band', required: true },
    { name: 'y', required: true },
    { name: 'series', scale: 'band' },
  ],
  preInference: [
    ...basePreInference(),
    { type: 'maybeZeroY1' },
    { type: 'maybeZeroX' },
  ],
  postInference: [
    ...basePostInference(),
    { type: 'maybeTitleX' },
    { type: 'maybeTooltipY' },
  ],
  shapes: ['rect', 'hollowRect', 'funnel', 'pyramid'],
};
