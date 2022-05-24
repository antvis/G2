import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type HollowSquareOptions = Record<string, any>;

/**
 * □
 */
export const HollowSquare: SC<HollowSquareOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'stroke', symbol: 'square', ...options });
};

HollowSquare.props = {
  ...ColorPoint.props,
};
