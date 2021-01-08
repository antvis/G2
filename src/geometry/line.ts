import Path, { PathCfg } from './path';
/** 引入 Path 对应的 ShapeFactory */
import './shape/line';

/**
 * Line 几何标记。
 * 常用于折线图的绘制。
 */
export default class Line extends Path {
  public type: string = 'line';

  constructor(cfg: PathCfg) {
    super(cfg);

    const { sortable = false } = cfg; // 关闭默认的 X 轴数据排序
    this.sortable = sortable;
  }
}
