import { Geometry } from '../geometry';
import { ShapePoint } from '../../types/geometry';
import { PlainObject, Point } from '../../types/common';
import { getRectPoints } from './util';
import { getXDimensionLength } from '../../util/coordinate';
import { GeometryOption } from '../../types';

import './shapes';

/**
 * Interval 的 options 配置
 * 直接放到 geometry 中，看的更清楚
 */
export type IntervalOptions = GeometryOption & {
  columnWidthRatio?: number;
}

/**
 * Interval 类型的图形 marker
 */
export class Interval extends Geometry<IntervalOptions> {
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
  private defaultSize: number;

  /**
   * 获取每条数据的 Shape 绘制信息
   * @param datum 经过分组 -> 数字化 -> adjust 调整后的数据记录
   * @returns
   */
  protected createShapePointsCfg(datum: PlainObject) {
    const cfg = super.createShapePointsCfg(datum);

    // 计算每个 shape 的 size
    let size;
    const sizeAttr = this.getAttribute('size');
    if (sizeAttr) {
      size = this.getAttributeValues(sizeAttr, datum)[0];
      // 归一化
      const coordinate = this.options.coordinate;
      const coordinateWidth = getXDimensionLength(coordinate);
      size /= coordinateWidth;
    } else {
      this.defaultSize = this.defaultSize || this.getDefaultSize();
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

  /**
   * 获取默认的 size（归一化）
   * // todo 根据数据的各种情况，计算出 size，逻辑非常复杂，后续按照场景一个一个补齐
   * https://github.com/antvis/G2/blob/2841641aa4e12eaa8f1061062c0dba39a263b7c0/src/geometry/util/shape-size.ts#L35
   */
  private getDefaultSize(): number {
    return 1 / 6;
  }
}
