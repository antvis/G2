import { LooseObject } from 'interface';
import { getCoordinateWidth } from '../../util/coordinate';
import Geometry from '../geometry';
import { getDefaultSize } from '../util/shape-size';
/** 引入对应的 ShapeFactory */
import './shape';

export default class Interval extends Geometry {
  public readonly type: string = 'interval';
  public readonly shapeType: string = 'interval';
  public generatePoints: boolean = true;

  private _defaultSize: number = null;

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
      const coordinateWidth = getCoordinateWidth(coordinate);
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
