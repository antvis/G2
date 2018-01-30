/**
 * @fileOverview 计算方法
 * @author dxq613@gmail.com
 */

// 如果小数点后面超过 10 位浮点数时进行一下处理
const DECIMAL_LENGTH = 12;
// 获取系数
function getFactor(v) {
  let factor = 1;
  if (v === Infinity || v === -Infinity) {
    throw new Error('Not support Infinity!');
  }
  if (v < 1) {
    let count = 0;
    while (v < 1) {
      factor = factor / 10;
      v = v * 10;
      count++;
    }
    // 浮点数计算出现问题
    if (factor.toString().length > DECIMAL_LENGTH) {
      factor = parseFloat(factor.toFixed(count));
    }
  } else {
    while (v > 10) {
      factor = factor * 10;
      v = v / 10;
    }
  }

  return factor;
}

// 取小于当前值的
function arrayFloor(values, value) {
  const length = values.length;
  if (length === 0) {
    return NaN;
  }

  let pre = values[0];

  if (value < values[0]) {
    return NaN;
  }

  if (value >= values[length - 1]) {
    return values[length - 1];
  }
  for (let i = 1; i < values.length; i++) {
    if (value < values[i]) {
      break;
    }
    pre = values[i];
  }

  return pre;
}

// 大于当前值的第一个
function arrayCeiling(values, value) {
  const length = values.length;
  if (length === 0) {
    return NaN;
  }
  // var pre = values[0];
  let rst;
  if (value > values[length - 1]) {
    return NaN;
  }
  if (value < values[0]) {
    return values[0];
  }

  for (let i = 1; i < values.length; i++) {
    if (value <= values[i]) {
      rst = values[i];
      break;
    }
  }

  return rst;
}

const Util = {
  // 获取逼近的数值
  snapFactorTo(v, arr, snapType) { // 假设 v = -512,isFloor = true
    if (isNaN(v)) {
      return NaN;
    }
    let factor = 1; // 计算系数
    if (v !== 0) {
      if (v < 0) {
        factor = -1;
      }
      v = v * factor; // v = 512
      const tmpFactor = getFactor(v);
      factor = factor * tmpFactor; // factor = -100

      v = v / tmpFactor; // v = 5.12
    }
    if (snapType === 'floor') {
      v = Util.snapFloor(arr, v); // v = 5
    } else if (snapType === 'ceil') {
      v = Util.snapCeiling(arr, v); // v = 6
    } else {
      v = Util.snapTo(arr, v); // 四舍五入 5
    }
    let rst = v * factor;
    // 如果出现浮点数计算问题，需要处理一下
    if (Math.abs(factor) < 1 && rst.toString().length > DECIMAL_LENGTH) {
      const decimalVal = parseInt(1 / factor);
      const symbol = factor > 0 ? 1 : -1;
      rst = v / decimalVal * symbol;
    }
    return rst;
  },
  // 获取逼近的倍数
  snapMultiple(v, base, snapType) {
    let div;
    if (snapType === 'ceil') {
      div = Math.ceil(v / base);
    } else if (snapType === 'floor') {
      div = Math.floor(v / base);
    } else {
      div = Math.round(v / base);
    }
    return div * base;
  },
  /**
   * 获取逼近的值，用于对齐数据
   * @param  {Array} values   数据集合
   * @param  {Number} value   数值
   * @return {Number} 逼近的值
   */
  snapTo(values, value) {
    // 这里假定values是升序排列
    const floorVal = arrayFloor(values, value);
    const ceilingVal = arrayCeiling(values, value);
    if (isNaN(floorVal) || isNaN(ceilingVal)) {
      if (values[0] >= value) {
        return values[0];
      }
      const last = values[values.length - 1];
      if (last <= value) {
        return last;
      }
    }
    if (Math.abs(value - floorVal) < Math.abs(ceilingVal - value)) {
      return floorVal;
    }
    return ceilingVal;
  },
  /**
   * 获取逼近的最小值，用于对齐数据
   * @param  {Array} values   数据集合
   * @param  {Number} value   数值
   * @return {Number} 逼近的最小值
   */
  snapFloor(values, value) {
    // 这里假定values是升序排列
    return arrayFloor(values, value);
  },
  /**
   * 获取逼近的最大值，用于对齐数据
   * @param  {Array} values   数据集合
   * @param  {Number} value   数值
   * @return {Number} 逼近的最大值
   */
  snapCeiling(values, value) {
    // 这里假定values是升序排列
    return arrayCeiling(values, value);
  }
};

module.exports = Util;
