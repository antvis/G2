import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type HollowPointOptions = Record<string, any>;

/**
 * ○
 */
export const HollowPoint: SC<HollowPointOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'stroke', symbol: 'point', ...options });
};

HollowPoint.props = {
  ...ColorPoint.props,
};
