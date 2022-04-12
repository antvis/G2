import { MarkComponent as MC, Vector2 } from '../runtime';
import { TextGeometry } from '../spec';
import { baseInference, baseChannels } from './utils';

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
    ...baseChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'text', required: true, scale: 'identity' },
    { name: 'fontSize' },
    { name: 'rotate' },
  ],
  infer: [...baseInference()],
  shapes: ['text'],
};
