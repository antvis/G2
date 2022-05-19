import { curveStepAfter } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { CurveLine } from './curveLine';

export type HVOptions = Record<string, any>;

export const HV: SC<HVOptions> = (options) => {
  return CurveLine({ curve: curveStepAfter, ...options });
};

HV.props = {
  ...CurveLine.props,
};
