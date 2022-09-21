import { MarkComponent as MC, Vector2 } from '../runtime';
import { ImageGeometry } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from './utils';

export type ImageOptions = Omit<ImageGeometry, 'type'>;
export const Image: MC<ImageOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y } = value;
    const { x, y } = scale;
    const xoffset = (x?.getBandWidth?.() || 0) / 2;
    const yoffset = (y?.getBandWidth?.() || 0) / 2;
    const P = Array.from(index, (i) => {
      const px = +X[i];
      const py = +Y[i];
      return [coordinate.map([px + xoffset, py + yoffset])] as Vector2[];
    });
    return [index, P];
  };
};

Image.props = {
  defaultShape: 'image',
  defaultLabelShape: 'label',
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
