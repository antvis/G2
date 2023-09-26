import { corelib, plotlib, graphlib, geolib, stdlib } from './lib';
import { extend, Runtime } from './api';

/**
 * G2 standard library initial all the libs except 3D and auto.
 */
export const Chart = extend(Runtime, {
  ...corelib(),
  ...plotlib(),
  ...graphlib(),
  ...geolib(),
});

export { corelib, plotlib, graphlib, geolib, stdlib };

export * from './exports';
