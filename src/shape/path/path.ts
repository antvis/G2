import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

// @todo
export type PathOptions = {
  [key: string]: any;
};

/**
 * A filled path.
 */
export const Path: SC<PathOptions> = (options, context) => {
  return Color({ colorAttribute: 'fill', ...options }, context);
};

Path.props = {
  defaultMarker: 'hvh',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};
