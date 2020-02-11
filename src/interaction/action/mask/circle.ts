import { distance } from '../util';
import MaskBase from './base';
import { last } from '@antv/util';

/**
 * 圆形辅助框 Action
 */
class CircleMask extends MaskBase {
  // 生成 mask 的路径
  protected getMaskPath() {
    const path = [];
    const points = this.points;
    const currentPoint = last(this.points);
    if (points.length) {
      const first = points[0];
      const r = distance(first, currentPoint) / 2;
      path.push(['M', first.x, first.y]);
      path.push(['A', r, r, 0, 0, 0, currentPoint.x, currentPoint.y]);
      path.push(['A', r, r, 0, 0, 0, first.x, first.y]);
      path.push(['Z']);
    }
    return path;
  }
}

export default CircleMask;
