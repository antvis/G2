import { curveStepBefore } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { CurveLine } from './curveLine';

export type VHOptions = Record<string, any>;

export const VH: SC<VHOptions> = (options) => {
  return CurveLine({ curve: curveStepBefore, ...options });
};

VH.props = {
  ...CurveLine.props,
};
