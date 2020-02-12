import RectMask from './rect';
import { last, head } from '@antv/util';
function camp(value) {
  if (value < 0) {
    value = 0;
  }
  if (value > 1) {
    value = 1;
  }
  return value;
}
function campPoint(point) {
  point.x = camp(point.x);
  point.y = camp(point.y);
}
class DimRect extends RectMask {
  protected dim = 'x';
  protected inPlot = true;
  protected getRange() {
    let start = null;
    let end = null;
    const points = this.points;
    const dim = this.dim;
    const coord = this.context.view.getCoordinate();
    const normalStart = coord.invert(head(points));
    const normalEnd = coord.invert(last(points));
    if (this.inPlot) { // 约束到 0 - 1 范围内
      campPoint(normalStart);
      campPoint(normalEnd);
    }
    if (dim === 'x') { // x 轴方向扩展, y 轴方向占满全部
      start = coord.convert({
        x: normalStart.x,
        y: 0
      });
      end = coord.convert({
        x: normalEnd.x,
        y: 1
      });
    } else { // y 轴方向扩展, x 轴方向占满全部
      start = coord.convert({
        x: 0,
        y: normalStart.y
      });
      end = coord.convert({
        x: 1,
        y: normalEnd.y
      });
    }
    return {
      start,
      end
    };
  }
}

export default DimRect;