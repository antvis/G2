import { getSpline } from '../util';
import PathMask from './path';

/**
 * 生成 mask 的路径
 * @param points
 * @returns
 */
export function getMaskPath(points) {
  return getSpline(points, true);
}

export function getMaskAttrs(points) {
  return {
    path: getMaskPath(points),
  };
}

/**
 * Smooth path mask
 * @ignore
 */
class SmoothPathMask extends PathMask {
  protected getMaskPath() {
    return getMaskPath(this.points);
  }
  protected getMaskAttrs() {
    return getMaskAttrs(this.points);
  }
}

export default SmoothPathMask;
