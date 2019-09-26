import * as _ from '@antv/util';
import { LooseObject } from 'interface';
import { getXDimensionLength } from '../../util/coordinate';
import Geometry from '../geometry';
import { getDefaultSize } from '../util/shape-size';
/** 引入对应的 ShapeFactory */
import './shape';

export default class Interval extends Geometry {
  public readonly type: string = 'interval';
  public readonly shapeType: string = 'interval';
  public generatePoints: boolean = true;

  private _defaultSize: number = null;

  public init() {
    super.init();

    // 柱状图数值轴默认从 0 开始
    const scaleDefs = this.scaleDefs;
    const yScale = this.getYScale();
    const { field, min, max, type } = yScale;
    // 如果用户通过列定义自己定义了 min，则以用户的为准
    // time 类型不做调整
    if (!_.get(scaleDefs, `${field}.min`) && type !== 'time') {
      if (min > 0) {
        yScale.change({
          min: 0,
        });
      } else if (max <= 0) {
        // 当柱状图全为负值时也需要从 0 开始生长
        yScale.change({
          max: 0,
        });
      }
    }
  }

  public clear() {
    super.clear();
    this._defaultSize = null;
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
      if (!this._defaultSize) {
        this._defaultSize = getDefaultSize(this);
      }
      size = this._defaultSize;
    }
    cfg.size = size;

    return cfg;
  }
}
