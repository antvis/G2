import { MarkComponent as MC, Vector2 } from '../runtime';
import { RectMark } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  tooltip1d,
} from './utils';

export type RectOptions = Omit<RectMark, 'type'>;

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

const shapes = ['rect', 'hollow'];

Rect.props = {
  defaultShape: 'rect',
  defaultLabelShape: 'label',
  composite: false,
  channels: [
    ...baseGeometryChannels({ shapes }),
    { name: 'x', required: true },
    { name: 'y', required: true },
  ],
  preInference: [...basePreInference(), { type: 'maybeZeroY1' }],
  postInference: [...basePostInference(), ...tooltip1d()],
  interaction: {
    shareTooltip: true,
  },
};
