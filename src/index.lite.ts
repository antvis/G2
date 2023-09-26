import { corelib } from './lib';
import { extend, Runtime } from './api';
import { API, CompositionAPI } from './api/extend';
import { G2Spec } from './spec';

/**
 * G2 lite library only initial `corelib` which contains basic marks.
 */
const library = { ...corelib() };

export const Chart = extend(Runtime, library);

export interface Chart extends API<G2Spec, typeof library> {}

export interface CompositionNode extends CompositionAPI<typeof library> {}

export { corelib };

export * from './exports';
