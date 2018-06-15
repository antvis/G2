/**
 * @fileOverview the arc guide
 * @author sima.zhang
 */
const Util = require('../../util');
const Base = require('./base');

function calculateAngle(point, center) {
  const x = point.x - center.x;
  const y = point.y - center.y;
  let deg;
  if (y === 0) {
    if (x < 0) {
      deg = Math.PI / 2;
    } else {
      deg = (270 * Math.PI) / 180;
    }
  } else if (x >= 0 && y > 0) {
    deg = Math.PI * 2 - Math.atan(x / y);
  } else if (x <= 0 && y < 0) {
    deg = Math.PI - Math.atan(x / y);
  } else if (x > 0 && y < 0) {
    deg = Math.PI + Math.atan(-x / y);
  } else if (x < 0 && y > 0) {
    deg = Math.atan(x / -y);
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
    const startAngle = calculateAngle(start, coordCenter);
    const endAngle = calculateAngle(end, coordCenter);
    const dAngle = (endAngle - startAngle) % (Math.PI * 2);
    const largeArc = dAngle > Math.PI ? 1 : 0;
    const clockwise = endAngle - startAngle >= 0 ? 1 : 0;
    const arcShape = group.addShape('path', {
      zIndex: self.zIndex,
      attrs: Util.mix({
        path: [
          [ 'M', start.x, start.y ],
          [ 'A', radius, radius, startAngle, largeArc, clockwise, end.x, end.y ]
        ]
      }, self.style)
    });
    arcShape.name = 'guide-arc';
    self.appendInfo && arcShape.setSilent('appendInfo', self.appendInfo);
    self.el = arcShape;
  }
}

module.exports = Arc;
