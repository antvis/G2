import { Threshold as ThresholdScale } from '@antv/scale';
import { ScaleComponent as SC } from '../runtime';
import { ThresholdScale as ThresholdScaleSpec } from '../spec';

export type ThresholdOptions = Omit<ThresholdScaleSpec, 'type'>;

export const Threshold: SC<ThresholdOptions> = (options) => {
  return new ThresholdScale(options);
};

Threshold.props = {};
