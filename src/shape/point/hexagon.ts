import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type HexagonOptions = Record<string, any>;

/**
 * ⭓
 */
export const Hexagon: SC<HexagonOptions> = (options) => {
  return Color({ colorAttribute: 'fill', symbol: 'hexagon', ...options });
};

Hexagon.props = {
  defaultMarker: 'hexagon',
  ...Color.props,
};
