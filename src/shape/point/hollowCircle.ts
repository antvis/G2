import { ShapeComponent as SC } from '../../runtime';
import { BaseCircle, Circle } from './circle';

export type HollowCircleOptions = Record<string, any>;

/**
 * ○
 */
export const HollowCircle: SC<HollowCircleOptions> = (options, context) => {
  return BaseCircle({ colorAttribute: 'stroke', ...options }, context);
};

HollowCircle.props = {
  defaultMarker: 'hollowPoint',
  ...Circle.props,
};
