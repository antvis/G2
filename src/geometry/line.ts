import Path, { PathCfg } from './path';
/** 引入 Path 对应的 ShapeFactory */
import './shape/line';

export default class Line extends Path {
  public type: string = 'line';

  constructor(cfg: PathCfg) {
    super(cfg);

    const { sortable = true } = cfg; // Line 默认会对数据按照 x 轴字段进行排序
    this.sortable = sortable;
  }
}
