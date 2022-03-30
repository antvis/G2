import { Vector } from '@antv/coord';
import { group } from 'd3-array';
import { isParallel } from '../utils/coordinate';
import { Mark, MarkComponent as MC, Vector2 } from '../runtime';
import { LineGeometry } from '../spec';
import { applyStyle } from './utils';

export type LineOptions = Omit<LineGeometry, 'type'>;

/**
 * Convert value for each channel to line shapes.
 */
export const Line: MC<LineOptions> = (options) => {
  const { style = {} } = options;

  const normalLine: Mark = (index, scale, value, coordinate, theme) => {
    const { series: S, x: X, y: Y, shape: SP } = value;

    // Because x and y channel is not strictly required in Line.props,
    // it should throw error with empty x or y channels.
    if (X === undefined || Y === undefined) {
      throw new Error('Missing encode for x or y channel.');
    }

    // Group data into series.
    // There is only one series without specified series encode.
    const series = S ? Array.from(group(index, (i) => S[i]).values()) : [index];

    // A group of data corresponds to one line.
    return Array.from(series, (I) => {
      const points = I.map((i) =>
        coordinate.map([X[i][0], Y[i][0]]),
      ) as Vector2[];

      // Using the style of the first point as the style for the whole line.
      const [i] = I;
      const channelStyle = applyStyle(i, value, style, theme);
      return SP[i](points, channelStyle, coordinate);
    });
  };

  const parallelLine: Mark = (index, scale, value, coordinate, theme) => {
    const { shape: SP } = value;

    // Extract all value for position[number] channels.
    // Because position channel is not strictly required in Line.props,
    // it should throw error with empty position values.
    const PV = Object.entries(value)
      .filter(([key]) => key.startsWith('position'))
      .map(([, value]) => value);
    if (PV.length === 0) {
      throw new Error('Missing encode for position channel.');
    }

    // One data corresponds to one line.
    return Array.from(index, (i) => {
      // Transform high dimension vector to a list of two-dimension vectors.
      // [a, b, c] -> [d, e, f, g, h, i]
      const vector = PV.map((pv) => +pv[i]);
      const vectors = coordinate.map(vector) as Vector;

      // Two-dimension vectors are stored in a flat array, so extract them.
      // [d, e, f, g, h, i] -> [d, e], [f, g], [h, i]
      const points = [];
      for (let i = 0; i < vectors.length; i += 2) {
        points.push([vectors[i], vectors[i + 1]]);
      }

      const channelStyle = applyStyle(i, value, style, theme);
      return SP[i](points, channelStyle, coordinate);
    });
  };

  return (index, scale, value, coordinate, theme) => {
    const mark = isParallel(coordinate) ? parallelLine : normalLine;
    return mark(index, scale, value, coordinate, theme);
  };
};

Line.props = {
  defaultShape: 'line',
  channels: [
    { name: 'x' },
    { name: 'y' },
    { name: 'size' },
    // Series channel is used to classify data, so it is unnecessary to map it.
    { name: 'series', scale: 'identity' },
    { name: 'color' },
    { name: 'position' },
    { name: 'shape' },
    { name: 'enterType' },
    { name: 'enterDelay' },
    { name: 'enterDuration' },
    { name: 'enterEasing' },
  ],
  infer: [
    { type: 'maybeTuple' },
    { type: 'maybeSeries' },
    { type: 'maybeSplitPosition' },
  ],
  shapes: ['line', 'smooth'],
};
