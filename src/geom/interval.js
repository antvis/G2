/**
 * @fileOverview interval geometry
 * @author dxq613@gmail.com
 */

const GeomBase = require('./base');
const Util = require('../util');
const SizeMixin = require('./mixin/size');

class Interval extends GeomBase {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'interval';
    cfg.shapeType = 'interval';
    cfg.generatePoints = true;
    return cfg;
  }

  constructor(cfg) {
    super(cfg);
    Util.assign(this, SizeMixin);
  }

  createShapePointsCfg(obj) {
    const cfg = super.createShapePointsCfg(obj);
    cfg.size = this.getSize(obj);
    return cfg;
  }

  clearInner() {
    super.clearInner();
    this.set('defaultSize', null);
  }
}

module.exports = Interval;
