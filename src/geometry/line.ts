import { group } from 'd3-array';
import { MarkComponent as MC, Vector2 } from '../runtime';
import { LineGeometry } from '../spec';

export type LineOptions = Omit<LineGeometry, 'type'>;

export const Line: MC<LineOptions> = (options) => {
  const { style = {} } = options;
  return (index, scale, value, coordinate, theme) => {
    const { series: S, x: X, y: Y, shape: SP, color: C } = value;
    const series = S ? Array.from(group(index, (i) => S[i]).values()) : [index];
    const { defaultColor } = theme;
    return Array.from(series, (I) => {
      const [i] = I;
      const shapeFunction = SP[i];
      const channelStyle = {
        color: C?.[i] || defaultColor,
        ...style,
      };
      const points = I.map((i) =>
        coordinate.map([X[i][0], Y[i][0]]),
      ) as Vector2[];
      return shapeFunction(points, channelStyle, coordinate);
    });
  };
};

Line.props = {
  defaultShape: 'line',
  channels: [
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'series', scale: 'identity' },
    { name: 'color' },
    { name: 'shape' },
    { name: 'enterType' },
    { name: 'enterDelay' },
    { name: 'enterDuration' },
    { name: 'enterEasing' },
  ],
  infer: [{ type: 'maybeTuple' }, { type: 'maybeSeries' }],
  shapes: ['line'],
};
