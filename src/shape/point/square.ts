import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type SquareOptions = Record<string, any>;

/**
 * ■
 */
export const Square: SC<SquareOptions> = (options, context) => {
  return Color(
    { colorAttribute: 'fill', symbol: 'square', ...options },
    context,
  );
};

Square.props = {
  defaultMarker: 'square',
  ...Color.props,
};
