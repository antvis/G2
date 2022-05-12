import { group } from 'd3-array';
import { MarkComponent as MC, Vector2 } from '../runtime';
import { AreaGeometry } from '../spec';
import { baseChannels, baseInference } from './utils';

export type AreaOptions = Omit<AreaGeometry, 'type'>;

/**
 * Convert value for each channel to area shapes.
 */
export const Area: MC<AreaOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, series: S } = value;

    // Group data by series field.
    const series = S ? Array.from(group(index, (i) => S[i]).values()) : [index];
    const I = series.map((group) => group[0]);

    // A group of data corresponds to one area.
    const P = Array.from(series, (SI) => {
      const l = SI.length;
      const points = new Array(l * 2);

      for (let idx = 0; idx < SI.length; idx++) {
        const i = SI[idx];
        points[idx] = coordinate.map([X[i][0], Y[i][0]]); // y1
        points[l + idx] = coordinate.map([X[i][0], Y[i][1]]); // y0
      }

      return points;
    });

    return [I, P];
  };
};

Area.props = {
  defaultShape: 'area',
  channels: [
    ...baseChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'size' },
    { name: 'series', scale: 'identity' },
  ],
  infer: [...baseInference(), { type: 'maybeSeries' }, { type: 'maybeZeroY2' }],
  shapes: ['area', 'smooth'],
};
