/**
 * @fileOverview the base class of scale
 * @author dxq613@gmail.com
 */

const Util = require('../util');

/**
 * 度量的构造函数
 * @class Scale
 */
class Scale {

  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    return {
      /**
       * type of the scale
       * @type {String}
       */
      type: 'base',

      /**
       * 格式化函数,输出文本或者tick时的格式化函数
       * @type {Function}
       */
      formatter: null,

      /**
       * 输出的值域
       * @type {Array}
       */
      range: [ 0, 1 ],

      /**
       * 度量的标记
       * @type {Array}
       */
      ticks: null,

      /**
       * 参与度量计算的值，可选项
       * @type {Array}
       */
      values: []
    };
  }

  constructor(cfg) {
    const defaultCfg = this.getDefaultCfg();
    Util.mix(this, defaultCfg, cfg);
    this.init();
  }

  /**
   * 度量初始化
   * @protected
   */
  init() {

  }

  /**
   * 获取该度量的ticks,返回的是多个对象，
   *   - text: tick 的文本
   *   - value: 对应的度量转换后的值
   * <code>
   *   [
   *     {text: 0,value:0}
   *     {text: 1,value:0.2}
   *     {text: 2,value:0.4}
   *     {text: 3,value:0.6}
   *     {text: 4,value:0.8}
   *     {text: 5,value:1}
   *   ]
   * </code>
   * @param {Number} count 输出tick的个数的近似值，默认是 10
   * @return {Array} 返回 ticks 数组
   */
  getTicks() {
    const self = this;
    const ticks = self.ticks;
    const rst = [];
    Util.each(ticks, function(tick) {
      let obj;
      if (Util.isObject(tick)) {
        obj = tick;
      } else {
        obj = {
          text: self.getText(tick),
          tickValue: tick,
          value: self.scale(tick)
        };
      }
      rst.push(obj);
    });
    return rst;
  }

  /**
   * 获取格式化后的文本
   * @param  {*} value 输入的数据
   * @return {String} 格式化的文本
   */
  getText(value) {
    const formatter = this.formatter;
    value = formatter ? formatter(value) : value;
    if (Util.isNil(value) || !value.toString) {
      value = '';
    }
    return value.toString();
  }
  /**
   * 输出的值域最小值
   * @protected
   * @return {Number} 返回最小的值
   */
  rangeMin() {
    return this.range[0];
  }
  /**
   * 输出的值域最大值
   * @protected
   * @return {Number} 返回最大的值
   */
  rangeMax() {
    const range = this.range;
    return range[range.length - 1];
  }

  /**
   * 度量转换后的结果，翻转回输入域
   * @param  {Number} value 需要翻转的数值
   * @return {*} 度量的输入值
   */
  invert(value) {
    return value;
  }
  /**
   * 将传入的值从非数值转换成数值格式，如分类字符串、时间字符串等
   * @param  {*} value 传入的值
   * @return {Number} 转换的值
   */
  translate(value) {
    return value;
  }
  /**
   * 进行度量转换
   * @param  {*} value 输入值
   * @return {Number} 输出值，在设定的输出值域之间，默认[0,1]
   */
  scale(value) {
    return value;
  }
  /**
   * 克隆一个新的scale,拥有跟当前scale相同的输入域、输出域等
   * @return {Scale} 克隆的度量
   */
  clone() {
    const self = this;
    const constr = self.constructor;
    const cfg = {};
    Util.each(self, function(v, k) {
      cfg[k] = self[k];
    });
    return new constr(cfg);
  }
  /**
   * 更改度量的属性信息
   * @param  {Object} info 属性信息
   * @chainable
   * @return {Scale} 返回自身的引用
   */
  change(info) {
    this.ticks = null;
    Util.mix(this, info);
    this.init();
    return this;
  }
}

module.exports = Scale;
