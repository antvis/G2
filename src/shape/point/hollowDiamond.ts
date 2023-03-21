import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type HollowDiamondOptions = Record<string, any>;

/**
 * ◇
 */
export const HollowDiamond: SC<HollowDiamondOptions> = (options) => {
  return Color({
    colorAttribute: 'stroke',
    symbol: 'diamond',
    ...options,
  });
};

HollowDiamond.props = {
  defaultMarker: 'hollowDiamond',
  ...Color.props,
};
