import { curveStepBefore } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { Curve } from './curve';

export type VHOptions = Record<string, any>;

export const VH: SC<VHOptions> = (options) => {
  return Curve({ curve: curveStepBefore, ...options });
};

VH.props = {
  ...Curve.props,
  defaultMarker: 'vh',
};
