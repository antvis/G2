/**
 * @fileOverview The data is replaced with constant
 * @author dxq613@gmail.com
 */

const Base = require('./base');
const Util = require('../util');

class Identity extends Base {

  /**
   * @override
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      isIdentity: true,
      /**
       * @override
       * @type {String}
       */
      type: 'identity',

      /**
       * 常量值
       * @type {*}
       */
      value: null
    });
  }

  /**
   * @override
   */
  getText() {
    return this.value.toString();
  }

  /**
   * @override
   */
  scale(value) {
    if (this.value !== value && Util.isNumber(value)) {
      return value;
    }
    return this.range[0];
  }

  /**
   * @override
   */
  invert() {
    return this.value;
  }
}

module.exports = Identity;
