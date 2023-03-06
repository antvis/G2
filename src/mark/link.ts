import { MarkComponent as MC, Vector2 } from '../runtime';
import { LineMark } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  createBandOffset,
  tooltip2d,
} from './utils';

export type LinkOptions = Omit<LineMark, 'type'>;

/**
 * Connect `start` to `end` with single line.
 */
export const Link: MC<LinkOptions> = (options) => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, x1: X1 = X, y1: Y1 = Y } = value;
    const offset = createBandOffset(scale, value, options);
    const P = index.map((i) => [
      coordinate.map(offset([+X[i], +Y[i]], i)) as Vector2,
      coordinate.map(offset([+X1[i], +Y1[i]], i)) as Vector2,
    ]);
    return [index, P];
  };
};

const shapes = ['link', 'arc', 'vhv', 'smooth'];

Link.props = {
  defaultShape: 'link',
  defaultLabelShape: 'label',
  composite: false,
  channels: [
    ...baseGeometryChannels({ shapes }),
    { name: 'x', required: true },
    { name: 'y', required: true },
  ],
  preInference: [
    ...basePreInference(),
    { type: 'maybeIdentityY' },
    { type: 'maybeIdentityX' },
  ],
  postInference: [...basePostInference(), ...tooltip2d()],
};
