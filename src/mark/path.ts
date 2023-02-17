import { MarkComponent as MC } from '../runtime';
import { PathMark } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from './utils';

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

const shapes = ['path', 'hollow'];

Path.props = {
  defaultShape: 'path',
  defaultLabelShape: 'label',
  composite: false,
  channels: [
    ...baseGeometryChannels({ shapes }),
    { name: 'd', scale: 'identity' },
  ],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
};
