import { MarkComponent as MC, Vector2 } from '../runtime';
import { RectGeometry } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from './utils';

export type RectOptions = Omit<RectGeometry, 'type'>;

export const Rect: MC<RectOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, x1: X1, y: Y, y1: Y1 } = value;

    const P = Array.from(index, (i) => {
      const p1 = [+X[i], +Y[i]];
      const p2 = [+X1[i], +Y[i]];
      const p3 = [+X1[i], +Y1[i]];
      const p4 = [+X[i], +Y1[i]];

      return [p1, p2, p3, p4].map((d) => coordinate.map(d)) as Vector2[];
    });

    return [index, P];
  };
};

Rect.props = {
  defaultShape: 'rect',
  defaultLabelShape: 'label',
  channels: [
    ...baseGeometryChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
  ],
  preInference: [...basePreInference(), { type: 'maybeZeroY1' }],
  postInference: [
    ...basePostInference(),
    { type: 'maybeTitleX' },
    { type: 'maybeTooltipY' },
  ],
  shapes: ['rect', 'hollow'],
};
