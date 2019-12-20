import { getSpline } from '../util';
import PathMask from './path';
class SmoothPathMask extends PathMask {
  // 生成 mask 的路径
  protected getMaskPath() {
    const points = this.points;
    return getSpline(points, true);
  }
}

export default SmoothPathMask;
