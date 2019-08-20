import * as _ from '@antv/util';
import { Group, Shape } from '@antv/g';
import Element from './base';
import { DataPointType } from '../interface';
import PointShapeFactory from './shape/point';

/**
 * Point 类型的几何图形
 * 绘制散点图
 */
export default class Point extends Element {
  constructor(cfg: DataPointType) {
    super({
      type: 'point', // geom type
      shapeType: 'point', // shape type
      generatePoints: true, // 关键点信息，包含有位置、大小
      shareTooltip: false, // 点不合并 tooltip，即每个 tooltip 只展示当前 shape 的数据信息
      ...cfg,
    });

    // 每一个 Element 对应一个确定的 shapeFactory
    this.set('shapeFactory', PointShapeFactory);
  }

  // overwrite
  drawPoint(obj: DataPointType, container: Group, shapeFactory, index: number) {
    const shape = obj.shape;
    const cfg = this.getDrawCfg(obj);

    if (_.isArray(obj.y)) {
      const hasStackAdjust = this.hasAdjust('stack');
      _.each(obj.y, (y, idx) => {
        cfg.y = y;
        cfg.yIndex = idx;
        if (!hasStackAdjust || idx !== 0) {
          const geomShape = shapeFactory.drawShape(shape, cfg, container);
          this.appendShapeInfo(geomShape, index + idx);
        }
      });
    } else if (!_.isNil(obj.y)) {
      const geomShape = shapeFactory.drawShape(shape, cfg, container);
      this.appendShapeInfo(geomShape, index);
    }
  }
}
