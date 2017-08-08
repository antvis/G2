/**
 * @fileOverview Moves graphic elements next to other graphic elements that appear at the same value, rather than superimposing them.
 * @fileOverview dxq613@gmail.com
 */

const Util = require('../../util');
const Adjust = require('./adjust');
const Global = require('../../global');
/**
 * 数据调整的基类
 * @class Adjust.Dodge
 */
class Dodge extends Adjust {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.assign(cfg, {
      /**
       * 调整过程中,2个数据的间距
       * @type {Number}
       */
      marginRatio: 1 / 2,

      /**
       * 调整占单位宽度的比例,例如：占2个分类间距的 1/2
       * @type {Number}
       */
      dodgeRatio: Global.widthRatio.column,

      dodgeBy: null
    });
  }

  /**
   * @protected
   * @override
   */
  processAdjust(dataArray) {
    const self = this;
    const mergeData = Util.Array.merge(dataArray);
    const dodgeDim = self.dodgeBy;
    let adjDataArray = dataArray;
    if (dodgeDim) { // 如果指定了分组dim的字段
      adjDataArray = Util.Array.group(mergeData, dodgeDim);
    }
    self.cacheMap = {};
    self.adjDataArray = adjDataArray;
    self.mergeData = mergeData;
    self.adjustData(adjDataArray, mergeData);

    self.adjDataArray = null;
    self.mergeData = null;
  }

  getDistribution(dim) {
    const self = this;
    const dataArray = self.adjDataArray;
    const cacheMap = self.cacheMap;
    let map = cacheMap[dim];
    if (!map) {
      map = {};
      Util.each(dataArray, function(data, index) {
        const values = Util.Array.values(data, dim);
        if (!values.length) {
          values.push(0);
        }
        Util.each(values, function(val) {
          if (!map[val]) {
            map[val] = [];
          }
          map[val].push(index);
        });
      });
      cacheMap[dim] = map;
    }

    return map;
  }

  adjustDim(dim, values, data, frameCount, frameIndex) {
    const self = this;
    const map = self.getDistribution(dim);
    const groupData = self.groupData(data, dim); // 根据值分组

    Util.each(groupData, function(group, key) {
      key = parseFloat(key);
      let range;
      if (values.length === 1) {
        range = {
          pre: values[0] - 1,
          next: values[0] + 1
        };
      } else {
        range = self.getAdjustRange(dim, key, values);
      }
      Util.each(group, function(record) {
        const value = record[dim];
        const valueArr = map[value];
        const valIndex = valueArr.indexOf(frameIndex);
        record[dim] = self.getDodgeOffset(range, valIndex, valueArr.length);
      });
    });
  }

  getDodgeOffset(range, index, count) {
    const self = this;
    const pre = range.pre;
    const next = range.next;
    const tickLength = next - pre;
    const dodgeRatio = self.dodgeRatio;
    const width = (tickLength * dodgeRatio) / count;
    const margin = self.marginRatio * width;
    const offset = 1 / 2 * (tickLength - (count) * width - (count - 1) * margin) +
      ((index + 1) * width + index * margin) -
      1 / 2 * width - 1 / 2 * tickLength;
    return (pre + next) / 2 + offset;
  }
}

module.exports = Dodge;
