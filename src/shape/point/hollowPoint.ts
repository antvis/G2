import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type HollowPointOptions = Record<string, any>;

/**
 * Render point in different coordinate and using color channel for stroke attribute.
 */
export const HollowPoint: SC<HollowPointOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'stroke', ...options });
};

HollowPoint.props = {
  ...ColorPoint.props,
};
