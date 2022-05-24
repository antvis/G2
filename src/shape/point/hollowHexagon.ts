import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type HollowHexagonOptions = Record<string, any>;

/**
 * ⬡
 */
export const HollowHexagon: SC<HollowHexagonOptions> = (options) => {
  return ColorPoint({
    colorAttribute: 'stroke',
    symbol: 'hexagon',
    ...options,
  });
};

HollowHexagon.props = {
  ...ColorPoint.props,
};
