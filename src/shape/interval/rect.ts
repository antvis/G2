import { ShapeComponent as SC } from '../../runtime';
import { Color } from './color';

export type RectOptions = {
  /**
   * Minimum width of each interval.
   */
  minWidth?: number;
  /**
   * Maximum width of each interval.
   */
  maxWidth?: number;

  /**
   * Minimum height of each interval.
   */
  minHeight?: number;
};

/**
 * Render rect in different coordinate and using color channel for stroke and fill attribute.
 * The stroke attribute is valid with specified lineWidth attribute which defaults to zero.
 */
export const Rect: SC<RectOptions> = (options, context) => {
  return Color({ colorAttribute: 'fill', ...options }, context);
};

Rect.props = {
  ...Color.props,
  defaultMarker: 'square',
};
