/**
 * @fileOverview 自动计算数字坐标轴
 * @author dxq613@gmail.com
 */

const Util = require('../../util');
const AutoUtil = require('./util');
const MIN_COUNT = 5;
const MAX_COUNT = 7;
const INTERVAL_ARRAY = [ 0, 1, 2, 4, 5, 10 ];

module.exports = function(info) {
  let min = info.min;
  let max = info.max;
  let interval = info.interval;
  const ticks = [];
  const minCount = info.minCount || MIN_COUNT;
  const maxCount = info.maxCount || MAX_COUNT;
  let avgCount = (minCount + maxCount) / 2;
  let count;

  if (Util.isNil(min)) {
    min = 0;
  }
  if (Util.isNil(max)) {
    max = 0;
  }
  if (max === min) {
    if (min === 0) {
      max = 1;
    } else {
      if (min > 0) {
        min = 0;
      } else {
        max = 0;
      }
    }
    if (max - min < 5 && !interval && max - min >= 1) {
      interval = 1;
    }
  }

  if (Util.isNil(interval)) {
    // 计算间距
    const temp = (max - min) / (avgCount - 1);
    interval = AutoUtil.snapFactorTo(temp, INTERVAL_ARRAY, 'ceil');
    if (maxCount !== minCount) {
      count = parseInt((max - min) / interval, 10);
      if (count > maxCount) {
        count = maxCount;
      }
      if (count < minCount) {
        count = minCount;
      }
      // 不确定tick的个数时，使得tick偏小
      interval = AutoUtil.snapFactorTo((max - min) / (count - 1), INTERVAL_ARRAY, 'floor');
    } else {
      count = avgCount;
    }
  }
  if (info.interval || maxCount !== minCount) {
    // 校正 max 和 min
    max = AutoUtil.snapMultiple(max, interval, 'ceil'); // 向上逼近
    min = AutoUtil.snapMultiple(min, interval, 'floor'); // 向下逼近
    count = Math.round((max - min) / interval);
    min = Util.fixedBase(min, interval);
    max = Util.fixedBase(max, interval);
  } else {
    avgCount = parseInt(avgCount, 10); // 取整
    const avg = (max + min) / 2;
    const avgTick = AutoUtil.snapMultiple(avg, interval, 'ceil');
    const sideCount = Math.floor((avgCount - 2) / 2);
    let maxTick = avgTick + sideCount * interval;
    let minTick;
    if (avgCount % 2 === 0) {
      minTick = avgTick - sideCount * interval;
    } else {
      minTick = avgTick - (sideCount + 1) * interval;
    }
    if (maxTick < max) {
      maxTick = maxTick + interval;
    }
    if (minTick > min) {
      minTick = minTick - interval;
    }
    max = Util.fixedBase(maxTick, interval);
    min = Util.fixedBase(minTick, interval);
  }

  ticks.push(min);
  for (let i = 1; i < count; i++) {
    ticks.push(Util.fixedBase(interval * i + min, interval));
  }
  if (ticks[ticks.length - 1] < max) {
    ticks.push(max);
  }
  return {
    min,
    max,
    interval,
    count,
    ticks
  };
};
