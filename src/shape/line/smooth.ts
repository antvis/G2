import { curveCatmullRom } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { Curve } from './curve';

export type SmoothOptions = {
  alpha?: number;
};

export const Smooth: SC<SmoothOptions> = (options) => {
  const { alpha = 0.5, ...rest } = options;
  return Curve({ curve: curveCatmullRom.alpha(alpha), ...rest });
};

Smooth.props = {
  ...Curve.props,
};
