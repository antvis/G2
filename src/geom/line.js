/**
 * @fileOverview 线图
 * @author dxq613@gmail.com
 */
const GeomBase = require('./base');
const Path = require('./path');
require('./shape/line');

class Line extends Path {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'line';
    cfg.sortable = true;
    return cfg;
  }
}

class LineStack extends Line {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.hasDefaultAdjust = true;
    cfg.adjusts = [{ type: 'stack' }];
    return cfg;
  }
}

Line.Stack = LineStack;

GeomBase.Line = Line;
GeomBase.LineStack = LineStack;

module.exports = Line;
