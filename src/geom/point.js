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
    return cfg;
  }

  drawPoint(obj, container, shapeFactory, index) {
    const self = this;
    const shape = obj.shape;
    const cfg = self.getDrawCfg(obj);
    let geomShape;
    if (Util.isArray(obj.y)) {
      Util.each(obj.y, (y, idx) => {
        cfg.y = y;
        cfg.yIndex = idx;
        geomShape = shapeFactory.drawShape(shape, cfg, container);
        geomShape.set('index', index + idx);
        geomShape.set('coord', self.get('coord'));
        if (self.get('animate') && self.get('animateCfg')) {
          geomShape.set('animateCfg', self.get('animateCfg'));
        }
      });
    } else {
      geomShape = shapeFactory.drawShape(shape, cfg, container);
      geomShape.set('index', index);
      geomShape.set('coord', self.get('coord'));

      if (self.get('animate') && self.get('animateCfg')) {
        geomShape.set('animateCfg', self.get('animateCfg'));
      }
    }
  }
}

module.exports = Point;
