import { GuideComponentComponent as GCC } from '../runtime';
import { LinearAxis, AxisOptions } from './axis';

export type AxisXOptions = AxisOptions;

/**
 * LinearAxis component bind to x scale.
 */
export const AxisX: GCC<AxisXOptions> = (options) => {
  return (...args) =>
    // empirical value for crossPadding
    LinearAxis(Object.assign({}, { crossPadding: 50 }, options))(...args);
};

AxisX.props = {
  ...LinearAxis.props,
  defaultPosition: 'bottom',
};

export function axisXConfig() {}
