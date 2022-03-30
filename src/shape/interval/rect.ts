import { ShapeComponent as SC } from '../../runtime';
import { ColorRect } from './colorRect';

export type RectOptions = void;

/**
 * Render rect in different coordinate and using color channel for stroke and fill attribute.
 * The stroke attribute is valid with specified lineWidth attribute which defaults to zero.
 */
export const Rect: SC<RectOptions> = () => {
  return ColorRect({ colorAttribute: 'fill' });
};

Rect.props = {
  ...ColorRect.props,
};
