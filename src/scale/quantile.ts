import { Quantile as QuantileScale } from '@antv/scale';
import { ScaleComponent as SC } from '../runtime';
import { QuantileScale as QuantileScaleSpec } from '../spec';

export type QuantileOptions = Omit<QuantileScaleSpec, 'type'>;

export const Quantile: SC<QuantileOptions> = (options) => {
  return new QuantileScale(options);
};

Quantile.props = {};
