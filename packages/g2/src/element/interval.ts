import * as _ from '@antv/util';
import Element from './base';
import SizeController from './controller/size';
import { DataPointType } from '../interface';
import IntervalShapeFactory from './shape/interval';

export default class Interval extends Element {

  constructor(cfg: DataPointType) {
    super({
      type: 'interval',
      shapeType: 'interval',
      generatePoints: true,
      ...cfg,
    });

    // 初始化 sizeController
    const sizeController = new SizeController(this);
    this.set('sizeController', sizeController);
    // 设置 IntervalShapeFactory
    this.set('shapeFactory', IntervalShapeFactory);
  }

  createShapePointsCfg(obj) {
    const cfg = super.createShapePointsCfg(obj);
    cfg.size = this.getNormalizedSize(obj); // 获取每条数据对应的 size 归一化后的值
    return cfg;
  }

  isShareTooltip(): boolean {
    let isShareTooltip = this.get('shareTooltip');
    const coord = this.get('coord');
    const coordType = coord.type;
    if (coordType === 'theta' || (coordType === 'polar' && coord.isTransposed)) {
      isShareTooltip = false; // 饼图不合并
    }

    return isShareTooltip;
  }
}
