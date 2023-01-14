import MultiplePathMask from './path';
import SmoothPathMask from '../smooth-path';

/**
 * Smooth path mask
 * @ignore
 */
class SmoothPathMultiMask extends MultiplePathMask {
  // 生成 mask 的路径属性
  protected getMaskPath = SmoothPathMask.prototype.getMaskPath;
}

export default SmoothPathMultiMask;
