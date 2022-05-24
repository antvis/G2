import { MarkComponent as MC, Vector2 } from '../../runtime';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from '../utils';
import { ImageGeometry } from '../../spec';

export type ImageOptions = Omit<ImageGeometry, 'type'>;
export const Image: MC<ImageOptions> = () => {
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

Image.props = {
  defaultShape: 'image',
  channels: [
    ...baseGeometryChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'src', required: true, scale: 'identity' },
    { name: 'size' },
  ],
  preInference: [...basePreInference()],
  postInference: [
    ...basePostInference(),
    { type: 'maybeTitleX' },
    { type: 'maybeTooltipY' },
  ],
  shapes: ['image'],
};
