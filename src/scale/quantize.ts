import { Quantize as QuantizeScale } from '@antv/scale';
import { ScaleComponent as SC } from '../runtime';
import { QuantizeScale as QuantizeScaleSpec } from '../spec';

export type QuantizeOptions = Omit<QuantizeScaleSpec, 'type'>;

export const Quantize: SC<QuantizeOptions> = (options) => {
  return new QuantizeScale(options);
};

Quantize.props = {};
