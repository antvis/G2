const Util = require('../util');
const DomUtil = Util.DomUtil;

const EVENT_TYPES = [
  'start',
  'process',
  'end',
  'reset'
];

class Interaction {
  getDefaultCfg() {
    return {
      startEvent: 'mousedown',
      processEvent: 'mousemove',
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
    Util.assign(me, defaultCfg, cfg);
    me.view = me.chart = view;
    me.canvas = view.get('canvas');
    me._bindEvents();
  }

  _bindEvents() {
    const me = this;
    const canvas = me.canvas;
    const canvasDOM = canvas.get('canvasDOM');
    me._clearEvents();
    Util.each(EVENT_TYPES, type => {
      const ucType = Util.upperFirst(type);
      me[`_on${ucType}Listener`] = DomUtil.addEventListener(canvasDOM, me[`${type}Event`], Util.wrapBehavior(me, `_${type}`));
    });
  }

  _clearEvents() {
    const me = this;
    Util.each(EVENT_TYPES, type => {
      const listenerName = `_on${Util.upperFirst(type)}Listener`;
      me[listenerName] && me[listenerName].remove();
    });
  }

  destroy() {
    this._clearEvents();
  }
}

module.exports = Interaction;
