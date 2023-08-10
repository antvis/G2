import { MarkComponent as MC, Vector2 } from '../runtime';
import { VectorMark } from '../spec';
import { VectorShape } from '../shape';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  tooltip2d,
} from './utils';

const shape = {
  vector: VectorShape,
};

export type VectorOptions = Omit<VectorMark, 'type'>;

/**
 * Convert value for each channel to start, end.
 * The angle starts from the X axis(right direction).
 */
export const Vector: MC<VectorOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, size: S, rotate: R } = value;
    const [width, height] = coordinate.getSize();

    const P = index.map((i) => {
      const angle = (+R[i] / 180) * Math.PI;
      const s = +S[i];
      const a = s / width;
      const b = s / height;

      const vx = a * Math.cos(angle);
      const vy = -b * Math.sin(angle);

      return [
        coordinate.map([+X[i] - vx / 2, +Y[i] - vy / 2]),
        coordinate.map([+X[i] + vx / 2, +Y[i] + vy / 2]),
      ] as Vector2[];
    });

    return [index, P];
  };
};

Vector.props = {
  defaultShape: 'vector',
  defaultLabelShape: 'label',
  composite: false,
  shape,
  channels: [
    ...baseGeometryChannels({ shapes: Object.keys(shape) }),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'rotate', required: true, scale: 'identity' },
    { name: 'size', required: true },
  ],
  preInference: [...basePreInference()],
  postInference: [...basePostInference(), ...tooltip2d()],
};
