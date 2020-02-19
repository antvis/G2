import { isArray } from '@antv/util';
import { Datum } from '../interface';
import Geometry from './base';
/** 引入 Path 对应的 ShapeFactory */
import './shape/polygon';

/**
 * Polygon 几何标记。
 * 常用于绘制色块图、日历图等。
 */
export default class Polygon extends Geometry {
  public readonly type: string = 'polygon';
  public readonly shapeType: string = 'polygon';
  protected generatePoints: boolean = true;

  /**
   * 获取 Shape 的关键点数据。
   * @param obj
   * @returns
   */
  protected createShapePointsCfg(obj: Datum) {
    const cfg: any = super.createShapePointsCfg(obj);
    let x = cfg.x;
    let y = cfg.y;
    let temp;
    // x y 都是数组时，不做处理
    if (!(isArray(x) && isArray(y))) {
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
      } else if (isArray(x)) {
        // x 是数组
        temp = x;
        x = [temp[0], temp[0], temp[1], temp[1]];
        y = [y - yOffset / 2, y + yOffset / 2, y + yOffset / 2, y - yOffset / 2];
      } else if (isArray(y)) {
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
