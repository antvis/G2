import * as _ from '@antv/util';
import View from '../../../src/plot/view';

interface ShapeStates {
  [key: string]: any;
}

interface ShapeStateControllerCfg {
  view: View;
  states?: ShapeStates;
}

export default class ShapeStateController {
  private _states: ShapeStates;
  private _stateStack: ShapeStates;
  private _changeTimer: any;
  view: View;

  constructor(cfg: ShapeStateControllerCfg = { view: null }) {
    this._states = {};
    this._stateStack = {};
    this.view = cfg.view;
  }

  setState(name: string, exp: Function, draw: boolean) {
    this._stateStack[name] = { exp, draw };
    this._onUpdate();
  }

  getState(name: string) {
    return this._states[name];
  }

  getAllStates() {
    return this._states;
  }

  clear() {
    this._states = {};
    this._stateStack = {};
    if (this._changeTimer) {
      clearTimeout(this._changeTimer);
      this._changeTimer = null;
    }
  }

  private _onUpdate() {
    const stateStack = this._stateStack;

    if (this._changeTimer) {
      clearTimeout(this._changeTimer);
      this._changeTimer = null;
    }

    this._changeTimer = setTimeout(() => {
      for (const name in stateStack) {
        const state = stateStack[name];
        const exp = state.exp;
        if (!this._states[name] || this._states[name] !== exp) {
          // update states
          this._states[name] = exp;
          // dispatch state event
          this._triggerEvent(name, state);
        }
      }
      // clear stack
      this._stateStack = {};
    },                             16);

  }

  private _triggerEvent(name: string, exp: any) {
    this.view.emit(`${name}:change`, {
      name,
      ...exp,
    });
  }

}
