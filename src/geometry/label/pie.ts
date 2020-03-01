import { get, isArray, isObject } from '@antv/util';
import { getPointAngle } from '../../util/coordinate';
import Geometry from '../base';
import { LabelItem } from './interface';
import PolarLabel from './polar';

/** label text和line距离 4px */
const MARGIN = 4;

function getEndPoint(center, angle, r) {
  return {
    x: center.x + r * Math.cos(angle),
    y: center.y + r * Math.sin(angle),
  };
}

/**
 * 饼图 label
 */
export default class PieLabel extends PolarLabel {
  constructor(geometry: Geometry) {
    super(geometry);
    this.defaultLabelCfg = get(geometry.theme, 'pieLabels', {});
  }
  protected getDefaultOffset(offset) {
    return offset || 0;
  }

  // 连接线
  protected lineToLabel(label: LabelItem) {
    const coordinate = this.coordinate;
    // @ts-ignore
    const r = coordinate.getRadius();
    const distance = label.offset;
    const angle = label.angle;
    const center = coordinate.getCenter();
    // 贴近圆周
    const start = getEndPoint(center, angle, r);
    const inner = getEndPoint(center, angle, r + distance / 2);
    const end = {
      x: label.x - Math.cos(angle) * MARGIN,
      y: label.y - Math.sin(angle) * MARGIN,
    };
    if (!isObject(label.labelLine)) {
      // labelLine: true
      label.labelLine = {};
    }
    label.labelLine.path = [`M ${start.x}`, `${start.y} Q${inner.x}`, `${inner.y} ${end.x}`, end.y].join(',');
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
    const coordinate = this.coordinate;
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
    const coordinate = this.coordinate;
    const startPoint = {
      x: isArray(point.x) ? point.x[0] : point.x,
      y: point.y[0],
    };
    const endPoint = {
      x: isArray(point.x) ? point.x[1] : point.x,
      y: point.y[1],
    };
    let angle;
    const startAngle = getPointAngle(coordinate, startPoint);
    if (point.points && point.points[0].y === point.points[1].y) {
      angle = startAngle;
    } else {
      let endAngle = getPointAngle(coordinate, endPoint);
      if (startAngle >= endAngle) {
        // 100% pie slice
        endAngle = endAngle + Math.PI * 2;
      }
      angle = startAngle + (endAngle - startAngle) / 2;
    }
    return angle;
  }

  public getCirclePoint(angle, offset, p?) {
    const coordinate = this.coordinate;
    const center = coordinate.getCenter();
    // @ts-ignore
    const r = coordinate.getRadius() + offset;
    return {
      ...getEndPoint(center, angle, r),
      angle,
      r,
    };
  }
}
