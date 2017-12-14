/**
 * @fileOverview the arc guide
 * @author sima.zhang
 */
const Util = require('../../util');
const Base = require('./base');

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
    const startAngle = Math.atan2(start.y - coordCenter.y, start.x - coordCenter.x);
    const endAngle = Math.atan2(end.y - coordCenter.y, end.x - coordCenter.x);

    const arcShape = group.addShape('arc', {
      zIndex: self.zIndex,
      attrs: Util.mix({
        x: coordCenter.x,
        y: coordCenter.y,
        r: radius,
        startAngle,
        endAngle
      }, self.style)
    });
    arcShape.name = 'guide-arc';
    self.appendInfo && arcShape.setSilent('appendInfo', self.appendInfo);
    self.el = arcShape;
  }
}

module.exports = Arc;
