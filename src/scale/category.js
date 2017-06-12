/**
 * @fileOverview the scale function to process the categories
 * @author dxq613@gmail.com
 */


const Base = require('./base');
const Util = require('../util');
const catAuto = require('./auto/cat');

/**
 * 度量的构造函数
 * @class Scale.Category
 */
class Category extends Base {

  /**
   * @override
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * type of the scale
       * @type {String}
       */
      type: 'cat',

      /**
       * 自动生成标记时的个数
       * @type {Number}
       * @default null
       */
      tickCount: null,

      /**
       * 是否分类度量
       * @type {Boolean}
       */
      isCategory: true
    });
  }

  /**
   * @override
   */
  init() {
    const self = this;
    const values = self.values;
    const tickCount = self.tickCount;

    Util.each(values, function(v, i) {
      values[i] = v.toString();
    });
    if (!self.ticks) {
      let ticks = values;
      if (tickCount) {
        const temp = catAuto({
          maxCount: tickCount,
          data: values
        });
        ticks = temp.ticks;
      }
      this.ticks = ticks;
    }
  }

  /**
   * @override
   */
  getText(value) {

    if (this.values.indexOf(value) === -1 && Util.isNumber(value)) {
      value = this.values[Math.round(value)];
    }

    return super.getText.call(this, value);
  }

  /**
   * @override
   */
  translate(value) {
    let index = this.values.indexOf(value);
    if (index === -1 && Util.isNumber(value)) {
      index = value;
    } else if (index === -1) {
      index = NaN;
    }
    return index;
  }
  /**
   * @override
   */
  scale(value) {
    const rangeMin = this.rangeMin();
    const rangeMax = this.rangeMax();
    let percent;

    if (Util.isString(value) || this.values.indexOf(value) !== -1) {
      value = this.translate(value);
    }
    if (this.values.length > 1) {
      percent = (value) / (this.values.length - 1);
    } else {
      percent = value;
    }
    return rangeMin + percent * (rangeMax - rangeMin);
  }

  /**
   * @override
   */
  invert(value) {
    if (Util.isString(value)) { // 如果已经是字符串
      return value;
    }
    const min = this.rangeMin();
    const max = this.rangeMax();

    // 归一到 范围内
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }
    const percent = (value - min) / (max - min);
    let index = Math.round(percent * (this.values.length - 1)) % this.values.length;
    index = index || 0;
    return this.values[index];
  }
}

module.exports = Category;
