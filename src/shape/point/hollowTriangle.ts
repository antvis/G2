import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type HollowTriangleOptions = Record<string, any>;

/**
 * △
 */
export const HollowTriangle: SC<HollowTriangleOptions> = (options) => {
  return ColorPoint({
    colorAttribute: 'stroke',
    symbol: 'triangle',
    ...options,
  });
};

HollowTriangle.props = {
  ...ColorPoint.props,
};
