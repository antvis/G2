// const Global = require('../global');
const Util = require('../util');
const { DomUtil } = require('@antv/g');
const View = require('../chart/view');
const G2 = require('../core.js');

const assign = Util.assign;

class Interaction {
  getDefaultCfg() {
    return {
      startEvent: 'mousedown',
      processingEvent: 'mousemove',
      endEvent: 'mouseup',
      resetEvent: 'dblclick'
    };
  }

  _start(ev) {
    const me = this;
    me.preStart && me.preStart(ev);
    me.start(ev);
    me.onStart && me.onStart(ev);
  }
  _process(ev) {
    const me = this;
    me.preProcess && me.preProcess(ev);
    me.process(ev);
    me.onProcess && me.onProcess(ev);
  }
  _end(ev) {
    const me = this;
    me.preEnd && me.preEnd(ev);
    me.end(ev);
    me.onEnd && me.onEnd(ev);
  }

  _reset(ev) {
    const me = this;
    me.preReset && me.preReset(ev);
    me.reset(ev);
    me.onReset && me.onReset(ev);
  }


  start() {
    // TODO override
  }
  process() {
    // TODO override
  }
  end() {
    // TODO override
  }
  reset() {
    // TODO override
  }

  constructor(cfg, view) {
    const me = this;
    const defaultCfg = me.getDefaultCfg();
    assign(me, defaultCfg, cfg);
    me.view = view;
    me.canvas = view.get('canvas');
    me._bindEvents();
  }

  _bindEvents() {
    const me = this;
    const canvas = me.canvas;
    const canvasDOM = canvas.get('canvasDOM');
    me._clearEvents();
    me._onStartListener = DomUtil.addEventListener(canvasDOM, me.startEvent, Util.wrapBehavior(me, '_start'));
    me._onProcessingListener = DomUtil.addEventListener(canvasDOM, me.processingEvent, Util.wrapBehavior(me, '_process'));
    me._onEndListener = DomUtil.addEventListener(canvasDOM, me.endEvent, Util.wrapBehavior(me, '_end'));
    me._onResetListener = DomUtil.addEventListener(canvasDOM, me.resetEvent, Util.wrapBehavior(me, '_reset'));
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

G2._Interactions = {};
G2.registerInteraction = function(type, constructor) {
  G2._Interactions[type] = constructor;
};
G2.getInteraction = function(type) {
  return G2._Interactions[type];
};

View.prototype.getInteractions = function() {
  const me = this;
  if (!me._interactions) {
    me._interactions = {};
  }
  return me._interactions;
};

View.prototype.setInteraction = function(type, interact) {
  const me = this;
  const interactions = me.getInteractions();
  interactions[type] = interactions[type] || [];
  interactions[type].push(interact);
};

View.prototype.clearInteraction = function(type) {
  const me = this;
  const interactions = me.getInteractions();
  if (type) {
    (interactions[type] || []).forEach(interact => {
      interact.destroy();
    });
    delete interactions[type];
  } else {
    Util.each(interactions, (collection, key) => {
      (collection || []).forEach(interact => {
        interact.destroy();
      });
      delete interactions[key];
    });
  }
};
View.prototype.interact = function(type, cfg) {
  const me = this;
  const Ctor = G2.getInteraction(type);
  const interact = new Ctor(cfg, me);
  me.setInteraction(type, interact);
  return me;
};

module.exports = Interaction;
