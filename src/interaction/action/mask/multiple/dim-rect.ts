import MultipleRectMask from './rect';
import { getRegion } from '../dim-rect';

/**
 * @ignore
 */
class DimRectMultiMask extends MultipleRectMask {
  protected dim = 'x';
  protected inPlot = true;
  protected getRegion(points) {
    const coord = this.context.view.getCoordinate();
    return getRegion(points, this.dim, this.inPlot, coord);
  }
}

export default DimRectMultiMask;
