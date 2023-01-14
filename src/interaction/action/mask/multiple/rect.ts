import MultipleMaskBase from './base';
import RectMask from '../rect';

/**
 * @ignore
 * 矩形的辅助框 Action
 */
class RectMultiMask extends MultipleMaskBase {
  protected shapeType = 'rect';
  protected getRegion = RectMask.prototype.getRegion;
  protected getMaskAttrs = RectMask.prototype.getMaskAttrs;
}

export default RectMultiMask;
