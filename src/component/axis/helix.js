/**
 * @fileOverview the helix axis of helix coordinate
 * @author sima.zhang
 */
const Util = require('../../util');
const Base = require('./base');
const { MatrixUtil, PathUtil } = require('@antv/g');
const vec2 = MatrixUtil.vec2;

class Helix extends Base {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();

    return Util.mix({}, cfg, {
      type: 'helix',
      line: { // @type {Attrs} 坐标轴线的图形属性,如果设置成null，则不显示轴线
        lineWidth: 1,
        stroke: '#C0D0E0'
      },
      tickLine: { // @type {Attrs} 标注坐标线的图形属性
        lineWidth: 1,
        stroke: '#C0D0E0',
        length: 5
      },
      startAngle: 1.25 * Math.PI,
      endAngle: 7.25 * Math.PI,
      // 螺旋系数
      a: 0,
      // 画布中心坐标
      center: null,
      // 坐标轴绘制起点
      axisStart: null,
      // 坐标轴的n个坐标点
      crp: []
    });
  }

  getLinePath() {
    const self = this;
    const crp = self.get('crp');
    const axisStart = self.get('axisStart');
    const path = PathUtil.catmullRomToBezier(crp);
    path.unshift([ 'M', axisStart.x, axisStart.y ]);
    return path;
  }

  getTickPoint(value) {
    const self = this;
    const startAngle = self.get('startAngle');
    const endAngle = self.get('endAngle');
    const angle = startAngle + (endAngle - startAngle) * value;
    return self._getHelixPoint(angle);
  }

  _getHelixPoint(angle) {
    const self = this;
    const center = self.get('center');
    const a = self.get('a'); // 螺线系数
    const radius = a * angle + self.get('inner'); // 螺线方程
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    };
  }

  getSideVector(offset, point) {
    const self = this;
    const center = self.get('center');
    const vector = [ point.x - center.x, point.y - center.y ];
    if (offset) {
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
}

module.exports = Helix;
