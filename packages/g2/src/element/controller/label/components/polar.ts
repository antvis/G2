import * as _ from '@antv/util';
import ElementLabels from './base';
import * as PathUtil from '../../../util/path';
import { DataPointType, PointObject } from '../../../../interface';

export default class PolarElementLabels extends ElementLabels {
  /**
   * @protected
   * 获取文本的位置信息
   * @param {Array} label labels
   * @param {Object} point point
   * @param {Number} index index
   * @return {Object} point
   */
  getLabelPoint(label, point, i) {
    let index = i;
    const text = label.text[index];
    let factor = 1;
    let arcPoint;
    if (this._isToMiddle(point)) {
      arcPoint = this._getMiddlePoint(point.points);
    } else {
      if (label.text.length === 1 && index === 0) {
        index = 1;
      } else if (index === 0) {
        factor = -1;
      }
      arcPoint = this.getArcPoint(point, index);
    }

    let offset = this.getDefaultOffset(label);
    offset = offset * factor;
    const middleAngle = this.getPointAngle(arcPoint);
    const isLabelEmit = label.labelEmit;
    let labelPoint: DataPointType = this.getCirclePoint(middleAngle, offset, arcPoint, isLabelEmit);
    if (!labelPoint) {
      labelPoint = { text: '' };
    } else {
      labelPoint.text = text;
      labelPoint.angle = middleAngle;
      labelPoint.color = point.color;
    }

    if (label.autoRotate || label.autoRotate === undefined) { // 自动旋转文本呢
      labelPoint.rotate = this.getLabelRotate(middleAngle, offset, isLabelEmit);
    } else {
      labelPoint.rotate = label.rotate;
    }

    labelPoint.start = {
      x: arcPoint.x,
      y: arcPoint.y,
    };
    return labelPoint;
  }

  getCirclePoint(originAngle, offset, point, isLabelEmit): DataPointType {
    const coord = this.get('coord');
    const center = coord.getCenter();
    let angle = originAngle;
    let r = PathUtil.getPointRadius(coord, point);
    if (r === 0) {
      return null;
    }

    if (coord.isTransposed && r > offset && !isLabelEmit) {
      const appendAngle = Math.asin(offset / (2 * r));
      angle = angle + appendAngle * 2;
    } else {
      r = r + offset;
    }

    return {
      x: center.x + r * Math.cos(angle),
      y: center.y + r * Math.sin(angle),
      angle,
      r,
    };
  }

  getArcPoint(point: PointObject, i) {
    let index = i;
    let outerPoint; // 圆弧上的中点
    index = index || 0;
    if (_.isArray(point.x) || _.isArray(point.y)) {
      outerPoint = {
        x: _.isArray(point.x) ? point.x[index] : point.x,
        y: _.isArray(point.y) ? point.y[index] : point.y,
      };
    } else {
      outerPoint = point;
    }
    this.transLabelPoint(outerPoint);
    return outerPoint;
  }

  // 获取点所在的角度
  getPointAngle(point) {
    const coord = this.get('coord');
    return PathUtil.getPointAngle(coord, point);
  }

  /**
   * @protected
   * 获取文本旋转的方向
   * @param {Number} angle angle
   * @return {Number} angle
   */
  getLabelRotate(angle, offset, isLabelEmit) {
    let rotate;
    rotate = angle * 180 / Math.PI;
    rotate += 90;

    if (isLabelEmit) {
      rotate -= 90;
    }
    if (rotate) {
      if (rotate > 90) {
        rotate = rotate - 180;
      } else if (rotate < -90) {
        rotate = rotate + 180;
      }
    }
    return rotate / 180 * Math.PI;
  }

  // override
  getLabelAlign(point) {
    const coord = this.get('coord');
    let align;
    if (point.labelEmit) {
      if (point.angle <= Math.PI / 2 && point.angle > -Math.PI / 2) {
        align = 'left';
      } else {
        align = 'right';
      }
    } else if (!coord.isTransposed) {
      align = 'center';
    } else {
      const center = coord.getCenter();
      const offset = this.getDefaultOffset(point);
      if (Math.abs(point.x - center.x) < 1) {
        align = 'center';
      } else if (point.angle > Math.PI || point.angle <= 0) {
        if (offset > 0) {
          align = 'left';
        } else {
          align = 'right';
        }
      } else {
        if (offset > 0) {
          align = 'right';
        } else {
          align = 'left';
        }
      }
    }
    return align;
  }

  // 定义连接线
  lineToLabel(point?) {}

  // 获取中心的位置
  private _getMiddlePoint(points) {
    const coord = this.get('coord');
    const count = points.length;
    let middlePoint = {
      x: 0,
      y: 0,
    };
    _.each(points, (point: PointObject) => {
      middlePoint.x += point.x;
      middlePoint.y += point.y;
    });
    middlePoint.x /= count;
    middlePoint.y /= count;

    middlePoint = coord.convert(middlePoint);
    return middlePoint;
  }

  // 是否居中
  private _isToMiddle(point) {
    return point.x.length > 2;
  }
}
