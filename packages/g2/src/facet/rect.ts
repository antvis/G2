import * as _ from '@antv/util';
import { Facet } from './base';
import View from '../plot/view';
import { Datum, FacetData, RectCfg } from './interface';

/**
 * TODO 暂时欠缺 title、axis 的渲染逻辑
 */
export class Rect extends Facet {

  constructor(view: View, cfg: RectCfg) {
    super(view, {
      /**
       * 是否默认显示每个分面的title
       */
      showTitle: true,
      /**
       * 是否自动修改坐标轴的信息
       */
      autoSetAxis: true,
      /**
       * View 的内边框
       */
      padding: 16,
      ...cfg,
    });
  }

  protected generateFacets(data: Datum[]): FacetData[] {
    const fields = this.cfg.fields;
    const [ columnField, rowField ] = fields;

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

    // 获取每个维度对应的frame
    columnValues.forEach((xVal, xIndex) => {
      rowValues.forEach((yVal, yIndex) => {
        const conditions = [
          { field: columnField, value: xVal, values: columnValues },
          { field: rowField, value: yVal, values: rowValues },
        ];

        const facetData = _.filter(data, (data: Datum) => {
          // 过滤出全部满足条件的数据
          return _.every(conditions, (condition) => {
            const { field, value } = condition;
            return data[field] === value;
          });
        });

        const facet = {
          type: this.cfg.type,
          columnValue: xVal,
          rowValue: yVal,
          columnField,
          rowField,
          columnIndex: xIndex,
          rowIndex: yIndex,
          columnValuesLength,
          rowValuesLength,
          data: facetData,
          region: this.getRegion(rowValuesLength, columnValuesLength, xIndex, yIndex),
        };
        rst.push(facet);
      });
    });

    return rst;
  }

  protected renderAxis(): void {
    // todo
  }

  protected renderTitle(): void {
    // todo
  }
}
