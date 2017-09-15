/**
 * @fileOverview Use matrices to compare different fields
 * @author dxq613@gmail.com
 */

const Rect = require('./rect');

class Matrix extends Rect {

  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'matrix';
    return cfg;
  }

  generateFacets(data) {
    const self = this;
    const fields = self.fields;
    const rows = fields.length;
    const cols = rows; // 矩阵中行列相等，等于指定的字段个数
    const rst = [];
    for (let i = 0; i < cols; i++) {
      const colField = fields[i];
      for (let j = 0; j < rows; j++) {
        const rowField = fields[j];
        const facet = {
          type: self.type,
          colValue: colField,
          rowValue: rowField,
          colField,
          rowField,
          colIndex: i,
          rowIndex: j,
          cols,
          rows,
          data,
          region: self.getRegion(rows, cols, i, j)
        };
        rst.push(facet);
      }
    }
    return rst;
  }
}

module.exports = Matrix;
