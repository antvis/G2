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
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      geoms: [],
      scales: {},
      options: {},
      scaleController: null
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
    const options = this.get('options');
    if (!options.scales) {
      options.scales = {};
    }
    if (!options.coord) {
      options.coord = {};
    }
  }

  // 初始化所有的控制器
  _initControllers() {
    const options = this.get('options');
    const scaleController = new Controller.Scale({
      defs: options.scales
    });

    this.set('scaleController', scaleController);
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

  _drawGemos() {
    const geoms = this.get('geoms');
    const coord = this.get('coord');
    Util.each(geoms, function(geom) {
      geom.setCoord(coord);
      geom.paint();
    });
  }

  _renderAxis() {

  }

  _rendeGuide() {

  }

  getYScales() {

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

  axis() {

  }

  scale(field, cfg) {
    const options = this.get('options');
    const scaleDefs = options.scales;
    if (Util.isObject(field)) {
      Util.mix(scaleDefs, field);
    } else {
      scaleDefs[field] = cfg;
    }
  }

  source(data) {
    this.set('data', data);
  }

  changeData(data) {
    this.set('data', data);
    this._clearInner();
    const geoms = this.get('geoms');
    Util.each(geoms, function(geom) {
      geom.clear();
    });
    this.render();
  }

  _clearInner() {
    this.set('scales', {});
    // clear guide
    // clear axis
  }

  clear() {
    this._clearGeoms();
    const container = this.get('viewContainer');
    container.clear();
  }

  /**
   * 绘制 geometry 前处理一些度量统一
   * @protected
   */
  beforeDraw() {

  }

  render() {
    this._initGeoms();
    this.beforeDraw();
    this._drawGemos();
    this._rendeGuide();
    this._renderAxis();
  }

  destroy() {
    this.clear();
    super.destroy();
  }
}

module.exports = View;
