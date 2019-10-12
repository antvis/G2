import * as _ from '@antv/util';
import View from '../chart/view';
import { Datum } from '../interface';
import Facet from './facet';
import { FacetData, RectCfg, RectData } from './interface';

/**
 * 矩阵分面
 */
export default class Rect extends Facet<RectCfg, FacetData> {
  protected afterEachView(view: View, facet: RectData) {
    // do nothing
  }

  protected beforeEachView(view: View, facet: RectData) {
    // do nothing
  }

  /**
   * 生成矩阵分面的分面数据
   * @param data
   */
  protected generateFacets(data: Datum[]): RectData[] {
    const [columnField, rowField] = this.cfg.fields;

    const rst = [];
    let columnValuesLength = 0;
    let rowValuesLength = 0;

    let columnValues: string[] = [];
    let rowValues: string[] = [];

    if (columnField) {
      columnValues = this.getFieldValues(data, columnField);
      columnValuesLength = columnValues.length;
    }
    if (rowField) {
      rowValues = this.getFieldValues(data, rowField);
      rowValuesLength = rowValues.length;
    }

    // 获取每个维度对应的数据配置片段
    columnValues.forEach((xVal, xIndex) => {
      rowValues.forEach((yVal, yIndex) => {
        const conditions = [
          { field: columnField, value: xVal, values: columnValues },
          { field: rowField, value: yVal, values: rowValues },
        ];

        const facetData = _.filter(data, (datum: Datum) => {
          // 过滤出全部满足条件的数据
          return _.every(conditions, (condition) => {
            const { field, value } = condition;
            return datum[field] === value;
          });
        });

        const facet = {
          type: this.cfg.type,
          data: facetData,
          region: this.getRegion(rowValuesLength, columnValuesLength, xIndex, yIndex),

          columnValue: xVal,
          rowValue: yVal,
          columnField,
          rowField,
          columnIndex: xIndex,
          rowIndex: yIndex,
          columnValuesLength,
          rowValuesLength,
        };
        rst.push(facet);
      });
    });

    return rst;
  }
}
