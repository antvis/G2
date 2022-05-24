import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type TriangleOptions = Record<string, any>;

/**
 * ▲
 */
export const Triangle: SC<TriangleOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'fill', symbol: 'triangle', ...options });
};

Triangle.props = {
  ...ColorPoint.props,
};
