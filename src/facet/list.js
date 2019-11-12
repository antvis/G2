/**
 * @fileOverview list facets, support cols
 */

const Base = require('./base');

/**
 * 用于生成分面的类
 * @class Facets.List
 */
class List extends Base {

  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'list';
    cfg.cols = null; // 用户不设置时就显示一行
    return cfg;
  }

  generateFacets(data) {
    const self = this;
    const fields = self.fields;
    const colField = fields[0];
    if (!colField) {
      throw 'Please specify for the field for facet!';
    }
    const colValues = self.getFieldValues(colField, data);
    const count = colValues.length;
    const cols = self.cols || count;
    const rows = parseInt((count + cols - 1) / cols);
    const rst = [];
    colValues.forEach((xVal, index) => {
      const row = parseInt(index / cols);
      const col = index % cols;
      const conditions = [
        { field: colField, value: xVal, values: colValues }
      ];
      const filter = self.getFilter(conditions);
      const subData = data.filter(filter);
      const facet = {
        type: self.type,
        count,
        colValue: xVal,
        colField,
        rowField: null,
        rowValue: xVal,
        colIndex: col,
        rowIndex: row,
        cols,
        rows,
        data: subData,
        region: self.getRegion(rows, cols, col, row)
      };
      rst.push(facet);
    });
    return rst;
  }

  // 设置 x 坐标轴的文本、title 是否显示
  setXAxis(xField, axes, facet) {
    // 当是最后一行或者下面没有 view 时文本不显示
    if (facet.rowIndex !== facet.rows - 1 && (facet.cols * facet.rowIndex + facet.colIndex + 1) + facet.cols <= facet.count) {
      axes[xField].label = null;
      axes[xField].title = null;
    }
  }

  // 设置 y 坐标轴的文本、title 是否显示
  setYAxis(yField, axes, facet) {
    if (facet.colIndex !== 0) {
      axes[yField].title = null;
      axes[yField].label = null;
    }
  }
}

module.exports = List;
