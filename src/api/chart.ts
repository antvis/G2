import type { G2Spec } from '../spec';
import { extend, API, CompositionAPI } from './extend';
import { library } from './library';
import { Runtime } from './runtime';
import { MarkNode as Node } from './mark';
import type { RuntimeOptions } from './runtime';

export interface Chart extends API<G2Spec, typeof library> {}

export interface CompositionNode extends CompositionAPI<typeof library> {}

export interface MarkNode extends Node {}

export const Chart = extend(Runtime, library);

export type ChartOptions = Omit<RuntimeOptions, 'lib'>;
