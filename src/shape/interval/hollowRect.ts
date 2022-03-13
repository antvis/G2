import { ShapeComponent as SC } from '../../runtime';
import { ColorRect } from './colorRect';

export type ShapeHollowRectOptions = void;

export const ShapeHollowRect: SC<ShapeHollowRectOptions> = () => {
  return ColorRect({ colorAttribute: 'stroke' });
};

ShapeHollowRect.props = {};
