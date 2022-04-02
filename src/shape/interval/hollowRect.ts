import { ShapeComponent as SC } from '../../runtime';
import { ColorRect } from './colorRect';

export type HollowRectOptions = Record<string, any>;

/**
 * Render rect in different coordinate and using color channel for stroke attribute.
 */
export const HollowRect: SC<HollowRectOptions> = (options) => {
  return ColorRect({ colorAttribute: 'stroke', ...options });
};

HollowRect.props = {
  ...ColorRect.props,
};
