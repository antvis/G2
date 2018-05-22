
const Util = require('../util');
const Interaction = require('./base');
const G2 = require('../core.js');

const ZOOMING_TYPES = [ 'X', 'Y', 'XY' ];
const DEFAULT_TYPE = 'X';

// TODO zoom with center point

class Zoom extends Interaction {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      processingEvent: 'mousewheel',
      type: DEFAULT_TYPE,
      stepRatio: 0.05,
      stepByField: {},
      originScaleDefsByField: {}
    });
  }

  constructor(cfg, view) {
    super(cfg, view);
    const me = this;
    me.chart = view;
    me.type = me.type.toUpperCase();

    const scales = view.getYScales();
    const xScale = view.getXScale();
    scales.push(xScale);
    const scaleController = view.get('scaleController');
    scales.forEach(scale => {
      const field = scale.field;
      const def = scaleController.defs[field] || {};
      me.originScaleDefsByField[field] = Util.mix(def, {
        nice: !!def.nice
      });
      if (scale.isLinear) {
        me.stepByField[field] = (scale.max - scale.min) * me.stepRatio;
      }
    });

    if (ZOOMING_TYPES.indexOf(me.type) === -1) {
      me.type = DEFAULT_TYPE;
    }
  }

  // onZoom() { }
  // onZoomin() { }
  // onZoomout() { }

  _applyScale(scale, delta, minOffset = 0) {
    const me = this;
    const { chart, stepByField } = me;
    if (scale.isLinear) {
      const { min, max, field } = scale;
      const maxOffset = 1 - minOffset;
      const step = stepByField[field] * delta;
      const newMin = min + step * minOffset;
      const newMax = max - step * maxOffset;
      if (newMax > newMin) {
        chart.scale(field, {
          nice: false,
          min: newMin,
          max: newMax
        });
      }
    }
  }

  process(ev) {
    const me = this;
    const { chart, type } = me;
    const coord = chart.get('coord');
    const deltaY = ev.deltaY;
    const offsetPoint = coord.invertPoint(ev);
    if (deltaY) {
      me.onZoom && me.onZoom(deltaY, offsetPoint, me);
      if (deltaY > 0) {
        me.onZoomin && me.onZoomin(deltaY, offsetPoint, me);
      } else {
        me.onZoomout && me.onZoomout(deltaY, offsetPoint, me);
      }
      const delta = deltaY / Math.abs(deltaY);
      if (type.indexOf('X') > -1) {
        me._applyScale(chart.getXScale(), delta, offsetPoint.x);
      }
      if (type.indexOf('Y') > -1) {
        const yScales = chart.getYScales();
        yScales.forEach(yScale => {
          me._applyScale(yScale, delta, offsetPoint.y);
        });
      }
    }
    chart.repaint();
  }

  reset() {
    const me = this;
    const { view, originScaleDefsByField } = me;
    const scales = view.getYScales();
    const xScale = view.getXScale();
    scales.push(xScale);
    scales.forEach(scale => {
      if (scale.isLinear) {
        const field = scale.field;
        view.scale(field, originScaleDefsByField[field]);
      }
    });
    view.repaint();
  }
}

G2.registerInteraction('zoom', Zoom);
G2.registerInteraction('Zoom', Zoom);

module.exports = Zoom;
