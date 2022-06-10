import { MarkComponent as MC, Vector2 } from '../../runtime';
import { VectorGeometry } from '../../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from '../utils';

export type VectorOptions = Omit<VectorGeometry, 'type'>;

/**
 * Convert value for each channel to start, end.
 * The angle starts from the X axis(right direction).
 */
export const Vector: MC<VectorOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, size: S, rotate: R } = value;

    const P = index.map((i) => {
      const r = R[i] as number;
      const s = S[i] as number;
      const vx = s * Math.cos(r);
      const vy = -s * Math.sin(r);

      const [x, y] = coordinate.map([X[i] as number, Y[i] as number]);
      return [
        [x - vx / 2, y - vy / 2],
        [x + vx / 2, y + vy / 2],
      ] as Vector2[];
    });

    return [index, P];
  };
};

Vector.props = {
  defaultShape: 'vector',
  channels: [
    ...baseGeometryChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'rotate', required: true, scale: 'identity' },
    { name: 'size', required: true },
  ],
  preInference: [...basePreInference()],
  postInference: [
    ...basePostInference(),
    { type: 'maybeTitleX' },
    { type: 'maybeTooltipY' },
  ],
  shapes: ['vector'],
};
