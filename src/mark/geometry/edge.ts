import { Vector2, MarkComponent as MC } from '../../runtime';
import { EdgeGeometry } from '../../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from '../utils';

export type EdgeOptions = Omit<EdgeGeometry, 'type'>;

/**
 * Convert value for each channel to edge shapes.
 */
export const Edge: MC<EdgeOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, x1: X1, y1: Y1 } = value;

    const xoffset = scale.x?.getBandWidth?.() || 0;

    const P = index.map((i) => [
      coordinate.map([+X[i] + xoffset / 2, +Y[i]]) as Vector2,
      coordinate.map([+X1[i] + xoffset / 2, +Y1[i]]) as Vector2,
    ]);

    return [index, P];
  };
};

Edge.props = {
  defaultShape: 'edge',
  channels: [
    ...baseGeometryChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
  ],
  preInference: [...basePreInference()],
  postInference: [
    ...basePostInference(),
    { type: 'maybeTitleX' },
    { type: 'maybeTooltipY' },
  ],
  shapes: ['edge', 'smoothEdge'],
};
