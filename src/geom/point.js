/**
 * @fileOverview 点图
 * @author dxq613@gmail.com
 */

const GeomBase = require('./base');

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
}

module.exports = Point;
