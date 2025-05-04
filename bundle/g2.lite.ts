import { Runtime, extend } from '../src/api';
import type { API, CompositionAPI } from '../src/api/extend';
import { corelib } from '../src/lib';
import type { G2Spec } from '../src/spec';

export * from '../src/exports';

/**
 * G2 lite library only initial `corelib` which contains basic marks.
 */
const library = { ...corelib() };

export const Chart = extend(Runtime, library);
export interface Chart extends API<G2Spec, typeof library> {}
export interface CompositionNode extends CompositionAPI<typeof library> {}

export { corelib };
