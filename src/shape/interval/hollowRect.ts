import { ShapeComponent as SC } from '../../runtime';
import { ColorRect } from './colorRect';

export type ShapeHollowRectOptions = void;

/**
 * Render rect in different coordinate and using color channel for stroke attribute.
 */
export const ShapeHollowRect: SC<ShapeHollowRectOptions> = () => {
  return ColorRect({ colorAttribute: 'stroke' });
};

ShapeHollowRect.props = {
  ...ColorRect.props,
};
