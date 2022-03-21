import { ShapeComponent as SC } from '../../runtime';
import { ColorRect } from './colorRect';

export type ShapeRectOptions = void;

/**
 * Render rect in different coordinate and using color channel for stroke and fill attribute.
 * The stroke attribute is valid with specified lineWidth attribute which defaults to zero.
 */
export const ShapeRect: SC<ShapeRectOptions> = () => {
  return ColorRect({ colorAttribute: 'fill' });
};

ShapeRect.props = {};
