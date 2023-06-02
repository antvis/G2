import { group } from 'd3-array';
import { MarkComponent as MC } from '../runtime';
import { AreaMark } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  tooltip1d,
} from './utils';

export type AreaOptions = Omit<AreaMark, 'type'>;

/*
 * Convert value for each channel to area shapes.
 *
 *     ▲
 *     │
 *     │                                         y2
 *     │
 *     │                     y1     xxxxxxxxxxxxx
 *     │                         xxxx            x
 *     │                      xxx                x
 *     │                    xxx                  x
 *     │        y0       xxx                     x
 *     │           xxxxxxx                       x
 *     │          x                              x
 *     │         xx                              x
 *     │         x                               x
 *     │         x                               x
 *     │         x                               x
 *     │         x                               x
 *     │         x                               x
 *     │         x                               x
 *     │         x                               x
 * ────┼─────────x───────────────────────────────x──────────────►
 *     │        y3             y4                y5
 */

export const Area: MC<AreaOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, y1: Y1, series: S } = value;
    const { x, y } = scale;

    // Group data by series field.
    const series = S ? Array.from(group(index, (i) => S[i]).values()) : [index];
    const I = series.map((group) => group[0]).filter((i) => i !== undefined);

    // A group of data corresponds to one area.
    const xoffset = (x?.getBandWidth?.() || 0) / 2;
    const yoffset = (y?.getBandWidth?.() || 0) / 2;
    const P = Array.from(series, (SI) => {
      const l = SI.length;
      const points = new Array(l * 2);

      for (let idx = 0; idx < SI.length; idx++) {
        const i = SI[idx];
        points[idx] = coordinate.map([+X[i] + xoffset, +Y[i] + yoffset]); // y1
        points[l + idx] = coordinate.map([+X[i] + xoffset, +Y1[i] + yoffset]); // y0
      }

      return points;
    });

    return [I, P, series];
  };
};

const shapes = ['area', 'smooth', 'hvh', 'hv', 'vh'];

Area.props = {
  defaultShape: 'area',
  defaultLabelShape: 'label',
  composite: false,
  channels: [
    ...baseGeometryChannels({ shapes }),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'size' },
    { name: 'series', scale: 'identity' },
  ],
  preInference: [
    ...basePreInference(),
    { type: 'maybeSeries' },
    { type: 'maybeZeroY1' },
    { type: 'maybeZeroPadding' },
  ],
  postInference: [...basePostInference(), ...tooltip1d()],
  interaction: {
    shareTooltip: true,
    seriesTooltip: true,
    crosshairs: true,
  },
};
