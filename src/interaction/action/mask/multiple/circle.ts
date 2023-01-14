import MultipleMaskBase from './base';
import CircleMask from '../circle';

/**
 * @ignore
 * 圆形辅助框 Action
 */
class CircleMultiMask extends MultipleMaskBase {
  protected shapeType = 'circle';
  protected getMaskAttrs = CircleMask.prototype.getMaskAttrs;
}

export default CircleMultiMask;
