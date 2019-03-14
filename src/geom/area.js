/**
 * @fileOverview 面积图
 * @author dxq613@gmail.com
 */

const GeomBase = require('./base');
const SplitMixin = require('./mixin/split');
const Util = require('../util');
require('./shape/area');

class Area extends GeomBase {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'area';
    cfg.shapeType = 'area';
    cfg.generatePoints = true;
    cfg.sortable = true;
    return cfg;
  }

  constructor(cfg) {
    super(cfg);
    Util.assign(this, SplitMixin);
  }

  draw(data, container, shapeFactory, index) {
    const self = this;
    const cfg = this.getDrawCfg(data[0]);
    self._applyViewThemeShapeStyle(cfg, cfg.shape, shapeFactory);
    const splitArray = this.splitData(data);

    cfg.origin = data; // path,line,area 等图的origin 是整个序列
    Util.each(splitArray, (subData, splitedIndex) => {
      cfg.splitedIndex = splitedIndex; // 传入分割片段索引 用于生成id
      const points = subData.map(obj => {
        return obj.points;
      });
      cfg.points = points;
      const geomShape = shapeFactory.drawShape(cfg.shape, cfg, container);
      self.appendShapeInfo(geomShape, index + splitedIndex);
    });
  }
}

class AreaStack extends Area {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.hasDefaultAdjust = true;
    cfg.adjusts = [{ type: 'stack' }];
    return cfg;
  }
}

Area.Stack = AreaStack;

GeomBase.Area = Area;
GeomBase.AreaStack = AreaStack;

module.exports = Area;

