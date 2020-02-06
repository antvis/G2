import { DIRECTION } from '@antv/g2';
import { deepMix, each, every, filter, isNil } from '@antv/util';
import { AxisCfg } from '../chart/interface';
import View from '../chart/view';
import { Datum } from '../interface';
import { getFactTitleConfig } from '../util/facet';
import { Facet } from './facet';
import { ListCfg, ListData, MirrorData } from './interface';

/**
 * 镜像分面
 */
export default class List extends Facet<ListCfg, ListData> {
  protected getDefaultCfg() {
    // @ts-ignore
    const fontFamily = this.view.getTheme().fontFamily;
    return deepMix({}, super.getDefaultCfg(), {
      type: 'list',
      cols: null, // 默认显示一列
      showTitle: true,
      title: {
        style: {
          fontSize: 14,
          fill: '#666',
          fontFamily,
        }
      },
    });
  }

  public render() {
    super.render();

    if (this.cfg.showTitle) {
      this.renderTitle();
    }
  }

  protected afterEachView(view: View, facet: ListData) {
    this.processAxis(view, facet);
  }

  protected beforeEachView(view: View, facet: ListData) {
  }

  protected generateFacets(data: Datum[]): ListData[] {
    const { fields } = this.cfg;
    let { cols } = this.cfg;

    const [columnField] = fields;
    if (!columnField) {
      throw new Error('No `fields` specified!');
    }

    const colValues = this.getFieldValues(data, columnField);

    const count = colValues.length;
    cols = cols || count; // 每行有几列数据

    // 总共有几行
    const rows = this.getPageCount(count, cols);
    const rst = [];

    colValues.forEach((val, index) => {
      // 当前 index 在那个行列
      const { row, col } = this.getRowCol(index, cols);

      const conditions = [
        { field: columnField, value: val, values: colValues }
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

      const facet: ListData = {
        type: this.cfg.type,
        data: facetData,
        region: this.getRegion(rows, cols, col, row),

        columnValue: val,
        rowValue: val,
        columnField,
        rowField: null,
        columnIndex: col,
        rowIndex: row,
        columnValuesLength: cols,
        rowValuesLength: rows,

        total: count,
      };

      rst.push(facet);
    });

    return rst;
  }

  /**
   * 设置 x 坐标轴的文本、title 是否显示
   * @param x
   * @param axes
   * @param option
   * @param facet
   */
  protected getXAxisOption(x: string, axes: any, option: AxisCfg, facet: ListData): object {
    // 当是最后一行或者下面没有 view 时文本不显示
    if (
      facet.rowIndex !== facet.rowValuesLength - 1 &&
      (facet.columnValuesLength * facet.rowIndex + facet.columnIndex + 1) + facet.columnValuesLength <= facet.total
    ) {
      return {
        ...option,
        label: null,
        title: null,
      };
    }
  }


  /**
   * 设置 y 坐标轴的文本、title 是否显示
   * @param y
   * @param axes
   * @param option
   * @param facet
   */
  protected getYAxisOption(y: string, axes: any, option: AxisCfg, facet: ListData): object {
    if (facet.columnIndex !== 0) {
      return {
        ...option,
        title: null,
        label: null,
      };
    }
    return option;
  }

  /**
   * facet title
   */
  private renderTitle() {
    each(this.facets, (facet: MirrorData) => {
      const { columnValue, view } = facet;

      const config = deepMix({
        position: [ '50%', '0%' ] as [string, string],
        content: columnValue,
      }, getFactTitleConfig(DIRECTION.TOP), this.cfg.title);

      view.annotation().text(config);
    });
  }

  /**
   * 计算分页数
   * @param total
   * @param pageSize
   */
  private getPageCount(total: number, pageSize: number): number {
    return Math.floor((total + pageSize - 1) / pageSize);
  }

  /**
   * 索引值在哪一页
   * @param index
   * @param pageSize
   */
  private getRowCol(index: number, pageSize: number) {
    const row = Math.floor(index / pageSize);
    const col = index % pageSize;

    return { row, col };
  }
}
