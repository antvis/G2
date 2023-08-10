import { Band } from '@antv/scale';
import { MarkComponent as MC, Vector2 } from '../runtime';
import { IntervalMark } from '../spec';
import { MaybeZeroY1, MaybeZeroX } from '../transform';
import {
  IntervalShape,
  IntervalHollow,
  IntervalFunnel,
  IntervalPyramid,
} from '../shape';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  tooltip1d,
} from './utils';

function bandWidth(scale: Band, x: any): number {
  return scale.getBandWidth(scale.invert(x));
}

const shape = {
  rect: IntervalShape,
  hollow: IntervalHollow,
  funnel: IntervalFunnel,
  pyramid: IntervalPyramid,
};

export type IntervalOptions = Omit<IntervalMark, 'type'>;

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
    const { x: X, y: Y, y1: Y1, series: S, size: SZ } = value;

    // Calc width for each interval.
    // The scales for x and series channels must be band scale.
    const x = scale.x as Band;
    const series = scale.series as Band;
    const [width] = coordinate.getSize();
    const NSZ = SZ ? SZ.map((d) => +d / width) : null;
    const x1x2 = !SZ
      ? (x: number, w: number, i: number) => [x, x + w]
      : (x: number, w: number, i: number) => {
          const mx = x + w / 2;
          const s = NSZ[i];
          return [mx - s / 2, mx + s / 2];
        };

    // Calc the points of bounding box for the interval.
    // They are start from left-top corner in clock wise order.
    const P = Array.from(index, (i) => {
      const groupWidth = bandWidth(x, X[i]);
      const ratio = series ? bandWidth(series, S?.[i]) : 1;
      const width = groupWidth * ratio;
      const offset = (+S?.[i] || 0) * groupWidth;
      const x0 = +X[i] + offset;
      const [x1, x2] = x1x2(x0, width, i);
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
  composite: false,
  shape,
  channels: [
    ...baseGeometryChannels({ shapes: Object.keys(shape) }),
    { name: 'x', scale: 'band', required: true },
    { name: 'y', required: true },
    { name: 'series', scale: 'band' },
    { name: 'size' },
  ],
  preInference: [
    ...basePreInference(),
    { type: MaybeZeroY1 },
    { type: MaybeZeroX },
  ],
  postInference: [...basePostInference(), ...tooltip1d()],
  interaction: { shareTooltip: true },
};
