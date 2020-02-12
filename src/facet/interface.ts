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
export interface FacetCfg<D> {
  /** 布局类型。 */
  readonly type?: string;
  /** view 创建回调。 */
  readonly eachView: (innerView: View, facet?: D) => any;
  /** facet view padding。 */
  readonly padding?: ViewPadding;
  /** 是否显示标题。 */
  readonly showTitle?: boolean;
  /** facet 数据划分维度。 */
  readonly fields: string[];
}

/**
 * Facet title 配置项
 */
export interface FacetTitle {
  /** x 方向偏移。 */
  readonly offsetX?: number;
  /** y 方向偏移。 */
  readonly offsetY?: number;
  /** 文本样式。 */
  readonly style?: object;
}

export interface Line {
  readonly lineWidth?: number;
  readonly stroke?: string;
}
/**
 * 分面数据
 */
export interface FacetData {
  /** 分面类型。 */
  readonly type: string;
  /** 当前分面子 view 的数据。 */
  readonly data: object[];
  /** 当前分面子 view 的范围。 */
  readonly region: Region;
  /** 当前分面子 view 的 padding。 */
  readonly padding?: number;
  /** 当前 facet 对应生成的 view。 */
  view?: View;

  // facet data
  /** 分面行字段。 */
  readonly rowField: string;
  /** 分面列字段。 */
  readonly columnField: string;
  /** 当前行分面的枚举值。 */
  readonly rowValue: string;
  /** 当前列分面的枚举值。 */
  readonly columnValue: string;
  /** 当前行索引。 */
  readonly rowIndex: number;
  /** 当前列索引。 */
  readonly columnIndex: number;
  /** 当前行字段的枚举值长度。 */
  readonly rowValuesLength: number;
  /** 当前列字段的枚举值长度。 */
  readonly columnValuesLength: number;
}

// ===================== rect 相关类型定义 =====================

export interface RectCfg extends FacetCfg<RectData> {
  /** 行标题的样式。 */
  readonly columnTitle?: FacetTitle,
  /** 列标题的样式。 */
  readonly rowTitle?: FacetTitle,
}

export interface RectData extends FacetData {

}

// ===================== mirror 相关类型定义 =====================

export interface MirrorCfg extends FacetCfg<MirrorData> {
  /** 是否转置。 */
  readonly transpose?: boolean;
  /** 标题样式。 */
  readonly title?: FacetTitle;
}

export interface MirrorData extends FacetData {
}

// ===================== list 相关类型定义 =====================

export interface ListCfg extends FacetCfg<ListData> {
  /** 指定每行可显示分面的个数，超出时会自动换行。 */
  readonly cols?: number;
  /** 每个分面标题配置。 */
  readonly title?: FacetTitle;
}

export interface ListData extends FacetData {
  readonly total: number;
}

// ===================== matrix 相关类型定义 =====================

export interface MatrixCfg extends FacetCfg<MirrorData> {
  /** 列标题的样式 */
  readonly columnTitle?: FacetTitle,
  /** 列标题的样式 */
  readonly rowTitle?: FacetTitle,
}

export interface MatrixData extends FacetData {
}

// ===================== circle 相关类型定义 =====================

export interface CircleCfg extends FacetCfg<CircleData> {
  /** 分面标题配置。 */
  readonly title?: FacetTitle;
}

export interface CircleData extends FacetData {
}

// ===================== tree 相关类型定义 =====================
export interface TreeCfg extends FacetCfg<TreeData> {
  readonly lineSmooth?: boolean;
  readonly line?: Line;
  readonly rootTitle?: string;
  readonly title?: FacetTitle;
}

export interface TreeData extends FacetData {
  children?: TreeData[];
  originColIndex?: number;
}

/**
 * facet object map
 */
export interface FacetCfgMap {
  /** rect 类型分面配置 */
  readonly rect: RectCfg;
  /** mirror 类型分面配置 */
  readonly mirror: MirrorCfg;
  /** list 类型分面配置 */
  readonly list: ListCfg;
  /** matrix 类型分面配置 */
  readonly matrix: MatrixCfg;
  /** circle 类型分面配置 */
  readonly circle: CircleCfg;
  /** tree */
  readonly tree: TreeCfg;
}
