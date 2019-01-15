
const Util = require('../util');
const Interaction = require('./base');
const filterData = require('./helper/filter-data');
const getColDef = require('./helper/get-col-def');
const getLimitRange = require('./helper/get-limit-range');
const DAY_TIMESTAMPS = 86400000;
// const G2 = require('../core.js');

const DRAGGING_TYPES = [ 'X', 'Y', 'XY' ];
const DEFAULT_TYPE = 'X';

class Drag extends Interaction {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      type: DEFAULT_TYPE,
      stepRatio: 0.05,
      limitRange: {},
      stepByField: {},
      threshold: 20,
      originScaleDefsByField: {},
      previousPoint: null,
      isDragging: false
    });
  }

  _disableTooltip() {
    const me = this;
    const { chart } = me;
    const tooltipController = chart.get('tooltipController');
    if (tooltipController) {
      me._showTooltip = true;
      chart.tooltip(false);
    }
  }

  _enableTooltip(ev) {
    const me = this;
    const { chart } = me;
    if (me._showTooltip) {
      chart.tooltip(true);
      chart.showTooltip(ev);
    }
  }

  constructor(cfg, chart) {
    super(cfg, chart);
    const me = this;
    me.type = me.type.toUpperCase();
    me.chart = chart;
    me.coord = chart.get('coord');
    const data = me.data = chart.get('data');

    // pre process
    filterData(chart);

    const scales = chart.getYScales();
    const xScale = chart.getXScale();
    scales.push(xScale);
    const scaleController = chart.get('scaleController');
    scales.forEach(scale => {
      const field = scale.field;
      me.limitRange[field] = getLimitRange(data, scale);
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

    me._disableTooltip();
  }

  // onDragstart() { }
  // onDrag() { }
  // onDragend() { }

  _applyTranslate(scale, offset = 0, total) {
    const me = this;
    if (scale.isLinear) {
      me._translateLinearScale(scale, offset, total);
    } else {
      me._translateCatScale(scale, offset, total);
    }
  }

  _translateCatScale(scale, offset, total) {
    const me = this;
    const chart = me.chart;
    const { type, field, values, ticks } = scale;
    const colDef = getColDef(chart, field);

    const originValues = me.limitRange[field];
    const ratio = offset / total;
    const valueLength = values.length;
    const deltaCount = Math.max(1, Math.abs(parseInt(ratio * valueLength)));

    let firstIndex = originValues.indexOf(values[0]);
    let lastIndex = originValues.indexOf(values[valueLength - 1]);
    if (offset > 0 && firstIndex >= 0) { // right
      for (let i = 0; i < deltaCount && firstIndex > 0; i++) {
        firstIndex -= 1;
        lastIndex -= 1;
      }
      const newValues = originValues.slice(firstIndex, lastIndex + 1);
      let newTicks = null;
      if (type === 'timeCat') {
        const tickGap = ticks.length > 2 ? ticks[1] - ticks[0] : DAY_TIMESTAMPS;
        for (let i = ticks[0] - tickGap; i >= newValues[0]; i -= tickGap) {
          ticks.unshift(i);
        }
        newTicks = ticks;
      }

      chart.scale(field, Util.mix({}, colDef, {
        values: newValues,
        ticks: newTicks
      }));
    } else if (offset < 0 && lastIndex <= originValues.length - 1) { // left
      for (let i = 0; i < deltaCount && lastIndex < originValues.length - 1; i++) {
        firstIndex += 1;
        lastIndex += 1;
      }
      const newValues = originValues.slice(firstIndex, lastIndex + 1);

      let newTicks = null;
      if (type === 'timeCat') {
        const tickGap = ticks.length > 2 ? ticks[1] - ticks[0] : DAY_TIMESTAMPS;
        for (let i = ticks[ticks.length - 1] + tickGap; i <= newValues[newValues.length - 1]; i += tickGap) {
          ticks.push(i);
        }
        newTicks = ticks;
      }

      chart.scale(field, Util.mix({}, colDef, {
        values: newValues,
        ticks: newTicks
      }));
    }
  }

  _translateLinearScale(scale, offset, total) {
    const me = this;
    const { chart, limitRange } = me;
    // linear / cat
    const { min, max, field } = scale;

    if (min === limitRange[field].min && max === limitRange[field].max) return;

    const ratio = offset / total;
    const range = max - min;
    const colDef = getColDef(chart, field);
    chart.scale(field, Util.mix({}, colDef, {
      nice: false,
      min: min + ratio * range,
      max: max + ratio * range
    }));
  }

  start(ev) {
    const me = this;
    const { canvas } = me;
    const canvasDOM = canvas.get('canvasDOM');
    canvasDOM.style.cursor = 'pointer';
    // const coord = chart.get('coord');
    me.isDragging = true;
    me.previousPoint = {
      x: ev.x,
      y: ev.y
    };
    me._disableTooltip();
  }
  process(ev) {
    const me = this;
    if (me.isDragging) {
      const { chart, type, canvas, coord, threshold } = me;
      const canvasDOM = canvas.get('canvasDOM');
      canvasDOM.style.cursor = 'move';
      // const coord = chart.get('coord');
      const previousPoint = me.previousPoint;
      const currentPoint = ev;
      const deltaX = currentPoint.x - previousPoint.x;
      const deltaY = currentPoint.y - previousPoint.y;
      let modified = false;
      if (Math.abs(deltaX) > threshold && type.indexOf('X') > -1) {
        modified = true;
        const xScale = chart.getXScale();
        me._applyTranslate(xScale, xScale.isLinear ? -deltaX : deltaX, coord.width);
      }
      if (Math.abs(deltaY) > threshold && type.indexOf('Y') > -1) {
        modified = true;
        const yScales = chart.getYScales();
        yScales.forEach(yScale => {
          me._applyTranslate(yScale, currentPoint.y - previousPoint.y, coord.height);
        });
      }
      if (modified) {
        me.previousPoint = currentPoint;
        chart.repaint();
      }
    }
  }

  end(ev) {
    const me = this;
    me.isDragging = false;
    const { canvas } = me;
    const canvasDOM = canvas.get('canvasDOM');
    canvasDOM.style.cursor = 'default';
    me._enableTooltip(ev);
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
    me._disableTooltip();
  }
}

module.exports = Drag;
