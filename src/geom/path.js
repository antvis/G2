/**
 * @fileOverview 路径图，无序的线图
 * @author dxq613@gmail.com
 */
const GeomBase = require('./base');
const SplitMixin = require('./mixin/split');
const Util = require('../util');

class Path extends GeomBase {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'path';
    cfg.shapeType = 'line';
    return cfg;
  }

  constructor(cfg) {
    super(cfg);
    Util.assign(this, SplitMixin);
  }

  getDrawCfg(obj) {
    const cfg = super.getDrawCfg(obj);
    cfg.isStack = this.hasStack();
    return cfg;
  }

  draw(data, container, shapeFactory, index) {
    const self = this;
    const splitArray = this.splitData(data);

    const cfg = this.getDrawCfg(data[0]);
    self._applyViewThemeShapeStyle(cfg, cfg.shape, shapeFactory);
    cfg.origin = data; // path,line 等图的origin 是整个序列
    Util.each(splitArray, function(subData, splitedIndex) {
      if (!Util.isEmpty(subData)) {
        cfg.splitedIndex = splitedIndex; // 传入分割片段索引 用于生成id
        cfg.points = subData;
        const geomShape = shapeFactory.drawShape(cfg.shape, cfg, container);
        self.appendShapeInfo(geomShape, index + splitedIndex);
      }
    });
  }
}

GeomBase.Path = Path;

module.exports = Path;
