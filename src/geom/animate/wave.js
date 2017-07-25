const Animate = require('./animate');

class Wave extends Animate {
  getEndAttrs() {
    const rect = this.rect;
    return {
      width: rect.width,
      height: rect.height
    };
  }

  getTarget() {
    const group = this.group;
    const parent = group.getParent();
    const clip = parent.addShape('Rect');
    group.attr('clip', clip);
    return clip;
  }
}

module.exports = Wave;
