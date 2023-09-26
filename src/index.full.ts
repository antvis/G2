import { corelib, plotlib, graphlib, geolib, stdlib, threedlib } from './lib';
import { extend, Runtime } from './api';

/**
 * G2 full library initial all the libs, include 3D and auto.
 */
export const Chart = extend(Runtime, {
  ...corelib(),
  ...plotlib(),
  ...graphlib(),
  ...geolib(),
  ...threedlib(),
});

export { plotlib, graphlib, geolib, stdlib, threedlib };

export * from './exports';
