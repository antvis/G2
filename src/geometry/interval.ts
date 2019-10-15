import * as _ from '@antv/util';
import { LooseObject } from 'interface';
/** 引入对应的 ShapeFactory */
import '../shape/interval';
import { getXDimensionLength } from '../util/coordinate';
import Geometry from './base';
import { getDefaultSize } from './util/shape-size';

export default class Interval extends Geometry {
  public readonly type: string = 'interval';
  public readonly shapeType: string = 'interval';
  protected generatePoints: boolean = true;

  private defaultSize: number;

  public initial() {
    super.initial();
    this.adjustYScale();
  }

  public clear() {
    super.clear();
    this.defaultSize = undefined;
  }

  protected updateScales() {
    super.updateScales();
    this.adjustYScale();
  }

  protected createShapePointsCfg(record: LooseObject) {
    const cfg = super.createShapePointsCfg(record);

    // 计算每个 shape 的 size
    let size;
    const sizeAttr = this.getAttribute('size');
    if (sizeAttr) {
      size = this.getAttrValues(sizeAttr, record)[0];
      // 归一化
      const coordinate = this.coordinate;
      const coordinateWidth = getXDimensionLength(coordinate);
      size = size / coordinateWidth;
    } else {
      if (!this.defaultSize) {
        this.defaultSize = getDefaultSize(this);
      }
      size = this.defaultSize;
    }
    cfg.size = size;

    return cfg;
  }

  // 柱状图数值轴默认从 0 开始
  private adjustYScale() {
    const scaleDefs = this.scaleDefs;
    const yScale = this.getYScale();
    const { field, min, max, type } = yScale;
    if (type !== 'time') {
      // time 类型不做调整
      // 柱状图的 Y 轴要从 0 开始生长，但是如果用户设置了则以用户的为准
      if (min > 0 && !_.get(scaleDefs, [field, 'min'])) {
        yScale.change({
          min: 0,
        });
      }
      // 柱当柱状图全为负值时也需要从 0 开始生长，但是如果用户设置了则以用户的为准
      if (max <= 0 && !_.get(scaleDefs, [field, 'max'])) {
        yScale.change({
          max: 0,
        });
      }
    }
  }
}
