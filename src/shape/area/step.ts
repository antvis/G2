import { curveStep } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { Curve } from './curve';

export type StepOptions = Record<string, any>;

export const Step: SC<StepOptions> = (options) => {
  return (P, value, coordinate, theme) => {
    return Curve({ curve: curveStep, ...options })(P, value, coordinate, theme);
  };
};

Step.props = {
  ...Curve.props,
};
