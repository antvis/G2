/**
 * @fileOverview The util method based on the lodash.
 * @author dxq613@gmail.com
 * @see https://github.com/lodash/lodash
 */
const G = require('@antv/g/lib');
const CommonUtil = G.CommonUtil;
const Utils = require('@antv/util/lib');

const Util = CommonUtil.assign({
  DomUtil: G.DomUtil,
  MatrixUtil: G.MatrixUtil,
  PathUtil: G.PathUtil,
  cloneDeep: Utils.clone,
  deepMix: Utils.deepMix,
  filter: Utils.filter,
  flatten: Utils.flatten,
  getWrapBehavior: Utils.getWrapBehavior,
  groupBy: Utils.groupBy,
  indexOf: Utils.indexOf,
  isDate: Utils.isDate,
  isEmpty: Utils.isEmpty,
  isEqualWith: Utils.isEqualWith,
  isFinite,
  isNaN,
  isNull: Utils.isNull,
  isPlainObject: Utils.isPlainObject,
  lowerFirst: Utils.lowerFirst,
  map: Utils.map,
  maxBy: Utils.maxBy,
  minBy: Utils.minBy,
  mix: Utils.mix,
  pick: Utils.pick,
  reduce: Utils.reduce,
  substitute: Utils.substitute,
  union: Utils.union,
  uniq: Utils.uniq,
  upperCase: Utils.upperCase,
  wrapBehavior: Utils.wrapBehavior,
  snapEqual(v1, v2) {
    return Math.abs(v1 - v2) < 0.001;
  },
  inArray: Utils.contains,
  /**
   * 将用户输入的 padding 转换成 [top, right, bottom, right] 的模式
   * @param  {Number|Array} padding 输入的padding
   * @return {Array} 四个padding 值
   */
  toAllPadding(padding) {
    let top = 0;
    let left = 0;
    let right = 0;
    let bottom = 0;

    if (Util.isNumber(padding) || Util.isString(padding)) {
      top = left = right = bottom = padding;
    } else if (Util.isArray(padding)) {
      top = padding[0];
      right = !Util.isNil(padding[1]) ? padding[1] : padding[0];
      bottom = !Util.isNil(padding[2]) ? padding[2] : padding[0];
      left = !Util.isNil(padding[3]) ? padding[3] : right;
    } else if (Util.isObject(padding)) {
      top = padding.top || 0;
      right = padding.right || 0;
      bottom = padding.bottom || 0;
      left = padding.left || 0;
    }
    return [ top, right, bottom, left ];
  }
}, CommonUtil);

Util.Array = {
  groupToMap: Utils.groupToMap,
  group: Utils.group,
  merge: Utils.merge,
  values: Utils.values,
  getRange: Utils.getRange,
  firstValue: Utils.firstValue,
  remove: CommonUtil.remove
};

module.exports = Util;
