import { GuideComponentComponent as GCC } from '../runtime';
import { AxisOptions, LinearAxis } from './axis';

export type AxisYOptions = AxisOptions;

/**
 * LinearAxis component bind to y scale.
 */
export const AxisY: GCC<AxisYOptions> = (options) => {
  return (...args) =>
    LinearAxis(Object.assign({}, { crossPadding: 10 }, options))(...args);
};

AxisY.props = {
  ...LinearAxis.props,
  defaultPosition: 'left',
};
