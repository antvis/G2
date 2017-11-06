/**
 * @fileOverview the circle axis of polar coordinate
 * @author sima.zhang
 */
const Util = require('../../util');
const Base = require('./base');
const { vec2 } = require('@antv/g').MatrixUtil;

class Circle extends Base {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();

    return Util.mix({}, cfg, {
      /**
       * 坐标轴的类型
       * @type {String}
       */
      type: 'circle',
      /**
       * 指定刻度之间的间距
       * @type {Number}
       */
      tickInterval: null,
      /**
       * 开始弧度
       * @type {Number}
       */
      startAngle: -Math.PI / 2,
      /**
       * 结束弧度
       * @type {Number}
       */
      endAngle: Math.PI * 3 / 2,
      line: { // @type {Attrs} 坐标轴线的图形属性,如果设置成null，则不显示轴线
        lineWidth: 1,
        stroke: '#C0D0E0'
      },
      tickLine: { // @type {Attrs} 标注坐标线的图形属性
        lineWidth: 1,
        stroke: '#C0D0E0',
        length: 5
      },
      /**
       * 默认文本距离轴线的距离
       * @type {Number}
       */
      _labelOffset: 5
    });
  }

  parseTick(tick, index, length) {
    return {
      text: tick,
      value: index / length
    };
  }

  _getCirclePoint(angle, radius) {
    const self = this;
    const center = self.get('center');
    radius = radius || self.get('radius');
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    };
  }

  getTickPoint(value) {
    const self = this;
    const startAngle = self.get('startAngle');
    const endAngle = self.get('endAngle');
    const angle = startAngle + (endAngle - startAngle) * value;
    return self._getCirclePoint(angle);
  }

  getSideVector(offset, point) {
    const self = this;
    const center = self.get('center');
    const vector = [ point.x - center.x, point.y - center.y ];
    if (!Util.isNil(offset)) {
      const vecLen = vec2.length(vector);
      vec2.scale(vector, vector, offset / vecLen);
    }
    return vector;
  }

  getSidePoint(point, offset) {
    const self = this;
    const vector = self.getSideVector(offset, point);

    return {
      x: point.x + vector[0],
      y: point.y + vector[1]
    };
  }

  getTickEnd(start, length) {
    const self = this;
    const tickLine = self.get('tickLine');
    length = length ? length : tickLine.length;
    return self.getSidePoint(start, length);
  }

  getTextAnchor(vector) {
    let align;
    if (Util.snapEqual(vector[0], 0)) {
      align = 'center';
    } else if (vector[0] > 0) {
      align = 'left';
    } else if (vector[0] < 0) {
      align = 'right';
    }
    return align;
  }

  getLinePath() {
    const self = this;
    const center = self.get('center');
    const x = center.x;
    const y = center.y;
    const rx = self.get('radius');
    const ry = rx;
    const startAngle = self.get('startAngle');
    const endAngle = self.get('endAngle');
    const inner = self.get('inner');

    let path = [];
    if (Math.abs(endAngle - startAngle) === Math.PI * 2) {
      path = [
        [ 'M', x, y ],
        [ 'm', 0, -ry ],
        [ 'a', rx, ry, 0, 1, 1, 0, 2 * ry ],
        [ 'a', rx, ry, 0, 1, 1, 0, -2 * ry ],
        [ 'z' ]
      ];
    } else {
      const startPoint = self._getCirclePoint(startAngle);
      const endPoint = self._getCirclePoint(endAngle);
      const large = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;
      const sweep = startAngle > endAngle ? 0 : 1;
      if (!inner) {
        path = [
          [ 'M', x, y ],
          [ 'L', startPoint.x, startPoint.y ],
          [ 'A', rx, ry, 0, large, sweep, endPoint.x, endPoint.y ],
          [ 'L', x, y ]
        ];
      } else {
        const innerStartVector = self.getSideVector(inner * rx, startPoint);
        const innerEndVector = self.getSideVector(inner * rx, endPoint);
        const innerStartPoint = {
          x: innerStartVector[0] + x,
          y: innerStartVector[1] + y
        };
        const innerEndPoint = {
          x: innerEndVector[0] + x,
          y: innerEndVector[1] + y
        };

        path = [
          [ 'M', innerStartPoint.x, innerStartPoint.y ],
          [ 'L', startPoint.x, startPoint.y ],
          [ 'A', rx, ry, 0, large, sweep, endPoint.x, endPoint.y ],
          [ 'L', innerEndPoint.x, innerEndPoint.y ],
          [ 'A', rx * inner, ry * inner, 0, large, Math.abs(sweep - 1), innerStartPoint.x, innerStartPoint.y ]
        ];
      }
    }
    return path;
  }

  addLabel(tick, point, index) {
    const self = this;
    const offset = self.get('label').offset || self.get('_labelOffset') || 0.001;
    point = self.getSidePoint(point, offset);
    super.addLabel(tick, point, index);
  }

  autoRotateLabels() {
    const self = this;
    const ticks = self.get('ticks');
    const labelsGroup = self.get('labelsGroup');
    if (labelsGroup && ticks.length > 12) { // 小于12个文本时文本不旋转
      const radius = self.get('radius');
      const startAngle = self.get('startAngle');
      const endAngle = self.get('endAngle');
      const totalAngle = (endAngle - startAngle);
      const avgAngle = totalAngle / (ticks.length - 1);
      const avgWidth = Math.sin(avgAngle / 2) * radius * 2;
      const maxLength = self.getMaxLabelWidth(labelsGroup);
      Util.each(labelsGroup.get('children'), function(label, index) {
        const tick = ticks[index];
        let angle = tick.value * totalAngle + startAngle;
        const mode = angle % (Math.PI * 2);
        if (maxLength < avgWidth) { // 文本的最大宽度大于
          if (mode <= 0) {
            angle = angle + Math.PI;
          }
          if (mode > Math.PI) {
            angle = angle - Math.PI;
          }
          angle = angle - Math.PI / 2;
          label.attr('textAlign', 'center');
        } else {
          if (mode > Math.PI / 2) {
            angle = angle - Math.PI;
          } else if (mode < Math.PI / 2 * -1) {
            angle = angle + Math.PI;
          }
        }
        label.rotateAtStart(angle);
      });
    }
  }
}

module.exports = Circle;
