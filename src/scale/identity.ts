import { Identity as IdentityScale, IdentityOptions as IO } from '@antv/scale';
import { ScaleComponent as SC } from '../runtime';

export type IdentityOptions = IO;

export const Identity: SC<IdentityOptions> = (options) => {
  return new IdentityScale(options);
};

Identity.props = {};
