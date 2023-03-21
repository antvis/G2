import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type HollowTriangleDownOptions = Record<string, any>;

/**
 * ▽
 */
export const HollowTriangleDown: SC<HollowTriangleDownOptions> = (options) => {
  return Color({
    colorAttribute: 'stroke',
    symbol: 'triangle-down',
    ...options,
  });
};

HollowTriangleDown.props = {
  defaultMarker: 'hollowTriangleDown',
  ...Color.props,
};
