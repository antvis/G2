import View from '../chart/view';
import { Datum, Region, ViewPadding } from '../interface';
import { Facet } from './facet';

// 分面基类
export type FacetCtor = new (view: View, cfg: any) => Facet;

export interface Condition {
  readonly field: string;
  readonly value: any;
  readonly values: any[];
}

export type FacetDataFilter = (data: Datum[]) => boolean;

/**
 * 默认的基础配置
 */
export interface FacetCfg {
  /** 布局类型 */
  readonly type?: string;
  /** view 创建回调 */
  readonly eachView: (innerView: View, facet?: FacetData) => any;
  /** facet view padding */
  readonly padding?: ViewPadding;
  /** 是否显示标题 */
  readonly showTitle?: boolean;
  /** facet fields */
  readonly fields: string[];
}

/**
 * Facet title 配置项
 */
export interface FacetTitle {
  /** x 方向偏移 */
  readonly offsetX?: number;
  /** y 方向偏移 */
  readonly offsetY?: number;
  /** 文本样式 */
  readonly style?: object;
}

/**
 * 分面数据
 */
export interface FacetData {
  /** 分面类型 */
  readonly type: string;
  /** 当前分面子 view 的数据 */
  readonly data: object[];
  /** 当前分面子 view 的范围 */
  readonly region: Region;
  /** 当前分面子 view 的 padding */
  readonly padding?: number;
  /** 当前 facet 对应生成的 view */
  view?: View;

  // facet data
  /** 分面行列字段 */
  readonly rowField: string;
  readonly columnField: string;
  /** 当前行列分面的枚举值 */
  readonly rowValue: string;
  readonly columnValue: string;
  /** 当前行列指的索引 */
  readonly rowIndex: number;
  readonly columnIndex: number;
  /** 当前行列字段的枚举值长度 */
  readonly rowValuesLength: number;
  readonly columnValuesLength: number;
}

// ===================== rect 相关类型定义 =====================

export interface RectCfg extends FacetCfg {
  /** 行列标题的样式 */
  readonly columnTitle?: FacetTitle,
  readonly rowTitle?: FacetTitle,
}

export interface RectData extends FacetData {

}

// ===================== mirror 相关类型定义 =====================

export interface MirrorCfg extends FacetCfg {
  /** 是否转置 */
  readonly transpose?: boolean;
  /** 标题样式 */
  readonly title?: FacetTitle;
}

export interface MirrorData extends FacetData {
}

// ===================== list 相关类型定义 =====================

export interface ListCfg extends FacetCfg {
  readonly cols?: number;
  readonly title?: FacetTitle;
}

export interface ListData extends FacetData {
  readonly total: number;
}

// ===================== matrix 相关类型定义 =====================

export interface MatrixCfg extends FacetCfg {
  /** 行列标题的样式 */
  readonly columnTitle?: FacetTitle,
  readonly rowTitle?: FacetTitle,
}

export interface MatrixData extends FacetData {
}

// ===================== circle 相关类型定义 =====================

export interface CircleCfg extends FacetCfg {
  readonly title?: FacetTitle;
}

export interface CircleData extends FacetData {
}


/**
 * facet object map
 */
export interface FacetCfgMap {
  /** rect */
  readonly rect: RectCfg;
  /** mirror */
  readonly mirror: MirrorCfg;
  /** list */
  readonly list: ListCfg;
  /** matrix */
  readonly matrix: MatrixCfg;
  /** circle */
  readonly circle: CircleCfg;
}
