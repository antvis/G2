import { Coordinate3D } from '@antv/coord';
import { MarkComponent as MC, Vector2, Vector3 } from '../runtime';
import { PointMark } from '../spec';
import { MaybeZeroX, MaybeZeroY, MaybeSize } from '../transform';
import { Sphere, Cube } from '../shape';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  createBandOffset,
  tooltip3d,
} from './utils';

export type PointOptions = Omit<PointMark, 'type'>;

/**
 * Convert value for each channel to point shapes.
 * Calc the bbox of each point based on x, y and r.
 * This is for allowing their radius can be affected by coordinate(e.g. fisheye).
 */
export const Point3D: MC<PointOptions> = (options) => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, z: Z, x1: X1, y1: Y1, size: S, dx: DX, dy: DY } = value;
    const [width, height, depth] = (
      coordinate as unknown as Coordinate3D
    ).getSize();
    const offset = createBandOffset(scale, value, options);
    const xyz: (i: number) => Vector3 = (i) => {
      const dx = +(DX?.[i] || 0);
      const dy = +(DY?.[i] || 0);
      const x = X1 ? (+X[i] + +X1[i]) / 2 : +X[i];
      const y = Y1 ? (+Y[i] + +Y1[i]) / 2 : +Y[i];
      const cx = x + dx;
      const cy = y + dy;
      return [cx, cy, (Z[i] as number) || 0];
    };
    const P = S
      ? Array.from(index, (i) => {
          const [cx, cy, cz] = xyz(i);
          const r = +S[i];
          const a = r / width;
          const b = r / height;
          const p1: Vector2 = [cx - a, cy - b];
          const p2: Vector2 = [cx + a, cy + b];
          return [
            coordinate.map([...offset(p1, i), cz]),
            coordinate.map([...offset(p2, i), cz]),
          ] as Vector3[];
        })
      : Array.from(index, (i) => {
          const [cx, cy, cz] = xyz(i);
          return [coordinate.map([...offset([cx, cy], i), cz])] as Vector3[];
        });
    return [index, P];
  };
};

const shape = {
  sphere: Sphere,
  cube: Cube,
};

Point3D.props = {
  defaultShape: 'sphere',
  defaultLabelShape: 'label',
  composite: false,
  shape,
  channels: [
    ...baseGeometryChannels({ shapes: Object.keys(shape) }),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'z' },
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
  postInference: [...basePostInference(), { type: MaybeSize }, ...tooltip3d()],
};
