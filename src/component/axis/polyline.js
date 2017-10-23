/**
 * @fileOverview the axis of map coodinate
 * @author sima.zhang
 */
const Util = require('../../util');
const Base = require('./base');
const { MatrixUtil, PathUtil } = require('@antv/g');
const vec2 = MatrixUtil.vec2;

class Polyline extends Base {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();

    return Util.mix({}, cfg, {
      type: 'polyline'
    });
  }

  getLinePath() {
    const self = this;
    const tickPoints = self.get('tickPoints');
    const start = self.get('start');
    const end = self.get('end');
    const points = [];
    points.push(start.x);
    points.push(start.y);
    Util.each(tickPoints, function(tick) {
      points.push(tick.x);
      points.push(tick.y);
    });
    points.push(end.x);
    points.push(end.y);

    const path = PathUtil.catmullRomToBezier(points);
    path.unshift([ 'M', start.x, start.y ]);
    return path;
  }

  getTickPoint(value, index) {
    const tickPoints = this.get('tickPoints');
    return tickPoints[index];
  }

  getTickEnd(start, value, index) {
    const self = this;
    const lineAttrs = self.get('tickLine');
    const tickLength = value ? value : lineAttrs.length;
    const offsetVector = self.getSideVector(tickLength, start, index);
    return {
      x: start.x + offsetVector[0],
      y: start.y + offsetVector[1]
    };
  }

  getSideVector(offset, point, index) {
    const self = this;
    let preTickPoint;
    if (index === 0) {
      preTickPoint = self.get('start');
    } else {
      const tickPoints = self.get('tickPoints');
      preTickPoint = tickPoints[index - 1];
    }

    const vector = [ point.x - preTickPoint.x, point.y - preTickPoint.y ];
    const normal = vec2.normalize([], vector);
    const verticalVector = vec2.vertical([], normal, false);
    return vec2.scale([], verticalVector, offset);
  }
}

module.exports = Polyline;
