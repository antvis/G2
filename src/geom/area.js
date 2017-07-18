/**
 * @fileOverview 面积图
 * @author dxq613@gmail.com
 */

const GeomBase = require('./base');

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

  draw(data, container, shapeFactory) {
    const cfg = this.getDrawCfg(data[0]);
    const points = data.map(obj => {
      return obj.points;
    });
    cfg.origin = data; // path,line,area 等图的origin 是整个序列
    cfg.points = points;
    shapeFactory.drawShape(cfg.shape, cfg, container);
  }
}

module.exports = Area;
