import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type HollowTriangleOptions = Record<string, any>;

/**
 * △
 */
export const HollowTriangle: SC<HollowTriangleOptions> = (options) => {
  return Color({
    colorAttribute: 'stroke',
    symbol: 'triangle',
    ...options,
  });
};

HollowTriangle.props = {
  defaultMarker: 'hollowTriangle',
  ...Color.props,
};
