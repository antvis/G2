import { Coordinate } from '../../dependents';
import { Datum, GeometryLabelCfg, MappingDatum, Point } from '../../interface';

export type TextAlign = 'start' | 'center' | 'end' | 'left' | 'right';
/**
 * @title 去除 readonly 修饰
 */
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export interface LabelCfg extends Omit<GeometryLabelCfg, 'offset'> {
  content?: any;
  readonly position?: 'top' | 'bottom' | 'middle' | 'left' | 'right';
  readonly offset?: number;
  readonly id: string;
  readonly elementId: string;
  readonly data: Datum;
  readonly mappingData: MappingDatum;
  readonly coordinate: Coordinate;
}

export interface LabelPointCfg {
  /**
   * @title labelPoint.x
   */
  x?: number;
  /**
   * @title labelPoint.y
   */
  y?: number;
  readonly start?: Point;
  readonly color?: string;
  readonly textAlign?: TextAlign;
  readonly textBaseline?: string;
  readonly angle?: number;
  readonly r?: number;
  content?: any;
  rotate?: number;
}

/**
 * 绘制 label 的 item
 */
export interface LabelItem extends LabelCfg, LabelPointCfg {
  /**
   * @title 牵引线
   */
  labelLine?: null | boolean | { style?: object; path?: string };
}

/**
 * polar labelItem
 */
export interface PolarLabelItem extends LabelItem {
  /**
   * @title 占比
   */
  readonly percent?: number;
  /**
   * @title 是否不可见
   */
  invisible?: boolean;
}
