import { curveLinear } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { CurveLine } from './curveLine';

export type LineOptions = void;

export const Line: SC<LineOptions> = () => {
  return CurveLine({ curve: curveLinear });
};

Line.props = {
  ...CurveLine.props,
};
