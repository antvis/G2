import { Band } from '@antv/scale';
import { MarkComponent as MC, Point } from '../runtime';

export type IntervalOptions = {};

export const Interval: MC<IntervalOptions> = () => {
  return (index, scale, value, style, coordinate, theme) => {
    const { x: X, y: Y, series: S, color: C, shape: SP } = value;
    const { defaultColor } = theme;
    const x = scale.x as Band;
    const series = scale.series as Band;
    const groupWidth = x.getBandWidth();
    const intervalWidth = series ? series.getBandWidth() : 1;
    const width = groupWidth * intervalWidth;
    return Array.from(index, (i) => {
      const offset = ((S?.[i] as number) || 0) * groupWidth;
      const x1 = X[i][0] + offset;
      const x2 = x1 + width;
      const [y1, y2] = Y[i];
      const p1 = [x1, y1];
      const p2 = [x2, y1];
      const p3 = [x2, y2];
      const p4 = [x1, y2];
      const points = [p1, p2, p3, p4].map((d) => coordinate.map(d)) as Point[];
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
  ],
  infer: [
    { type: 'maybeTuple' },
    { type: 'maybeZeroX1' },
    { type: 'maybeZeroY2' },
  ],
  shapes: ['rect', 'hollowRect'],
};
