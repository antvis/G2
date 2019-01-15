
const Util = require('../util');
const Interaction = require('./base');
const getColDef = require('./helper/get-col-def');
const getLimitRange = require('./helper/get-limit-range');

const ZOOMING_TYPES = [ 'X', 'Y', 'XY' ];
const DEFAULT_TYPE = 'X';

class Zoom extends Interaction {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      processEvent: 'mousewheel',
      type: DEFAULT_TYPE,
      stepRatio: 0.05,
      stepByField: {},
      minScale: 1,
      maxScale: 4,
      catStep: 2,
      limitRange: {},
      originScaleDefsByField: {}
    });
  }

  constructor(cfg, chart) {
    super(cfg, chart);
    const me = this;
    me.chart = chart;
    me.type = me.type.toUpperCase();
    const data = me.data = chart.get('data');

    const scales = chart.getYScales();
    const xScale = chart.getXScale();
    scales.push(xScale);
    const scaleController = chart.get('scaleController');
    scales.forEach(scale => {
      const field = scale.field;
      const def = scaleController.defs[field] || {};
      me.limitRange[field] = getLimitRange(data, scale);
      me.originScaleDefsByField[field] = Util.mix(def, {
        nice: !!def.nice
      });
      if (scale.isLinear) {
        me.stepByField[field] = (scale.max - scale.min) * me.stepRatio;
      } else {
        me.stepByField[field] = me.catStep;
      }
    });

    if (ZOOMING_TYPES.indexOf(me.type) === -1) {
      me.type = DEFAULT_TYPE;
    }
  }

  // onZoom() { }
  // onZoomin() { }
  // onZoomout() { }

  _applyScale(scale, delta, minOffset = 0, center) {
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
    } else {
      const { field, values } = scale;
      const chart = me.chart;
      const coord = chart.get('coord');
      const colDef = getColDef(chart, field);

      const originValues = me.limitRange[field];
      const originValuesLen = originValues.length;
      const maxScale = me.maxScale;
      const minScale = me.minScale;
      const minCount = originValuesLen / maxScale;
      const maxCount = originValuesLen / minScale;

      const valuesLength = values.length;
      const offsetPoint = coord.invertPoint(center);
      const percent = offsetPoint.x;
      const deltaCount = valuesLength - delta * this.catStep;
      const minDelta = parseInt(deltaCount * (percent));
      const maxDelta = deltaCount + minDelta;

      if (delta > 0 && valuesLength >= minCount) { // zoom out
        let min = minDelta;
        let max = maxDelta;
        if (maxDelta > valuesLength) {
          max = valuesLength - 1;
          min = valuesLength - deltaCount;
        }
        const newValues = values.slice(min, max);
        chart.scale(field, Util.mix({}, colDef, {
          values: newValues
        }));
      } else if (delta < 0 && valuesLength <= maxCount) { // zoom in
        const firstIndex = originValues.indexOf(values[0]);
        const lastIndex = originValues.indexOf(values[valuesLength - 1]);
        const minIndex = Math.max(0, firstIndex - minDelta);
        const maxIndex = Math.min(lastIndex + maxDelta, originValuesLen);
        const newValues = originValues.slice(minIndex, maxIndex);
        chart.scale(field, Util.mix({}, colDef, {
          values: newValues
        }));
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
        me._applyScale(chart.getXScale(), delta, offsetPoint.x, ev);
      }
      if (type.indexOf('Y') > -1) {
        const yScales = chart.getYScales();
        yScales.forEach(yScale => {
          me._applyScale(yScale, delta, offsetPoint.y, ev);
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

// G2.registerInteraction('zoom', Zoom);
// G2.registerInteraction('Zoom', Zoom);

module.exports = Zoom;
