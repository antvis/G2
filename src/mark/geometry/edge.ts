import { Vector2, MarkComponent as MC } from '../../runtime';
import { EdgeGeometry } from '../../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from '../utils';
import { Polygon } from './polygon';

export type EdgeOptions = Omit<EdgeGeometry, 'type'>;

/**
 * Convert value for each channel to edge shapes.
 *
 * input:
 *  X: [x0, x1, x2, x3, ...]
 *  Y: [y0, y1, y2, y3, ...]
 * output:
 *  [P0, P1, P2, P3, ...]
 */
export const Edge: MC<EdgeOptions> = (...args) => {
  return Polygon(...args);
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
  shapes: ['edge', 'arc', 'smoothEdge', 'ribbon'],
};
