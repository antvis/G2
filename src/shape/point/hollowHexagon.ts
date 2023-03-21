import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type HollowHexagonOptions = Record<string, any>;

/**
 * ⬡
 */
export const HollowHexagon: SC<HollowHexagonOptions> = (options) => {
  return Color({
    colorAttribute: 'stroke',
    symbol: 'hexagon',
    ...options,
  });
};

HollowHexagon.props = {
  defaultMarker: 'hollowHexagon',
  ...Color.props,
};
