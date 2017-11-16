/**
 * @fileOverview 点图
 * @author dxq613@gmail.com
 */

const GeomBase = require('./base');
const Util = require('../util');

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
          geomShape.setSilent('index', index + idx);
          geomShape.setSilent('coord', self.get('coord'));
          if (self.get('animate') && self.get('animateCfg')) {
            geomShape.setSilent('animateCfg', self.get('animateCfg'));
          }
        }
      });
    } else if (!Util.isNil(obj.y)) {
      geomShape = shapeFactory.drawShape(shape, cfg, container);
      geomShape.setSilent('index', index);
      geomShape.setSilent('coord', self.get('coord'));

      if (self.get('animate') && self.get('animateCfg')) {
        geomShape.setSilent('animateCfg', self.get('animateCfg'));
      }
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

Point.Jitter = PointJitter;

module.exports = Point;
