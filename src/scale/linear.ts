import { Linear as LinearScale } from '@antv/scale';
import { ScaleComponent as SC } from '../runtime';
import { LinearScale as LinearScaleSpec } from '../spec';

export const Linear: SC<LinearScaleSpec> = (options) => {
  return new LinearScale(options);
};

Linear.props = {};
