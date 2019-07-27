/**
 * @fileOverview 工厂类，管理各种类型的 shape
 * @author dxq613@gmail.com
 */

const Util = require('../../util');
const PathUtil = require('../util/path');
const GPath = Util.PathUtil;
const Shape = {};

const ShapeBase = {
  _coord: null,
  /**
   * 绘制图形
   * @param {Object} cfg 配置项
   * @param {Object} container 容器
   * @return {Object} shape 创建的 shape
   */
  draw(cfg, container) {
    if (this.drawShape) {
      return this.drawShape(cfg, container);
    }
    return null;
  },
  /**
   * 获取绘制图形需要的点, 可以不定义，则使用默认的
  getPoints(cfg) {
    if (this.getShapePoints) {
      return this.getShapePoints(cfg);
    }
    return null;
  },*/
  /**
   * 设置坐标系
   * @param {Coord} coord 坐标系
   */
  setCoord(coord) {
    this._coord = coord;
  },
  /**
   * 0～1 path 转 画布 path
   * @param  {path} path 路径
   * @param  {Boolean} islineToArc 是否转换成圆弧
   * @return {path} path 转换到画布坐标的path
   */
  parsePath(path, islineToArc) {
    const coord = this._coord;
    path = GPath.parsePathString(path);
    if (coord.isPolar && islineToArc !== false) {
      path = PathUtil.convertPolarPath(coord, path);
    } else {
      path = PathUtil.convertNormalPath(coord, path);
    }
    return path;
  },
  /**
   * 0～1 point 转 画布 point
   * @param  {point} point 节点
   * @return {point} point 转换后的点
   */
  parsePoint(point) {
    const coord = this._coord;
    return coord.convertPoint(point);
  },
  /**
   * 0～1 points 转 画布 points
   * @param  {points} points 节点集合
   * @return {points} points 转换后的多个节点
   */
  parsePoints(points) {
    const coord = this._coord;
    const rst = [];
    Util.each(points, function(point) {
      rst.push(coord.convertPoint(point));
    });
    return rst;
  }
};

const ShapeFactoryBase = {
  defaultShapeType: null,
  setCoord(coord) {
    this._coord = coord;
  },
  getShape(type) {
    const self = this;
    if (Util.isArray(type)) {
      type = type[0];
    }
    const shape = self[type] || self[self.defaultShapeType];
    shape._coord = self._coord;
    return shape;
  },
  getShapePoints(type, cfg) {
    const shape = this.getShape(type);
    const fn = shape.getPoints || shape.getShapePoints || this.getDefaultPoints;
    const points = fn(cfg);
    return points;
  },
  getDefaultPoints(/* cfg */) {
    return [];
  },
  getMarkerCfg(type, cfg) {
    let shape = this.getShape(type);
    if (!shape.getMarkerCfg) {
      const defaultShapeType = this.defaultShapeType;
      shape = this.getShape(defaultShapeType);
    }
    return shape.getMarkerCfg(cfg);
  },
  getSelectedCfg(/* type, cfg */) {
    return {};
  },
  drawShape(type, cfg, container) {
    const shape = this.getShape(type);
    const gShape = shape.draw(cfg, container);
    if (gShape) {
      gShape.setSilent('origin', cfg.origin);
      gShape._id = cfg.yIndex ? cfg._id + cfg.yIndex : cfg._id;
      gShape.name = this.name;
    }
    return gShape;
  }
};

// 注册 Geometry 获取图形的入口
Shape.registerFactory = function(factoryName, cfg) {
  const className = Util.upperFirst(factoryName);
  const geomObj = Util.assign({}, ShapeFactoryBase, cfg);
  Shape[className] = geomObj;
  geomObj.name = factoryName;
  return geomObj;
};

// 注册图形
Shape.registerShape = function(factoryName, shapeType, cfg) {
  const className = Util.upperFirst(factoryName);
  const factory = Shape[className];
  const shapeObj = Util.assign({}, ShapeBase, cfg);
  factory[shapeType] = shapeObj;
  return shapeObj;
};

// 获得Geom 对应的 shapeFactory
Shape.getShapeFactory = function(factoryName) {
  const self = this;
  factoryName = factoryName || 'point';
  const className = Util.upperFirst(factoryName);
  return self[className];
};

module.exports = Shape;
