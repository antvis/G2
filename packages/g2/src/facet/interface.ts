import { PointType } from '@antv/g';
import { Facet } from './base';
import View from '../plot/view';

// 分面基类
export interface FacetCtor {
  new (view: View, cfg: any): Facet;
}

export interface FacetCfg {
  // 布局类型
  readonly type: string;
  // view 创建回调
  readonly eachView: (innerView: View, facet?: FacetData) => any;
  // 是否显示标题
  readonly showTitle: boolean;
  // 自动设置轴
  readonly autoSetAxis: boolean;
  // 间距
  readonly padding: number;
  readonly rowTitle: object;
  readonly colTitle: object;
}

/* 不同 facet 分面的配置项不同 */
export interface RectCfg extends FacetCfg {
  // 行列
  readonly fields: string[];
}

// 范围
export interface Region {
  readonly start: PointType;
  readonly end: PointType;
}

/**
 * 分面数据
 */
export interface FacetData {
  readonly type?: string;
  // 分面行列字段
  readonly rowField?: string;
  readonly columnField?: string;
  // 当前行列分面的值
  readonly rowValue?: string;
  readonly columnValue?: string;
  // 当前行列指的索引
  readonly rowIndex?: number;
  readonly columnIndex?: number;
  // 当前行列字段的值长度
  readonly rowValueLength?: number;
  readonly columnValueLength?: number;
  // 当前分面的数据
  readonly data?: object[];
  // 当前分面的范围
  readonly region: Region;

  readonly padding?: number;
  // 最终生成的 view
  view?: View;
}

/**
 * 单条数据
 */
export interface Datum {
  readonly [key: string]: string | number;
}
