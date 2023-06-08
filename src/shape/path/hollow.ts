import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

// @todo
export type PathOptions = {
  [key: string]: any;
};

/**
 * A hollow path.
 */
export const Hollow: SC<PathOptions> = (options, context) => {
  return Color({ fill: 'none', colorAttribute: 'stroke', ...options }, context);
};

Hollow.props = {
  defaultMarker: 'hvh',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};
