import { head, last } from '@antv/util';
import { Region } from '../../../interface';
import MaskBase from './base';

/**
 * @ignore
 * 矩形的辅助框 Action
 */
class RectMask extends MaskBase {
  protected shapeType = 'rect';
  protected getRegion(): Region {
    const points = this.points;
    return {
      start: head(points),
      end: last(points),
    };
  }
  // 添加图形
  protected getMaskAttrs() {
    const { start, end } = this.getRegion();
    const x = Math.min(start.x, end.x);
    const y = Math.min(start.y, end.y);
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);
    return {
      x,
      y,
      width,
      height,
    };
  }
}

export default RectMask;
