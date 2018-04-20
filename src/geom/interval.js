/**
 * @fileOverview interval geometry
 * @author dxq613@gmail.com
 */
const GeomBase = require('./base');
const Util = require('../util');
const SizeMixin = require('./mixin/size');
require('./shape/interval');

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
    cfg.size = this.getNormalizedSize(obj);
    return cfg;
  }

  clearInner() {
    super.clearInner();
    this.set('defaultSize', null);
  }
}

class IntervalStack extends Interval {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.hasDefaultAdjust = true;
    cfg.adjusts = [{ type: 'stack' }];
    return cfg;
  }
}

class IntervalDodge extends Interval {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.hasDefaultAdjust = true;
    cfg.adjusts = [{ type: 'dodge' }];
    return cfg;
  }
}

class IntervalSymmetric extends Interval {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.hasDefaultAdjust = true;
    cfg.adjusts = [{ type: 'symmetric' }];
    return cfg;
  }
}

Interval.Stack = IntervalStack;
Interval.Dodge = IntervalDodge;
Interval.Symmetric = IntervalSymmetric;

GeomBase.Interval = Interval;
GeomBase.IntervalStack = IntervalStack;
GeomBase.IntervalDodge = IntervalDodge;
GeomBase.IntervalSymmetric = IntervalSymmetric;

module.exports = Interval;
