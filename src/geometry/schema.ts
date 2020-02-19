import { LooseObject } from '../interface';
import { getXDimensionLength } from '../util/coordinate';
import Geometry from './base';
/** 引入对应的 ShapeFactory */
import './shape/schema';
import { getDefaultSize } from './util/shape-size';

/**
 * Schema 几何标记，用于一些自定义图形的绘制，比如箱型图、股票图等。
 */
export default class Schema extends Geometry {
  public readonly type: string = 'schema';
  public readonly shapeType: string = 'schema';
  protected generatePoints: boolean = true;

  /**
   * 获取 Shape 的关键点数据。
   * @param record
   * @returns
   */
  protected createShapePointsCfg(record: LooseObject) {
    const cfg = super.createShapePointsCfg(record);

    // 计算每个 shape 的 size
    let size;
    const sizeAttr = this.getAttribute('size');
    if (sizeAttr) {
      size = this.getAttributeValues(sizeAttr, record)[0];
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
}
