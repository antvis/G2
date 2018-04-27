/**
 * @fileOverview 自定义图形
 * @author dxq613@gmail.com
 */
const GeomBase = require('./base');
const Util = require('../util');
const SizeMixin = require('./mixin/size');
require('./shape/schema');

class Schema extends GeomBase {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'schema';
    cfg.shapeType = 'schema';
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
}

class SchemaDodge extends Schema {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.hasDefaultAdjust = true;
    cfg.adjusts = [{ type: 'dodge' }];
    return cfg;
  }
}

Schema.Dodge = SchemaDodge;

GeomBase.Schema = Schema;
GeomBase.SchemaDodge = SchemaDodge;

module.exports = Schema;
