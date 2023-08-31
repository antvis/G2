import { G2Spec } from '../spec';
import { extend, API } from './extend';
import { library } from './library';
import { Runtime } from './runtime';
import type { RuntimeOptions } from './runtime';

export interface Chart extends API<G2Spec, typeof library> {}

export const Chart = extend(Runtime, library);

export type ChartOptions = Omit<RuntimeOptions, 'lib'>;
