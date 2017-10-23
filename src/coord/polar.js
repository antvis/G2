/**
 * @fileOverview the class of Polar Coordinate
 * @author sima.zhang
 */
const Util = require('../util');
const Base = require('./base');
const MatrixUtil = require('@antv/g').MatrixUtil;
const mat3 = MatrixUtil.mat3;
const vec2 = MatrixUtil.vec2;
const vec3 = MatrixUtil.vec3;

class Polar extends Base {

  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      startAngle: -Math.PI / 2,
      endAngle: Math.PI * 3 / 2,
      innerRadius: 0,
      type: 'polar',
      isPolar: true
    });
  }

  constructor(cfg) {
    super(cfg);
    this._init();
  }

  _init() {
    let radius = this.radius;
    const innerRadius = this.innerRadius;
    const startAngle = this.startAngle;
    const endAngle = this.endAngle;
    const center = this.center;
    const oneBox = this.getOneBox();

    const oneWidth = oneBox.maxX - oneBox.minX;
    const oneHeight = oneBox.maxY - oneBox.minY;
    const left = Math.abs(oneBox.minX) / oneWidth;
    const top = Math.abs(oneBox.minY) / oneHeight;
    const width = this.width;
    const height = this.height;
    let maxRadius;
    let circleCentre;
    if ((height / oneHeight) > (width / oneWidth)) { // width为主
      maxRadius = width / oneWidth;
      circleCentre = {
        x: center.x - (0.5 - left) * width,
        y: center.y - (0.5 - top) * maxRadius * oneHeight
      };
    } else { // height为主
      maxRadius = height / oneHeight;
      circleCentre = {
        x: center.x - (0.5 - left) * maxRadius * oneWidth,
        y: center.y - (0.5 - top) * height
      };
    }

    if (!radius) {
      radius = maxRadius;
    } else if (radius > 0 && radius <= 1) {
      radius = maxRadius * radius;
    } else if (radius <= 0 || radius > maxRadius) {
      radius = maxRadius;
    }

    const x = {
      start: startAngle,
      end: endAngle
    };

    const y = {
      start: innerRadius * radius,
      end: radius
    };

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.circleCentre = circleCentre;
    this.center = circleCentre;
  }

  getCenter() {
    return this.circleCentre;
  }

  getOneBox() {
    const startAngle = this.startAngle;
    const endAngle = this.endAngle;
    if (endAngle - startAngle >= Math.PI * 2) {
      return {
        minX: -1,
        maxX: 1,
        minY: -1,
        maxY: 1
      };
    }
    const xs = [ 0, Math.cos(startAngle), Math.cos(endAngle) ];
    const ys = [ 0, Math.sin(startAngle), Math.sin(endAngle) ];

    for (let i = -Math.PI * 5 / 2; i < Math.PI * 3 / 2; i += Math.PI / 2) {
      if (startAngle <= i && i <= endAngle) {
        xs.push(Math.cos(i));
        ys.push(Math.sin(i));
      }
    }

    return {
      minX: Math.min.apply(Math, xs),
      maxX: Math.max.apply(Math, xs),
      minY: Math.min.apply(Math, ys),
      maxY: Math.max.apply(Math, ys)
    };
  }

  getRadius() {
    return this.radius;
  }

  convertPoint(point) {
    const center = this.getCenter();
    let x = this.isTransposed ? point.y : point.x;
    let y = this.isTransposed ? point.x : point.y;

    x = this.convertDim(x, 'x');
    y = this.convertDim(y, 'y');

    return {
      x: center.x + Math.cos(x) * y,
      y: center.y + Math.sin(x) * y
    };
  }

  invertPoint(point) {
    const center = this.getCenter();
    const vPoint = [ point.x - center.x, point.y - center.y ];
    const x = this.x;
    const m = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
    mat3.rotate(m, m, x.start);

    let vStart = [ 1, 0, 0 ];
    vec3.transformMat3(vStart, vStart, m);
    vStart = [ vStart[0], vStart[1] ];
    let angle = vec2.angleTo(vStart, vPoint, x.end < x.start);
    if (Util.snapEqual(angle, Math.PI * 2)) {
      angle = 0;
    }
    const radius = vec2.length(vPoint);

    let xPercent = angle / (x.end - x.start);
    xPercent = x.end - x.start > 0 ? xPercent : -xPercent;

    const yPercent = this.invertDim(radius, 'y');
    const rst = {};
    rst.x = this.isTransposed ? yPercent : xPercent;
    rst.y = this.isTransposed ? xPercent : yPercent;
    return rst;
  }
}

module.exports = Polar;
