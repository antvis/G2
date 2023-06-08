import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type PointOptions = Record<string, any>;

/**
 * ●
 */
export const Point: SC<PointOptions> = (options, context) => {
  return Color(
    { colorAttribute: 'fill', symbol: 'point', ...options },
    context,
  );
};

Point.props = {
  defaultMarker: 'point',
  ...Color.props,
};
