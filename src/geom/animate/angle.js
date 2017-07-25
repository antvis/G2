const Util = require('../../util');
const Animate = require('./animate');

class Angle extends Animate {
  constructor(cfg) {
    super(cfg);
    this._circle = {
      center: {
        x: 0,
        y: 0
      },
      r: 0,
      startAngle: -1 * Math.PI / 2,
      endAngle: Math.PI * (3 / 2)
    };
  }

  getInitAttrs() {
    const _circle = this._circle;
    const circle = this.getCircleInfo();
    const center = Util.mix(_circle, circle.center);

    const attrs = {
      x: center.x,
      y: center.y,
      rs: 0,
      re: circle.r + 100,
      startAngle: circle.startAngle,
      endAngle: circle.startAngle
    };
    return attrs;
  }

  getEndAttrs() {
    const _circle = this._circle;
    const circle = Util.mix(_circle, this.getCircleInfo());

    return {
      endAngle: circle.endAngle
    };
  }

  getTarget() {
    const group = this.group;
    const parent = group.getParent();
    const clip = parent.addShape('Fan');
    group.attr('clip', clip);
    return clip;
  }
}

module.exports = Angle;
