/**
 * @fileOverview 分面的基类
 * @author dxq613@gmail.com
 */

const Base = require('./base');

/**
 * 矩形的 facet 有以下属性：
 * - colField 列的字段
 * - rowField 行的字段
 * - colValue 列字段的值
 * - rowValue 行字段的值
 * - cols 列数
 * - rows 行数
 * - colIndex 列的序号
 * - rowIndex 行的序号
 */


/**
 * 用于生成分面的类
 * @class Facets.Rect
 */
class Rect extends Base {

  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'rect';
    return cfg;
  }

  generateFacets(data) {
    const self = this;
    const fields = self.fields;
    // var defs = self.defs;
    const rst = [];
    let rows = 1;
    let cols = 1;
    const colField = fields[0];
    const rowField = fields[1];
    let colValues = [ '' ];
    let rowValues = [ '' ];
    if (colField) {
      colValues = self.getFieldValues(colField, data);
      cols = colValues.length;
    }
    if (rowField) {
      rowValues = self.getFieldValues(rowField, data);
      rows = rowValues.length;
    }

    // 获取每个维度对应的frame
    colValues.forEach((xVal, xIndex) => {
      rowValues.forEach((yVal, yIndex) => {
        const conditions = [
          { field: colField, value: xVal, values: colValues },
          { field: rowField, value: yVal, values: rowValues }
        ];
        const filter = self.getFilter(conditions);
        const subData = data.filter(filter);
        const facet = {
          type: self.type,
          colValue: xVal,
          rowValue: yVal,
          colField,
          rowField,
          colIndex: xIndex,
          rowIndex: yIndex,
          cols,
          rows,
          data: subData,
          region: self.getRegion(rows, cols, xIndex, yIndex)
        };
        rst.push(facet);
      });
    });

    return rst;
  }

  // 设置 x 坐标轴的文本、title 是否显示
  setXAxis(xField, axes, facet) {
    if (facet.rowIndex !== facet.rows - 1) {
      axes[xField].title = null;
      axes[xField].label = null;
    } else if (facet.colIndex !== parseInt((facet.cols - 1) / 2)) {
      axes[xField].title = null;
    }
  }
  // 设置 y 坐标轴的文本、title 是否显示
  setYAxis(yField, axes, facet) {
    if (facet.colIndex !== 0) {
      axes[yField].title = null;
      axes[yField].label = null;
    } else if (facet.rowIndex !== parseInt((facet.rows - 1) / 2)) {
      axes[yField].title = null;
    }
  }

  renderTitle(view, facet) {
    if (facet.rowIndex === 0) {
      this.drawColTitle(view, facet);
    }
    if (facet.colIndex === facet.cols - 1) {
      this.drawRowTitle(view, facet);
    }
  }
}

module.exports = Rect;

