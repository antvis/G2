import { ShapeComponent as SC } from '../../runtime';
import { Polygon as PolygonShape } from '../polygon/polygon';

export type PolygonOptions = Record<string, any>;

export const Polygon: SC<PolygonOptions> = (...args) => {
  return PolygonShape(...args);
};

Polygon.props = {
  defaultEnterAnimation: 'fadeIn',
};
