/**
 * @fileOverview the class of Helix Coordinate
 * @author sima.zhang
 */
const Util = require('../util');
const Base = require('./base');
const MatrixUtil = require('@antv/g').MatrixUtil;
const vec2 = MatrixUtil.vec2;

class Helix extends Base {

  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      startAngle: 1.25 * Math.PI,
      endAngle: 7.25 * Math.PI,
      innerRadius: 0,
      type: 'helix',
      isHelix: true
    });
  }

  constructor(cfg) {
    super(cfg);
    this._init();
  }

  _init() {
    const width = this.width;
    const height = this.height;
    const radius = this.radius;
    const innerRadius = this.innerRadius;
    const startAngle = this.startAngle;
    const endAngle = this.endAngle;

    const index = (endAngle - startAngle) / (2 * Math.PI) + 1; // 螺线圈数
    let maxRadius = Math.min(width, height) / 2;
    if (radius && radius >= 0 && radius <= 1) {
      maxRadius = maxRadius * radius;
    }

    const d = Math.floor(maxRadius * (1 - innerRadius) / index);
    const a = d / (Math.PI * 2);// 螺线系数

    const x = {
      start: startAngle,
      end: endAngle
    };
    const y = {
      start: innerRadius * maxRadius,
      end: innerRadius * maxRadius + d * 0.99
    };

    this.a = a;
    this.d = d;
    this.x = x;
    this.y = y;
  }

  getCenter() {
    return this.center;
  }

  /**
   * 将百分比数据变成屏幕坐标
   * @param  {Object} point 归一化的点坐标
   * @return {Object}       返回对应的屏幕坐标
   */
  convertPoint(point) {
    const a = this.a;
    const center = this.center;
    let x;
    let y;

    if (this.isTransposed) {
      x = point.y;
      y = point.x;
    } else {
      x = point.x;
      y = point.y;
    }

    const thi = this.convertDim(x, 'x');
    const r = a * thi;
    const newY = this.convertDim(y, 'y');

    return {
      x: center.x + Math.cos(thi) * (r + newY),
      y: center.y + Math.sin(thi) * (r + newY)
    };
  }

  /**
   * 将屏幕坐标点还原成百分比数据
   * @param  {Object} point 屏幕坐标
   * @return {Object}       返回对应的归一化后的数据
   */
  invertPoint(point) {
    const center = this.center;
    const a = this.a;
    const d = this.d + this.y.start;
    const v = vec2.subtract([], [ point.x, point.y ], [ center.x, center.y ]);
    let thi = vec2.angleTo(v, [ 1, 0 ], true);
    let rMin = thi * a; // 坐标与原点的连线在第一圈上的交点，最小r值

    if (vec2.length(v) < rMin) {  // 坐标与原点的连线不可能小于最小r值，但不排除因小数计算产生的略小于rMin的情况
      rMin = vec2.length(v);
    }

    const index = Math.floor((vec2.length(v) - rMin) / d); // 当前点位于第index圈
    thi = 2 * index * Math.PI + thi;
    const r = a * thi;
    let newY = vec2.length(v) - r;
    newY = Util.snapEqual(newY, 0) ? 0 : newY;

    let x = this.invertDim(thi, 'x');
    let y = this.invertDim(newY, 'y');
    x = Util.snapEqual(x, 0) ? 0 : x;
    y = Util.snapEqual(y, 0) ? 0 : y;

    const rst = {};
    rst.x = this.isTransposed ? y : x;
    rst.y = this.isTransposed ? x : y;
    return rst;
  }
}

module.exports = Helix;
