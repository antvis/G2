import * as _ from '@antv/util';
import { Point, ShapePoint } from '../../interface';

export function splitPoints(obj: ShapePoint): Point[] {
  const x = _.isArray(obj.x) ? obj.x : [obj.x];
  const y = _.isArray(obj.y) ? obj.y : [obj.y];

  return y.map((eachY, index) => {
    return {
      x: x[index],
      y: eachY,
    };
  });
}
