import { MarkComponent as MC } from '../runtime';
import { PathMark } from '../spec';
import { PathShape, PathHollow } from '../shape';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from './utils';

const shape = {
  path: PathShape,
  hollow: PathHollow,
};

export type PathOptions = Omit<PathMark, 'type'>;

/**
 * Draw a path.
 */
export const Path: MC<PathOptions> = (options) => {
  return (index, scale, value, coordinate) => {
    // The points is meaning less for path mark,
    // because the position of path shapes specified
    // by the d option. So set [0, 0] for render pipeline.
    return [index, index.map(() => [[0, 0]])];
  };
};

Path.props = {
  defaultShape: 'path',
  defaultLabelShape: 'label',
  shape,
  composite: false,
  channels: [
    ...baseGeometryChannels({ shapes: Object.keys(shape) }),
    { name: 'd', scale: 'identity' },
  ],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
};
