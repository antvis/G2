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
  return Color({ fill: 'none', colorAttribute: 'stroke', ...options });
};

Hollow.props = {
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};
