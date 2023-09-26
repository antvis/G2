import { corelib, plotlib, graphlib, geolib, stdlib, threedlib } from './lib';
import { extend, Runtime } from './api';
import { API, CompositionAPI } from './api/extend';
import { G2Spec } from './spec';

/**
 * G2 full library initial all the libs, include 3D and auto.
 */
const library = { ...stdlib(), ...threedlib() };

export const Chart = extend(Runtime, library);

export interface Chart extends API<G2Spec, typeof library> {}

export interface CompositionNode extends CompositionAPI<typeof library> {}

export { corelib, plotlib, graphlib, geolib, stdlib, threedlib };

export * from './exports';
