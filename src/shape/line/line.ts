import { curveLinear } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { CurveLine } from './curveLine';

export type LineOptions = Record<string, any>;

export const Line: SC<LineOptions> = (options) => {
  return CurveLine({ curve: curveLinear, ...options });
};

Line.props = {
  ...CurveLine.props,
};
