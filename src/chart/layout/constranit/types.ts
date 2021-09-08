/**
 * 操作符的枚举值
 */
export enum Operator {
  EQ = 'eq',
  GT = 'gt',
  LT = 'lt',
  GTE = 'gte',
  LTE = 'lte',
}

export type BoxObject = {
  x: number;
  y: number;
  width: number;
  height: number;
}
