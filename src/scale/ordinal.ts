import { Ordinal as OrdinalScale, OrdinalOptions as OO } from '@antv/scale';
import { ScaleComponent as SC } from '../runtime';

export type OrdinalOptions = OO;

export const Ordinal: SC<OrdinalOptions> = (options) => {
  return new OrdinalScale(options);
};

Ordinal.props = {};
