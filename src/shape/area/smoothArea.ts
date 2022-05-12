import { curveCatmullRom } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { CurveArea } from './curveArea';

export type SmoothAreaOptions = {
  alpha?: number;
};

export const SmoothArea: SC<SmoothAreaOptions> = (options) => {
  const { alpha = 0.5, ...rest } = options;
  return CurveArea({ curve: curveCatmullRom.alpha(alpha), ...rest });
};

SmoothArea.props = {
  ...CurveArea.props,
};
