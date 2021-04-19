import { Scale } from './chart';
import { Data, Func } from './common';

/**
 * 视觉通道的 key
 */
export type AttributeKey = 'position' | 'color' | 'shape' | 'size' | 'label' | 'tooltip' | 'custom';

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
  data: Data;
  scales: Map<string, Scale>;
};

/**
 * adjust 配置
 */
export type AdjustOption = {
  type?: string;
  [key: string]: any;
};
