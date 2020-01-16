import View from '../chart/view';
import { DIRECTION } from '../constant';
import { GroupComponent } from '../dependents';
import { Region } from '../interface';
import { Facet } from './facet';

// 分面基类
export type FacetCtor = new (view: View, cfg: any) => Facet;

export interface FacetComponent {
  direction: DIRECTION;
  component: GroupComponent;
  facetIndex: number;
}

/**
 * 默认的基础配置
 */
export interface FacetCfg {
  // 布局类型
  readonly type?: string;
  // view 创建回调
  readonly eachView: (innerView: View, facet?: FacetData) => any;
  // 间距
  readonly padding?: number;
  // 是否显示标题
  readonly showTitle?: boolean;
}

export interface FacetTitle {
  readonly offsetX?: number;
  readonly offsetY?: number;
  readonly style?: object;
}

/**
 * 分面数据
 */
export interface FacetData {
  readonly type: string;
  // 当前分面的数据
  readonly data: object[];
  // 当前分面的范围
  readonly region: Region;
  // 当前分面的 padding
  readonly padding?: number;
  // 当前 facet 对应生成的 view
  view?: View;
}

/**
 * rect 分面的配置
 */
export interface RectCfg extends FacetCfg {
  // column, row
  readonly fields: string[];
  // 行列标题的样式
  readonly columnTitle?: FacetTitle,
  readonly rowTitle?: FacetTitle,
}

export interface RectData extends FacetData {
  // 分面行列字段
  readonly rowField: string;
  readonly columnField: string;
  // 当前行列分面的值
  readonly rowValue: string;
  readonly columnValue: string;
  // 当前行列指的索引
  readonly rowIndex: number;
  readonly columnIndex: number;
  // 当前行列字段的值长度
  readonly rowValuesLength: number;
  readonly columnValuesLength: number;
}

export interface FacetCfgMap {
  rect: RectCfg;
}
