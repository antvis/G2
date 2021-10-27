import type { Variable } from './variable';

/**
 * 操作符的枚举值
 */
export enum Operator {
  EQ = 'eq',
  // 暂时不支持不等式组
  // GT = 'gt',
  // LT = 'lt',
  // GTE = 'gte',
  // LTE = 'lte',
}

export type BoxObject = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * 几种情况
 * - 200
 * - variable
 * - [200, 2]
 * - [2, variable]
 */
export type Element = Variable | number | (Variable | number)[];
