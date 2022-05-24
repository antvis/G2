import { MarkComponent as MC, Vector2 } from '../../runtime';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from '../utils';
import { TextGeometry } from '../../spec';

export type TextOptions = Omit<TextGeometry, 'type'>;

export const Text: MC<TextOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y } = value;
    const { x } = scale;
    const P = Array.from(index, (i) => {
      const px = +X[i];
      const py = +Y[i];
      const xoffset = x?.getBandWidth?.() || 0;
      return [coordinate.map([px + xoffset / 2, py])] as Vector2[];
    });
    return [index, P];
  };
};

Text.props = {
  defaultShape: 'text',
  channels: [
    ...baseGeometryChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'text', required: true, scale: 'identity' },
    { name: 'fontSize' },
    { name: 'rotate' },
  ],
  preInference: [...basePreInference()],
  postInference: [
    ...basePostInference(),
    { type: 'maybeTitleX' },
    { type: 'maybeTooltipY' },
  ],
  shapes: ['text'],
};
