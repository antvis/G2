import MultiplePathMask from './path';
import { getMaskPath, getMaskAttrs } from '../smooth-path';

/**
 * Smooth path mask
 * @ignore
 */
class SmoothPathMultiMask extends MultiplePathMask {
  protected getMaskPath = getMaskPath;
  protected getMaskAttrs = getMaskAttrs;
}

export default SmoothPathMultiMask;
