import { each } from '@antv/util';
import MaskBase from './base';

/**
 * 多个点构成的 Path 辅助框 Action
 */
class PathMask extends MaskBase {
  // 生成 mask 的路径
  protected getMaskPath() {
    const points = this.points;
    const path = [];
    each(points, (point, index) => {
      if (index === 0) {
        path.push(['M', point.x, point.y]);
      } else {
        path.push(['L', point.x, point.y]);
      }
    });
    path.push(['Z']);
    return path;
  }

  /**
   * 添加一个点
   */
  public addPoint() {
    this.resize();
  }
}

export default PathMask;
