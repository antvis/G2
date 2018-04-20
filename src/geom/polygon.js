/**
 * @fileOverview 多边形
 * @author dxq613@gmail.com
 */
const GeomBase = require('./base');
const Util = require('../util');
require('./shape/polygon');

class Polygon extends GeomBase {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'polygon';
    cfg.shapeType = 'polygon';
    cfg.generatePoints = true;
    return cfg;
  }

  createShapePointsCfg(obj) {
    const cfg = super.createShapePointsCfg(obj);
    const self = this;
    let x = cfg.x;
    let y = cfg.y;
    let temp;
    if (!(Util.isArray(x) && Util.isArray(y))) { // x y 都是数组时，不做处理
      const xScale = self.getXScale();
      const yScale = self.getYScale();
      const xCount = xScale.values ? xScale.values.length : xScale.ticks.length;
      const yCount = yScale.values ? yScale.values.length : yScale.ticks.length;
      const xOffset = 0.5 * 1 / xCount;
      const yOffset = 0.5 * 1 / yCount;
      if (xScale.isCategory && yScale.isCategory) { // 如果x,y都是分类
        x = [ x - xOffset, x - xOffset, x + xOffset, x + xOffset ];
        y = [ y - yOffset, y + yOffset, y + yOffset, y - yOffset ];
      } else if (Util.isArray(x)) { // x 是数组
        temp = x;
        x = [ temp[0], temp[0], temp[1], temp[1] ];
        y = [ y - yOffset / 2, y + yOffset / 2, y + yOffset / 2, y - yOffset / 2 ];
      } else if (Util.isArray(y)) { // y 是数组
        temp = y;
        y = [ temp[0], temp[1], temp[1], temp[0] ];
        x = [ x - xOffset / 2, x - xOffset / 2, x + xOffset / 2, x + xOffset / 2 ];
      }
      cfg.x = x;
      cfg.y = y;
    }
    return cfg;
  }
}

GeomBase.Polygon = Polygon;

module.exports = Polygon;
