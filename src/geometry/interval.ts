import { get } from '@antv/util';
import { Datum } from '../interface';
import { getXDimensionLength } from '../util/coordinate';
import Geometry from './base';
/** 引入对应的 ShapeFactory */
import './shape/interval';
import { getDefaultSize } from './util/shape-size';

export default class Interval extends Geometry {
  public readonly type: string = 'interval';
  public readonly shapeType: string = 'interval';
  protected generatePoints: boolean = true;

  private defaultSize: number;

  public clear() {
    super.clear();
    this.defaultSize = undefined;
  }

  /**
   * Creates shape points cfg
   * @param obj 经过分组 -> 数字化 -> adjust 调整后的数据记录
   * @returns
   */
  protected createShapePointsCfg(obj: Datum) {
    const cfg = super.createShapePointsCfg(obj);

    // 计算每个 shape 的 size
    let size;
    const sizeAttr = this.getAttribute('size');
    if (sizeAttr) {
      size = this.getAttributeValues(sizeAttr, obj)[0];
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

  protected adjustScale() {
    super.adjustScale();
    const yScale = this.getYScale();
    // 特殊逻辑：饼图需要填充满整个空间
    if (this.coordinate.type === 'theta') {
      yScale.change({
        nice: false,
        min: 0,
        // 发生过 stack 调整，yScale 的 max 被调整过，this.updateStackRange()
        max: Math.max(Math.max.apply(null, yScale.values), yScale.max),
      });
    } else {
      // 柱状图数值轴默认从 0 开始
      const scaleDefs = this.scaleDefs;
      const { field, min, max, type } = yScale;
      if (type !== 'time') {
        // time 类型不做调整
        // 柱状图的 Y 轴要从 0 开始生长，但是如果用户设置了则以用户的为准
        if (min > 0 && !get(scaleDefs, [field, 'min'])) {
          yScale.change({
            min: 0,
          });
        }
        // 柱当柱状图全为负值时也需要从 0 开始生长，但是如果用户设置了则以用户的为准
        if (max <= 0 && !get(scaleDefs, [field, 'max'])) {
          yScale.change({
            max: 0,
          });
        }
      }
    }
  }
}
