import { deepMix, each, filter, get } from '@antv/util';
import { DIRECTION } from '../constant';
import { AxisCfg, Datum, MirrorCfg, MirrorData } from '../interface';

import View from '../chart/view';
import { getFactTitleConfig } from '../util/facet';
import { Facet } from './facet';

/**
 * @ignore
 * 镜像分面
 */
export default class Mirror extends Facet<MirrorCfg, MirrorData> {
  protected getDefaultCfg() {
    return deepMix({}, super.getDefaultCfg(), {
      type: 'mirror',
      showTitle: true,
      title: super.getDefaultTitleCfg(),
      transpose: false,
    });
  }

  public render() {
    super.render();

    if (this.cfg.showTitle) {
      this.renderTitle();
    }
  }

  protected beforeEachView(view: View, facet: MirrorData) {
    // 做一下坐标系转化
    if (this.cfg.transpose) {
      if (facet.columnIndex % 2 === 0) {
        view.coordinate().transpose().reflect('x');
      } else {
        view.coordinate().transpose();
      }
    } else {
      if (facet.rowIndex % 2 !== 0) {
        view.coordinate().reflect('y');
      }
    }
  }

  protected afterEachView(view: View, facet: MirrorData) {
    this.processAxis(view, facet);
  }

  protected generateFacets(data: Datum[]): MirrorData[] {
    const [f] = this.cfg.fields;

    const rst = [];
    let columnValuesLength = 1;
    let rowValuesLength = 1;

    let columnValues: string[] = [''];
    let rowValues: string[] = [''];

    let columnField;
    let rowField;

    if (this.cfg.transpose) {
      columnField = f;
      columnValues = this.getFieldValues(data, columnField).slice(0, 2); // 镜像最多两个
      columnValuesLength = columnValues.length;
    } else {
      rowField = f;
      rowValues = this.getFieldValues(data, rowField).slice(0, 2); // 镜像最多两个
      rowValuesLength = rowValues.length;
    }

    // 获取每个维度对应的数据配置片段
    columnValues.forEach((xVal, xIndex) => {
      rowValues.forEach((yVal, yIndex) => {
        const conditions = [
          { field: columnField, value: xVal, values: columnValues },
          { field: rowField, value: yVal, values: rowValues },
        ];

        const facetData = filter(data, this.getFacetDataFilter(conditions));

        const facet: MirrorData = {
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

  /**
   * 设置 x 坐标轴的文本、title 是否显示
   * @param x
   * @param axes
   * @param option
   * @param facet
   */
  protected getXAxisOption(x: string, axes: any, option: AxisCfg, facet: MirrorData): object {
    // 非最后一行
    // 当是最后一行或者下面没有 view 时文本不显示
    if (facet.columnIndex === 1 || facet.rowIndex === 1) {
      return {
        ...option,
        label: null,
        title: null,
      };
    }

    return option;
  }

  /**
   * 设置 y 坐标轴的文本、title 是否显示
   * @param y
   * @param axes
   * @param option
   * @param facet
   */
  protected getYAxisOption(y: string, axes: any, option: AxisCfg, facet: MirrorData): object {
    // do nothing
    return option;
  }

  private renderTitle() {
    each(this.facets, (facet: MirrorData, facetIndex: number) => {
      const { columnValue, rowValue, view } = facet;
      const formatter = get(this.cfg.title, 'formatter');

      if (this.cfg.transpose) {
        const config = deepMix(
          {
            position: ['50%', '0%'] as [string, string],
            content: formatter ? formatter(columnValue) : columnValue,
          },
          getFactTitleConfig(DIRECTION.TOP),
          this.cfg.title
        );

        view.annotation().text(config);
      } else {
        const config = deepMix(
          {
            position: ['100%', '50%'] as [string, string],
            content: formatter ? formatter(rowValue) : rowValue,
          },
          getFactTitleConfig(DIRECTION.RIGHT),
          this.cfg.title
        );

        view.annotation().text(config);
      }
    });
  }
}
