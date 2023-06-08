import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type LineOptions = Record<string, any>;

/**
 * |
 */
export const Line: SC<LineOptions> = (options, context) => {
  return Color(
    { colorAttribute: 'stroke', symbol: 'line', ...options },
    context,
  );
};

Line.props = {
  defaultMarker: 'line',
  ...Color.props,
};
