const Wave = require('./wave');

class WaveH extends Wave {
  getInitAttrs() {
    const rect = this.rect;
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: 0
    };
  }
}

module.exports = WaveH;
