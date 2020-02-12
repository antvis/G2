import MaskBase from './base';
import { last, head } from '@antv/util';

/**
 * 矩形的辅助框 Action
 */
class RectMask extends MaskBase {

  protected getRange() {
    const points = this.points;
    return {
      start: head(points),
      end: last(points)
    };
  }

  // 生成 mask 的路径
  protected getMaskPath() {
    const path = [];
    const range = this.getRange();
    const {start, end} = range;
    if (start) {
      path.push(['M', start.x, start.y]);
      path.push(['L', end.x, start.y]);
      path.push(['L', end.x, end.y]);
      path.push(['L', start.x, end.y]);
      path.push(['Z']);
    }
    return path;
  }
}

export default RectMask;
