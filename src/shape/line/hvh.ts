import { curveStep } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { CurveLine } from './curveLine';

export type HVHOptions = Record<string, any>;

export const HVH: SC<HVHOptions> = (options) => {
  return CurveLine({ curve: curveStep, ...options });
};

HVH.props = {
  ...CurveLine.props,
};
