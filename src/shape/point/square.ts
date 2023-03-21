import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type SquareOptions = Record<string, any>;

/**
 * ■
 */
export const Square: SC<SquareOptions> = (options) => {
  return Color({ colorAttribute: 'fill', symbol: 'square', ...options });
};

Square.props = {
  defaultMarker: 'square',
  ...Color.props,
};
