import { ShapeComponent as SC } from '../../runtime';
import { ColorRect } from './colorRect';

export type HollowRectOptions = void;

/**
 * Render rect in different coordinate and using color channel for stroke attribute.
 */
export const HollowRect: SC<HollowRectOptions> = () => {
  return ColorRect({ colorAttribute: 'stroke' });
};

HollowRect.props = {
  ...ColorRect.props,
};
