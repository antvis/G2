import { GuideComponentComponent as GCC } from '../runtime';
import { AxisOptions, LinearAxis } from './axis';

export type AxisYOptions = AxisOptions;

/**
 * LinearAxis component bind to y scale.
 */
export const AxisY: GCC<AxisYOptions> = (options) => {
  return LinearAxis(options);
};

AxisY.props = {
  ...LinearAxis.props,
  defaultPosition: 'left',
};
