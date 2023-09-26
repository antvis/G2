import { corelib } from '../src/lib';
import { extend, Runtime } from '../src/api';
import { API, CompositionAPI } from '../src/api/extend';
import { G2Spec } from '../src/spec';

export * from '../src/exports';

/**
 * G2 lite library only initial `corelib` which contains basic marks.
 */
const library = { ...corelib() };

export const Chart = extend(Runtime, library);
export interface Chart extends API<G2Spec, typeof library> {}
export interface CompositionNode extends CompositionAPI<typeof library> {}

export { corelib };
