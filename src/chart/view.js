/**
 * @fileOverview view
 * @author dxq613@gmail.com
 */

const Base = require('../base');
const Geom = require('../geom/base');
const Util = require('../util');
const Controller = require('./controller/index');
const Global = require('../global');
const Theme = require('../theme/index');
const FIELD_ORIGIN = '_origin';
const Animate = require('../animate/index');

function isFullCircle(coord) {
  const startAngle = coord.startAngle;
  const endAngle = coord.endAngle;
  if (!Util.isNil(startAngle) && !Util.isNil(endAngle) && (endAngle - startAngle) < Math.PI * 2) {
    return false;
  }
  return true;
}

function isBetween(value, start, end) {
  const tmp = (value - start) / (end - start);
  return tmp >= 0 && tmp <= 1;
}

function isPointInCoord(coord, point) {
  let result = false;
  if (coord) {
    const type = coord.type;
    if (type === 'theta') {
      const start = coord.start;
      const end = coord.end;
      result = isBetween(point.x, start.x, end.x) && isBetween(point.y, start.y, end.y);
    } else {
      const invertPoint = coord.invert(point);
      result = invertPoint.x >= 0 && invertPoint.y >= 0 && invertPoint.x <= 1 && invertPoint.y <= 1;
    }
  }
  return result;
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

/**
 * 图表中的视图
 * @class View
 */
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
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      geoms: [],
      scales: {},
      options: {},
      scaleController: null,
      padding: 0,
      theme: null,
      parent: null,
      tooltipEnable: true, // 是否展示 tooltip
      animate: Global.animate,
      visible: true
    };
  }

  constructor(cfg) {
    super(cfg);
    const self = this;
    self._setTheme();
    Util.each(Geom, function(GeomConstructor, className) {
      const methodName = Util.lowerFirst(className);
      self[methodName] = function(cfg = {}) {
        cfg.viewTheme = self.get('viewTheme');
        const geom = new GeomConstructor(cfg);
        self.addGeom(geom);
        return geom;
      };
    });
    // Util.mix(this, ViewGeoms);
    self.init();
  }

  _setTheme() {
    const self = this;
    const theme = self.get('theme');
    const viewTheme = {};
    let newTheme = {};
    if (Util.isObject(theme)) {
      newTheme = theme;
    } else if (Util.indexOf(Object.keys(Theme), theme) !== -1) {
      newTheme = Theme[theme];
    }
    Util.deepMix(viewTheme, Global, newTheme);
    self.set('viewTheme', viewTheme);
  }

  /**
   * @protected
   * 初始化
   */
  init() {
    this._initViewPlot(); // 先创建容器
    if (this.get('data')) {
      this._initData(this.get('data'));
    }
    this._initOptions();
    this._initControllers();
    this._bindEvents();
  }

  // 初始化配置项
  _initOptions() {
    const self = this;
    const options = Util.mix({}, self.get('options')); // 防止修改原始值
    if (!options.scales) {
      options.scales = {};
    }
    if (!options.coord) {
      options.coord = {};
    }

    if (options.animate === false) {
      this.set('animate', false);
    }

    if (options.tooltip === false || Util.isNull(options.tooltip)) { // 配置项方式关闭 tooltip
      this.set('tooltipEnable', false);
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
    this.set('options', options);
  }

  _createGeom(cfg) {
    const type = cfg.type;
    let geom;
    if (this[type]) {
      geom = this[type]();
      Util.each(cfg, function(v, k) {
        if (geom[k]) {

          if (Util.isObject(v) && v.field) { // 配置项传入
            if (v === 'label') {
              geom[k](v.field, v.callback, v.cfg);
            } else {
              let cfg;
              Util.each(v, (value, key) => {
                if (key !== 'field') {
                  cfg = value;
                }
              });
              geom[k](v.field, cfg);
            }
          } else {
            geom[k](v);
          }
        }
      });
    }
  }

  // 初始化所有的控制器
  _initControllers() {
    const self = this;
    const options = self.get('options');
    const viewTheme = self.get('viewTheme');
    const canvas = self.get('canvas');

    const scaleController = new Controller.Scale({
      viewTheme,
      defs: options.scales
    });
    const coordController = new Controller.Coord(options.coord);
    this.set('scaleController', scaleController);
    this.set('coordController', coordController);

    const axisController = new Controller.Axis({
      canvas,
      viewTheme
    });
    this.set('axisController', axisController);

    const guideController = new Controller.Guide({
      viewTheme,
      options: options.guides || []
    });
    this.set('guideController', guideController);
  }

  _initViewPlot() {
    if (!this.get('viewContainer')) { // 用于 geom 的绘制
      this.set('viewContainer', this.get('middlePlot'));
    }
  }

  _initGeoms() {
    const geoms = this.get('geoms');
    const filteredData = this.get('filteredData');
    const coord = this.get('coord');
    const viewId = this.get('_id');
    for (let i = 0; i < geoms.length; i++) {
      const geom = geoms[i];
      geom.set('data', filteredData);
      geom.set('coord', coord);
      geom.set('_id', viewId + '-geom' + i);
      geom.set('keyFields', this.get('keyFields'));
      geom.init();
    }
  }

  _clearGeoms() {
    const self = this;
    const geoms = self.get('geoms');
    for (let i = 0; i < geoms.length; i++) {
      const geom = geoms[i];
      geom.clear();
    }
  }

  _removeGeoms() {
    const self = this;
    const geoms = self.get('geoms');
    while (geoms.length > 0) {
      const geom = geoms.shift();
      geom.destroy();
    }
  }

  _drawGeoms() {
    this.emit('beforedrawgeoms');
    const geoms = this.get('geoms');
    const coord = this.get('coord');
    for (let i = 0; i < geoms.length; i++) {
      const geom = geoms[i];
      geom.setCoord(coord);
      geom.paint();
    }
    this.emit('afterdrawgeoms');
  }

  isShapeInView(shape) {
    const id = this.get('_id');
    const shapeId = shape._id;
    if (!shapeId) {
      return shape.get('parent').get('viewId') === id;
    }
    return shapeId.split('-')[0] === id;
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
    const startX = start.x;
    const startY = 1 - end.y;
    const endX = end.x;
    const endY = 1 - start.y;
    const padding = this.get('padding');
    // 转换成 上、右、下、左的模式
    const allPadding = Util.toAllPadding(padding);
    const top = allPadding[0];
    const right = allPadding[1];
    const bottom = allPadding[2];
    const left = allPadding[3];

    const startPoint = {
      x: startX * (plotEnd.x - plotStart.x) + plotStart.x + left,
      y: startY * (plotEnd.y - plotStart.y) + plotStart.y - bottom

    };
    const endPoint = {
      x: endX * (plotEnd.x - plotStart.x) + plotStart.x - right,
      y: endY * (plotEnd.y - plotStart.y) + plotStart.y + top
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
    const viewId = this.get('_id');
    axisController.createAxis(xScale, yScales, viewId);
  }

  _renderGuides() {
    const guideController = this.get('guideController');
    if (!Util.isEmpty(guideController.options)) {
      const coord = this.get('coord');
      guideController.view = this;
      guideController.backContainer = this.get('backPlot');
      guideController.frontContainer = this.get('frontPlot');
      guideController.xScales = this._getScales('x');
      guideController.yScales = this._getScales('y');
      guideController.render(coord);
    }
  }
  // 注册事件
  _bindEvents() {
    const eventController = new Controller.Event({
      view: this,
      canvas: this.get('canvas')
    });
    eventController.bindEvents();
    this.set('eventController', eventController);
  }
  // 清理时间
  _clearEvents() {
    const eventController = this.get('eventController');
    eventController && eventController.clearEvents();
  }

  _getScales(dimType) {
    const geoms = this.get('geoms');
    const result = {};
    for (let i = 0; i < geoms.length; i++) {
      const geom = geoms[i];
      const scale = (dimType === 'x') ? geom.getXScale() : geom.getYScale();
      if (scale && !result[scale.field]) {
        result[scale.field] = scale;
      }
    }
    return result;
  }

  _adjustScale() {
    this._setCatScalesRange();
    const geoms = this.get('geoms');
    const scaleController = this.get('scaleController');
    const colDefs = scaleController.defs;

    for (let i = 0; i < geoms.length; i++) {
      const geom = geoms[i];
      if (geom.get('type') === 'interval') {
        const yScale = geom.getYScale();
        const { field, min, max, type } = yScale;
        if (!(colDefs[field] && colDefs[field].min) && type !== 'time') {
          if (min > 0) {
            yScale.change({
              min: 0
            });
          } else if (max <= 0) { // 当柱状图全为负值时也需要从 0 开始生长
            yScale.change({
              max: 0
            });
          }
        }
      }
    }
  }

  _setCatScalesRange() {
    const self = this;
    const coord = self.get('coord');
    const viewTheme = self.get('viewTheme');
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
              widthRatio = viewTheme.widthRatio.multiplePie;
              offset = 1 / count * widthRatio;
              range = [ offset / 2, 1 - offset / 2 ];
            }
          } else {
            offset = 1 / count * 1 / 2; // 两边留下分类空间的一半
            range = [ offset, 1 - offset ]; // 坐标轴最前面和最后面留下空白防止绘制柱状图时
          }
        }
        scale.range = range;
      }
    });
  }

  getXScale() {
    const geoms = this.get('geoms');
    // 如果进行过滤，那么 geom 默认隐藏时会出现不一致
    // 默认隐藏时坐标轴不绘制，但是调用了 geom.show() 后，则图形显示了，坐标轴依然不见
    /* .filter(function(geom) {
      return geom.get('visible');
    }); */
    let xScale = null;
    if (!Util.isEmpty(geoms)) {
      xScale = geoms[0].getXScale();
    }
    return xScale;
  }

  getYScales() {
    const geoms = this.get('geoms');
    /* .filter(function(geom) {
      return geom.get('visible');
    }); */
    const rst = [];

    for (let i = 0; i < geoms.length; i++) {
      const geom = geoms[i];
      const yScale = geom.getYScale();
      if (yScale && Util.indexOf(rst, yScale) === -1) {
        rst.push(yScale);
      }
    }
    return rst;
  }

  /**
   * 获取数据对应在画布空间的坐标
   * @param  {Object} item 原始数据
   * @return {Object}      返回对应的画布上的坐标点
   */
  getXY(item) {
    const self = this;
    const coord = self.get('coord');
    const xScales = self._getScales('x');
    const yScales = self._getScales('y');
    let x;
    let y;

    for (const field in item) {
      if (xScales[field]) {
        x = xScales[field].scale(item[field]);
      }
      if (yScales[field]) {
        y = yScales[field].scale(item[field]);
      }
    }

    if (!Util.isNil(x) && !Util.isNil(y)) {
      return coord.convert({
        x,
        y
      });
    }

    return null;
  }

  /**
   * 获取逼近的点的数据集合
   * @param  {Object} point 画布上的像素点
   * @return {Array} 数据
   */
  getSnapRecords(point) {
    const self = this;
    const geoms = self.get('geoms');
    const rst = [];
    Util.each(geoms, geom => {
      const dataArray = geom.get('dataArray');
      let record;
      Util.each(dataArray, function(data) {
        record = geom.findPoint(point, data);
        record && rst.push(record);
      });
    });
    return rst;
  }

  /**
   * @protected
   * 添加几何标记
   * @param {Geom} geom 几何标记
   */
  addGeom(geom) {
    const self = this;
    const geoms = self.get('geoms');
    geoms.push(geom);
    geom.set('view', self);
    const container = self.get('viewContainer');
    geom.set('container', container);
    geom.set('animate', self.get('animate'));
    geom.bindEvents();
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

  createScale(field, data) {
    const scales = this.get('scales');
    const parent = this.get('parent');
    let scale = scales[field];
    // const filters = this._getFilters();
    if (!data) {
      const filteredData = this.get('filteredData');
      const legendFields = this._getFieldsForLegend();
      // 过滤导致数据为空时，需要使用全局数据
      // 参与过滤的字段的度量也根据全局数据来生成
      if (filteredData.length && legendFields.indexOf(field) === -1) {
        data = filteredData;
      } else {
        data = this.get('data');
      }
    }
    const scaleController = this.get('scaleController');
    if (!scale) {
      scale = scaleController.createScale(field, data);
      if (scale.sync && parent) {
        const parentScale = parent.createScale(field, data);
        scale = this._getSyncScale(parentScale, scale);
      }
      scales[field] = scale;
    } else if (scale.sync) { // 防止 view 内部创建的scale，Chart 上的scale 范围更大
      const newScale = scaleController.createScale(field, data);
      this._syncScale(scale, newScale);
    }
    return scale;
  }

  _getFieldsForLegend() {
    let fields = [];
    const geoms = this.get('geoms');
    Util.each(geoms, geom => {
      const geomFields = geom.getFieldsForLegend();
      fields = fields.concat(geomFields);
    });
    return Util.uniq(fields);
  }

  // 如果需要同步度量，则使得 values,min,max的范围最大
  _getSyncScale(parentScale, scale) {
    if (parentScale.type !== scale.type) {
      return scale;
    }
    this._syncScale(parentScale, scale);
    return parentScale;
  }

  _syncScale(distScale, sourceScale) {
    const mergeValues = Util.union(distScale.values, sourceScale.values);
    if (sourceScale.isLinear) {
      const max = Math.max(distScale.max, sourceScale.max);
      const min = Math.min(distScale.min, sourceScale.min);
      if (distScale.max !== max || distScale.min !== min) {
        distScale.change({
          min,
          max,
          values: mergeValues
        });
      }
    }

    if (mergeValues.length !== distScale.values.length) {
      distScale.change({
        values: mergeValues
      });
    }
  }

  /**
   * @protected
   * 获取过滤后的值（需要显示的值）
   * @param {String} field 度量
   * @return {Array.<String>} 滤后的值
   */
  getFilteredValues(field) {
    const scale = this.get('scales')[field];
    const values = scale.values;
    const filters = this._getFilters();
    let rst;
    if (filters && filters[field]) {
      rst = values.filter(filters[field]);
    } else {
      rst = values.slice(0);
    }
    return rst;
  }

  /**
   * @protected
   * 获取被过滤的值（不需显示的值）
   * @param {String} field 度量
   * @return {Array.<String>} 滤出的值
   */
  getFilteredOutValues(field) {
    const scale = this.get('scales')[field];
    const values = scale.values;
    const filters = this._getFilters();
    let rst;
    if (filters && filters[field]) {
      rst = values.filter(v => !filters[field](v));
    } else {
      rst = [];
    }
    return rst;
  }

  filter(field, condition) {
    const options = this.get('options');
    if (!options.filters) {
      options.filters = {};
    }
    options.filters[field] = condition;
    this.get('scaleController').filters = options.filters;
  }

  // 获取 filters
  _getFilters() {
    const options = this.get('options');
    return options.filters;
  }

  // 执行 filter 数据
  execFilter(data) {
    const self = this;
    const filters = self._getFilters();
    if (filters) {
      data = data.filter(function(obj) {
        let rst = true;
        Util.each(filters, function(fn, k) {
          if (fn) {
            rst = fn(obj[k], obj);
            if (!rst) {
              return false;
            }
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
      if (!options.axes) {
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

  _getKeyFields(scaleDefs) {
    const keyFields = [];
    Util.each(scaleDefs, (def, field) => {
      if (def.key) {
        keyFields.push(field);
      }
    });
    this.set('keyFields', keyFields);
  }

  scale(field, cfg) {
    const options = this.get('options');
    const scaleDefs = options.scales;
    if (Util.isObject(field)) {
      Util.mix(scaleDefs, field);
    } else {
      scaleDefs[field] = cfg;
    }

    this._getKeyFields(scaleDefs);
    return this;
  }

  tooltip(visible) {
    this.set('tooltipEnable', visible);
    return this;
  }

  animate(enable) {
    const options = this.get('options');
    options.animate = enable;
    this.set('animate', enable);
    return this;
  }

  changeOptions(options) {
    this.set('options', options);
    this._initOptions(options);
    return this;
  }

  /**
   * @internal 查找包含指定点的视图
   * @param  {Object} point 点的位置
   * @return {Array} 多个视图
   */
  getViewsByPoint(point) {
    const rst = [];
    const views = this.get('views');

    if (isPointInCoord(this.get('coord'), point)) {
      rst.push(this);
    }

    Util.each(views, view => {
      if (view.get('visible') && isPointInCoord(view.get('coord'), point)) {
        rst.push(view);
      }
    });
    return rst;
  }

  /**
   * 遍历所有的 shape ，用户更改 shape 后进行刷新
   * @param  {Function} fn 回调函数包含参数：record,shape,geom,view
   * @return {View} 当前视图
   */
  eachShape(fn) {
    const self = this;
    const views = self.get('views');
    const canvas = self.get('canvas');
    Util.each(views, function(view) {
      view.eachShape(fn);
    });
    const geoms = this.get('geoms');
    Util.each(geoms, function(geom) {
      const shapes = geom.getShapes();
      Util.each(shapes, shape => {
        const origin = shape.get('origin');
        if (Util.isArray(origin)) {
          const arr = origin.map(function(subOrigin) {
            return subOrigin[FIELD_ORIGIN];
          });
          fn(arr, shape, geom, self);
        } else {
          const obj = origin[FIELD_ORIGIN];
          fn(obj, shape, geom, self);
        }
      });
    });
    canvas.draw();
    return this;
  }

  /**
   * 遍历所有的 shape ，回调函数中 true / false 控制图形是否显示
   * @param  {Function} fn 回调函数包含参数：record,shape,geom,view
   * @return {View} 当前视图
   */
  filterShape(fn) {
    const callback = function(record, shape, geom, view) {
      if (!fn(record, shape, geom, view)) {
        shape.hide();
      } else {
        shape.show();
      }
    };
    this.eachShape(callback);
    return this;
  }

  clearInner() {
    this.set('scales', {});
    this.emit('beforeclearinner');
    const options = this.get('options');
    options.geoms = null;
    this._clearGeoms();
    // reset guide
    this.get('guideController') && this.get('guideController').reset();
    // clear axis
    this.get('axisController') && this.get('axisController').clear();
    this.emit('afterclearinner');
  }

  /**
   * 清除视图内容，包括 geoms
   * @return {View} 当前视图
   */
  clear() {
    const options = this.get('options');
    options.filters = null;
    this._removeGeoms();
    // const container = this.get('viewContainer');
    // container.clear();
    this.clearInner();
    this.get('guideController') && this.get('guideController').clear();
    this.set('isUpdate', false);
    this.set('keyFields', []);
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

  source(data, scales) {
    this._initData(data);
    if (scales) {
      this.scale(scales);
    }
    this.emit('setdata');
    return this;
  }

  changeData(data) {
    this.emit('beforechangedata');
    this._initData(data);
    this.emit('afterchangedata');
    this.repaint();
    return this;
  }

  _initData(data) {
    const dataView = this.get('dataView');
    if (dataView) {
      dataView.off('change', Util.getWrapBehavior(this, '_onViewChange'));
      this.set('dataView', null);
    }
    if (data && data.isDataView) {
      data.on('change', Util.wrapBehavior(this, '_onViewChange'));
      this.set('dataView', data);
      data = data.rows;
    }
    this.set('data', data);
  }

  _onViewChange() {
    this.emit('beforechangedata');
    const dataView = this.get('dataView');
    const rows = dataView.rows;
    this.set('data', rows);
    this.emit('afterchangedata');
    this.repaint();
  }

  // 初始化各个 view 和绘制辅助元素
  beforeRender() {
    const views = this.get('views');
    // 如果存在 views 则初始化子 view 的方法
    Util.each(views, function(view) {
      view.beforeRender();
    });
    this.initView();
  }

  // 绘制坐标轴、图例、辅助元素等图表组件
  drawComponents() {
    const views = this.get('views');
    // 如果存在 views 则初始化子 view 的方法
    Util.each(views, function(view) {
      view.drawComponents();
    });
    this._renderAxes();
    this._renderGuides();
  }

  // 绘制图形
  drawCanvas(stopDraw) {
    if (!stopDraw) {
      const views = this.get('views');
      const backPlot = this.get('backPlot');
      backPlot.sort();
      const canvas = this.get('canvas');
      const animate = this.get('animate');
      if (animate) {
        const isUpdate = this.get('isUpdate');
        Util.each(views, function(view) {
          Animate.execAnimation(view, isUpdate);
        });
        Animate.execAnimation(this, isUpdate);
      } else {
        canvas.draw();
      }
    }
  }

  render(stopDraw) {
    this.clearInner();
    this.emit('beforerender');
    this.beforeRender();
    this.emit('beforepaint');
    this.drawComponents();
    this.paint();
    this.emit('afterpaint');
    this.drawCanvas(stopDraw);
    this.emit('afterrender');
    this.set('rendered', true);
    return this;
  }

  initView() {
    const data = this.get('data') || [];
    const filteredData = this.execFilter(data);
    this.set('filteredData', filteredData);
    // if (!Util.isEmpty(data)) {
    this._createCoord(); // draw geometry 前绘制区域可能会发生改变
    this.emit('beforeinitgeoms');
    this._initGeoms();
    this._adjustScale();
    // }
  }

  paint() {
    const views = this.get('views');
    // 绘制
    Util.each(views, function(view) {
      view.paint();
    });
    const data = this.get('data');
    if (!Util.isEmpty(data)) {
      this._drawGeoms();
    }
    // 如果 view 隐藏了，隐藏所有的图形和坐标轴
    if (!this.get('visible')) {
      this.changeVisible(false, true); // 隐藏所有的图形，但是不绘制
    }
  }

  changeVisible(visible, stopDraw) {
    const geoms = this.get('geoms');
    Util.each(geoms, function(geom) {
      // if (geom.get('visible')) { // geom 隐藏时不受
      geom.changeVisible(visible, true);
      // }
    });
    this.get('axisController') && this.get('axisController').changeVisible(visible);
    this.get('guideController') && this.get('guideController').changeVisible(visible);
    if (!stopDraw) {
      const canvas = this.get('canvas');
      canvas.draw();
    }
  }

  repaint() {
    this.set('isUpdate', true);
    this.clearInner();
    this.render();
  }

  destroy() {
    this._clearEvents();
    const dataView = this.get('dataView');
    dataView && dataView.off('change', Util.getWrapBehavior(this, '_onViewChange'));
    this.clear();
    super.destroy();
  }
}

module.exports = View;
