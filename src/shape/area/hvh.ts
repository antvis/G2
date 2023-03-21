import { curveStep } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { Curve } from './curve';

export type HVHOptions = Record<string, any>;

export const HVH: SC<HVHOptions> = (options) => {
  return (P, value, coordinate, theme) => {
    return Curve({ curve: curveStep, ...options })(P, value, coordinate, theme);
  };
};

HVH.props = {
  ...Curve.props,
  defaultMarker: 'hvh',
};
