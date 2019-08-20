import * as _ from '@antv/util';
import View from '../plot/view';
import { Canvas } from '@antv/g';

interface InteractionCfg {
  view: View;
  startEvent?: string;
  processEvent?: string;
  endEvent?: string;
  resetEvent?: string;
}

export interface InteractionConstructor {
  new(cfg: any): Interaction;
}

const EVENT_TYPES = [
  'start',
  'process',
  'end',
  'reset',
];

export default class Interaction {
  view: View;
  canvas: Canvas;
  startEvent: string;
  processEvent: string;
  endEvent: string;
  resetEvent: string;
  private _eventHandlers: any[];
  constructor(cfg: InteractionCfg) {
    const defaultCfg = this._getDefaultCfg();
    _.assign(this, defaultCfg, cfg);
    this.canvas = this.view.get('canvas');
    this._eventHandlers = [];
    this._bindEvents();
  }

  private _getDefaultCfg() {
    return {
      startEvent: 'mousedown',
      processEvent: 'mousemove',
      endEvent: 'mouseup',
      resetEvent: 'dblclick',
    };
  }

  private _start(ev) {
    this.preStart(ev);
    this.start(ev);
    this.afterStart(ev);
  }

  preStart(ev) {

  }

  start(ev) {

  }

  afterStart(ev) {

  }

  private _process(ev) {
    this.preProcess(ev);
    this.process(ev);
    this.afterProcess(ev);
  }

  preProcess(ev) {

  }

  process(ev) {

  }

  afterProcess(ev) {

  }

  private _end(ev) {
    this.preEnd(ev);
    this.end(ev);
    this.afterEnd(ev);
  }

  preEnd(ev) {

  }

  end(ev) {

  }

  afterEnd(ev) {

  }

  private _reset(ev?: any) {
    this.preReset(ev);
    this.reset(ev);
    this.afterReset(ev);
  }

  preReset(ev?: any) {

  }

  reset(ev?: any) {

  }

  afterReset(ev?: any) {

  }

  private _bindEvents() {
    _.each(EVENT_TYPES, (type) => {
      const eventName = this[`${type}Event`];
      const handler = _.wrapBehavior(this, `_${type}`);
      this.view.on(eventName, handler);
      this._eventHandlers.push({ type: eventName, handler });
    });
  }

  private _unbindEvents() {
    const eventHandlers = this._eventHandlers;
    _.each(eventHandlers, (eh) => {
      this.view.off(eh.type, eh.handler);
    });
  }

  destroy() {
    this._unbindEvents();
    this._reset();
  }

}
