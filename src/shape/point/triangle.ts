import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type TriangleOptions = Record<string, any>;

/**
 * ▲
 */
export const Triangle: SC<TriangleOptions> = (options) => {
  return Color({ colorAttribute: 'fill', symbol: 'triangle', ...options });
};

Triangle.props = {
  defaultMarker: 'triangle',
  ...Color.props,
};
