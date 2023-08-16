import { GuideComponentComponent as GCC } from '../runtime';
import { LinearAxis, AxisOptions } from './axis';

export type AxisXOptions = AxisOptions;

/**
 * LinearAxis component bind to z scale.
 */
export const AxisZ: GCC<AxisXOptions> = (options) => {
  return (...args) => {
    // empirical value for crossPadding
    const axis = LinearAxis(
      Object.assign(
        {},
        {
          crossPadding: 10,
        },
        options,
      ),
    )(...args);
    // const axisY = LinearAxis(Object.assign({}, { crossPadding: 10 }, options))(
    //   ...args,
    // );

    axis.setOrigin(0, 0, 0);
    // rotate around Y axis
    axis.rotate(0, -90, 0);

    return axis;
  };
};

AxisZ.props = {
  ...LinearAxis.props,
  defaultPosition: 'bottom',
};

export function axisZConfig() {}
