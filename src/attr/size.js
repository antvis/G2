/**
 * @fileOverview the size attribute of core
 * @author huangtonger@aliyun.com
 */

const Base = require('./base');

/**
 * 视觉通道 size
 * @class Attr.Size
 */
class Size extends Base {
  constructor(cfg) {
    super(cfg);
    this.names = [ 'size' ];
    this.type = 'size';
    this.gradient = null;
  }
}

module.exports = Size;
