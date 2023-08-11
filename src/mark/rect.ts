import { MarkComponent as MC, Vector2 } from '../runtime';
import { RectMark } from '../spec';
import { RectShape, RectHollow } from '../shape';
import { MaybeZeroY1 } from '../transform';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  tooltip1d,
} from './utils';

const shape = {
  rect: RectShape,
  hollow: RectHollow,
};

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

Rect.props = {
  defaultShape: 'rect',
  defaultLabelShape: 'label',
  composite: false,
  shape,
  channels: [
    ...baseGeometryChannels({ shapes: Object.keys(shape) }),
    { name: 'x', required: true },
    { name: 'y', required: true },
  ],
  preInference: [...basePreInference(), { type: MaybeZeroY1 }],
  postInference: [...basePostInference(), ...tooltip1d()],
  interaction: {
    shareTooltip: true,
  },
};
