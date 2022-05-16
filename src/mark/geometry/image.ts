import { MarkComponent as MC, Vector2 } from '../../runtime';
import { baseChannels, baseInference } from '../utils';
import { ImageGeometry } from '../../spec';

export type ImageOptions = Omit<ImageGeometry, 'type'>;
export const Image: MC<ImageOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y } = value;
    const { x } = scale;
    const P = Array.from(index, (i) => {
      const px = +X[i][0];
      const py = +Y[i][0];
      const xoffset = x?.getBandWidth?.() || 0;
      return [coordinate.map([px + xoffset / 2, py])] as Vector2[];
    });
    return [index, P];
  };
};

Image.props = {
  defaultShape: 'image',
  channels: [
    ...baseChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'src', required: true, scale: 'identity' },
    { name: 'size' },
  ],
  infer: [...baseInference()],
  shapes: ['image'],
};
