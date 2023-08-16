import { GuideComponentComponent as GCC } from '../runtime';
import { LinearAxis, AxisOptions, rotateAxis } from './axis';

export type AxisXOptions = AxisOptions;

/**
 * LinearAxis component bind to z scale.
 */
export const AxisZ: GCC<AxisXOptions> = (options) => {
  return (...args) => {
    const axisZ = LinearAxis(Object.assign({}, { crossPadding: 10 }, options))(
      ...args,
    );
    rotateAxis(axisZ, options);
    return axisZ;
  };
};

AxisZ.props = {
  ...LinearAxis.props,
  defaultPosition: 'bottom',
};

export function axisZConfig() {}
