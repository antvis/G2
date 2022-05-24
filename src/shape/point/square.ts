import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type SquareOptions = Record<string, any>;

/**
 * ■
 */
export const Square: SC<SquareOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'fill', symbol: 'square', ...options });
};

Square.props = {
  ...ColorPoint.props,
};
