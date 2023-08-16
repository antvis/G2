import { GuideComponentComponent as GCC } from '../runtime';
import { AxisOptions, LinearAxis, rotateAxis } from './axis';

export type AxisXOptions = AxisOptions;

/**
 * LinearAxis component bind to x scale.
 */
export const AxisX: GCC<AxisXOptions> = (options) => {
  return (...args) => {
    // empirical value for crossPadding
    const axisX = LinearAxis(Object.assign({}, { crossPadding: 50 }, options))(
      ...args,
    );
    rotateAxis(axisX, options);
    return axisX;
  };
};

AxisX.props = {
  ...LinearAxis.props,
  defaultPosition: 'bottom',
};

export function axisXConfig() {}
