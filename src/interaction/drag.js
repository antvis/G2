
const Util = require('../util');
const Interaction = require('./base');
const G2 = require('../core.js');

const DRAGGING_TYPES = [ 'X', 'Y', 'XY' ];
const DEFAULT_TYPE = 'X';

class Drag extends Interaction {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      type: DEFAULT_TYPE,
      stepRatio: 0.05,
      stepByField: {},
      originScaleDefsByField: {}
    });
  }

  constructor(cfg, view) {
    super(cfg, view);
    const me = this;
    me.type = me.type.toUpperCase();
    me.chart = view;

    const scales = view.getYScales();
    const xScale = view.getXScale();
    scales.push(xScale);
    const scaleController = view.get('scaleController');
    scales.forEach(scale => {
      const field = scale.field;
      const def = scaleController.defs[field];
      me.originScaleDefsByField[field] = Util.mix(def, {
        nice: !!def.nice
      });
      if (scale.isLinear) {
        me.stepByField[field] = (scale.max - scale.min) * me.stepRatio;
      }
    });

    if (DRAGGING_TYPES.indexOf(me.type) === -1) {
      me.type = DEFAULT_TYPE;
    }
  }

  // onDragstart() { }
  // onDrag() { }
  // onDragend() { }

  onProcessing() {
  }

  onReset() {
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

G2.registerInteraction('drag', Drag);
G2.registerInteraction('Drag', Drag);

module.exports = Drag;
