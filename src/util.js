/**
 * @fileOverview The util method based on the lodash.
 * @author dxq613@gmail.com
 * @see https://github.com/lodash/lodash
 */
const G = require('@antv/g');

const CommonUtil = G.CommonUtil;

const MAX_LEVEL = 5;

function _mix(dist, obj) {
  for (const k in obj) {
    if (obj.hasOwnProperty(k) && k !== 'constructor' && obj[k] !== undefined) {
      dist[k] = obj[k];
    }
  }
}

const Util = CommonUtil.assign({
  cloneDeep: require('lodash/cloneDeep'),
  filter: require('lodash/filter'),
  flatten: require('lodash/flatten'),
  groupBy: require('lodash/groupBy'),
  indexOf: require('lodash/indexOf'),
  isDate: require('lodash/isDate'),
  isEmpty: require('lodash/isEmpty'),
  isEqualWith: require('lodash/isEqualWith'),
  isFinite: require('lodash/isFinite'),
  isNaN: require('lodash/isNaN'),
  isNull: require('lodash/isNull'),
  isPlainObject: require('lodash/isPlainObject'),
  lowerFirst: require('lodash/lowerFirst'),
  map: require('lodash/map'),
  maxBy: require('lodash/maxBy'),
  minBy: require('lodash/minBy'),
  pick: require('lodash/pick'),
  reduce: require('lodash/reduce'),
  replace: require('lodash/replace'),
  round: require('lodash/round'),
  union: require('lodash/union'),
  uniq: require('lodash/uniq'),
  upperCase: require('lodash/upperCase'),
  snapEqual(v1, v2) {
    return Math.abs(v1 - v2) < 0.001;
  },
  fixedBase(v, base) {
    const str = base.toString();
    const index = str.indexOf('.');
    if (index === -1) {
      return Math.round(v);
    }
    let length = str.substr(index + 1).length;
    if (length > 20) {
      length = 20;
    }
    return parseFloat(v.toFixed(length));
  },
  mix(dist, obj1, obj2, obj3) {
    if (obj1) {
      _mix(dist, obj1);
    }

    if (obj2) {
      _mix(dist, obj2);
    }

    if (obj3) {
      _mix(dist, obj3);
    }
    return dist;
  },
  inArray(arr, value) {
    return arr.indexOf(value) >= 0;
  },
  /**
   * 封装事件，便于使用上下文this,和便于解除事件时使用
   * @protected
   * @param  {Object} obj   对象
   * @param  {String} action 事件名称
   * @return {Function}        返回事件处理函数
   */
  wrapBehavior(obj, action) {
    if (obj['_wrap_' + action]) {
      return obj['_wrap_' + action];
    }
    const method = e => {
      obj[action](e);
    };
    obj['_wrap_' + action] = method;
    return method;
  },
  /**
   * 获取封装的事件
   * @protected
   * @param  {Object} obj   对象
   * @param  {String} action 事件名称
   * @return {Function}        返回事件处理函数
   */
  getWrapBehavior(obj, action) {
    return obj['_wrap_' + action];
  },
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
  },
  /**
   * 替换字符串中的字段.
   * @param {String} str 模版字符串
   * @param {Object} o json data
   * @return {String}     替换后的字符串
   */
  substitute(str, o) {
    if (!str || !o) {
      return str;
    }
    return str.replace(/\\?\{([^{}]+)\}/g, (match, name) => {
      if (match.charAt(0) === '\\') {
        return match.slice(1);
      }
      return (o[name] === undefined) ? '' : o[name];
    });
  }
}, CommonUtil);

function deepMix(dst, src, level) {
  level = level || 0;
  for (const k in src) {
    if (src.hasOwnProperty(k)) {
      const value = src[k];
      if (value !== null && Util.isPlainObject(value)) {
        if (!Util.isPlainObject(dst[k])) {
          dst[k] = {};
        }
        if (level < MAX_LEVEL) {
          deepMix(dst[k], src[k], level + 1);
        } else {
          dst[k] = src[k];
        }
      } else if (Util.isArray(value)) {
        dst[k] = [];
        dst[k] = dst[k].concat(value);
      } else if (value !== undefined) {
        dst[k] = src[k];
      }
    }
  }
}


Util.deepMix = function() {
  const args = Util.toArray(arguments);
  const rst = args[0];
  for (let i = 1; i < args.length; i++) {
    const source = args[i];
    deepMix(rst, source);
  }
  return rst;
};

Util.Array = {
  merge(dataArray) {
    let rst = [];
    for (let i = 0; i < dataArray.length; i++) {
      rst = rst.concat(dataArray[i]);
    }
    return rst;
  },
  values(data, name) {
    const rst = [];
    const tmpMap = {};
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      let value = obj[name];
      if (!Util.isNil(value)) {
        if (!Util.isArray(value)) {
          value = [ value ];
        }
        Util.each(value, val => {
          if (!tmpMap[val]) {
            rst.push(val);
            tmpMap[val] = true;
          }
        });
      }
    }
    return rst;
  },
  getRange(values) {
    // 存在 NaN 时，min,max 判定会出问题
    values = Util.filter(values, function(v) {
      return !isNaN(v);
    });
    if (!values.length) { // 如果没有数值则直接返回0
      return {
        min: 0,
        max: 0
      };
    }
    if (Util.isArray(values[0])) {
      let tmp = [];
      for (let i = 0; i < values.length; i++) {
        tmp = tmp.concat(values[i]);
      }
      values = tmp;
    }
    const max = Math.max.apply(null, values);
    const min = Math.min.apply(null, values);
    return {
      min,
      max
    };
  },
  firstValue(data, name) {
    let rst = null;
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      const value = obj[name];
      if (!Util.isNil(value)) {
        if (Util.isArray(value)) {
          rst = value[0];
        } else {
          rst = value;
        }
        break;
      }
    }
    return rst;
  },
  group(data, condition) {
    if (!condition) {
      return [ data ];
    }
    const groups = Util.Array.groupToMap(data, condition);
    const array = [];
    for (const i in groups) {
      array.push(groups[i]);
    }
    return array;
  },
  groupToMap(data, condition) {
    if (!condition) {
      return {
        0: data
      };
    }
    if (!Util.isFunction(condition)) {
      const paramsCondition = Util.isArray(condition) ? condition : condition.replace(/\s+/g, '').split('*');
      condition = function(row) {
        let unique = '_'; // 避免出现数字作为Key的情况，会进行按照数字的排序
        for (let i = 0, l = paramsCondition.length; i < l; i++) {
          unique += row[paramsCondition[i]] && row[paramsCondition[i]].toString();
        }
        return unique;
      };
    }
    const groups = Util.groupBy(data, condition);
    return groups;
  },
  remove: CommonUtil.remove
};

module.exports = Util;
