/**
 * @fileOverview 边，用于关系图的边
 * @author dxq613@gmail.com
 */

const GeomBase = require('./base');
require('./shape/edge');

class Edge extends GeomBase {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'edge';
    cfg.shapeType = 'edge';
    cfg.generatePoints = true;
    return cfg;
  }
}

GeomBase.Edge = Edge;

module.exports = Edge;
