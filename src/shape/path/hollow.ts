import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

// @todo
export type PathOptions = {
  [key: string]: any;
};

/**
 * A hollow path.
 */
export const Hollow: SC<PathOptions> = (options) => {
  return Color({ ...options, fill: 'none', colorAttribute: 'stroke' });
};

Hollow.props = {
  defaultEnterAnimation: 'fadeIn',
};
