// const Global = require('../global');
const Util = require('../util');
const { DomUtil } = require('@antv/g');

const assign = Util.assign;

class Interaction {
  getDefaultCfg() {
    return {
      startEvent: 'mousedown',
      processingEvent: 'mouseover',
      endEvent: 'mouseup',
      resetEvent: 'dblclick'
    };
  }

  onStart() {
  }
  onProcessing() {
  }
  onEnd() {
  }
  onReset() {
  }

  constructor(cfg, view) {
    const me = this;
    const defaultCfg = me.getDefaultCfg();
    assign(me, defaultCfg, cfg);
    me._ownerView = view;
    me._canvas = view.get('canvas');
    me._bindEvents();
  }

  _bindEvents() {
    const me = this;
    const canvas = me.canvas;
    const canvasDOM = canvas.get('canvasDOM');
    me._onStartListener = DomUtil.addEventListener(canvasDOM, me.startEvent, Util.wrapBehavior(me, 'onStart'));
    me._onProcessingListener = DomUtil.addEventListener(canvasDOM, me.processingEvent, Util.wrapBehavior(me, 'onProcessing'));
    me._onEndListener = DomUtil.addEventListener(canvasDOM, me.endEvent, Util.wrapBehavior(me, 'onEnd'));
    me._onResetListener = DomUtil.addEventListener(canvasDOM, me.resetEvent, Util.wrapBehavior(me, 'onReset'));
  }

  _clearEvents() {
    const me = this;
    me._onStartListener && me._onStartListener.remove();
    me._onProcessingListener && me._onProcessingListener.remove();
    me._onEndListener && me._onEndListener.remove();
    me._onResetListener && me._onResetListener.remove();
  }

  destroy() {
    this._clearEvents();
  }
}

module.exports = Interaction;
