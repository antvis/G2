/**
 * @fileOverview the class of Cartesian Coordinate
 * @author sima.zhang
 */
const Util = require('../util');
const Base = require('./base');

class Cartesian extends Base {

  /**
   * @override
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 0,
        y: 0
      },
      type: 'cartesian',
      isRect: true
    });
  }

  constructor(cfg) {
    super(cfg);
    this._init();
  }

  _init() {
    const { start, end } = this;
    const x = {
      start: start.x,
      end: end.x
    };
    const y = {
      start: start.y,
      end: end.y
    };
    this.x = x;
    this.y = y;
  }

  convertPoint(point) {
    let x;
    let y;
    if (this.isTransposed) {
      x = point.y;
      y = point.x;
    } else {
      x = point.x;
      y = point.y;
    }

    return {
      x: this.convertDim(x, 'x'),
      y: this.convertDim(y, 'y')
    };
  }

  invertPoint(point) {
    const x = this.invertDim(point.x, 'x');
    const y = this.invertDim(point.y, 'y');

    if (this.isTransposed) {
      return {
        x: y,
        y: x
      };
    }

    return {
      x,
      y
    };
  }
}

module.exports = Cartesian;
