/**
 * @fileOverview 提取公共代码到util方法
 * @author dxq613@gmail.com
 */

const Util = require('../util');

module.exports = {
  toTimeStamp(value) {
    if (Util.isString(value)) {
      if (value.indexOf('T') > 0) {
        value = new Date(value).getTime();
      } else {
        value = new Date(value.replace(/-/ig, '/')).getTime();
      }
    }
    if (Util.isDate(value)) {
      value = value.getTime();
    }
    return value;
  }
};
