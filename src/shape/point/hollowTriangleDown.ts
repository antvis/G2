import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type HollowTriangleDownOptions = Record<string, any>;

/**
 * ▽
 */
export const HollowTriangleDown: SC<HollowTriangleDownOptions> = (options) => {
  return ColorPoint({
    colorAttribute: 'stroke',
    symbol: 'triangle-down',
    ...options,
  });
};

HollowTriangleDown.props = {
  ...ColorPoint.props,
};
