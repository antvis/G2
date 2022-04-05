import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type PointOptions = Record<string, any>;

/**
 * Render point in different coordinate and using color channel for stroke attribute.
 */
export const Point: SC<PointOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'fill', ...options });
};

Point.props = {
  ...ColorPoint.props,
};
