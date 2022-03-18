import { GuideComponentComponent as GCC } from '../runtime';
import { Axis, AxisOptions } from './axis';

export type AxisXOptions = AxisOptions;

export const AxisX: GCC<AxisXOptions> = (options) => {
  return Axis(options);
};

AxisX.props = {
  ...Axis.props,
  defaultPosition: 'bottom',
};
