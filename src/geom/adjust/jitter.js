/**
 * @fileOverview Repositions graphic elements randomly using a normal or uniform distribution
 * @author dxq613@gmail.com
 * reference: http://www-01.ibm.com/support/knowledgecenter/SSLVMB_21.0.0/com.ibm.spss.statistics.help/gpl_statement_element_jitter.htm
 */

const Util = require('../../util');
const Adjust = require('./adjust');

/**
 * 数据调整的基类
 * @class Adjust.Jitter
 */
class Jitter extends Adjust {

  getAdjustOffset(pre, next) {
    const r = Math.random(); // 随机位置，均匀分布
    const avg = (next - pre); // * length
    const append = avg * 0.05;
    return pre + append + avg * 0.9 * r;
  }

  // adjust group data
  _adjustGroup(group, dim, key, values) {
    const self = this;
    const range = self.getAdjustRange(dim, key, values);

    Util.each(group, function(record) {
      record[dim] = self.getAdjustOffset(range.pre, range.next); // 获取调整的位置
    });
  }

  adjustDim(dim, values, data) {
    const self = this;
    const groupData = self.groupData(data, dim);
    Util.each(groupData, function(group, key) {
      key = parseFloat(key);
      self._adjustGroup(group, dim, key, values);
    });
  }
}

module.exports = Jitter;
