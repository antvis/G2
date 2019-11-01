import * as _ from '@antv/util';
import View from '../chart/view';
import StateManager from './manager';

export interface StateActionCfg {
  init: (stateManager: StateManager, view: View) => void;
  destroy: (stateManager: StateManager, view: View) => void;
  [key: string]: any;
}

export const STATES: Record<string, StateActionCfg> = {};

export function getState(name: string) {
  return STATES[name];
}

export function registerState(name: string, cfg: StateActionCfg) {
  STATES[name] = cfg;
}

export { default as StateManager } from './manager';
