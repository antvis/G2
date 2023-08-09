import { extend } from './extend';
import { library } from './library';
import { Runtime } from './runtime';

// Use a empty interface to mark Chart both a value and a class type.
export interface Chart {}

export const Chart = extend(Runtime, library);
