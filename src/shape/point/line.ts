import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type LineOptions = Record<string, any>;

/**
 * |
 */
export const Line: SC<LineOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'stroke', symbol: 'line', ...options });
};

Line.props = {
  ...ColorPoint.props,
};
