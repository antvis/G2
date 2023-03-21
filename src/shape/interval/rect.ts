import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type RectOptions = Record<string, any>;

/**
 * Render rect in different coordinate and using color channel for stroke and fill attribute.
 * The stroke attribute is valid with specified lineWidth attribute which defaults to zero.
 */
export const Rect: SC<RectOptions> = (options) => {
  return Color({ colorAttribute: 'fill', ...options });
};

Rect.props = {
  ...Color.props,
  defaultMarker: 'square',
};
