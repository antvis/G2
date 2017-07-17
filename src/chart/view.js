/**
 * @fileOverview view
 * @author dxq613@gmail.com
 */

const Base = require('../base');
const Geom = require('../geom/');
const Util = require('../util');
const Controller = require('./controller/index');

const ViewGeoms = {};
Util.each(Geom, function(geomConstructor, className) {
  const methodName = Util.lowerFirst(className);
  ViewGeoms[methodName] = function(cfg) {
    const geom = new geomConstructor(cfg);
    this.addGeom(geom);
    return geom;
  };

});

class View extends Base {

  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    return {
      viewContainer: null,
      coord: null,
      start: { x: 0, y: 1 },
      end: { x: 1, y: 0 },
      geoms: [],
      scales: {},
      options: {},
      scaleController: null,
      parent: null
    };
  }

  constructor(cfg) {
    super(cfg);
    Util.mix(this, ViewGeoms);
    this._initOptions();
    this._initControllers();
  }

  // 初始化配置项
  _initOptions() {
    const self = this;
    const options = self.get('options');
    if (!options.scales) {
      options.scales = {};
    }
    if (!options.coord) {
      options.coord = {};
    }
    if (!options.legends) {
      options.legends = {};
    }

    if (options.geoms && options.geoms.length) {
      Util.each(options.geoms, function(geomOption) {
        self._createGeom(geomOption);
      });
    }
    const scaleController = self.get('scaleController');
    if (scaleController) {
      scaleController.defs = options.scales;
    }
    const coordController = self.get('coordController');
    if (coordController) {
      coordController.reset(options.coord);
    }
  }

  _createGeom(cfg) {
    const type = cfg.type;
    let geom;
    if (this[type]) {
      geom = this[type]();
      Util.each(cfg, function(v, k) {
        if (geom[k]) {
          geom[k](v);
        }
      });
    }
  }

  // 初始化所有的控制器
  _initControllers() {
    const options = this.get('options');

    const scaleController = new Controller.Scale({
      defs: options.scales
    });
    const coordController = new Controller.Coord(options.coord);
    this.set('scaleController', scaleController);
    this.set('coordController', coordController);

    const axisController = new Controller.Axis();
    this.set('axisController', axisController);

    const guideController = new Controller.Guide({
      options: options.guides || []
    });
    this.set('guideController', guideController);
  }

  _initViewPlot() {
    const canvas = this.get('canvas');

    if (!this.get('viewContainer')) { // 用于 geom 的绘制
      this.set('viewContainer', canvas.addGroup({
        zIndex: 2
      }));
    }

    if (!this.get('backPlot')) { // 用于坐标轴以及部分 guide 绘制
      this.set('backPlot', canvas.addGroup({
        zIndex: 1
      }));
    }

    if (!this.get('frontPlot')) {  // 用于图例以及部分 guide 绘制
      this.set('frontPlot', canvas.addGroup({
        zIndex: 3
      }));
    }
  }

  _initGeoms() {
    const geoms = this.get('geoms');
    const data = this.get('data');
    Util.each(geoms, function(geom) {
      geom.set('data', data);
      geom.init();
    });
  }

  _clearGeoms() {
    const self = this;
    const geoms = self.get('geoms');
    while (geoms.length > 0) {
      const geom = geoms.shift();
      geom.destroy();
    }
  }

  _drawGeoms() {
    const geoms = this.get('geoms');
    const coord = this.get('coord');
    Util.each(geoms, function(geom) {
      geom.setCoord(coord);
      geom.paint();
    });
  }

  /**
   * View 所在的范围
   * @protected
   * @return {Object} View 所在的范围
   */
  getViewRegion() {
    const self = this;
    const parent = self.get('parent');
    let start;
    let end;
    if (parent) {
      const region = parent.getViewRegion();
      const viewRegion = self._getViewRegion(region.start, region.end);
      start = viewRegion.start;
      end = viewRegion.end;
    } else {
      start = self.get('start');
      end = self.get('end');
    }
    return {
      start,
      end
    };
  }

  // 获取 range 所在的范围
  _getViewRegion(plotStart, plotEnd) {
    const start = this.get('start');
    const end = this.get('end');
    const startPoint = {
      x: start.x * (plotEnd.x - plotStart.x) + plotStart.x,
      y: end.y * (plotEnd.y - plotStart.y) + plotStart.y

    };
    const endPoint = {
      x: end.x * (plotEnd.x - plotStart.x) + plotStart.x,
      y: start.y * (plotEnd.y - plotStart.y) + plotStart.y
    };

    return {
      start: startPoint,
      end: endPoint
    };
  }

  _createCoord() {
    const coordController = this.get('coordController');
    const region = this.getViewRegion();
    const coord = coordController.createCoord(region.start, region.end);
    this.set('coord', coord);
  }

  _renderAxes() {
    const options = this.get('options');
    const axesOptions = options.axes;
    if (axesOptions === false) { // 不渲染坐标轴
      return;
    }
    const axisController = this.get('axisController');
    axisController.container = this.get('backPlot');
    axisController.coord = this.get('coord');
    axisController.options = axesOptions || {};
    const xScale = this.getXScale();
    const yScales = this.getYScales();
    axisController.createAxis(xScale, yScales);
  }

  _renderGuides() {
    const guideController = this.get('guideController');
    if (!Util.isEmpty(guideController.options)) {
      const coord = this.get('coord');
      guideController.container = this.get('backPlot');
      guideController.xScales = this._getScales('x');
      guideController.yScales = this._getScales('y');
      guideController.render(coord);
    }
  }

  /**
   * @override
   * 渲染图例
   */
  _renderLegends() {}

  _getScales(dimType) {
    const geoms = this.get('geoms');
    const result = {};
    Util.each(geoms, geom => {
      const scale = (dimType === 'x') ? geom.getXScale() : geom.getYScale();
      if (scale && !Util.has(result, scale.field)) {
        result[scale.field] = scale;
      }
    });
    return result;
  }

  getXScale() {
    const geoms = this.get('geoms');
    let xScale = null;
    if (!Util.isEmpty(geoms)) {
      xScale = geoms[0].getXScale();
    }
    return xScale;
  }

  getYScales() {
    const geoms = this.get('geoms');
    const rst = [];

    Util.each(geoms, geom => {
      const yScale = geom.getYScale();
      if (yScale && Util.indexOf(rst, yScale) === -1) {
        rst.push(yScale);
      }
    });
    return rst;
  }

  /**
   * @protected
   * 添加几何标记
   * @param {Geom} geom 几何标记
   */
  addGeom(geom) {
    const geoms = this.get('geoms');
    geoms.push(geom);
    geom.set('view', this);
    const container = this.get('viewContainer');
    const group = container.addGroup();
    geom.set('container', group);
  }

  /**
   * @protected
   * 移除几何标记
   * @param {Geom} geom 几何标记
   */
  removeGeom(geom) {
    const geoms = this.get('geoms');
    Util.Array.remove(geoms, geom);
    geom.destroy();
  }

  createScale(field) {
    const scales = this.get('scales');
    let scale = scales[field];
    const data = this.get('data');
    if (!scale) {
      const scaleController = this.get('scaleController');
      scale = scaleController.createScale(field, data);
      scales[field] = scale;
    }
    return scale;
  }

  axis(field, cfg) {
    const options = this.get('options');
    if (field === false) {
      options.axes = false;
    } else {
      if (Util.isNil(options.axes)) {
        options.axes = {};
      }
      const axisOptions = options.axes;
      axisOptions[field] = cfg;
    }

    return this;
  }

  guide() {
    return this.get('guideController');
  }

  scale(field, cfg) {
    const options = this.get('options');
    const scaleDefs = options.scales;
    if (Util.isObject(field)) {
      Util.mix(scaleDefs, field);
    } else {
      scaleDefs[field] = cfg;
    }
    return this;
  }

  source(data) {
    this.set('data', data);
    return this;
  }

  changeData(data) {
    this.set('data', data);
    this.repaint();
    return this;
  }

  repaint() {
    this._clearInner();
    const geoms = this.get('geoms');
    Util.each(geoms, function(geom) {
      geom.clear();
    });
    this.render();
  }

  changeOptions(options) {
    this.set('options', options);
    this._initOptions(options);
    return this;
  }

  _clearInner() {
    this.set('scales', {});
    const options = this.get('options');
    options.geoms = null;
    // clear guide
    // clear axis
    this.get('backPlot') && this.get('backPlot').clear();
  }

  clear() {
    this._clearGeoms();
    const container = this.get('viewContainer');
    container.clear();
    this._clearInner();
    return this;
  }

  /**
   * 设置坐标系信息
   * @param  {String} type 类型
   * @param  {Object} cfg  配置项
   * @return {Object} coordController 坐标系的管理器
   */
  coord(type, cfg) {
    const coordController = this.get('coordController');
    coordController.reset({
      type,
      cfg
    });
    return coordController;
  }

  /**
   * 绘制 geometry 前处理一些度量统一
   * @protected
   */
  beforeDraw() {

  }

  render() {
    const data = this.get('data');
    if (!Util.isEmpty(data)) {
      this._initViewPlot();
      this._initGeoms();
      this.beforeDraw();
      this._createCoord(); // draw geometry 前绘制区域可能会发生改变
      this._drawGeoms();
      this._renderGuides();
      this._renderAxes();
      this._renderLegends();
    }
    return this;
  }

  destroy() {
    this.clear();
    super.destroy();
  }
}

module.exports = View;
