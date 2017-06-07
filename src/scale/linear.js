/**
 * @fileOverview The measurement of linear data scale function
 * @author dxq613@gmail.com
 */


import Base from './base';
import Util from '../util';
import numberAuto from './auto/number';

/**
 * 线性度量
 * @class Scale.Linear
 */
class Linear extends Base {

  /**
   * type of the scale
   * @type {String}
   */
  type = 'linear';

  /**
   * 是否线性
   * @type {Boolean}
   * @readOnly
   * @default true
   */
  isLinear = true;

  /**
   * min value of the scale
   * @type {Number}
   * @default null
   */
  min = null;

  /**
   * max value of the scale
   * @type {Number}
   * @default null
   */
  max = null;

  /**
   * 是否为了用户习惯，优化min,max和ticks，如果进行优化，则会根据生成的ticks调整min,max，否则舍弃(min,max)范围之外的ticks
   * @type {Boolean}
   * @default false
   */
  nice = false;

  /**
   * 自动生成标记时的个数
   * @type {Number}
   * @default null
   */
  tickCount = null;

  /**
   * 坐标轴点之间的间距，指的是真实数据的差值
   * @type {Number}
   * @default null
   */
  tickInterval = null;

  /**
   * @protected
   * @override
   */
  init() {
    const self = this;
    if (!self.ticks) {
      self.min = self.translate(self.min);
      self.max = self.translate(self.max);
      self.initTicks();
    } else {
      const ticks = self.ticks;
      const firstValue = self.translate(ticks[0]);
      const lastValue = self.translate(ticks[ticks.length - 1]);
      if (Util.isNull(self.min) || self.min > firstValue) {
        self.min = firstValue;
      }
      if (Util.isNull(self.max) || self.max < lastValue) {
        self.max = lastValue;
      }
    }
  }

  /**
   * 计算坐标点
   * @protected
   * @return {Array} 计算完成的坐标点
   */
  calculateTicks() {
    const self = this;
    const min = self.min;
    const max = self.max;
    const count = self.tickCount;
    const interval = self.tickInterval;
    const tmp = numberAuto({
      min,
      max,
      minCount: count,
      maxCount: count,
      interval
    });
    return tmp.ticks;
  }

  // 初始化ticks
  initTicks() {
    const self = this;
    const calTicks = self.calculateTicks();
    if (self.nice) { // 如果需要优化显示的tick
      self.ticks = calTicks;
      self.min = calTicks[0];
      self.max = calTicks[calTicks.length - 1];
    } else {
      const ticks = [];
      Util.each(calTicks, function(tick) {
        if (tick >= self.min && tick <= self.max) {
          ticks.push(tick);
        }
      });
      self.ticks = ticks;
    }
  }

  /**
   * @override
   */
  scale(value) {
    if (value === null || value === undefined) {
      return NaN;
    }
    const max = this.max;
    const min = this.min;
    if (max === min) {
      return 0;
    }

    const percent = (value - min) / (max - min);
    const rangeMin = this.rangeMin();
    const rangeMax = this.rangeMax();
    return rangeMin + percent * (rangeMax - rangeMin);
  }

  /**
   * @override
   */
  invert(value) {
    const percent = (value - this.rangeMin()) / (this.rangeMax() - this.rangeMin());
    return this.min + percent * (this.max - this.min);
  }
}

export default Linear;
