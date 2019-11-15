const Labels = require('./geom-labels');
const PathUtil = require('../util/path');
const Util = require('../../util');

const PolarLabels = function(cfg) {
  PolarLabels.superclass.constructor.call(this, cfg);
};

Util.extend(PolarLabels, Labels);
Util.augment(PolarLabels, {
  getPointRauis(coord, point) {
    return PathUtil.getPointRadius(coord, point);
  },

  getCirclePoint(angle, offset, point) {
    const self = this;
    const coord = self.get('coord');
    const center = coord.getCenter();
    const labelEmit = self._isEmitLabels();
    let r = self.getPointRauis(coord, point);
    if (r === 0) {
      return null;
    }

    if (coord.isTransposed && r > offset && !labelEmit) {
      const appendAngle = Math.asin(offset / (2 * r));
      angle = angle + appendAngle * 2;
    } else {
      r = r + offset;
    }

    return {
      x: center.x + r * Math.cos(angle),
      y: center.y + r * Math.sin(angle),
      angle,
      r
    };
  },

  getArcPoint(point, index) {
    const self = this;

    let outerPoint; // 圆弧上的中点
    // var coord = self.get('coord');
    index = index || 0;
    if (Util.isArray(point.x) || Util.isArray(point.y)) {
      outerPoint = {
        x: Util.isArray(point.x) ? point.x[index] : point.x,
        y: Util.isArray(point.y) ? point.y[index] : point.y
      };
    } else {
      outerPoint = point;
    }
    self.transLabelPoint(outerPoint);
    return outerPoint;
  },

  // 获取点所在的角度
  getPointAngle(point) {
    const self = this;
    const coord = self.get('coord');
    return PathUtil.getPointAngle(coord, point);
  },

  // 获取中心的位置
  getMiddlePoint(points) {
    const self = this;
    const coord = self.get('coord');
    const count = points.length;
    let middlePoint = {
      x: 0,
      y: 0
    };
    Util.each(points, point => {
      middlePoint.x += point.x;
      middlePoint.y += point.y;
    });
    middlePoint.x /= count;
    middlePoint.y /= count;

    middlePoint = coord.convert(middlePoint);
    return middlePoint;
  },

  // 是否居中
  _isToMiddle(point) {
    return point.x.length > 2;
  },

  /**
   * @protected
   * 获取文本的位置信息
   * @param {Array} label labels
   * @param {Object} point point
   * @param {Number} index index
   * @return {Object} point
   */
  getLabelPoint(label, point, index) {
    // if (Util.isNil(point.x)) return;
    const self = this;
    const text = label.text[index];
    let factor = 1;
    let arcPoint;
    if (self._isToMiddle(point)) {
      arcPoint = self.getMiddlePoint(point.points);
    } else {
      if (label.text.length === 1 && index === 0) {
        index = 1;
      } else if (index === 0) {
        factor = -1;
      }
      arcPoint = self.getArcPoint(point, index);
    }

    let offset = self.getDefaultOffset(label);
    offset = offset * factor;
    const middleAngle = self.getPointAngle(arcPoint);
    let labelPoint = self.getCirclePoint(middleAngle, offset, arcPoint);
    if (!labelPoint) {
      labelPoint = { text: '' };
    } else {
      labelPoint.text = text;
      labelPoint.angle = middleAngle;
      labelPoint.color = point.color;
    }
    if (label.autoRotate || typeof label.autoRotate === 'undefined') {
      let rotate = labelPoint.textStyle ? labelPoint.textStyle.rotate : null;
      if (!rotate) {
        rotate = labelPoint.rotate || self.getLabelRotate(middleAngle, offset, point);
      }
      labelPoint.rotate = rotate;
    }
    labelPoint.start = {
      x: arcPoint.x,
      y: arcPoint.y
    };
    return labelPoint;
  },

  _isEmitLabels() {
    const labels = this.get('label');
    return labels.labelEmit;
  },

  /**
   * @protected
   * 获取文本旋转的方向
   * @param {Number} angle angle
   * @return {Number} angle
   */
  getLabelRotate(angle) {
    const self = this;
    let rotate;
    rotate = angle * 180 / Math.PI;
    rotate += 90;

    if (self._isEmitLabels()) {
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
  },

  // override
  getLabelAlign(point) {
    const self = this;
    const coord = self.get('coord');
    let align;
    if (self._isEmitLabels()) {
      if (point.angle <= Math.PI / 2 && point.angle > -Math.PI / 2) {
        align = 'left';
      } else {
        align = 'right';
      }
    } else if (!coord.isTransposed) {
      align = 'center';
    } else {
      const center = coord.getCenter();
      const offset = self.getDefaultOffset(point);
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
});

module.exports = PolarLabels;
