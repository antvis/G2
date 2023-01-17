import MultipleMaskBase from './base';
import { getMaskAttrs } from '../circle';

/**
 * @ignore
 * 圆形辅助框 Action
 */
class CircleMultiMask extends MultipleMaskBase {
  protected shapeType = 'circle';
  protected getMaskAttrs = getMaskAttrs;
}

export default CircleMultiMask;
