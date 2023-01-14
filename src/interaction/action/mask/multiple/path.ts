import MultipleMaskBase from './base';
import PathMask from '../path';

/**
 * @ignore
 * 多个点构成的 Path 辅助框 Action
 */
class PathMultiMask extends MultipleMaskBase {
  protected getMaskAttrs = PathMask.prototype.getMaskAttrs;
  protected getMaskPath = PathMask.prototype.getMaskPath;
  public addPoint = PathMask.prototype.addPoint;
}

export default PathMultiMask;
