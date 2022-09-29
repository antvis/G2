import { MarkComponent as MC, Vector2 } from '../runtime';
import { PointGeometry } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  createBandOffset,
} from './utils';

export type PointOptions = Omit<PointGeometry, 'type'>;

/**
 * Convert value for each channel to point shapes.
 * Calc the bbox of each point based on x, y and r.
 * This is for allowing their radius can be affected by coordinate(e.g. fisheye).
 */
export const Point: MC<PointOptions> = (options) => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, size: S, dx: DX, dy: DY } = value;
    const [width, height] = coordinate.getSize();
    const offset = createBandOffset(scale, value, options);
    const xy: (i: number) => Vector2 = (i) => {
      const dx = +(DX?.[i] || 0);
      const dy = +(DY?.[i] || 0);
      const cx = +X[i] + dx;
      const cy = +Y[i] + dy;
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

Point.props = {
  defaultShape: 'hollow',
  defaultLabelShape: 'label',
  channels: [
    ...baseGeometryChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
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
    { type: 'maybeTitleX' },
    { type: 'maybeTooltipY' },
  ],
  shapes: [
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
    'linePoint',
    'tick',
    'triangleDown',
  ],
};
