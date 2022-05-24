import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type TriangleDownOptions = Record<string, any>;

/**
 * ▼
 */
export const TriangleDown: SC<TriangleDownOptions> = (options) => {
  return ColorPoint({
    colorAttribute: 'fill',
    symbol: 'triangle-down',
    ...options,
  });
};

TriangleDown.props = {
  ...ColorPoint.props,
};
