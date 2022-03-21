import { Ordinal as OrdinalScale } from '@antv/scale';
import { ScaleComponent as SC } from '../runtime';
import { OrdinalScale as OrdinalScaleSpec } from '../spec';

export type OrdinalOptions = Omit<OrdinalScaleSpec, 'type'>;

export const Ordinal: SC<OrdinalOptions> = (options) => {
  return new OrdinalScale(options);
};

Ordinal.props = {};
