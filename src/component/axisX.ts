import { GuideComponentComponent as GCC } from '../runtime';
import { LinearAxis, AxisOptions } from './axis';

export type AxisXOptions = AxisOptions;

/**
 * LinearAxis component bind to x scale.
 */
export const AxisX: GCC<AxisXOptions> = (options) => {
  return LinearAxis(options);
};

AxisX.props = {
  ...LinearAxis.props,
  defaultPosition: 'bottom',
};

export function axisXConfig() {}
