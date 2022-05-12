import { curveLinear } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { CurveArea } from './curveArea';

export type AreaOptions = Record<string, any>;

export const Area: SC<AreaOptions> = (options) => {
  return CurveArea({ curve: curveLinear, ...options });
};

Area.props = {
  ...CurveArea.props,
};
