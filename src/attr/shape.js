/**
 * @fileOverview the shape attribute of core
 * @author huangtonger@aliyun.com
 */


const Base = require('./base');

/**
 * 视觉通道 Shape
 * @class Attr.Shape
 */
class Shape extends Base {
  constructor(cfg) {
    super(cfg);
    this.names = [ 'shape' ];
    this.type = 'shape';
    this.gradient = null;
  }

  /**
   * @override
   */
  getLinearValue(percent) {
    const values = this.values;
    const index = Math.round((values.length - 1) * percent);
    return values[index];
  }
}

module.exports = Shape;
