import { get } from '@antv/util';
import { FIELD_ORIGIN } from '../constant';
import { Datum, ViolinShapePoint } from '../interface';
import { getXDimensionLength } from '../util/coordinate';
import { getDefaultSize } from './util/shape-size';
import Geometry from './base';
/** 引入 Path 对应的 ShapeFactory */
import './shape/violin';

/**
 * Violin 几何标记。
 * 用于绘制小提琴图。
 */
export default class Violin extends Geometry<ViolinShapePoint> {
  public readonly type: string = 'violin';
  public readonly shapeType: string = 'violin';
  protected generatePoints: boolean = true;
  /** size 私有映射字段 */
  private _sizeField: string;

  /**
   * 获取 Shape 的关键点数据。
   * @param record
   * @returns
   */
  protected createShapePointsCfg(record: Datum) {
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
    cfg._size = get(record[FIELD_ORIGIN], [this._sizeField]);
    return cfg;
  }

  /**
   * @override
   */
  protected initAttributes() {
    const { attributeOption } = this;
    const sizeField = attributeOption.size
      ? attributeOption.size.fields[0]
      : this._sizeField
      ? this._sizeField
      : 'size';
    this._sizeField = sizeField;
    // fixme 干啥要删掉
    delete attributeOption.size;
    super.initAttributes();
  }
}
