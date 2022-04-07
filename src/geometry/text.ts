import { MarkComponent as MC, Vector2 } from '../runtime';
import { TextGeometry } from '../spec';

export type TextOptions = Omit<TextGeometry, 'type'>;

export const Text: MC<TextOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y } = value;
    const P = Array.from(index, (i) => {
      return [coordinate.map([+X[i][0], +Y[i][0]])] as Vector2[];
    });
    return [index, P];
  };
};

Text.props = {
  defaultShape: 'text',
  channels: [
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'text', required: true, scale: 'identity' },
    { name: 'fontSize', scale: 'identity' },
    { name: 'rotate', scale: 'identity' },
    { name: 'color' },
    { name: 'shape' },
    { name: 'enterType' },
    { name: 'enterDelay' },
    { name: 'enterDuration' },
    { name: 'enterEasing' },
    { name: 'key', scale: 'identity' },
  ],
  infer: [{ type: 'maybeTuple' }, { type: 'maybeKey' }],
  shapes: ['text'],
};
