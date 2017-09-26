/**
 * @fileOverview the Attribute base class
 * @author huangtonger@aliyun.com
 */

const Util = require('../util');

function toScaleString(scale, value) {
  if (Util.isString(value)) {
    return value;
  }
  return scale.invert(scale.scale(value));
}
/**
 * 所有视觉通道属性的基类
 * @class Attr
 */
class AttributeBase {

  constructor(cfg) {
    /**
     * 属性的类型
     * @type {String}
     */
    this.type = 'base';

    /**
     * 属性的名称
     * @type {String}
     */
    this.name = null;

    /**
     * 回调函数
     * @type {Function}
     */
    this.method = null;

    /**
     * 备选的值数组
     * @type {Array}
     */
    this.values = [];

    /**
     * 属性内部的度量
     * @type {Array}
     */
    this.scales = [];

    /**
     * 是否通过线性取值, 如果未指定，则根据数值的类型判定
     * @type {Boolean}
     */
    this.linear = null;

    Util.mix(this, cfg);
  }

  get(name) {
    return this[name];
  }

  set(name, value) {
    this[name] = value;
  }

  // 获取属性值，将值映射到视觉通道
  _getAttrValue(scale, value) {
    const values = this.values;
    if (scale.isCategory && !this.linear) {
      const index = scale.translate(value);
      return values[index % values.length];
    }
    const percent = scale.scale(value);
    return this.getLinearValue(percent);
  }

  /**
   * 如果进行线性映射，返回对应的映射值
   * @protected
   * @param  {Number} percent 百分比
   * @return {*}  颜色值、形状、大小等
   */
  getLinearValue(percent) {
    const values = this.values;
    const steps = values.length - 1;
    const step = Math.floor(steps * percent);
    const leftPercent = steps * percent - step;
    const start = values[step];
    const end = step === steps ? start : values[step + 1];
    const rstValue = start + (end - start) * leftPercent;
    return rstValue;
  }

  /**
   * 默认的回调函数
   * @param {*} value 回调函数的值
   * @type {Function}
   * @return {Array} 返回映射后的值
   */
  callback(value) {
    const self = this;
    const scale = self.scales[0];
    let rstValue = null;
    if (scale.type === 'identity') {
      rstValue = scale.value;
    } else {
      rstValue = self._getAttrValue(scale, value);
    }
    return rstValue;
  }

  /**
   * 根据度量获取属性名
   * @return {Array} dims of this Attribute
   */
  getNames() {
    const scales = this.scales;
    const names = this.names;
    const length = Math.min(scales.length, names.length);
    const rst = [];
    for (let i = 0; i < length; i++) {
      rst.push(names[i]);
    }
    return rst;
  }

  /**
   * 根据度量获取维度名
   * @return {Array} dims of this Attribute
   */
  getFields() {
    const scales = this.scales;
    const rst = [];
    Util.each(scales, function(scale) {
      rst.push(scale.field);
    });
    return rst;
  }

  /**
   * 根据名称获取度量
   * @param  {String} name the name of scale
   * @return {Scale} scale
   */
  getScale(name) {
    const scales = this.scales;
    const names = this.names;
    const index = names.indexOf(name);
    return scales[index];
  }

  /**
   * 映射数据
   * @param {*} param1...paramn 多个数值
   * @return {Array} 映射的值组成的数组
   */
  mapping(...params) {
    const scales = this.scales;
    const callback = this.callback;
    let values = params;
    if (callback) {
      for (let i = 0; i < params.length; i++) {
        params[i] = this._toOriginParam(params[i], scales[i]);
      }
      values = callback.apply(this, params);
    }
    if (!Util.isArray(values)) {
      values = [ values ];
    }
    return values;
  }

  // 原始的参数
  _toOriginParam(param, scale) {
    let rst = param;
    if (!scale.isLinear) {
      if (Util.isArray(param)) {
        rst = [];
        for (let i = 0; i < param.length; i++) {
          rst.push(toScaleString(scale, param[i]));
        }
      } else {
        rst = toScaleString(scale, param);
      }
    }
    return rst;
  }
}

module.exports = AttributeBase;
