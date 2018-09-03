/**
 * @fileOverview the arc guide
 * @author sima.zhang
 */
const Util = require('../../util');
const Base = require('./base');

const PI = Math.PI;
const atan = Math.atan;

function calculateAngle(point, center) {
  const x = point.x - center.x;
  const y = point.y - center.y;
  let deg;
  if (y === 0) {
    if (x < 0) {
      deg = PI / 2;
    } else {
      deg = (270 * PI) / 180;
    }
  } else if (x >= 0 && y > 0) {
    deg = PI * 2 - atan(x / y);
  } else if (x <= 0 && y < 0) {
    deg = PI - atan(x / y);
  } else if (x > 0 && y < 0) {
    deg = PI + atan(-x / y);
  } else if (x < 0 && y > 0) {
    deg = atan(x / -y);
  }
  return deg;
}

class Arc extends Base {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * 辅助元素类型
       * @type {String}
       */
      type: 'arc',
      /**
       * 辅助弧线的起始点
       * @type {Object | Function | Array}
       */
      start: null,
      /**
       * 辅助弧线的终止点
       * @type {Object | Function | Array}
       */
      end: null,
      /**
       * 辅助文本的样式配置
       * @type {Object}
       */
      style: {
        stroke: '#999',
        lineWidth: 1
      }
    });
  }

  render(coord, group) {
    const self = this;
    const start = self.parsePoint(coord, self.start);
    const end = self.parsePoint(coord, self.end);
    const coordCenter = coord.getCenter();
    const radius = Math.sqrt((start.x - coordCenter.x) * (start.x - coordCenter.x)
      + (start.y - coordCenter.y) * (start.y - coordCenter.y));
    let path;
    // 处理整圆的情况
    const startAngle = calculateAngle(start, coordCenter);
    let endAngle = calculateAngle(end, coordCenter);
    if (endAngle < startAngle) {
      endAngle += (PI * 2);
    }

    if (Util.isNumberEqual(start.x, end.x) && Util.isNumberEqual(start.y, end.y) &&
    (self.start[0] !== self.end[0] || self.start[1] !== self.end[1])) {
      path = [
        [ 'M', start.x, start.y ],
        [ 'A', radius, radius, 0, 1, 1, 2 * coordCenter.x - start.x, 2 * coordCenter.y - start.y ],
        [ 'A', radius, radius, 0, 1, 1, start.x, start.y ]
      ];
    } else {
      const dAngle = (endAngle - startAngle) % (PI * 2);
      const largeArc = dAngle > PI ? 1 : 0;
      path = [
        [ 'M', start.x, start.y ],
        [ 'A', radius, radius, 0, largeArc, 1, end.x, end.y ]
      ];
    }
    const arcShape = group.addShape('path', {
      zIndex: self.zIndex,
      attrs: Util.mix({ path }, self.style)
    });
    arcShape.name = 'guide-arc';
    self.appendInfo && arcShape.setSilent('appendInfo', self.appendInfo);
    self.el = arcShape;
  }
}

module.exports = Arc;
