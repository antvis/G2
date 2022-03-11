import { Linear as LinearScale, LinearOptions as LO } from '@antv/scale';
import { ScaleComponent as SC } from '../runtime';

export type LinearOptions = LO;

export const Linear: SC<LinearOptions> = (options) => {
  return new LinearScale(options);
};

Linear.props = {};
