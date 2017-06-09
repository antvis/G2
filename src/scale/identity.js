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
  scale() {
    return 1;
  }

  /**
   * @override
   */
  invert() {
    return this.value;
  }
}

module.exports = Identity;
