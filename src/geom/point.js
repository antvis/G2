/**
 * @fileOverview 点图
 * @author dxq613@gmail.com
 */
const GeomBase = require('./base');
const Util = require('../util');
require('./shape/point');

class Point extends GeomBase {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'point';
    cfg.shapeType = 'point';
    cfg.generatePoints = true;
    return cfg;
  }

  drawPoint(obj, container, shapeFactory, index) {
    const self = this;
    const shape = obj.shape;
    const cfg = self.getDrawCfg(obj);
    let geomShape;
    if (Util.isArray(obj.y)) {
      const hasAdjust = self.hasStack();
      Util.each(obj.y, (y, idx) => {
        cfg.y = y;
        cfg.yIndex = idx;
        if (!hasAdjust || idx !== 0) {
          geomShape = shapeFactory.drawShape(shape, cfg, container);
          self.appendShapeInfo(geomShape, index + idx);
        }
      });
    } else if (!Util.isNil(obj.y)) {
      geomShape = shapeFactory.drawShape(shape, cfg, container);
      self.appendShapeInfo(geomShape, index);
    }
  }
}

class PointJitter extends Point {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.hasDefaultAdjust = true;
    cfg.adjusts = [{ type: 'jitter' }];
    return cfg;
  }
}

class PointStack extends Point {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.hasDefaultAdjust = true;
    cfg.adjusts = [{ type: 'stack' }];
    return cfg;
  }
}

Point.Jitter = PointJitter;
Point.Stack = PointStack;

GeomBase.Point = Point;
GeomBase.PointJitter = PointJitter;
GeomBase.PointStack = PointStack;

module.exports = Point;
