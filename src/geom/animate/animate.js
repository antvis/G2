const Util = require('../../util');
const { MatrixUtil } = require('@ali/g');
const { mat3 } = MatrixUtil;

class Animate {
  constructor(cfg) {
    this.easing = 'easeQuadInOut'; // 动画平滑函数
    this.duration = 1000; // 动画执行时间
    this.callback = null; // 回调函数
    this.group = null; // 执行动画的分组
    this.rect = null; // 执行动画的区域
    this.before = null; // 执行动画前调用函数

    Util.assign(this, cfg);
  }

  start() {
    this.startAnimate();
    return this;
  }

  startAnimate() {
    const target = this.getTarget();
    const group = this.group;
    this.originMatrix = Util.mix({}, group.getMatrix());
    this.rect = this.getAnimRect();
    this.target = target;
    this.beforeAnimate(target);
    this.execAnimate(target);
  }

  beforeAnimate(target) {
    let initMatrix = this.getInitMatrix();
    const initAttrs = this.getInitAttrs();
    const originMatrix = this.originMatrix;
    initMatrix = mat3.multiply([], originMatrix, initMatrix);
    target.setMatrix(initMatrix);
    target.attr(initAttrs);
  }

  execAnimate(target) {
    const self = this;
    const before = self.before;
    const callback = self.callback;
    const duration = self.duration;
    const easing = self.easing;
    const endAttrs = self.getEndAttrs();
    const originMatrix = self.originMatrix;
    let endMatrix = self.getEndMatrix();
    endMatrix = mat3.multiply([], originMatrix, endMatrix); // 乘以原始矩阵 注意：矩阵相乘不可换序！
    const toProps = Util.mix({}, endAttrs, {
      matrix: endMatrix
    });
    target.animate(toProps, duration, easing, function() {
      callback && callback();
      self.afterAnimate(target);
    });
    before && before(); // 防止before函数执行时间过长，阻塞动画执行
  }

  afterAnimate(target) {
    const group = this.group;
    const canvas = group.get('canvas');
    if (!Util.isEqual(group, target)) {
      group.attr('clip', false);
      canvas.draw();
    } else {
      return true;
    }
  }

  getTarget() {
    return this.group;
  }

  getInitMatrix() {
    return [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
  }

  getInitAttrs() {
    return {};
  }

  getEndMatrix() {
    return [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
  }

  getEndAttrs() {
    return {};
  }

  getAnimRect() {
    let rect = this.rect;
    const group = this.group;
    if (!rect) {
      rect = group.getBBox();
    }
    return rect;
  }

  getCircleInfo() {
    const rect = this.rect;
    let circle = this.circle;
    const center = this.getRectCenter(rect);
    const r = Math.min(rect.width, rect.height) / 2;
    if (!circle) {
      circle = {
        center,
        r
      };
    }
    return circle;
  }

  getRectCenter(rect) {
    return {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2
    };
  }

  stop() {
    this.stopAnimate();
    return this;
  }

  stopAnimate() {
    const target = this.getTarget();
    target && target.stopAnimate();
  }
}

module.exports = Animate;
