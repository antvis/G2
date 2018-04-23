/**
 * @fileOverview The measurement of linear data scale function
 * @author dxq613@gmail.com
 */

const Linear = require('./linear');
const Util = require('../util');
const timeAuto = require('./auto/time');
const fecha = require('fecha');
const TimeUtil = require('./time-util');

/**
 * 时间度量的构造函数
 * @class Scale.Time
 */
class Time extends Linear {

  /**
   * @override
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * @override
       */
      type: 'time',

      /**
       * 格式化符
       * @type {String}
       */
      mask: 'YYYY-MM-DD'
    });
  }

  /**
   * @override
   */
  init() {
    const self = this;
    const values = self.values;
    if (values && values.length) { // 重新计算最大最小值
      const timeStamps = [];
      let min = Infinity; // 最小值
      let secondMin = min; // 次小值
      let max = 0;
      // 使用一个循环，计算min,max,secondMin
      Util.each(values, function(v) {
        const timeStamp = self._toTimeStamp(v);
        if (isNaN(timeStamp)) {
          throw new TypeError(`Invalid Time: ${v}`);
        }
        if (min > timeStamp) {
          secondMin = min;
          min = timeStamp;
        } else if (secondMin > timeStamp) {
          secondMin = timeStamp;
        }
        if (max < timeStamp) {
          max = timeStamp;
        }
        timeStamps.push(timeStamp);
      });
      // 存在多个值时，设置最小间距
      if (values.length > 1) {
        self.minTickInterval = secondMin - min;
      }
      if (Util.isNil(self.min) || self._toTimeStamp(self.min) > min) {
        self.min = min;
      }
      if (Util.isNil(self.max) || self._toTimeStamp(self.max) < max) {
        self.max = max;
      }
    }
    super.init();
  }

  calculateTicks() {
    const self = this;
    const min = self.min;
    const max = self.max;
    const count = self.tickCount;
    const interval = self.tickInterval;
    const tmp = timeAuto({
      min,
      max,
      minCount: count,
      maxCount: count,
      interval,
      minInterval: self.minTickInterval
    });
    return tmp.ticks;
  }

  /**
   * @override
   */
  getText(value) {
    const formatter = this.formatter;
    value = this.translate(value);
    value = formatter ? formatter(value) : fecha.format(value, this.mask);
    return value;
  }

  /**
   * @override
   */
  scale(value) {
    if (Util.isString(value)) {
      value = this.translate(value);
    }
    return super.scale(value);
  }

  /**
   * @override
   */
  translate(value) {
    return this._toTimeStamp(value);
  }

  // 将时间转换为时间戳
  _toTimeStamp(value) {
    return TimeUtil.toTimeStamp(value);
  }
}

module.exports = Time;
