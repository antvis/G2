/**
 * @fileOverview The util method based on the lodash.
 * @author dxq613@gmail.com
 * @see https://github.com/lodash/lodash
 */

function _mix(dist, obj) {
  for (const k in obj) {
    if (obj.hasOwnProperty(k) && k !== 'constructor' && obj[k] !== undefined) {
      dist[k] = obj[k];
    }
  }
}

const PRECISION = 0.00001; // 常量，据的精度，小于这个精度认为是0

const Util = {
  each: require('lodash/each'),
  isNull: require('lodash/isNull'),
  isObject: require('lodash/isObject'),
  isNumber: require('lodash/isNumber'),
  isString: require('lodash/isString'),
  isFunction: require('lodash/isFunction'),
  lowerFirst: require('lodash/lowerFirst'),
  upperFirst: require('lodash/upperFirst'),
  isNil: require('lodash/isNil'),
  isArray: require('lodash/isArray'),
  isDate: require('lodash/isDate'),
  toArray: require('lodash/toArray'),
  template: require('lodash/template'),
  indexOf: require('lodash/indexOf'),
  assign: require('lodash/assign'),
  groupBy: require('lodash/groupBy'),
  cloneDeep: require('lodash/cloneDeep'),
  maxBy: require('lodash/maxBy'),
  has: require('lodash/has'),
  round: require('lodash/round'),
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
  equal(a, b) {
    return Math.abs((a - b)) < PRECISION;
  },
  inArray(arr, value) {
    return arr.indexOf(value) >= 0;
  }
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
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      const value = obj[name];
      if (!Util.isNil(value) && !Util.inArray(rst, value)) {
        rst.push(value);
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
        let unique = '';
        for (let i = 0, l = paramsCondition.length; i < l; i++) {
          unique += row[paramsCondition[i]].toString();
        }
        return unique;
      };
    }
    const groups = Util.groupBy(data, condition);
    return groups;
  }
};

module.exports = Util;
