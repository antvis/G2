import { Path } from '../path';
import type { LineGeometryOption } from './types';

import './shapes';

/**
 * @description Line 几何标记
 *
 * 常用于折线图的绘制。
 */
export class Line extends Path<LineGeometryOption> {
  /**
   * geometry type
   */
  public type = 'line';

  /**
   * shape type
   */
  public defaultShapeType = 'line';

  /** 是否对数据进行排序，默认为 false。  */
  private sortable: boolean;

  constructor(option: LineGeometryOption) {
    super(option);

    const { sortable = false } = option; // 关闭默认的 X 轴数据排序
    this.sortable = sortable;
  }
}
