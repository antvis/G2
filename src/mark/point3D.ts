import { Coordinate3D } from '@antv/coord';
import { MarkComponent as MC, Vector3 } from '../runtime';
import { PointMark } from '../spec';
import { MaybeZeroX, MaybeZeroY, MaybeZeroZ, MaybeSize } from '../transform';
import { Sphere, Cube } from '../shape';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  tooltip3d,
} from './utils';

export type PointOptions = Omit<PointMark, 'type'>;

/**
 * Convert value for each channel to point shapes.
 * Calc the bbox of each point based on x, y and r.
 * This is for allowing their radius can be affected by coordinate(e.g. fisheye).
 */
export const Point3D: MC<PointOptions> = (options) => {
  return (index, _, value, coordinate) => {
    const { x: X, y: Y, z: Z, size: S, dx: DX, dy: DY, dz: DZ } = value;
    const [width, height, depth] = (
      coordinate as unknown as Coordinate3D
    ).getSize();
    const xyz: (i: number) => Vector3 = (i) => {
      const dx = +(DX?.[i] || 0);
      const dy = +(DY?.[i] || 0);
      const dz = +(DZ?.[i] || 0);
      const x = +X[i];
      const y = +Y[i];
      const z = +Z[i];
      const cx = x + dx;
      const cy = y + dy;
      const cz = z + dz;
      return [cx, cy, cz];
    };
    const P = S
      ? Array.from(index, (i) => {
          const [cx, cy, cz] = xyz(i);
          const r = +S[i];
          const a = r / width;
          const b = r / height;
          const c = r / depth;
          const p1: Vector3 = [cx - a, cy - b, cz - c];
          const p2: Vector3 = [cx + a, cy + b, cz + c];
          return [
            (coordinate as unknown as Coordinate3D).map([...p1, cz]),
            (coordinate as unknown as Coordinate3D).map([...p2, cz]),
          ] as Vector3[];
        })
      : Array.from(index, (i) => {
          const [cx, cy, cz] = xyz(i);
          return [
            (coordinate as unknown as Coordinate3D).map([cx, cy, cz]),
          ] as Vector3[];
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
    { name: 'z', required: true },
    { name: 'series', scale: 'band' },
    { name: 'size', quantitative: 'sqrt' },
    { name: 'dx', scale: 'identity' },
    { name: 'dy', scale: 'identity' },
    { name: 'dz', scale: 'identity' },
  ],
  preInference: [
    ...basePreInference(),
    { type: MaybeZeroX },
    { type: MaybeZeroY },
    { type: MaybeZeroZ },
  ],
  postInference: [...basePostInference(), { type: MaybeSize }, ...tooltip3d()],
};
