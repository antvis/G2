import MultipleMaskBase from './base';
import { getMaskAttrs, getMaskPath } from '../path';

/**
 * @ignore
 * 多个点构成的 Path 辅助框 Action
 */
class PathMultiMask extends MultipleMaskBase {
  protected getMaskPath = getMaskPath;
  protected getMaskAttrs = getMaskAttrs;
  public addPoint() {
    this.resize();
  }
}

export default PathMultiMask;
