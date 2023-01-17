import MultipleMaskBase from './base';
import { getRegion, getMaskAttrs } from '../rect';

/**
 * @ignore
 * 矩形的辅助框 Action
 */
class RectMultiMask extends MultipleMaskBase {
  protected shapeType = 'rect';
  protected getRegion(points) {
    return getRegion(points);
  }
  protected getMaskAttrs(points) {
    const { start, end } = this.getRegion(points);
    return getMaskAttrs(start, end);
  }
}

export default RectMultiMask;
