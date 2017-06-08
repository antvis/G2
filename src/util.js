/**
 * @fileOverview The util method based on the lodash.
 * @author dxq613@gmail.com
 * @see https://github.com/lodash/lodash
 */
import each from 'lodash/each';
import isNull from 'lodash/isNull';
import isObject from 'lodash/isObject';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

function _mix(dist, obj) {
  for (const k in obj) {
    if (obj.hasOwnProperty(k) && k !== 'constructor' && obj[k] !== undefined) {
      dist[k] = obj[k];
    }
  }
}

const util = {
  each,
  isNull,
  isObject,
  isNumber,
  isString,
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
  }
};

export default util;
