import { GuideComponentComponent as GCC } from '../runtime';
import { ArcAxis, AxisOptions } from './axis';

export type AxisYOptions = AxisOptions;

/**
 * ArcAxis component bind to x scale.
 */
export const AxisArc: GCC<AxisYOptions> = (options) => {
  return ArcAxis(options);
};

AxisArc.props = {
  ...ArcAxis.props,
  defaultPosition: 'left',
};
