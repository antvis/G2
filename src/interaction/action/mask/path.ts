import { each } from '@antv/util';
import MaskBase from './base';

/**
 * 生成 mask 的路径
 * @param points
 * @returns
 */
export function getMaskPath(points) {
  const path = [];
  if (points.length) {
    each(points, (point, index) => {
      if (index === 0) {
        path.push(['M', point.x, point.y]);
      } else {
        path.push(['L', point.x, point.y]);
      }
    });
    path.push(['L', points[0].x, points[0].y]);
  }
  return path;
}

export function getMaskAttrs(points) {
  return {
    path: getMaskPath(points),
  };
}

/**
 * @ignore
 * 多个点构成的 Path 辅助框 Action
 */
class PathMask extends MaskBase {
  protected getMaskPath() {
    return getMaskPath(this.points);
  }
  protected getMaskAttrs() {
    return getMaskAttrs(this.points);
  }

  /**
   * 添加一个点
   */
  public addPoint() {
    this.resize();
  }
}

export default PathMask;
