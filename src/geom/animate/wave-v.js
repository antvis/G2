const Wave = require('./wave');

class WaveV extends Wave {
  getInitAttrs() {
    const rect = this.rect;
    return {
      x: rect.x,
      y: rect.y,
      width: 0,
      height: rect.height
    };
  }
}

module.exports = WaveV;
