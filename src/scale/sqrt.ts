import { Sqrt as SqrtScale } from '@antv/scale';
import { SqrtScale as SqrtScaleSpec } from '../spec';
import { ScaleComponent as SC } from '../runtime';

export type SqrtOptions = Omit<SqrtScaleSpec, 'type'>;

export const Sqrt: SC<SqrtOptions> = (options) => {
  return new SqrtScale(options);
};

Sqrt.props = {};
