import * as _ from '@antv/util';
/** 引入 Path 对应的 ShapeFactory */
import '../shape/line';
import { GeometryCfg } from './base';
import Path from './path';

export default class Line extends Path {
  public type: string = 'line';

  constructor(cfg: GeometryCfg) {
    super(cfg);

    const { sortable = true } = cfg; // Line 默认会对数据按照 x 轴字段进行排序
    this.sortable = sortable;
  }
}
