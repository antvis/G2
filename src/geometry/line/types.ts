import { GeometryOption } from '../../types/geometry';

export type LineGeometryOption = GeometryOption & {
  /**
   * 是否连接空值
   */
  readonly connectNulls?: boolean;
  /**
   * 单个孤立数据点是否展示
   */
  readonly showSinglePoint?: boolean;
};
