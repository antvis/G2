const Util = require('../util');
const Interaction = require('./base');
const getFieldRange = require('./helper/get-field-range');
const getLimitRange = require('./helper/get-limit-range');

const DEFAULT_TYPE = 'X';

class ScrollBar extends Interaction {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      startEvent: null,
      processEvent: null,
      endEvent: null,
      resetEvent: null,
      type: DEFAULT_TYPE,
      xStyle: {
        backgroundColor: 'rgba(202, 215, 239, .2)',
        fillerColor: 'rgba(202, 215, 239, .75)',
        size: 4,
        lineCap: 'round',
        offsetX: 0,
        offsetY: -10
      },
      yStyle: {
        backgroundColor: 'rgba(202, 215, 239, .2)',
        fillerColor: 'rgba(202, 215, 239, .75)',
        size: 4,
        lineCap: 'round',
        offsetX: 8,
        offsetY: 0
      }
    });
  }

  _renderScrollBars() {
    const chart = this.chart;
    const scrollBarCfg = chart.get('_scrollBarCfg');

    if (!scrollBarCfg) return;
    const data = chart.get('data');
    const plotRange = chart.get('plotRange');
    plotRange.width = Math.abs(plotRange.br.x - plotRange.bl.x);
    plotRange.height = Math.abs(plotRange.tl.y - plotRange.bl.y);
    const backPlot = chart.get('backPlot');
    const canvas = chart.get('canvas');
    const canvasHeight = canvas.get('height');
    const limitRange = chart.get('_limitRange');

    const type = scrollBarCfg.type;

    if (type.indexOf('X') > -1) {
      const { offsetX, offsetY, lineCap, backgroundColor, fillerColor, size } = scrollBarCfg.xStyle;
      const xScale = chart.getXScale();
      let xLimitRange = limitRange[xScale.field];
      if (!xLimitRange) {
        xLimitRange = getLimitRange(data, xScale);
        limitRange[xScale.field] = xLimitRange;
      }

      const currentRange = getFieldRange(xScale, xLimitRange, xScale.type);
      let horizontalBar = chart.get('_horizontalBar');
      const yPos = canvasHeight - (size / 2) + offsetY;
      if (horizontalBar) {
        const progressLine = horizontalBar.get('children')[1];

        progressLine.attr({
          x1: Math.max(plotRange.bl.x + plotRange.width * currentRange[0] + offsetX, plotRange.bl.x),
          x2: Math.min(plotRange.bl.x + plotRange.width * currentRange[1] + offsetX, plotRange.br.x)
        });
      } else {
        horizontalBar = backPlot.addGroup({
          className: 'horizontalBar'
        });
        horizontalBar.addShape('line', {
          attrs: {
            x1: plotRange.bl.x + offsetX,
            y1: yPos,
            x2: plotRange.br.x + offsetX,
            y2: yPos,
            lineWidth: size,
            stroke: backgroundColor,
            lineCap
          }
        });
        horizontalBar.addShape('line', {
          attrs: {
            x1: Math.max(plotRange.bl.x + plotRange.width * currentRange[0] + offsetX, plotRange.bl.x),
            y1: yPos,
            x2: Math.min(plotRange.bl.x + plotRange.width * currentRange[1] + offsetX, plotRange.br.x),
            y2: yPos,
            lineWidth: size,
            stroke: fillerColor,
            lineCap
          }
        });
        chart.set('_horizontalBar', horizontalBar);
      }
    }

    if (type.indexOf('Y') > -1) {
      const { offsetX, offsetY, lineCap, backgroundColor, fillerColor, size } = scrollBarCfg.yStyle;
      const yScale = chart.getYScales()[0];

      let yLimitRange = limitRange[yScale.field];
      if (!yLimitRange) {
        yLimitRange = getLimitRange(data, yScale);
        limitRange[yScale.field] = yLimitRange;
      }

      const currentRange = getFieldRange(yScale, yLimitRange, yScale.type);
      let verticalBar = chart.get('_verticalBar');
      const xPos = (size / 2) + offsetX;
      if (verticalBar) {
        const progressLine = verticalBar.get('children')[1];

        progressLine.attr({
          y1: Math.max(plotRange.tl.y + plotRange.height * currentRange[0] + offsetY, plotRange.tl.y),
          y2: Math.min(plotRange.tl.y + plotRange.height * currentRange[1] + offsetY, plotRange.bl.y)
        });
      } else {
        verticalBar = backPlot.addGroup({
          className: 'verticalBar'
        });
        verticalBar.addShape('line', {
          attrs: {
            x1: xPos,
            y1: plotRange.tl.y + offsetY,
            x2: xPos,
            y2: plotRange.bl.y + offsetY,
            lineWidth: size,
            stroke: backgroundColor,
            lineCap
          }
        });
        verticalBar.addShape('line', {
          attrs: {
            x1: xPos,
            y1: Math.max(plotRange.tl.y + plotRange.height * currentRange[0] + offsetY, plotRange.tl.y),
            x2: xPos,
            y2: Math.min(plotRange.tl.y + plotRange.height * currentRange[1] + offsetY, plotRange.bl.y),
            lineWidth: size,
            stroke: fillerColor,
            lineCap
          }
        });
        chart.set('_verticalBar', verticalBar);
      }
    }
  }

  constructor(cfg, chart) {
    super(cfg, chart);
    const defaultCfg = this.getDefaultCfg();
    chart.set('_scrollBarCfg', Util.deepMix({}, defaultCfg, cfg));
    chart.set('_limitRange', {});
    if (!chart.get('_horizontalBar') && !chart.get('_verticalBar')) {
      this._renderScrollBars();
    }
  }

  _clear() {
    const chart = this.chart;
    if (chart) {
      const hBar = chart.get('_horizontalBar');
      const vBar = chart.get('_verticalBar');
      hBar && hBar.remove(true);
      vBar && vBar.remove(true);
      chart.set('_horizontalBar', null);
      chart.set('_verticalBar', null);
    }
  }

  _bindEvents() {
    this._onAfterclearOrBeforechangedata = this._onAfterclearOrBeforechangedata.bind(this);
    this._onAfterclearinner = this._onAfterclearinner.bind(this);
    this._onAfterdrawgeoms = this._onAfterdrawgeoms.bind(this);
    const chart = this.chart;
    chart.on('afterclear', this._onAfterclearOrBeforechangedata);
    chart.on('beforechangedata', this._onAfterclearOrBeforechangedata);
    chart.on('afterclearinner', this._onAfterclearinner);
    chart.on('afterdrawgeoms', this._onAfterdrawgeoms);
  }

  _onAfterclearOrBeforechangedata() {
    this.chart && this.chart.set('_limitRange', {});
  }

  _onAfterclearinner() {
    this._clear();
  }

  _onAfterdrawgeoms() {
    this._renderScrollBars();
  }

  _clearEvents() {
    const chart = this.chart;
    if (chart) {
      chart.off('afterclear', this._onAfterclearOrBeforechangedata);
      chart.off('beforechangedata', this._onAfterclearOrBeforechangedata);
      chart.off('afterclearinner', this._onAfterclearinner);
      chart.off('afterdrawgeoms', this._onAfterdrawgeoms);
    }
  }

  destroy() {
    this._clearEvents();
    this._clear();
    this.canvas.draw();
  }
}

module.exports = ScrollBar;
