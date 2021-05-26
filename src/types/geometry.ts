import { Scale } from './scale';
import { Data, Func } from './common';

/**
 * 视觉通道的 key
 */
export type AttributeKey = 'position' | 'color' | 'shape' | 'size' | 'label' | 'tooltip' | 'sequence' | 'custom';

/**
 * 视觉通道映射的配置
 */
export type AttributeOption = {
  fields: string[];
  value?: any;
  callback?: Func;
};

export type AttributeOptions = Map<AttributeKey, AttributeOption>;

/**
 * geometry 更新的配置定义
 */
export type GeometryOption = {
  /**
   * 原始的明细数据
   */
  data: Data;
  /**
   * 对应字段的 scale 信息
   */
  scales: Map<string, Scale>;
  /**
   * 当前坐标系
   */
  coordinate: any;
  /**
   * 是否生成关键点信息
   */
  generatePoints?: boolean;
};

/**
 * adjust 配置
 */
export type AdjustOption = {
  type?: string;
  [key: string]: any;
};

/** shape 关键点信息 */
export type ShapePoint = {
  /** 数据点映射后对应 x 的值。 */
  x: number | number[];
  /** 数据点映射后对应 y 的值。 */
  y?: number | number[];
  /** 数据在 y 方向的最小值。 */
  y0?: number;
  /** 大小 */
  size?: number;
};
