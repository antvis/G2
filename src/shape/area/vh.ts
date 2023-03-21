import { curveStepBefore } from 'd3-shape';
import { ShapeComponent as SC } from '../../runtime';
import { Curve } from './curve';

export type VHOptions = Record<string, any>;

export const VH: SC<VHOptions> = (options) => {
  return (P, value, coordinate, theme) => {
    return Curve({ curve: curveStepBefore, ...options })(
      P,
      value,
      coordinate,
      theme,
    );
  };
};

VH.props = {
  ...Curve.props,
  defaultMarker: 'vh',
};
