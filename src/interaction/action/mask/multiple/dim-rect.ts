import MultipleRectMask from './rect';
import DimRect from '../dim-rect';

/**
 * @ignore
 */
class DimRectMultiMask extends MultipleRectMask {
  protected dim = 'x';
  protected inPlot = true;
  protected getRegion = DimRect.prototype.getRegion;
}

export default DimRectMultiMask;
