import { clamp, head, last } from '@antv/util';
import { Region } from '../../../interface';
import RectMask from './rect';

function clampPoint(point) {
  point.x = clamp(point.x, 0, 1);
  point.y = clamp(point.y, 0, 1);
}

/**
 * @ignore
 */
class DimRect extends RectMask {
  protected dim = 'x';
  protected inPlot = true;
  protected getRegion(): Region {
    let start = null;
    let end = null;
    const points = this.points;
    const dim = this.dim;
    const coord = this.context.view.getCoordinate();
    const normalStart = coord.invert(head(points));
    const normalEnd = coord.invert(last(points));
    if (this.inPlot) {
      // 约束到 0 - 1 范围内
      clampPoint(normalStart);
      clampPoint(normalEnd);
    }
    if (dim === 'x') {
      // x 轴方向扩展, y 轴方向占满全部
      start = coord.convert({
        x: normalStart.x,
        y: 0,
      });
      end = coord.convert({
        x: normalEnd.x,
        y: 1,
      });
    } else {
      // y 轴方向扩展, x 轴方向占满全部
      start = coord.convert({
        x: 0,
        y: normalStart.y,
      });
      end = coord.convert({
        x: 1,
        y: normalEnd.y,
      });
    }
    return {
      start,
      end,
    };
  }
}

export default DimRect;
