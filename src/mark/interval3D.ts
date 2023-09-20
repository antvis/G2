import { Coordinate3D } from '@antv/coord';
import { Band } from '@antv/scale';
import { MarkComponent as MC, Vector3 } from '../runtime';
import { PointMark } from '../spec';
import {
  MaybeZeroX,
  MaybeZeroY,
  MaybeZeroZ,
  MaybeSize,
  MaybeZeroY1,
} from '../transform';
import { Sphere, IntervalCube } from '../shape';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  tooltip3d,
} from './utils';

export type PointOptions = Omit<PointMark, 'type'>;

/**
 * Convert value for each channel to rect shapes.
 * return two 3D points, which represents the bounding box of a rect.
 */
export const Interval3D: MC<PointOptions> = (options) => {
  return (index, scale, value, coordinate) => {
    const {
      x: X,
      y: Y,
      y1: Y1,
      z: Z,
      size: SZ,
      dx: DX,
      dy: DY,
      dz: DZ,
    } = value;

    // The scales for x and series channels must be band scale.
    const x = scale.x as Band;
    const z = scale.x as Band;
    const [width, height, depth] = (
      coordinate as unknown as Coordinate3D
    ).getSize();
    const x1x2 = (x: number, w: number, i: number) => [x, x + w];

    // Calc the points of bounding box for the interval.
    // They are start from left-top corner in clock wise order.
    // TODO: series support
    const P = Array.from(index, (i) => {
      const groupWidthX = bandWidth(x, X[i]);
      const groupWidthZ = bandWidth(z, Z[i]);
      const x0 = +X[i];
      const z0 = +Z[i];
      const [x1, x2] = x1x2(x0, groupWidthX, i);
      const [z1, z2] = x1x2(z0, groupWidthZ, i);
      const y1 = +Y[i];
      const y2 = +Y1[i];

      const p1 = [x1, y1, z1];
      const p2 = [x2, y2, z2];

      return [
        (coordinate as unknown as Coordinate3D).map([...p1]),
        (coordinate as unknown as Coordinate3D).map([...p2]),
      ];
    });
    return [index, P];
  };
};

function bandWidth(scale: Band, xz: any): number {
  return scale.getBandWidth(scale.invert(xz));
}

const shape = {
  cube: IntervalCube,
};

Interval3D.props = {
  defaultShape: 'cube',
  defaultLabelShape: 'label',
  composite: false,
  shape,
  channels: [
    ...baseGeometryChannels({ shapes: Object.keys(shape) }),
    { name: 'x', scale: 'band', required: true },
    { name: 'z', scale: 'band', required: true },
    { name: 'y', required: true },
    { name: 'series', scale: 'band' },
    { name: 'size' },
  ],
  preInference: [
    ...basePreInference(),
    { type: MaybeZeroX },
    { type: MaybeZeroY1 },
    { type: MaybeZeroZ },
  ],
  postInference: [...basePostInference(), { type: MaybeSize }, ...tooltip3d()],
};
