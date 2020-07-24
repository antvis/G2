import { deepMix, each, filter, get } from '@antv/util';
import { AxisCfg, CircleCfg, CircleData, Datum } from '../interface';

import View from '../chart/view';
import { DIRECTION } from '../constant';
import { getAnglePoint, getFactTitleConfig } from '../util/facet';
import { Facet } from './facet';

/**
 * @ignore
 * 镜像分面
 */
export default class Circle extends Facet<CircleCfg, CircleData> {
  protected getDefaultCfg() {
    return deepMix({}, super.getDefaultCfg(), {
      type: 'circle',
      showTitle: true,
      title: super.getDefaultTitleCfg(),
    });
  }

  public render() {
    super.render();

    if (this.cfg.showTitle) {
      this.renderTitle();
    }
  }

  /**
   * 根据总数和当前索引，计算分面的 region
   * @param count
   * @param index
   */
  protected getRegion(count: number, index: number) {
    const r = 1 / 2; // 画布半径
    // 画布圆心
    const center = { x: 0.5, y: 0.5 };
    // 每隔分面间隔的弧度
    const avgAngle = (Math.PI * 2) / count;

    // 当前分面所在的弧度
    const angle = (-1 * Math.PI) / 2 + avgAngle * index;
    // TODO 没看懂
    const facetR = r / (1 + 1 / Math.sin(avgAngle / 2));
    // 分面的中心点
    const middle = getAnglePoint(center, r - facetR, angle);
    const startAngle = (Math.PI * 5) / 4; // 右上角
    const endAngle = (Math.PI * 1) / 4; // 左下角

    return {
      start: getAnglePoint(middle, facetR, startAngle),
      end: getAnglePoint(middle, facetR, endAngle),
    };
  }

  protected afterEachView(view: View, facet: CircleData) {
    this.processAxis(view, facet);
  }

  protected beforeEachView(view: View, facet: CircleData) {}

  protected generateFacets(data: Datum[]): CircleData[] {
    const { fields, type } = this.cfg;
    const [field] = fields;
    if (!field) {
      throw new Error('No `fields` specified!');
    }

    const values = this.getFieldValues(data, field);
    const count = values.length;

    const rst = [];
    values.forEach((value: any, index: number) => {
      const conditions = [{ field, value, values }];
      const facetData = filter(data, this.getFacetDataFilter(conditions));

      const facet: CircleData = {
        type,
        data: facetData,
        region: this.getRegion(count, index),

        columnValue: value,
        columnField: field,
        columnIndex: index,
        columnValuesLength: count,

        rowValue: null,
        rowField: null,
        rowIndex: 0,
        rowValuesLength: 1,
      };
      rst.push(facet);
    });
    return rst;
  }

  protected getXAxisOption(x: string, axes: any, option: AxisCfg, facet: CircleData): object {
    // 不做任何处理
    return option;
  }

  /**
   * 设置 y 坐标轴的文本、title 是否显示
   * @param y
   * @param axes
   * @param option
   * @param facet
   */
  protected getYAxisOption(y: string, axes: any, option: AxisCfg, facet: CircleData): object {
    // 不做任何处理
    return option;
  }

  /**
   * facet title
   */
  private renderTitle() {
    each(this.facets, (facet: CircleData) => {
      const { columnValue, view } = facet;
      const formatter = get(this.cfg.title, 'formatter');

      const config = deepMix(
        {
          position: ['50%', '0%'] as [string, string],
          content: formatter ? formatter(columnValue) : columnValue,
        },
        getFactTitleConfig(DIRECTION.TOP),
        this.cfg.title
      );

      view.annotation().text(config);
    });
  }
}
