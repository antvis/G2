/**
 * @fileOverview circle facets
 * @author dxq613@gmail.com
 */

const Base = require('./base');

function getPoint(center, r, angle) {
  return {
    x: center.x + r * Math.cos(angle),
    y: center.y + r * Math.sin(angle)
  };
}

class Circle extends Base {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'circle';
    return cfg;
  }

  getRegion(count, index) {
    const r = 1 / 2; // 画布半径
    const avgAngle = Math.PI * 2 / count;
    const angle = -1 * Math.PI / 2 + avgAngle * index; // 当前分面所在的弧度
    const facetR = r / (1 + 1 / Math.sin(avgAngle / 2));
    const center = { x: 0.5, y: 0.5 }; // 画布圆心
    const middle = getPoint(center, r - facetR, angle); // 分面的中心点
    const startAngle = Math.PI * 5 / 4; // 右上角
    const endAngle = Math.PI * 1 / 4; // 左下角

    return {
      start: getPoint(middle, facetR, startAngle),
      end: getPoint(middle, facetR, endAngle)
    };
  }

  generateFacets(data) {
    const self = this;
    const fields = self.fields;
    const field = fields[0];
    if (!field) {
      throw 'Please specify for the field for facet!';
    }
    const values = self.getFieldValues(field, data);
    const count = values.length;
    const rst = [];
    values.forEach(function(value, index) {
      const conditions = [
        { field, value, values }
      ];
      const filter = self.getFilter(conditions);
      const subData = data.filter(filter);
      const facet = {
        type: self.type,
        colValue: value,
        colField: field,
        colIndex: index,
        cols: count,
        rows: 1,
        rowIndex: 0,
        data: subData,
        region: self.getRegion(count, index)
      };
      rst.push(facet);
    });
    return rst;
  }
}

module.exports = Circle;
