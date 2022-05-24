import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type PointOptions = Record<string, any>;

/**
 * ●
 */
export const Point: SC<PointOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'fill', symbol: 'circle', ...options });
};

Point.props = {
  ...ColorPoint.props,
};
