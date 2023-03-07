import { Mark, MarkComponent as MC, Vector2 } from '../runtime';
import { ImageMark } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  createBandOffset,
  tooltip2d,
  visualMark,
} from './utils';

export type ImageOptions = Omit<ImageMark, 'type'>;

export const Image: MC<ImageOptions> = (options) => {
  const { cartesian } = options;
  if (cartesian) return visualMark as Mark;
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y } = value;
    const offset = createBandOffset(scale, value, options);
    const P = Array.from(index, (i) => {
      const p: Vector2 = [+X[i], +Y[i]];
      return [coordinate.map(offset(p, i))] as Vector2[];
    });
    return [index, P];
  };
};

const shapes = ['image'];

Image.props = {
  defaultShape: 'image',
  defaultLabelShape: 'label',
  composite: false,
  channels: [
    ...baseGeometryChannels({ shapes }),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'src', scale: 'identity' },
    { name: 'size' },
  ],
  preInference: [
    ...basePreInference(),
    { type: 'maybeTuple' },
    { type: 'maybeVisualPosition' },
  ],
  postInference: [...basePostInference(), ...tooltip2d()],
};
