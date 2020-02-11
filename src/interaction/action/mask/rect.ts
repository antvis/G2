import MaskBase from './base';
import { last } from '@antv/util';

/**
 * 矩形的辅助框 Action
 */
class RectMask extends MaskBase {
  // 生成 mask 的路径
  protected getMaskPath() {
    const path = [];
    const points = this.points;
    const currentPoint = last(this.points);
    if (points.length) {
      const first = points[0];
      path.push(['M', first.x, first.y]);
      path.push(['L', currentPoint.x, first.y]);
      path.push(['L', currentPoint.x, currentPoint.y]);
      path.push(['L', first.x, currentPoint.y]);
      path.push(['Z']);
    }
    return path;
  }
}

export default RectMask;
