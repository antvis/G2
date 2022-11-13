import { MarkComponent as MC, Vector2 } from '../runtime';
import { TextGeometry } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  createBandOffset,
} from './utils';

export type TextOptions = Omit<TextGeometry, 'type'>;

export const Text: MC<TextOptions> = (options) => {
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

const shapes = ['text', 'badge'];

Text.props = {
  defaultShape: 'text',
  defaultLabelShape: 'label',
  channels: [
    ...baseGeometryChannels({ shapes }),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'text', scale: 'identity' },
    { name: 'fontSize' },
    { name: 'rotate' },
  ],
  preInference: [...basePreInference()],
  postInference: [
    ...basePostInference(),
    { type: 'maybeTitleX' },
    { type: 'maybeTooltipY' },
    { type: 'maybeTuple' },
  ],
};
