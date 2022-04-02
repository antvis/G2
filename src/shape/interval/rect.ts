import { ShapeComponent as SC } from '../../runtime';
import { ColorRect } from './colorRect';

export type RectOptions = Record<string, any>;

/**
 * Render rect in different coordinate and using color channel for stroke and fill attribute.
 * The stroke attribute is valid with specified lineWidth attribute which defaults to zero.
 */
export const Rect: SC<RectOptions> = (options) => {
  return ColorRect({ colorAttribute: 'fill', ...options });
};

Rect.props = {
  ...ColorRect.props,
};
