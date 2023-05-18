import { MarkComponent as MC, Vector2 } from '../runtime';
import { HeatmapMark } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  createBandOffset,
  tooltip2d,
} from './utils';

export type HeatmapOptions = Omit<HeatmapMark, 'type'>;

/**
 * Draw heatmap with gradient.
 */
export const Heatmap: MC<HeatmapOptions> = (options) => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, x1: X1, y1: Y1, size: S } = value;
    const [width, height] = coordinate.getSize();
    const offset = createBandOffset(scale, value, options);
    const xy: (i: number) => Vector2 = (i) => {
      const x = X1 ? (+X[i] + +X1[i]) / 2 : +X[i];
      const y = Y1 ? (+Y[i] + +Y1[i]) / 2 : +Y[i];
      return [x, y];
    };
    const P = S
      ? Array.from(index, (i) => {
          const [cx, cy] = xy(i);
          const r = +S[i];
          const a = r / width;
          const b = r / height;
          const p1: Vector2 = [cx - a, cy - b];
          const p2: Vector2 = [cx + a, cy + b];
          return [
            coordinate.map(offset(p1, i)),
            coordinate.map(offset(p2, i)),
          ] as Vector2[];
        })
      : Array.from(
          index,
          (i) => [coordinate.map(offset(xy(i), i))] as Vector2[],
        );
    return [index, P];
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
    { name: 'size' },
  ],
  preInference: [
    ...basePreInference(),
    { type: 'maybeZeroY' },
    { type: 'maybeZeroX' },
  ],
  postInference: [
    ...basePostInference(),
    { type: 'maybeSize' },
    ...tooltip2d(),
  ],
};
