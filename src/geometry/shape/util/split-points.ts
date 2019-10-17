import * as _ from '@antv/util';
import { Point, ShapePoint } from '../../../interface';

export function splitPoints(obj: ShapePoint): Point[] {
  // y 有可能是数组，对应原始数据中 y 为一个区间数据，如 [19, 30]，为了统一也将 x 转换为数组
  let { x, y } = obj;
  x = _.isArray(x) ? x : [x];
  y = _.isArray(y) ? y : [y];

  return y.map((eachY, index) => {
    return {
      x: x[index],
      y: eachY,
    };
  });
}
