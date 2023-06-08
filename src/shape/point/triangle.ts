import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type TriangleOptions = Record<string, any>;

/**
 * ▲
 */
export const Triangle: SC<TriangleOptions> = (options, context) => {
  return Color(
    { colorAttribute: 'fill', symbol: 'triangle', ...options },
    context,
  );
};

Triangle.props = {
  defaultMarker: 'triangle',
  ...Color.props,
};
