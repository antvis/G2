import { corelib, plotlib, graphlib, geolib, stdlib } from '../src/lib';
import { extend, Runtime } from '../src/api';
import { API, CompositionAPI } from '../src/api/extend';
import { G2Spec } from '../src/spec';

export * from '../src/exports';

/**
 * G2 standard library initial all the libs except 3D and auto.
 */
const library = { ...stdlib() };

export const Chart = extend(Runtime, library);
export interface Chart extends API<G2Spec, typeof library> {}
export interface CompositionNode extends CompositionAPI<typeof library> {}

export { corelib, plotlib, graphlib, geolib, stdlib };
