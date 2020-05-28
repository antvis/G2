import { last } from '@antv/util';
import { distance } from '../util';
import MaskBase from './base';

/**
 * @ignore
 * 圆形辅助框 Action
 */
class CircleMask extends MaskBase {
  protected shapeType = 'circle';
  protected getMaskAttrs() {
    const points = this.points;
    const currentPoint = last(this.points);
    let r = 0;
    let x = 0;
    let y = 0;
    if (points.length) {
      const first = points[0];
      r = distance(first, currentPoint) / 2;
      x = (currentPoint.x + first.x) / 2;
      y = (currentPoint.y + first.y) / 2;
    }
    return {
      x,
      y,
      r,
    };
  }
}

export default CircleMask;
