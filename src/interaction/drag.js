
const Util = require('../util');
const Interaction = require('./base');
const filterData = require('./helper/filter-data');
// const G2 = require('../core.js');

const DRAGGING_TYPES = [ 'X', 'Y', 'XY' ];
const DEFAULT_TYPE = 'X';

class Drag extends Interaction {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      type: DEFAULT_TYPE,
      stepRatio: 0.05,
      limitRange: false,
      stepByField: {},
      originScaleDefsByField: {},
      previousPoint: null,
      isDragging: false
    });
  }

  constructor(cfg, view) {
    super(cfg, view);
    const me = this;
    me.type = me.type.toUpperCase();
    me.chart = view;

    // pre process
    filterData(view);

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

    if (DRAGGING_TYPES.indexOf(me.type) === -1) {
      me.type = DEFAULT_TYPE;
    }
  }

  // onDragstart() { }
  // onDrag() { }
  // onDragend() { }

  _applyTranslate(scale, offset = 0 /* , coord */) {
    const me = this;
    const { chart } = me;
    // linear / cat
    const { min, max, field } = scale;
    const range = max - min;
    chart.scale(field, {
      nice: false,
      min: min - offset * range,
      max: max - offset * range
    });
  }

  _translateCatScale() {
  }
  _translateLinearScale() {
  }

  start(ev) {
    const me = this;
    const { chart, canvas } = me;
    const canvasDOM = canvas.get('canvasDOM');
    canvasDOM.style.cursor = 'pointer';
    const coord = chart.get('coord');
    me.isDragging = true;
    me.previousPoint = coord.invertPoint(ev);
  }
  process(ev) {
    const me = this;
    if (me.isDragging) {
      const { chart, type, canvas } = me;
      const canvasDOM = canvas.get('canvasDOM');
      canvasDOM.style.cursor = 'move';
      const coord = chart.get('coord');
      const previousPoint = me.previousPoint;
      const currentPoint = coord.invertPoint(ev);
      if (type.indexOf('X') > -1) {
        me._applyTranslate(chart.getXScale(), currentPoint.x - previousPoint.x, coord);
      }
      if (type.indexOf('Y') > -1) {
        const yScales = chart.getYScales();
        yScales.forEach(yScale => {
          me._applyTranslate(yScale, currentPoint.y - previousPoint.y, coord);
        });
      }
      me.previousPoint = currentPoint;
      chart.repaint();
    }
  }
  end() {
    const me = this;
    me.isDragging = false;
    const { canvas } = me;
    const canvasDOM = canvas.get('canvasDOM');
    canvasDOM.style.cursor = 'default';
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

module.exports = Drag;
