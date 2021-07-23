import type { PathGeometryOption } from '../path/types';

export type LineGeometryOption = PathGeometryOption & {
  /** 是否对数据进行排序, 默认关闭 */
  sortable?: boolean;
};
