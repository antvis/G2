import { Band } from '@antv/scale';
import { MarkComponent as MC, Vector2 } from '../runtime';
import { IntervalGeometry } from '../spec';

export type IntervalOptions = Omit<IntervalGeometry, 'type'>;

/**
 * Convert value for each channel to rect shapes.
 */
export const Interval: MC<IntervalOptions> = (options) => {
  const { style = {} } = options;

  return (index, scale, value, coordinate, theme) => {
    const { x: X, y: Y, series: S, color: C, shape: SP } = value;
    const { defaultColor } = theme;

    // Calc width for each interval.
    // The scales for x and series channels must be band scale.
    const x = scale.x as Band;
    const series = scale.series as Band;
    const groupWidth = x.getBandWidth();
    const ratio = series ? series.getBandWidth() : 1;
    const width = groupWidth * ratio;

    return Array.from(index, (i) => {
      // Calc bounding box for the interval.
      // They are start from left-top corner in clock wise order.
      const offset = ((S?.[i] as number) || 0) * groupWidth;
      const x1 = X[i][0] + offset;
      const x2 = x1 + width;
      const [y1, y2] = Y[i];
      const p1 = [x1, y1];
      const p2 = [x2, y1];
      const p3 = [x2, y2];
      const p4 = [x1, y2];
      const points = [p1, p2, p3, p4].map((d) =>
        coordinate.map(d),
      ) as Vector2[];

      // Attribute related to atheistic.
      const shapeFunction = SP[i];
      const channelStyle = {
        color: C?.[i] || defaultColor,
        ...style,
      };
      return shapeFunction(points, channelStyle, coordinate);
    });
  };
};

Interval.props = {
  defaultShape: 'rect',
  channels: [
    { name: 'x', scale: 'band', required: true },
    { name: 'y', required: true },
    { name: 'series', scale: 'band' },
    { name: 'color' },
    { name: 'shape' },
    { name: 'enterType' },
    { name: 'enterDelay' },
    { name: 'enterDuration' },
    { name: 'enterEasing' },
  ],
  infer: [
    { type: 'maybeTuple' },
    { type: 'maybeZeroX1' },
    { type: 'maybeZeroY2' },
  ],
  shapes: ['rect', 'hollowRect'],
};
