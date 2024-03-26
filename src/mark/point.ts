import { MarkComponent as MC, Vector2 } from '../runtime';
import { PointMark } from '../spec';
import {
  PointBowtie,
  PointCross,
  PointDiamond,
  PointHexagon,
  PointHollowBowtie,
  PointHollowDiamond,
  PointHollowHexagon,
  PointHollow,
  PointHollowSquare,
  PointHollowTriangle,
  PointHollowTriangleDown,
  PointHyphen,
  PointLine,
  PointTriangleDown,
  PointPlus,
  PointSquare,
  PointShape,
  PointTick,
  PointTriangle,
  PointCircle,
  PointHollowCircle,
} from '../shape';
import { MaybeZeroX, MaybeZeroY, MaybeSize } from '../transform';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  createBandOffset,
  tooltip2d,
} from './utils';

const shape = {
  hollow: PointHollow,
  hollowDiamond: PointHollowDiamond,
  hollowHexagon: PointHollowHexagon,
  hollowSquare: PointHollowSquare,
  hollowTriangleDown: PointHollowTriangleDown,
  hollowTriangle: PointHollowTriangle,
  hollowBowtie: PointHollowBowtie,
  hollowCircle: PointHollowCircle,
  point: PointShape,
  plus: PointPlus,
  diamond: PointDiamond,
  square: PointSquare,
  triangle: PointTriangle,
  hexagon: PointHexagon,
  cross: PointCross,
  bowtie: PointBowtie,
  hyphen: PointHyphen,
  line: PointLine,
  tick: PointTick,
  triangleDown: PointTriangleDown,
  circle: PointCircle,
};

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

Point.props = {
  defaultShape: 'hollow',
  defaultLabelShape: 'label',
  composite: false,
  shape,
  channels: [
    ...baseGeometryChannels({ shapes: Object.keys(shape) }),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'series', scale: 'band' },
    { name: 'size', quantitative: 'sqrt' },
    { name: 'dx', scale: 'identity' },
    { name: 'dy', scale: 'identity' },
  ],
  preInference: [
    ...basePreInference(),
    { type: MaybeZeroX },
    { type: MaybeZeroY },
  ],
  postInference: [...basePostInference(), { type: MaybeSize }, ...tooltip2d()],
};
