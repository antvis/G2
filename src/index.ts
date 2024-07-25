import { corelib, plotlib, graphlib, geolib, stdlib } from './lib';
import { extend, Runtime } from './api';
import { API, CompositionAPI } from './api/extend';
import { G2Spec } from './spec';
import type { SymbolFactor } from './utils/marker';

export { corelib, plotlib, graphlib, geolib, stdlib };

export * from './exports';

/**
 * G2 standard library initial all the libs except 3D and auto.
 */
const library = { ...stdlib() };
export type { SymbolFactor };
export const Chart = extend(Runtime, library);
export interface Chart extends API<G2Spec, typeof library> {}
export interface CompositionNode extends CompositionAPI<typeof library> {}
