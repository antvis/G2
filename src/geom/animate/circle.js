const Animate = require('./animate');

class Circle extends Animate {

  getInitAttrs() {
    const circleInfo = this.getCircleInfo();
    const center = circleInfo.center;
    return {
      x: center.x,
      y: center.y,
      r: 0
    };
  }

  getEndAttrs() {
    const circleInfo = this.getCircleInfo();
    return {
      r: circleInfo.r + 150
    };
  }

  getTarget() {
    const group = this.group;
    const parent = group.getParent();
    const clip = parent.addShape('Circle');
    group.attr('clip', clip);
    return clip;
  }
}

module.exports = Circle;
