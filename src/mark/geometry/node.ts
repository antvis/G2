import { MarkComponent as MC } from '../../runtime';
import { NodeGeometry } from '../../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from '../utils';
import { Polygon } from './polygon';

export type NodeOptions = Omit<NodeGeometry, 'type'>;

/**
 * Convert value for each channel to node shapes.
 * Same with polygon.
 */
export const Node: MC<NodeGeometry> = (...args) => {
  return Polygon(...args);
};

Node.props = {
  defaultShape: 'pointNode',
  channels: [
    ...baseGeometryChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'size', required: true },
  ],
  preInference: [...basePreInference()],
  postInference: [
    ...basePostInference(),
    { type: 'maybeTitleX' },
    { type: 'maybeTooltipY' },
  ],
  shapes: ['pointNode', 'polygonNode'],
};
