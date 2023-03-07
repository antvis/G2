import { MarkComponent as MC, Vector2 } from '../runtime';
import { PointMark } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  createBandOffset,
  tooltip2d,
} from './utils';

export type PointOptions = Omit<PointMark, 'type'>;

/**
 * Convert value for each channel to point shapes.
 * Calc the bbox of each point based on x, y and r.
 * This is for allowing their radius can be affected by coordinate(e.g. fisheye).
 */
export const Point: MC<PointOptions> = (options) => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, x1: X1, y1: Y1, size: S, dx: DX, dy: DY } = value;
    const [width, height] = coordinate.getSize();
    const offset = createBandOffset(scale, value, options);
    const xy: (i: number) => Vector2 = (i) => {
      const dx = +(DX?.[i] || 0);
      const dy = +(DY?.[i] || 0);
      const x = X1 ? (+X[i] + +X1[i]) / 2 : +X[i];
      const y = Y1 ? (+Y[i] + +Y1[i]) / 2 : +Y[i];
      const cx = x + dx;
      const cy = y + dy;
      return [cx, cy];
    };
    const P = S
      ? Array.from(index, (i) => {
          const [cx, cy] = xy(i);
          const r = +S[i];
          const a = r / width;
          const b = r / height;
          const p1: Vector2 = [cx - a, cy - b];
          const p2: Vector2 = [cx + a, cy + b];
          return [
            coordinate.map(offset(p1, i)),
            coordinate.map(offset(p2, i)),
          ] as Vector2[];
        })
      : Array.from(
          index,
          (i) => [coordinate.map(offset(xy(i), i))] as Vector2[],
        );
    return [index, P];
  };
};

const shapes = [
  'hollow',
  'hollowDiamond',
  'hollowHexagon',
  'hollowSquare',
  'hollowTriangleDown',
  'hollowTriangle',
  'hollowBowtie',
  'point',
  'plus',
  'diamond',
  'square',
  'triangle',
  'hexagon',
  'cross',
  'bowtie',
  'hyphen',
  'line',
  'tick',
  'triangleDown',
];

Point.props = {
  defaultShape: 'hollow',
  defaultLabelShape: 'label',
  composite: false,
  channels: [
    ...baseGeometryChannels({ shapes }),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'series', scale: 'band' },
    { name: 'size', scale: 'sqrt' },
    { name: 'dx', scale: 'identity' },
    { name: 'dy', scale: 'identity' },
  ],
  preInference: [
    ...basePreInference(),
    { type: 'maybeZeroY' },
    { type: 'maybeZeroX' },
  ],
  postInference: [
    ...basePostInference(),
    { type: 'maybeSize' },
    ...tooltip2d(),
  ],
};
