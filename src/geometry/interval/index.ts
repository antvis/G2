import { Geometry } from '../geometry';
import { ShapePoint } from '../../types/geometry';
import { PlainObject, Point } from '../../types/common';
import { getRectPoints } from './util';
import { getXDimensionLength } from '../../util/coordinate';

import './shapes';

export class Interval extends Geometry {
  /**
   * geometry type
   */
  public type = 'interval';

  /**
   * shape type
   */
  public defaultShapeType = 'rect';

  /**
   * 存储每个 shape 的默认 size，用于 Interval、Schema 几何标记
   */
  private defaultSize: number = 1 / 6;

  /**
   * 获取每条数据的 Shape 绘制信息
   * @param obj 经过分组 -> 数字化 -> adjust 调整后的数据记录
   * @returns
   */
  protected createShapePointsCfg(obj: PlainObject) {
    const cfg = super.createShapePointsCfg(obj);

    // 计算每个 shape 的 size
    let size;
    const sizeAttr = this.getAttribute('size');
    if (sizeAttr) {
      size = this.getAttributeValues(sizeAttr, obj)[0];
      // 归一化
      const coordinate = this.options.coordinate;
      const coordinateWidth = getXDimensionLength(coordinate);
      size /= coordinateWidth;
    } else {
      // if (!this.defaultSize) {
      //   this.defaultSize = getDefaultSize(this);
      // }
      size = this.defaultSize;
    }
    cfg.size = size;

    return cfg;
  }

  /**
   * 计算关键点，每个 Geometry 有自己独立的逻辑
   * @param pointInfo
   * @returns
   */
  protected getDefaultPoints(pointInfo: ShapePoint): Point[] {
    return getRectPoints(pointInfo);
  }
}
