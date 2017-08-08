/**
 * @fileOverview 使用pow进行度量计算
 * @author dxq613@gmail.com
 */


const Linear = require('./linear');
const Util = require('../util');

// 求以a为次幂，结果为b的基数，如 x^^a = b;求x
function calBase(a, b) {
  const e = Math.E;
  const value = Math.pow(e, Math.log(b) / a); // 使用换底公式求底
  return value;
}

/**
 * 度量的Pow计算
 * @class Scale.Log
 */
class Pow extends Linear {

  /**
   * @override
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * @override
       */
      type: 'pow',

      /**
       * 进行pow计算的基数
       * @type {Number}
       */
      exponent: 2,

      /**
       * @override
       * pow 的坐标点的个数控制在10个以下
       * @type {Number}
       */
      tickCount: 10
    });
  }

  /**
   * @override
   */
  calculateTicks() {
    const self = this;
    const exponent = self.exponent;
    let min;
    let max = Math.ceil(calBase(exponent, self.max));

    if (self.min >= 0) {
      min = Math.floor(calBase(exponent, self.min));
    } else {
      min = 0;
    }
    if (min > max) {
      const tmp = max;
      max = min;
      min = tmp;
    }
    const count = max - min;
    const tickCount = self.tickCount;
    const avg = Math.ceil(count / tickCount);
    const ticks = [];

    for (let i = min; i < max + avg; i = i + avg) {
      ticks.push(Math.pow(i, exponent));
    }
    return ticks;
  }

  // 获取度量计算时，value占的定义域百分比
  _getScalePercent(value) {
    const max = this.max;
    const min = this.min;
    if (max === min) {
      return 0;
    }
    const exponent = this.exponent;
    const percent = (calBase(exponent, value) - calBase(exponent, min)) / (calBase(exponent, max) - calBase(exponent, min));
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
    const percent = (value - this.rangeMin()) / (this.rangeMax() - this.rangeMin());
    const exponent = this.exponent;
    const max = calBase(exponent, this.max);
    const min = calBase(exponent, this.min);
    const tmp = percent * (max - min) + min;
    return Math.pow(tmp, exponent);
  }
}

module.exports = Pow;
