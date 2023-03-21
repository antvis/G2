import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type PointOptions = Record<string, any>;

/**
 * ●
 */
export const Point: SC<PointOptions> = (options) => {
  return Color({ colorAttribute: 'fill', symbol: 'point', ...options });
};

Point.props = {
  defaultMarker: 'point',
  ...Color.props,
};
