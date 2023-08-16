import { GuideComponentComponent as GCC } from '../runtime';
import { AxisOptions, LinearAxis, rotateAxis } from './axis';

export type AxisYOptions = AxisOptions;

/**
 * LinearAxis component bind to y scale.
 */
export const AxisY: GCC<AxisYOptions> = (options) => {
  return (...args) => {
    const axisY = LinearAxis(Object.assign({}, { crossPadding: 10 }, options))(
      ...args,
    );
    rotateAxis(axisY, options);
    return axisY;
  };
};

AxisY.props = {
  ...LinearAxis.props,
  defaultPosition: 'left',
};
