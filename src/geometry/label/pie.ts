import { get, isArray } from '@antv/util';
import { getAngleByPoint } from '../../util/coordinate';
import { polarToCartesian } from '../../util/graphics';
import Geometry from '../base';
import { LabelItem } from './interface';
import PolarLabel from './polar';

/**
 * 饼图 label
 */
export default class PieLabel extends PolarLabel {
  public defaultLayout = 'distribute';

  constructor(geometry: Geometry) {
    super(geometry);
  }

  protected getDefaultLabelCfg() {
    return get(this.geometry.theme, 'pieLabels', {});
  }

  protected getDefaultOffset(offset) {
    return offset || 0;
  }

  protected getLabelRotate(angle: number, offset: number, isLabelLimit: boolean) {
    let rotate;
    if (offset < 0) {
      rotate = angle;
      if (rotate > Math.PI / 2) {
        rotate = rotate - Math.PI;
      }
      if (rotate < -Math.PI / 2) {
        rotate = rotate + Math.PI;
      }
    }
    return rotate;
  }

  protected getLabelAlign(point: LabelItem) {
    const coordinate = this.getCoordinate();
    const center = coordinate.getCenter();

    let align;
    if (point.angle <= Math.PI / 2 && point.x >= center.x) {
      align = 'left';
    } else {
      align = 'right';
    }
    const offset = this.getDefaultOffset(point.offset);
    if (offset <= 0) {
      if (align === 'right') {
        align = 'left';
      } else {
        align = 'right';
      }
    }
    return align;
  }

  protected getArcPoint(point) {
    return point;
  }

  protected getPointAngle(point) {
    const coordinate = this.getCoordinate();
    const startPoint = {
      x: isArray(point.x) ? point.x[0] : point.x,
      y: point.y[0],
    };
    const endPoint = {
      x: isArray(point.x) ? point.x[1] : point.x,
      y: point.y[1],
    };
    let angle;
    const startAngle = getAngleByPoint(coordinate, startPoint);
    if (point.points && point.points[0].y === point.points[1].y) {
      angle = startAngle;
    } else {
      let endAngle = getAngleByPoint(coordinate, endPoint);
      if (startAngle >= endAngle) {
        // 100% pie slice
        endAngle = endAngle + Math.PI * 2;
      }
      angle = startAngle + (endAngle - startAngle) / 2;
    }
    return angle;
  }

  protected getCirclePoint(angle, offset, p?) {
    const coordinate = this.getCoordinate();
    const center = coordinate.getCenter();
    const r = coordinate.getRadius() + offset;
    return {
      ...polarToCartesian(center.x, center.y, r, angle),
      angle,
      r,
    };
  }
}
