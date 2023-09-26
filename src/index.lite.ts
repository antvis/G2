import { corelib } from './lib';
import { extend, Runtime } from './api';

/**
 * G2 lite library only initial `corelib` which contains basic marks.
 */
export const Chart = extend(Runtime, { ...corelib() });

export * from './exports';
