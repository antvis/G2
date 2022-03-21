import { Identity as IdentityScale } from '@antv/scale';
import { IdentityScale as IdentityScaleSpec } from '../spec';
import { ScaleComponent as SC } from '../runtime';

export type IdentityOptions = Omit<IdentityScaleSpec, 'type'>;

export const Identity: SC<IdentityOptions> = (options) => {
  return new IdentityScale(options);
};

Identity.props = {};
