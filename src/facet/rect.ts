import * as _ from '@antv/util';
import { Axis, Text } from '../chart/__components__';
import View from '../chart/view';
import { DIRECTION, LAYER } from '../constant';
import { Datum, Padding, Point, Position } from '../interface';
import { BBox, getRegionBBox } from '../util/bbox';
import Facet from './facet';
import { FacetComponent, RectCfg, RectData } from './interface';

/**
 * 矩阵分面
 */
export default class Rect extends Facet<RectCfg, RectData> {
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

        const facet: RectData = {
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

  protected renderFacetComponents(): void {
    _.each(this.facets, (facet: RectData, facetIndex: number) => {
      const { columnIndex, rowIndex, columnValuesLength, rowValuesLength, columnValue, rowValue } = facet;

      const zeroPosition: Position = [0, 0];

      if (rowIndex === 0) {
        // 上
        this.components.push({
          direction: DIRECTION.TOP,
          component: new Text(this.view.getLayer(LAYER.FORE).addGroup(), zeroPosition, {
            text: columnValue,
            isHorizontal: true,
            attributes: { textBaseline: 'bottom' },
          }),
          facetIndex,
        });
      }
      if (columnIndex === columnValuesLength - 1) {
        // 右
        this.components.push({
          direction: DIRECTION.RIGHT,
          component: new Text(this.view.getLayer(LAYER.FORE).addGroup(), zeroPosition, {
            text: rowValue,
            isHorizontal: false,
            attributes: { textAlign: 'left' },
          }),
          facetIndex,
        });
      }
      if (rowIndex === rowValuesLength - 1) {
        // 下
        this.components.push({
          direction: DIRECTION.BOTTOM,
          component: new Axis(this.view.getLayer(LAYER.FORE).addGroup(), zeroPosition, {
            text: 'x axis',
            attributes: { textAlign: 'center', textBaseline: 'top' },
          }),
          facetIndex,
        });
      }
      if (columnIndex === 0) {
        // 左
        this.components.push({
          direction: DIRECTION.LEFT,
          component: new Axis(this.view.getLayer(LAYER.FORE).addGroup(), zeroPosition, {
            text: 'y axis',
            attributes: { textAlign: 'right', textBaseline: 'center' },
          }),
          facetIndex,
        });
      }
    });
  }

  /**
   * 布局 facet 组件
   */
  protected layoutFacetComponents(): void {
    // 1. 上右下左的 gap
    const gap: Padding = [0, 0, 0, 0];

    _.each(this.components, (facetComponent: FacetComponent) => {
      const { component, direction } = facetComponent;
      const idx =
        direction === DIRECTION.TOP
          ? 0
          : direction === DIRECTION.RIGHT
          ? 1
          : direction === DIRECTION.BOTTOM
          ? 2
          : direction === DIRECTION.LEFT
          ? 3
          : 3;

      const bbox = component.getBBox();

      const size = [DIRECTION.TOP, DIRECTION.BOTTOM].includes(direction) ? bbox.height : bbox.width;

      gap[idx] = Math.max(size, gap[idx]);
    });

    // 2. 更新 view 的 coordinate 位置大小
    this.view.coordinateBBox = this.view.coordinateBBox.shrink(gap);

    // 3. 布局，移动组件位置
    _.each(this.components, (facetComponent: FacetComponent) => {
      const { component, facetIndex, direction } = facetComponent;
      const facet = this.facets[facetIndex];
      const { region } = facet;

      const regionBBox = getRegionBBox(this.view.coordinateBBox, region);

      let point: Point;

      if (direction === DIRECTION.TOP) {
        point = regionBBox.top;
      } else if (direction === DIRECTION.RIGHT) {
        point = regionBBox.right;
      } else if (direction === DIRECTION.BOTTOM) {
        point = regionBBox.bottom;
      } else if (direction === DIRECTION.LEFT) {
        point = regionBBox.left;
      }

      const { x, y } = point;

      component.move(x, y);
    });
  }
}
