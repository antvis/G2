/**
 * @fileOverview 时间数据作为分类类型
 * @author dxq613@gmail.com
 */

const Category = require('./category');
const Util = require('../util');
const fecha = require('fecha');
const catAuto = require('./auto/cat');
const TimeUtil = require('./time-util');

/**
 * 度量的构造函数
 * @class Scale.TimeCategory
 */
class TimeCategory extends Category {

  /**
   * @override
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * @override
       */
      type: 'timeCat',

      /**
       * 格式化符
       * @type {String}
       */
      mask: 'YYYY-MM-DD',

      /**
       * @override
       */
      tickCount: 7
    });
  }

  init() {
    const self = this;
    const values = this.values;
    // 针对时间分类类型，会将时间统一转换为时间戳
    Util.each(values, function(v, i) {
      values[i] = self._toTimeStamp(v);
    });
    values.sort(function(v1, v2) {
      return v1 - v2;
    });

    if (!self.ticks) {
      self.ticks = this.calculateTicks(false);
    }
  }

  /**
   * 计算 ticks
   * @param  {boolean} formated 是否将 ticks 按照指定的 mask 格式化
   * @return {array} 返回 ticks 数组
   */
  calculateTicks(formated) {
    const self = this;
    const count = self.tickCount;
    let ticks;
    if (count) {
      const temp = catAuto({
        maxCount: count,
        data: self.values
      });
      ticks = temp.ticks;
    } else {
      ticks = self.values;
    }

    if (formated) {
      Util.each(ticks, function(value, index) {
        ticks[index] = fecha.format(value, self.mask);
      });
    }
    return ticks;
  }

  /**
   * @override
   */
  translate(value) {
    value = this._toTimeStamp(value);
    let index = this.values.indexOf(value);

    if (index === -1) {
      if (Util.isNumber(value) && value < this.values.length) {
        index = value;
      } else {
        index = NaN;
      }
    }
    return index;
  }

  /**
   * @override
   */
  scale(value) {
    const rangeMin = this.rangeMin();
    const rangeMax = this.rangeMax();
    const index = this.translate(value);
    let percent;

    if (this.values.length === 1) {
      percent = index;
    } else if (index > -1) {
      percent = (index) / (this.values.length - 1);
    } else {
      percent = 0;
    }

    return rangeMin + percent * (rangeMax - rangeMin);
  }

  /**
   * @override
   */
  getText(value) {
    let result = '';
    const index = this.translate(value);
    if (index > -1) {
      result = this.values[index];
    } else {
      result = value;
    }

    const formatter = this.formatter;
    result = parseInt(result, 10);
    result = formatter ? formatter(result) : fecha.format(result, this.mask);
    return result;
  }

  /**
   * @override
   */
  getTicks() {
    const self = this;
    const ticks = this.ticks;
    const rst = [];
    Util.each(ticks, function(tick) {
      let obj;
      if (Util.isObject(tick)) {
        obj = tick;
      } else {
        obj = {
          text: Util.isString(tick) ? tick : self.getText(tick),
          tickValue: tick, // 用于坐标轴上文本动画时确定前后帧的对应关系
          value: self.scale(tick)
        };
      }
      rst.push(obj);
    });
    return rst;
  }

  // 将时间转换为时间戳
  _toTimeStamp(value) {
    return TimeUtil.toTimeStamp(value);
  }
}

module.exports = TimeCategory;
