import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type HollowDiamondOptions = Record<string, any>;

/**
 * ◇
 */
export const HollowDiamond: SC<HollowDiamondOptions> = (options) => {
  return ColorPoint({
    colorAttribute: 'stroke',
    symbol: 'diamond',
    ...options,
  });
};

HollowDiamond.props = {
  ...ColorPoint.props,
};
