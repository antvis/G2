/**
 * @fileOverview 计算分类的的坐标点
 * @author dxq613@gmail.com
 */

const Util = require('../../util');
const MAX_COUNT = 8;

function getSimpleArray(data) {
  let arr = [];
  Util.each(data, function(sub) {
    if (Util.isArray(sub)) {
      arr = arr.concat(sub);
    } else {
      arr.push(sub);
    }
  });
  return arr;
}

module.exports = function(info) {
  const rst = {};
  let ticks = [];
  const tickCount = info.maxCount || MAX_COUNT;

  const categories = getSimpleArray(info.data);
  if (categories.length <= tickCount + tickCount / 2) {
    ticks = [].concat(categories);
  } else {
    const length = categories.length;
    const step = parseInt(length / (tickCount - 1), 10);

    const groups = categories.map(function(e, i) {
      return i % step === 0 ? categories.slice(i, i + step) : null;
    }).filter(function(e) {
      return e;
    });

    ticks.push(categories[0]);
    for (let i = 1; (i < groups.length) && (i < tickCount - 1); i++) {
      ticks.push(groups[i][0]);
    }

    ticks.push(categories[length - 1]);
  }

  rst.categories = categories;
  rst.ticks = ticks;
  return rst;
};
