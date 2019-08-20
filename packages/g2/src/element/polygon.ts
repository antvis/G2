import * as Util from '@antv/util';
import Element from './base';
import { DataPointType } from '../interface';
import PolygonShapeFactory from './shape/polygon';

/**
 * Polygon 多边形
 */

export default class Polygon extends Element {
  constructor(cfg: DataPointType) {
    super({
      type: 'polygon',
      shapeType: 'polygon',
      generatePoints: true,
      shareTooltip: false, // polygon 不合并 tooltip，即每个 tooltip 只展示当前 shape 的数据信息
      ...cfg,
    });

    this.set('shapeFactory', PolygonShapeFactory);
  }

  createShapePointsCfg(obj) {
    const cfg = super.createShapePointsCfg(obj);
    let x = cfg.x;
    let y = cfg.y;
    let temp;
    if (!(Util.isArray(x) && Util.isArray(y))) {
      // x y 都是数组时，不做处理
      const xScale = this.getXScale();
      const yScale = this.getYScale();
      // scale 中保证了 values 都会有，所以去掉之前的逻辑判断
      const xCount = xScale.values.length;
      const yCount =  yScale.values.length ;
      const xOffset = (0.5 * 1) / xCount;
      const yOffset = (0.5 * 1) / yCount;
      if (xScale.isCategory && yScale.isCategory) {
        // 如果x,y都是分类
        // @ts-ignore
        x = [ x - xOffset, x - xOffset, x + xOffset, x + xOffset ];
        y = [ y - yOffset, y + yOffset, y + yOffset, y - yOffset ];
      } else if (Util.isArray(x)) {
        // x 是数组
        temp = x;
        x = [ temp[0], temp[0], temp[1], temp[1] ];
        y = [ y - yOffset / 2, y + yOffset / 2, y + yOffset / 2, y - yOffset / 2 ];
      } else if (Util.isArray(y)) {
        // y 是数组
        temp = y;
        y = [ temp[0], temp[1], temp[1], temp[0] ];
        // @ts-ignore
        x = [ x - xOffset / 2, x - xOffset / 2, x + xOffset / 2, x + xOffset / 2 ];
      }
      cfg.x = x;
      cfg.y = y;
    }
    return cfg;
  }
}
