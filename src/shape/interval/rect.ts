import { ShapeComponent as SC } from '../../runtime';
import { ColorRect } from './colorRect';

export type ShapeRectOptions = void;

export const ShapeRect: SC<ShapeRectOptions> = () => {
  return ColorRect({ colorAttribute: 'fill' });
};

ShapeRect.props = {};
