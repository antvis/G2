import { curveStepAfter } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { Curve } from './curve';

export type HVOptions = Record<string, any>;

export const HV: SC<HVOptions> = (options, context) => {
  return Curve({ curve: curveStepAfter, ...options }, context);
};

HV.props = {
  ...Curve.props,
  defaultMarker: 'hv',
};
