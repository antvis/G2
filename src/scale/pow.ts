import { Pow as PowScale } from '@antv/scale';
import { ScaleComponent as SC } from '../runtime';
import { PowScale as PowScaleSpec } from '../spec';

export type PowOptions = Omit<PowScaleSpec, 'type'>;

export const Pow: SC<PowOptions> = (options) => {
  return new PowScale(options);
};

Pow.props = {};
