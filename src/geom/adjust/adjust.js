/**
 * @fileOverview adjust the points position
 * @author dxq613@gmail.com
 */

const Util = require('../../util');
const DEFAULT_Y = 0; // 默认的y的值

/**
 * 数据调整的基类
 * @class Adjust
 */
class Adjust {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    return {
      /**
       * 调整对应的x方向对应的字段名称
       * @type {Scale}
       */
      xField: null,
      /**
       * 调整对应的y方向对应的字段名称
       * @type {Scale}
       */
      yField: null,

      /**
       * 调整的维度，默认,x,y都做调整
       * @type {Array}
       */
      adjustNames: [ 'x', 'y' ], // 指x,y

      /**
       * 参与分组的数据维度
       * @type {Array}
       */
      groupFields: null
    };
  }

  constructor(cfg) {
    const defaultCfg = this.getDefaultCfg();
    Util.assign(this, defaultCfg, cfg);
  }

  /**
   * 对应的维度是否可以调整
   * @protected
   * @param  {String}  dimName 可以调整的维度 x,y
   * @return {Boolean} 是否可以调整
   */
  isAdjust(dimName) {
    return this.adjustNames.indexOf(dimName) >= 0;
  }

  /**
   * @protected
   * adjust data
   * @param  {Array} dataArray data array
   */
  processAdjust(dataArray) {
    const self = this;
    const mergeData = Util.Array.merge(dataArray);

    self.adjDataArray = dataArray;
    self.mergeData = mergeData;
    self.adjustData(dataArray, mergeData);
    self.adjFrames = null;
    self.mergeData = null;
  }

  /**
   * @protected
   * 获取可调整度量对应的值
   * @param  {Frame} mergeData 数据
   * @return {Object} 值的映射
   */
  _getDimValues(mergeData) {
    const self = this;
    const valuesMap = {};
    const dims = [];
    if (self.xField && self.isAdjust('x')) {
      dims.push(self.xField);
    }
    if (self.yField && self.isAdjust('y')) {
      dims.push(self.yField);
    }
    Util.each(dims, function(dim) {
      const values = Util.Array.values(mergeData, dim);
      values.sort(function(v1, v2) {
        return v1 - v2;
      });
      valuesMap[dim] = values;
    });
    if (!self.yField && self.isAdjust('y')) { // 只有一维的情况下,同时调整y
      const dim = 'y';
      const values = [ DEFAULT_Y, 1 ]; // 默认分布在y轴的 0.1 与 0.2 之间
      valuesMap[dim] = values;
    }
    return valuesMap;
  }

  adjustData(dataArray, mergeData) {
    const self = this;
    const valuesMap = self._getDimValues(mergeData);
    Util.each(dataArray, function(data, index) { // 遍历所有数据集合
      Util.each(valuesMap, function(values, dim) { // 根据不同的度量分别调整位置
        self.adjustDim(dim, values, data, dataArray.length, index);
      });
    });
  }

  adjustDim(/* dim, values, data, length, index */) {

  }

  getAdjustRange(dim, key, values) {
    const self = this;
    const index = values.indexOf(key);
    const length = values.length;
    let pre;
    let next;
    if (!self.yField && self.isAdjust('y')) {
      pre = 0;
      next = 1;
    } else if (length > 1) {
      pre = index === 0 ? values[0] : values[index - 1];
      next = index === length - 1 ? values[length - 1] : values[index + 1];

      if (index !== 0) {
        pre += (key - pre) / 2;
      } else {
        pre -= (next - key) / 2;
      }
      if (index !== length - 1) {
        next -= (next - key) / 2;
      } else {
        next += (key - values[length - 2]) / 2;
      }
    } else {
      pre = key === 0 ? 0 : key - 0.5;
      next = key === 0 ? 1 : key + 0.5;
    }

    return {
      pre,
      next
    };
  }

  /**
   * 对数据进行分组
   * @param  {Array} data 数据
   * @param  {String} dim 分组的字段
   * @return {Object}  分组的键值对映射
   */
  groupData(data, dim) {
    const groups = {};

    Util.each(data, function(record) {
      let value = record[dim];
      if (value === undefined) {
        value = record[dim] = DEFAULT_Y;
      }
      if (!groups[value]) {
        groups[value] = [];
      }
      groups[value].push(record);
    });

    return groups;
  }
}

module.exports = Adjust;
