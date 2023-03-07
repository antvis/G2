import { MarkComponent as MC, Vector2, Mark } from '../runtime';
import { TextMark } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  createBandOffset,
  tooltip2d,
  visualMark,
} from './utils';

export type TextOptions = Omit<TextMark, 'type'>;

export const Text: MC<TextOptions> = (options) => {
  const { cartesian = false } = options;
  if (cartesian) return visualMark as Mark;
  return ((index, scale, value, coordinate) => {
    if (cartesian) return visualMark(index, scale, value, coordinate);
    const { x: X, y: Y } = value;
    const offset = createBandOffset(scale, value, options);
    const P = Array.from(index, (i) => {
      const p: Vector2 = [+X[i], +Y[i]];
      return [coordinate.map(offset(p, i))] as Vector2[];
    });
    return [index, P];
  }) as Mark;
};

const shapes = ['text', 'badge'];

Text.props = {
  defaultShape: 'text',
  defaultLabelShape: 'label',
  composite: false,
  channels: [
    ...baseGeometryChannels({ shapes }),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'text', scale: 'identity' },
    { name: 'fontSize' },
    { name: 'rotate' },
  ],
  preInference: [
    ...basePreInference(),
    { type: 'maybeTuple' },
    { type: 'maybeVisualPosition' },
  ],
  postInference: [...basePostInference(), ...tooltip2d()],
};
