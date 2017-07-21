/**
 * @fileOverview view
 * @author dxq613@gmail.com
 */

const Base = require('../base');
const Geom = require('../geom/');
const Util = require('../util');
const Controller = require('./controller/index');
const Global = require('../global');

function isFullCircle(coord) {
  const startAngle = coord.startAngle;
  const endAngle = coord.endAngle;
  if (!Util.isNil(startAngle) && !Util.isNil(endAngle) && (endAngle - startAngle) < Math.PI * 2) {
    return false;
  }
  return true;
}

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
    const filteredData = this.get('filteredData');
    const coord = this.get('coord');
    Util.each(geoms, function(geom) {
      geom.set('data', filteredData);
      geom.set('coord', coord);
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

  _adjustScale() {
    this._setCatScalesRange();
    const geoms = this.get('geoms');
    const scaleController = this.get('scaleController');
    const colDefs = scaleController.defs;

    Util.each(geoms, function(geom) {
      if (geom.get('type') === 'interval') {
        const yScale = geom.getYScale();
        const field = yScale.field;
        if (!(colDefs[field] && colDefs[field].min) && yScale.min > 0) {
          yScale.change({
            min: 0
          });
        }
      }
    });
  }

  _setCatScalesRange() {
    const self = this;
    const coord = self.get('coord');
    const xScale = self.getXScale();
    const yScales = self.getYScales();
    let scales = [];

    xScale && scales.push(xScale);
    scales = scales.concat(yScales);
    const inFullCircle = coord.isPolar && isFullCircle(coord);
    const scaleController = self.get('scaleController');
    const colDefs = scaleController.defs;
    Util.each(scales, function(scale) {
      if ((scale.isCategory || scale.isIdentity) && scale.values && !(colDefs[scale.field] && colDefs[scale.field].range)) {
        const count = scale.values.length;
        let range;
        if (count === 1) {
          range = [ 0.5, 1 ]; // 只有一个分类时,防止计算出现 [0.5,0.5]的状态
        } else {
          let widthRatio = 1;
          let offset = 0;
          if (inFullCircle) {
            if (!coord.isTransposed) {
              range = [ 0, 1 - 1 / count ];
            } else {
              widthRatio = Global.widthRatio.multiplePie;
              offset = 1 / count * widthRatio;
              range = [ offset / 2, 1 - offset / 2 ];
            }
          } else {
            widthRatio = Global.widthRatio.column;
            offset = 1 / count * widthRatio;
            range = [ offset, 1 - offset ]; // 坐标轴最前面和最后面留下空白防止绘制柱状图时
          }
        }
        scale.range = range;
      }
    });
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
    const filters = this._getFilters();
    let data = this.get('filteredData');
    if (!scale) {
      const scaleController = this.get('scaleController');
      if (filters && filters[field]) {
        data = this.get('data');
      }
      scale = scaleController.createScale(field, data);
      scales[field] = scale;
    }
    return scale;
  }

  getFilteredScale(field) {
    const data = this.get('filteredData');
    const scaleController = this.get('scaleController');
    const scale = scaleController.createScale(field, data);
    return scale;
  }

  filter(field, condition) {
    const options = this.get('options');
    if (!options.filters) {
      options.filters = {};
    }
    options.filters[field] = condition;
  }

  // 获取 filters
  _getFilters() {
    const self = this;
    const parent = self.get('parent');
    const options = self.get('options');
    let filters = options.filters;
    let parentFilters = null;
    if (parent) {
      parentFilters = parent._getFilters();
    }
    if (filters) {
      filters = Util.mix({}, parentFilters, filters);
    }
    return filters;
  }

  // 执行 filter 数据
  execFilter(data) {
    const self = this;
    const filters = self._getFilters();
    if (filters) {
      const filterFunctions = [];
      Util.each(filters, function(v) {
        if (v) {
          filterFunctions.push(v);
        }
      });
      data = data.filter(function(obj) {
        let rst = true;
        Util.each(filterFunctions, function(fn) {
          rst = fn(obj);
          if (!rst) {
            return false;
          }
        });
        return rst;
      });
    }
    return data;
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

  changeOptions(options) {
    this.set('options', options);
    this._initOptions(options);
    return this;
  }

  clearInner() {
    this.set('scales', {});
    const options = this.get('options');
    options.geoms = null;
    options.filters = null;
    // clear guide
    // clear axis
    this.get('backPlot') && this.get('backPlot').clear();
  }

  clear() {
    this._clearGeoms();
    const container = this.get('viewContainer');
    container.clear();
    this.clearInner();
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
   * 当父元素边框发生改变时坐标系需要重新调整
   * @protected
   */
  resetCoord() {
    this._createCoord();
  }

  /**
   * 绘制 geometry 前处理一些度量统一
   * @protected
   */
  beforeDraw() {

  }

  source(data, scales) {
    this.set('data', data);
    if (scales) {
      this.scale(scales);
    }
    return this;
  }

  changeData(data) {
    this.set('data', data);
    this.repaint();
    return this;
  }

  render() {
    const data = this.get('data');
    const filteredData = this.execFilter(data);
    if (!Util.isEmpty(filteredData)) {
      this.set('filteredData', filteredData);
      this.initView();
      this.paint();
    }
    return this;
  }

  initView() {
    this._initViewPlot();
    this._createCoord(); // draw geometry 前绘制区域可能会发生改变
    this._initGeoms();
    this._adjustScale();
  }

  paint() {
    this.beforeDraw();
    this._drawGeoms();
    this._renderGuides();
    this._renderAxes();
  }

  repaint() {
    this.clearInner();
    const geoms = this.get('geoms');
    Util.each(geoms, function(geom) {
      geom.clear();
    });
    this.render();
  }

  destroy() {
    this.clear();
    super.destroy();
  }
}

module.exports = View;
