import { Linear as LinearScale } from '@antv/scale';
import { ScaleComponent as SC } from '../runtime';
import { LinearScale as LinearScaleSpec } from '../spec';

export type LinearOptions = Omit<LinearScaleSpec, 'type'>;

export const Linear: SC<LinearOptions> = (options) => {
  return new LinearScale(options);
};

Linear.props = {};
