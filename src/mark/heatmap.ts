import { MarkComponent as MC, Vector2 } from '../runtime';
import { HeatmapMark } from '../spec';
import { HeatmapShape } from '../shape';
import { MaybeZeroX, MaybeZeroY } from '../transform';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  tooltip2d,
} from './utils';

const shape = {
  heatmap: HeatmapShape,
};

export type HeatmapOptions = Omit<HeatmapMark, 'type'>;

/**
 * Draw heatmap with gradient.
 */
export const Heatmap: MC<HeatmapOptions> = (options) => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, size: S, color: C } = value;
    const P = Array.from(index, (i) => {
      // Default size = 40.
      const r = S ? +S[i] : 40;
      // Warning: x, y, value, radius.
      return [...coordinate.map([+X[i], +Y[i]]), C[i], r] as unknown as Vector2;
    });

    return [[0], [P]];
  };
};

Heatmap.props = {
  defaultShape: 'heatmap',
  defaultLabelShape: 'label',
  composite: false,
  shape,
  channels: [
    ...baseGeometryChannels({ shapes: Object.keys(shape) }),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'color', scale: 'identity', required: true },
    { name: 'size' },
  ],
  preInference: [
    ...basePreInference(),
    { type: MaybeZeroX },
    { type: MaybeZeroY },
  ],
  postInference: [...basePostInference(), ...tooltip2d()],
};
