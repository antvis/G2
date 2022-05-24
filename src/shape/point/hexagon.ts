import { ShapeComponent as SC } from '../../runtime';
import { ColorPoint } from './colorPoint';

export type HexagonOptions = Record<string, any>;

/**
 * ⭓
 */
export const Hexagon: SC<HexagonOptions> = (options) => {
  return ColorPoint({ colorAttribute: 'fill', symbol: 'hexagon', ...options });
};

Hexagon.props = {
  ...ColorPoint.props,
};
