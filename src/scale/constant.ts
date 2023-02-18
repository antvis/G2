import { Constant as ConstantScale } from '@antv/scale';
import { ConstantScale as ConstantScaleSpec } from '../spec';
import { ScaleComponent as SC } from '../runtime';

export type ConstantOptions = Omit<ConstantScaleSpec, 'type'>;

export const Constant: SC<ConstantOptions> = (options) => {
  return new ConstantScale(options);
};

Constant.props = {};
