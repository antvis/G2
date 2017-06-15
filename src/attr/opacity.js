/**
 * @fileOverview the opacity attribute of core
 * @author huangtonger@aliyun.com
 */

const Base = require('./base');

/**
 * 视觉通道 Opacity
 * @class Attr.Opacity
 */
class Opacity extends Base {
  constructor(cfg) {
    super(cfg);
    this.names = [ 'opacity' ];
    this.type = 'opacity';
    this.gradient = null;
  }
}

module.exports = Opacity;
