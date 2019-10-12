import * as _ from '@antv/util';
/** 引入 Path 对应的 ShapeFactory */
import '../shape/polygon';
import Geometry from './base';

export default class Polygon extends Geometry {
  public readonly type = 'polygon';
  public readonly shapeType = 'polygon';
  public generatePoints = true;

  protected createShapePointsCfg(obj: object) {
    const cfg: any = super.createShapePointsCfg(obj);
    let x = cfg.x;
    let y = cfg.y;
    let temp;
    // x y 都是数组时，不做处理
    if (!(_.isArray(x) && _.isArray(y))) {
      const xScale = this.getXScale();
      const yScale = this.getYScale();
      const xCount = xScale.values.length;
      const yCount = yScale.values.length;
      const xOffset = (0.5 * 1) / xCount;
      const yOffset = (0.5 * 1) / yCount;

      if (xScale.isCategory && yScale.isCategory) {
        // 如果x,y都是分类
        x = [x - xOffset, x - xOffset, x + xOffset, x + xOffset];
        y = [y - yOffset, y + yOffset, y + yOffset, y - yOffset];
      } else if (_.isArray(x)) {
        // x 是数组
        temp = x;
        x = [temp[0], temp[0], temp[1], temp[1]];
        y = [y - yOffset / 2, y + yOffset / 2, y + yOffset / 2, y - yOffset / 2];
      } else if (_.isArray(y)) {
        // y 是数组
        temp = y;
        y = [temp[0], temp[1], temp[1], temp[0]];
        x = [x - xOffset / 2, x - xOffset / 2, x + xOffset / 2, x + xOffset / 2];
      }
      cfg.x = x;
      cfg.y = y;
    }
    return cfg;
  }
}
