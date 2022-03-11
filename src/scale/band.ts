import { Band as BandScale, BandOptions as BO } from '@antv/scale';
import { ScaleComponent as SC } from '../runtime';

export type BandOptions = BO;

export const Band: SC<BandOptions> = (options) => {
  return new BandScale(options);
};

Band.props = {};
