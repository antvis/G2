import { curveLinear } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { Curve } from './curve';

export type LineOptions = Record<string, any>;

export const Line: SC<LineOptions> = (options) => {
  return Curve({ curve: curveLinear, ...options });
};

Line.props = {
  ...Curve.props,
};
