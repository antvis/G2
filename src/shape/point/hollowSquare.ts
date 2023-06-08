import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type HollowSquareOptions = Record<string, any>;

/**
 * □
 */
export const HollowSquare: SC<HollowSquareOptions> = (options, context) => {
  return Color(
    { colorAttribute: 'stroke', symbol: 'square', ...options },
    context,
  );
};

HollowSquare.props = {
  defaultMarker: 'hollowSquare',
  ...Color.props,
};
