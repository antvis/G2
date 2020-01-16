import { each, every, filter, get, isNil } from '@antv/util';
import View from '../chart/view';
import { Datum } from '../interface';
import { getAxisOption } from '../util/axis';
import { Facet } from './facet';
import { RectCfg, RectData } from './interface';

/**
 * 矩阵分面
 */
export default class Rect extends Facet<RectCfg, RectData> {
  protected afterEachView(view: View, facet: RectData) {
    this.processAxis(view, facet);
  }

  protected beforeEachView(view: View, facet: RectData) {
    // do nothing
  }

  public render() {
    super.render();

    this.renderTitle();
  }

  /**
   * 生成矩阵分面的分面数据
   * @param data
   */
  protected generateFacets(data: Datum[]): RectData[] {
    const [columnField, rowField] = this.cfg.fields;

    const rst = [];
    let columnValuesLength = 1;
    let rowValuesLength = 1;

    let columnValues: string[] = [''];
    let rowValues: string[] = [''];

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

        const facetData = filter(data, (datum: Datum) => {
          // 过滤出全部满足条件的数据
          return every(conditions, (condition) => {
            const { field, value } = condition;

            if (!isNil(value) && field) {
              return datum[field] === value;
            }
            return true;
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

  private renderTitle(): void {
    each(this.facets, (facet: RectData, facetIndex: number) => {
      const { columnIndex, rowIndex, columnValuesLength, rowValuesLength, columnValue, rowValue, view } = facet;

      if (rowIndex === 0) {
        const config = {
          position: [ '50%', '0%' ] as [string, string],
          content: columnValue,
          style: {
            textBaseline: 'bottom',
          },
          offsetY: -8,
        };

        view.annotation().text(config);
      }
      if (columnIndex === columnValuesLength - 1) {
        // 右方的 title
        const config = {
          position: [ '100%', '50%' ] as [string, string],
          content: rowValue,
          style: {
            textAlign: 'left',
            rotate: -Math.PI / 2,
          },
          offsetX: 8,
        };

        view.annotation().text(config);
      }
    });
  }

  /**
   * 设置 x 坐标轴的文本、title 是否显示
   * @param x
   * @param axes
   * @param facet
   */
  private getXAxisOption(x: string, axes: any, facet: RectData): object {
    // 非最后一行
    if (facet.rowIndex !== facet.rowValuesLength - 1) {
      return {
        title: null,
        label: null,
      };
    } else if (facet.columnIndex !== Math.floor((facet.columnValuesLength - 1) / 2)) {
      // 不是中间列
      return {
        title: null,
      }
    }
  }

  /**
   * 设置 y 坐标轴的文本、title 是否显示
   * @param y
   * @param axes
   * @param facet
   */
  private getYAxisOption(y: string, axes: any, facet: RectData): object {
    if (facet.columnIndex !== 0) {
      return {
        title: null,
        label: null,
      };
    } else if (facet.rowIndex !== Math.floor((facet.rowValuesLength - 1) / 2)) {
      return {
        title: null,
      }
    }
  }

  /**
   * 处理 axis 的默认配置
   * @param view
   * @param facet
   */
  private processAxis(view: View, facet: RectData) {
    const options = view.getOptions();

    const coordinateOption = options.coordinate;
    const geometries = view.geometries;

    const coordinateType = get(coordinateOption, 'type', 'rect');

    if (coordinateType === 'rect' && geometries.length) {

      if (isNil(options.axes)) {
        // @ts-ignore
        options.axes = {};
      }
      const axes = options.axes;

      const [x, y] = geometries[0].getXYFields();

      const xOption = getAxisOption(axes, x);
      const yOption = getAxisOption(axes, y);

      if (xOption !== false) {
        options.axes[x] = {
          ...this.getXAxisOption(x, axes, facet),
          ...xOption,
        }
      }

      if (yOption !== false) {
        options.axes[y] = {
          ...this.getYAxisOption(y, axes, facet),
          ...yOption,
        }
      }
    }
  }
}
