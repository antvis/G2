/**
 * @fileOverview G2 图表的入口文件
 * @author dxq613@gmail.com
 */

const Util = require('../util');
const View = require('./view');
const G = require('@ali/g');
const Canvas = G.Canvas;
const DomUtil = G.DomUtil;
const Component = require('../component/index');
const Controller = require('./controller/index');
const Global = require('../global');

function _isScaleExist(scales, compareScale) {
  let flag = false;
  Util.each(scales, scale => {
    const scaleValues = [].concat(scale.values);
    const compareScaleValues = [].concat(compareScale.values);
    if (scale.type === compareScale.type && scale.field === compareScale.field && scaleValues.sort().toString() === compareScaleValues.sort().toString()) {
      flag = true;
      return;
    }
  });

  return flag;
}

/**
 * 图表的入口
 * @class Chart
 */
class Chart extends View {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    const viewCfg = super.getDefaultCfg();
    return Util.mix({
      id: null,
      forceFit: false,
      container: null,
      wrapperEl: null,
      canvas: null,
      width: 500,
      height: 500,
      pixelRatio: null,
      padding: Global.plotCfg.padding,
      backPlot: null,
      frontPlot: null,
      plotBackground: null,
      views: []
    }, viewCfg);
  }

  init() {
    this._initCanvas();
    this._initPlot();
    this._initEvents();
    super.init();

    const tooltipController = new Controller.Tooltip({
      chart: this
    });
    this.set('tooltipController', tooltipController);

    const legendController = new Controller.Legend({
      chart: this
    });
    this.set('legendController', legendController);
  }
  // 初始化画布
  _initCanvas() {
    let container = this.get('container');
    let width = this.get('width');
    const height = this.get('height');
    if (Util.isString(container)) {
      container = document.getElementById(container);
      if (!container) {
        throw new Error('Please specify the container for the chart!');
      }
      this.set('container', container);
    }
    const wrapperEl = DomUtil.createDom('<div style="position:relative;"></div>');
    container.appendChild(wrapperEl);
    this.set('wrapperEl', wrapperEl);
    if (this.get('forceFit')) {
      width = DomUtil.getWidth(container);
      this.set('width', width);
    }
    const canvas = new Canvas({
      containerDOM: wrapperEl,
      width,
      height,
      pixelRatio: this.get('pixelRatio')
    });
    this.set('canvas', canvas);
  }

  // 初始化绘图区间
  _initPlot() {
    this._initPlotBack(); // 最底层的是背景相关的 group
    const canvas = this.get('canvas');
    const backPlot = canvas.addGroup({
      zIndex: 1
    }); // 图表最后面的容器
    const plotContainer = canvas.addGroup({
      zIndex: 2
    }); // 图表所在的容器
    const frontPlot = canvas.addGroup({
      zIndex: 3
    }); // 图表前面的容器

    this.set('backPlot', backPlot);
    this.set('viewContainer', plotContainer);
    this.set('frontPlot', frontPlot);
  }

  // 初始化背景
  _initPlotBack() {
    const canvas = this.get('canvas');
    const plotBack = canvas.addGroup(Component.Plot, {
      padding: this.get('padding'),
      plotBackground: this.get('plotBackground'),
      background: this.get('background')
    });
    this.set('plotBack', plotBack);
    this.set('plotRange', plotBack.get('plotRange'));
  }

  _initEvents() {
    if (this.get('forceFit')) {
      window.addEventListener('resize', Util.wrapBehavior(this, '_initForceFitEvent'));
    }
  }

  _initForceFitEvent() {
    const timer = setTimeout(Util.wrapBehavior(this, 'forceFit'), 200);
    clearTimeout(this.get('resizeTimer'));
    this.set('resizeTimer', timer);
  }

  // 绘制图例
  _renderLegends() {
    const options = this.get('options');
    const legendOptions = options.legends;
    if (Util.isNil(legendOptions) || (legendOptions !== false)) { // 没有关闭图例
      const legendController = this.get('legendController');
      legendController.options = legendOptions || {};
      legendController.plotRange = this.get('plotRange');

      if (legendOptions && legendOptions.custom) { // 用户自定义图例
        legendController.addCustomLegend();
      }

      const geoms = this.getAllGeoms();
      const scales = [];
      Util.each(geoms, geom => {
        const view = geom.get('view');
        const attrs = geom.getAttrsForLegend();
        Util.each(attrs, attr => {
          const type = attr.type;
          const scale = attr.getScale(type);
          if (scale.type !== 'identity' && !_isScaleExist(scales, scale)) {
            scales.push(scale);
            const filteredScale = view.getFilteredScale(scale.field);
            legendController.addLegend(scale, attr, geom, filteredScale.values);
          }
        });
      });

      legendController.alignLegends();
    }
  }

  // 绘制 tooltip
  _renderTooltips() {
    const options = this.get('options');
    if (Util.isNil(options.tooltip) || options.tooltip !== false) { // 用户没有关闭 tooltip
      const tooltipController = this.get('tooltipController');
      tooltipController.options = options.tooltip || {};
      tooltipController.renderTooltip();
    }
  }

  /**
   * 获取所有的几何标记
   * @return {Array} 所有的几何标记
   */
  getAllGeoms() {
    let geoms = [];
    geoms = geoms.concat(this.get('geoms'));

    const views = this.get('views');
    Util.each(views, view => {
      geoms = geoms.concat(view.get('geoms'));
    });

    return geoms;
  }

  /**
   * 自适应宽度
   * @chainable
   * @return {Chart} 图表对象
   */
  forceFit() {
    const self = this;
    const container = self.get('container');
    const width = DomUtil.getWidth(container);
    if (width !== this.get('width')) {
      const height = this.get('height');
      this.changeSize(width, height);
    }
    return self;
  }

  /**
   * 改变大小
   * @param  {Number} width  图表宽度
   * @param  {Number} height 图表高度
   * @return {Chart} 图表对象
   */
  changeSize(width, height) {
    const self = this;
    const canvas = self.get('canvas');
    canvas.changeSize(width, height);

    self.set('width', width);
    self.set('height', height);
    const plotBack = self.get('plotBack');
    plotBack.repaint();

    self.repaint();
    return self;
  }

  /**
   * 创建一个视图
   * @param  {Object} cfg 视图的配置项
   * @return {View} 视图对象
   */
  view(cfg) {
    cfg = cfg || {};
    const viewContainer = this.get('viewContainer');
    cfg.parent = this;
    cfg.viewContainer = viewContainer.addGroup();
    cfg.backPlot = this.get('backPlot');
    cfg.frontPlot = this.get('frontPlot');
    cfg.canvas = this.get('canvas');
    if (Util.isNil(cfg.animate)) {
      cfg.animate = this.get('animate');
    }
    const view = new View(cfg);
    this.get('views').push(view);
    return view;
  }
  /**
   * @override
   * 当前chart 的范围
   */
  getViewRegion() {
    const plotRange = this.get('plotRange');
    return {
      start: plotRange.bl,
      end: plotRange.tr
    };
  }

  /**
   * 设置图例配置信息
   * @param  {String|Object} field 字段名
   * @param  {Object} [cfg] 图例的配置项
   * @return {Chart} 当前的图表对象
   */
  legend(field, cfg) {
    const options = this.get('options');
    let legends = {};

    if (field === false) {
      options.legends = false;
    } else if (Util.isObject(field)) {
      legends = field;
    } else if (Util.isString(field)) {
      legends[field] = cfg;
    } else {
      legends = cfg;
    }
    Util.mix(options.legends, legends);

    return this;
  }

  /**
   * 设置提示信息
   * @param  {String|Object} visible 是否可见
   * @param  {Object} [cfg] 提示信息的配置项
   * @return {Chart} 当前的图表对象
   */
  tooltip(visible, cfg) {
    const options = this.get('options');
    if (Util.isNil(options.tooltip)) {
      options.tooltip = {};
    }

    if (visible === false) {
      options.tooltip = false;
    } else if (Util.isObject(visible)) {
      Util.mix(options.tooltip, visible);
    } else {
      Util.mix(options.tooltip, cfg);
    }

    return this;
  }

  /**
   * 清空图表
   * @return {Chart} 当前的图表对象
   */
  clear() {
    const views = this.get('views');
    while (views.length > 0) {
      const view = views.shift();
      view.destroy();
    }
    super.clear();
    const canvas = this.get('canvas');
    canvas.draw();
    return this;
  }

  clearInner() {
    const views = this.get('views');
    Util.each(views, function(view) {
      view.clearInner();
    });
    const legendController = this.get('legendController');
    const tooltipController = this.get('tooltipController');

    legendController && legendController.clear();
    tooltipController && tooltipController.clear();
    super.clearInner();
  }

  /**
   * 绘制图表
   * @override
   */
  renderView() {
    super.renderView();
    this._renderLegends(); // 渲染图例
    this._renderTooltips(); // 渲染 tooltip
  }

  /**
   * @override
   * 显示或者隐藏
   */
  changeVisible(visible) {
    const wrapperEl = this.get('wrapperEl');
    const visibleStr = visible ? '' : 'none';
    wrapperEl.style.display = visibleStr;
  }

  /**
   * @override
   * 销毁图表
   */
  destroy() {
    const canvas = this.get('canvas');
    const wrapperEl = this.get('wrapperEl');
    wrapperEl.parentNode.removeChild(wrapperEl);
    super.destroy();
    canvas.destroy();
    window.removeEventListener('resize', Util.getWrapBehavior(this, '_initForceFitEvent'));
  }
}

module.exports = Chart;
