const Range = require('./component/range');
const Chart = require('../chart/chart');
const Util = require('../util');
const G = require('../renderer');
const Global = require('../global');
const Interaction = require('./base');
const getColDef = require('./helper/get-col-def');
const getColDefs = require('./helper/get-col-defs');

const { Canvas } = G;
const { DomUtil, isNumber } = Util;

class Slider extends Interaction {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      startEvent: null,
      processEvent: null,
      endEvent: null,
      resetEvent: null,
      height: 26,
      width: 'auto', // 默认自适应
      padding: Global.plotCfg.padding,
      container: null,
      xAxis: null,
      yAxis: null,
      // 选中区域的样式
      fillerStyle: {
        fill: '#BDCCED',
        fillOpacity: 0.3
      },
      // 滑动条背景样式
      backgroundStyle: {
        stroke: '#CCD6EC',
        fill: '#CCD6EC',
        fillOpacity: 0.3,
        lineWidth: 1
      },
      range: [ 0, 100 ],
      layout: 'horizontal',
      // 文本颜色
      textStyle: {
        fill: '#545454'
      },
      // 滑块的样式
      handleStyle: {
        img: 'https://gw.alipayobjects.com/zos/rmsportal/QXtfhORGlDuRvLXFzpsQ.png',
        width: 5
      },
      // 背景图表的配置，如果为 false 则表示不渲染
      backgroundChart: {
        type: [ 'area' ], // 图表的类型，可以是字符串也可是是数组
        color: '#CCD6EC'
      }
    });
  }
  _initContainer() {
    const me = this;
    const container = me.container;
    if (!container) {
      throw new Error('Please specify the container for the Slider!');
    }
    if (Util.isString(container)) {
      me.domContainer = document.getElementById(container);
    } else {
      me.domContainer = container;
    }
  }
  forceFit() {
    const me = this;
    if (!me || me.destroyed) {
      return;
    }
    const width = DomUtil.getWidth(me.domContainer);
    const height = me.height;
    if (width !== me.domWidth) {
      const canvas = me.canvas;
      canvas.changeSize(width, height); // 改变画布尺寸
      me.bgChart && me.bgChart.changeWidth(width);
      canvas.clear();
      me._initWidth();
      me._initSlider(); // 初始化滑动条
      me._bindEvent();
      canvas.draw();
    }
  }
  _initForceFitEvent() {
    const me = this;
    const timer = setTimeout(Util.wrapBehavior(me, 'forceFit'), 200);
    clearTimeout(me.resizeTimer);
    me.resizeTimer = timer;
  }
  _initStyle() {
    const me = this;
    me.handleStyle = Util.mix({
      width: me.height,
      height: me.height
    }, me.handleStyle);
    if (me.width === 'auto') { // 宽度自适应
      window.addEventListener('resize', Util.wrapBehavior(me, '_initForceFitEvent'));
    }
  }
  _initWidth() {
    const me = this;
    let width;
    if (me.width === 'auto') {
      width = DomUtil.getWidth(me.domContainer);
    } else {
      width = me.width;
    }
    me.domWidth = width;
    const padding = Util.toAllPadding(me.padding);

    if (me.layout === 'horizontal') {
      me.plotWidth = width - padding[1] - padding[3];
      me.plotPadding = padding[3];
      me.plotHeight = me.height;
    } else if (me.layout === 'vertical') {
      me.plotWidth = me.width;
      me.plotHeight = me.height - padding[0] - padding[2];
      me.plotPadding = padding[0];
    }
  }
  _initCanvas() {
    const me = this;
    const width = me.domWidth;
    const height = me.height;
    const canvas = new Canvas({
      width,
      height,
      containerDOM: me.domContainer,
      capture: false
    });
    const node = canvas.get('el');
    node.style.position = 'absolute';
    node.style.top = 0;
    node.style.left = 0;
    node.style.zIndex = 3;
    me.canvas = canvas;
  }
  _initBackground() {
    const me = this;
    const { chart } = this;
    const geom = chart.getAllGeoms[0];
    const data = me.data = me.data || chart.get('data');
    const xScale = chart.getXScale();
    const xAxis = me.xAxis || xScale.field;
    const yAxis = me.yAxis || chart.getYScales()[0].field;
    const scales = Util.deepMix({
      [`${xAxis}`]: {
        range: [ 0, 1 ]
      }
    }, getColDefs(chart), me.scales); // 用户列定义
    delete scales[xAxis].min;
    delete scales[xAxis].max;
    if (!data) { // 没有数据，则不创建
      throw new Error('Please specify the data!');
    }
    if (!xAxis) {
      throw new Error('Please specify the xAxis!');
    }
    if (!yAxis) {
      throw new Error('Please specify the yAxis!');
    }

    const backgroundChart = me.backgroundChart;
    let type = backgroundChart.type || geom.get('type');
    const color = backgroundChart.color || 'grey';
    const shape = backgroundChart.shape;
    if (!Util.isArray(type)) {
      type = [ type ];
    }

    const padding = Util.toAllPadding(me.padding);
    const bgChart = new Chart({
      container: me.container,
      width: me.domWidth,
      height: me.height,
      padding: [ 0, padding[1], 0, padding[3] ],
      animate: false
    });
    bgChart.source(data);
    bgChart.scale(scales);
    bgChart.axis(false);
    bgChart.tooltip(false);
    bgChart.legend(false);
    Util.each(type, (eachType, index) => {
      const bgGeom = bgChart[eachType]()
        .position(xAxis + '*' + yAxis)
        .opacity(1);
      const colorItem = Util.isArray(color) ? color[index] : color;
      if (colorItem) {
        if (Util.isObject(colorItem)) {
          // 通过 { field: 'ss', colors: [ ] } 的方式申明color
          if (colorItem.field) {
            bgGeom.color(colorItem.field, colorItem.colors);
          }
        } else {
          bgGeom.color(colorItem);
        }
      }

      const shapeItem = Util.isArray(shape) ? shape[index] : shape;
      if (shapeItem) {
        if (Util.isObject(shapeItem)) {
          // 通过 { field: 'ss', shapes: [ ], callback } 的方式申明shape
          if (shapeItem.field) {
            bgGeom.shape(shapeItem.field, shapeItem.callback || shapeItem.shapes);
          }
        } else {
          bgGeom.shape(shapeItem);
        }
      }
    });
    bgChart.render();
    me.bgChart = bgChart;
    me.scale = me.layout === 'horizontal' ? bgChart.getXScale() : bgChart.getYScales()[0];
    if (me.layout === 'vertical') {
      bgChart.destroy();
    }
  }

  _initRange() {
    const me = this;
    const startRadio = me.startRadio;
    const endRadio = me.endRadio;
    const start = me._startValue;
    const end = me._endValue;
    const scale = me.scale;
    let min = 0;
    let max = 1;

    // startRadio 优先级高于 start
    if (isNumber(startRadio)) {
      min = startRadio;
    } else if (start) {
      min = scale.scale(scale.translate(start));
    }

    // endRadio 优先级高于 end
    if (isNumber(endRadio)) {
      max = endRadio;
    } else if (end) {
      max = scale.scale(scale.translate(end));
    }
    const { minSpan, maxSpan } = me;
    let totalSpan = 0;
    if (scale.type === 'time' || scale.type === 'timeCat') { // 时间类型已排序
      const values = scale.values;
      const firstValue = values[0];
      const lastValue = values[values.length - 1];
      totalSpan = lastValue - firstValue;
    } else if (scale.isLinear) {
      totalSpan = scale.max - scale.min;
    }
    if (totalSpan && minSpan) {
      me.minRange = (minSpan / totalSpan) * 100;
    }
    if (totalSpan && maxSpan) {
      me.maxRange = (maxSpan / totalSpan) * 100;
    }

    const range = [ min * 100, max * 100 ];
    me.range = range;
    return range;
  }
  _getHandleValue(type) {
    const me = this;
    let value;
    const range = me.range;
    const min = range[0] / 100;
    const max = range[1] / 100;
    const scale = me.scale;
    if (type === 'min') {
      value = me._startValue ? me._startValue : scale.invert(min);
    } else {
      value = me._endValue ? me._endValue : scale.invert(max);
    }
    return value;
  }

  _initSlider() {
    const me = this;
    const canvas = me.canvas;
    const range = me._initRange();
    const scale = me.scale;
    const rangeElement = canvas.addGroup(Range, {
      middleAttr: me.fillerStyle,
      range,
      minRange: me.minRange,
      maxRange: me.maxRange,
      layout: me.layout,
      width: me.plotWidth,
      height: me.plotHeight,
      backgroundStyle: me.backgroundStyle,
      textStyle: me.textStyle,
      handleStyle: me.handleStyle,
      minText: scale.getText(me._getHandleValue('min')),
      maxText: scale.getText(me._getHandleValue('max'))
    });
    if (me.layout === 'horizontal') {
      rangeElement.translate(me.plotPadding, 0);
    } else if (me.layout === 'vertical') {
      rangeElement.translate(0, me.plotPadding);
    }
    me.rangeElement = rangeElement;
  }
  _updateElement(minRatio, maxRatio) {
    const me = this;
    const { chart, scale, rangeElement } = me;
    const { field } = scale;
    const minTextElement = rangeElement.get('minTextElement');
    const maxTextElement = rangeElement.get('maxTextElement');
    const min = scale.invert(minRatio);
    const max = scale.invert(maxRatio);
    const minText = scale.getText(min);
    const maxText = scale.getText(max);
    minTextElement.attr('text', minText);
    maxTextElement.attr('text', maxText);

    me._startValue = minText;
    me._endValue = maxText;

    if (me.onChange) {
      me.onChange({
        startText: minText,
        endText: maxText,
        startValue: min,
        endValue: max,
        startRadio: minRatio,
        endRadio: maxRatio
      });
    }
    chart.scale(field, Util.mix({}, getColDef(chart, field), {
      nice: false,
      min,
      max
    }));
    chart.repaint();
  }
  _bindEvent() {
    const me = this;
    const rangeElement = me.rangeElement;
    rangeElement.on('sliderchange', ev => {
      const range = ev.range;
      const minRatio = range[0] / 100;
      const maxRatio = range[1] / 100;
      me._updateElement(minRatio, maxRatio);
    });
  }

  constructor(cfg, chart) {
    super(cfg, chart);
    const me = this;
    me._initContainer();
    me._initStyle();
    me.render();
  }

  clear() {
    const me = this;
    me.canvas.clear();
    me.bgChart && me.bgChart.destroy();
    me.bgChart = null;
    me.scale = null;
    me.canvas.draw();
  }

  repaint() {
    const me = this;
    me.clear();
    me.render();
  }

  render() {
    const me = this;
    me._initWidth();
    me._initCanvas();
    me._initBackground();
    me._initSlider();
    me._bindEvent();
    me.canvas.draw();
  }

  destroy() {
    const me = this;
    clearTimeout(me.resizeTimer);
    const rangeElement = me.rangeElement;
    rangeElement.off('sliderchange');
    me.bgChart && me.bgChart.destroy();
    me.canvas.destroy();
    const container = me.domContainer;
    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }
    window.removeEventListener('resize', Util.getWrapBehavior(me, '_initForceFitEvent'));
    me.destroyed = true;
  }
}

module.exports = Slider;
