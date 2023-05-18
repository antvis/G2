import { MarkComponent as MC, Vector2 } from '../runtime';
import { HeatmapMark } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  tooltip2d,
} from './utils';

export type HeatmapOptions = Omit<HeatmapMark, 'type'>;

/**
 * Draw heatmap with gradient.
 */
export const Heatmap: MC<HeatmapOptions> = (options) => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, size: S, color: C } = value;
    const P = Array.from(index, (i) => {
      // Default size = 20.
      const r = S ? +S[i] : 20;
      //Warning: x, y, value, radius.
      return [...coordinate.map([+X[i], +Y[i]]), C[i], r] as unknown as Vector2;
    });

    return [[0], [P]];
  };
};

const shapes = ['heatmap'];

Heatmap.props = {
  defaultShape: 'heatmap',
  defaultLabelShape: 'label',
  composite: false,
  channels: [
    ...baseGeometryChannels({ shapes }),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'color', scale: 'identity', required: true },
    { name: 'size' },
  ],
  preInference: [
    ...basePreInference(),
    { type: 'maybeZeroY' },
    { type: 'maybeZeroX' },
  ],
  postInference: [...basePostInference(), ...tooltip2d()],
};
