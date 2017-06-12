/**
 * @fileOverview 使用度量，进行log转换
 * @author dxq613@gmail.com
 */

const Linear = require('./linear');
const Util = require('../util');

// 计算log
function log(a, b) {
  if (a === 1) {
    return 1;
  }
  return Math.log(b) / Math.log(a);
}

/**
 * 度量的log计算
 * @class Scale.Log
 */
class Log extends Linear {

  /**
   * @override
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * @override
       */
      type: 'log',

      /**
       * 进行log计算的基数
       * @type {Number}
       */
      base: 2,

      /**
       * @override
       * log 的坐标点的个数控制在10个以下
       * @type {Number}
       */
      tickCount: 10,

      // 最小的tick，仅内部使用
      _minTick: null
    });
  }
  /**
   * @override
   */
  calculateTicks() {
    const self = this;
    const base = self.base;
    let minTick;
    if (self.min < 0) {
      throw new Error('The minimum value must be greater than zero!');
    }
    const maxTick = log(base, self.max);

    if (self.min > 0) {
      minTick = Math.floor(log(base, self.min));
    } else {
      const values = self.values;
      let positiveMin = self.max; // 查找大于0的第一个值, 如果都小于0，默认为1
      Util.each(values, function(value) {
        if (value > 0 && value < positiveMin) {
          positiveMin = value;
        }
      });
      if (positiveMin === self.max) {
        positiveMin = self.max / base;
      }
      if (positiveMin > 1) {
        positiveMin = 1;
      }
      minTick = Math.floor(log(base, positiveMin));
      self._minTick = minTick;
      self.positiveMin = positiveMin;
    }
    const count = maxTick - minTick;
    const tickCount = self.tickCount;
    const avg = Math.ceil(count / tickCount);
    const ticks = [];

    for (let i = minTick; i < maxTick + avg; i = i + avg) {
      ticks.push(Math.pow(base, i));
    } /**/
    if (self.min === 0) {
      ticks.unshift(0);
    }
    return ticks;
  }
  // 获取度量计算时，value占的定义域百分比
  _getScalePercent(value) {
    const max = this.max;
    let min = this.min;
    if (max === min) {
      return 0;
    }
    // 如果值小于等于0，则按照0处理
    if (value <= 0) {
      return 0;
    }
    const base = this.base;
    const positiveMin = this.positiveMin;
    // 如果min == 0, 则根据比0大的最小值，计算比例关系。这个最小值作为坐标轴上的第二个tick，第一个是0但是不显示
    if (positiveMin) {
      min = positiveMin * 1 / base;
    }
    let percent;
    // 如果数值小于次小值，那么就计算 value / 次小值 占整体的比例
    if (value < positiveMin) {
      percent = (value / positiveMin) / (log(base, max) - log(base, min));
    } else {
      percent = (log(base, value) - log(base, min)) / (log(base, max) - log(base, min));
    }
    return percent;
  }

  /**
   * @override
   */
  scale(value) {
    const percent = this._getScalePercent(value);
    const rangeMin = this.rangeMin();
    const rangeMax = this.rangeMax();
    return rangeMin + percent * (rangeMax - rangeMin);
  }
  /**
   * @override
   */
  invert(value) {
    const base = this.base;
    const max = log(base, this.max);
    const rangeMin = this.rangeMin();
    const range = (this.rangeMax() - rangeMin);
    let min;
    const positiveMin = this.positiveMin;
    if (positiveMin) {
      if (value === 0) {
        return 0;
      }
      min = log(base, positiveMin / base);
      const appendPercent = (1 / (max - min)) * range; // 0 到 positiveMin的占比
      if (value < appendPercent) { // 落到 0 - positiveMin 之间
        return value / appendPercent * positiveMin;
      }
    } else {
      min = log(base, this.min);
    }
    const percent = (value - rangeMin) / (range);
    const tmp = percent * (max - min) + min;
    return Math.pow(base, tmp);
  }
}

module.exports = Log;
