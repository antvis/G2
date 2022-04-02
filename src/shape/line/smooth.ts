import { curveCatmullRom } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { CurveLine } from './curveLine';

export type SmoothOptions = {
  alpha?: number;
};

export const Smooth: SC<SmoothOptions> = (options) => {
  const { alpha = 0.5, ...rest } = options;
  return CurveLine({ curve: curveCatmullRom.alpha(alpha), ...rest });
};

Smooth.props = {
  ...CurveLine.props,
};
