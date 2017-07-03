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

  drawPoint(obj, container, shapeFactory) {
    const shape = obj.shape;
    const cfg = this.getDrawCfg(obj);
    if (Util.isArray(obj.y)) {
      Util.each(obj.y, function(y, index) {
        cfg.y = y;
        cfg.yIndex = index;
        shapeFactory.drawShape(shape, cfg, container);
      });
    } else {
      shapeFactory.drawShape(shape, cfg, container);
    }
  }
}

module.exports = Point;
