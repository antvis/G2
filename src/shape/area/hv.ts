import { curveStepAfter } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { Curve } from './curve';

export type HVOptions = Record<string, any>;

export const HV: SC<HVOptions> = (options) => {
  return (P, value, coordinate, theme) => {
    return Curve({ curve: curveStepAfter, ...options })(
      P,
      value,
      coordinate,
      theme,
    );
  };
};

HV.props = {
  ...Curve.props,
  defaultMarker: 'hv',
};
