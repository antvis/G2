import * as Util from '@antv/util';
import Axis from './base';
import { HelixAxisCfg } from '../interface';

const { vec2 } = Util;

export default class Helix extends Axis {
  constructor(cfg = {} as HelixAxisCfg) {
    super({
      type: 'helix',
      startAngle: 1.25 * Math.PI,
      endAngle: 7.25 * Math.PI,
      inner: 0,
      a: 0, // 螺旋洗漱
      center: null, // 坐标系中心点坐标
      axisStart: null, // 坐标轴绘制起点
      crp: [], // 坐标轴的n个坐标点
      ...cfg,
    });
  }

  getLinePath() {
    const crp = this.get('crp');
    const axisStart = this.get('axisStart');
    const path = Util.catmullRom2Bezier(crp);
    path.unshift([ 'M', axisStart.x, axisStart.y ]);
    return path;
  }

  getTickPoint(value) {
    const startAngle = this.get('startAngle');
    const endAngle = this.get('endAngle');
    const angle = startAngle + (endAngle - startAngle) * value;
    return this._getHelixPoint(angle);
  }

  getSideVector(offset, point) {
    const center = this.get('center');
    const vector = [ point.x - center.x, point.y - center.y ];
    if (!Util.isNil(offset)) {
      const vecLen = vec2.length(vector);
      vec2.scale(vector, vector, offset / vecLen);
    }
    return vector;
  }

  getSidePoint(point, offset) {
    const vector = this.getSideVector(offset, point);

    return {
      x: point.x + vector[0],
      y: point.y + vector[1],
    };
  }

  getTickEnd(start, length) {
    const tickLine = this.get('tickLine');
    const len = length ? length : tickLine.length;
    return this.getSidePoint(start, len);
  }

  private _getHelixPoint(angle) {
    const center = this.get('center');
    const a = this.get('a'); // 螺线系数
    const radius = a * angle + this.get('inner'); // 螺线方程
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
    };
  }
}
