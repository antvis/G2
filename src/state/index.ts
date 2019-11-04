import * as _ from '@antv/util';
import View from '../chart/view';
import StateManager from './manager';

export interface StateActionCfg {
  init: (stateManager: StateManager, view: View) => void;
  destroy: (stateManager: StateManager, view: View) => void;
  [key: string]: any;
}

export const STATE_ACTIONS: Record<string, StateActionCfg> = {};

export function getStateAction(name: string) {
  return STATE_ACTIONS[_.lowerCase(name)];
}

export function registerStateAction(name: string, cfg: StateActionCfg) {
  STATE_ACTIONS[_.lowerCase(name)] = cfg;
}

export { default as StateManager } from './manager';
