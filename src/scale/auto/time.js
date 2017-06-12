/**
 * @fileOverview 计算时间坐标轴
 * @author dxq613@gmail.com
 */

const Util = require('../../util');
const AutoUtil = require('./util');

const MAX_COUNT = 6;
const SNAP_ARRAY = [ 1, 2, 4, 6, 8, 12 ];
const MINUTE_MS = 60 * 1000;
const HOUR_MS = 3600 * 1000;
const DAY_MS = 24 * 3600 * 1000;

function getYear(date) {
  return new Date(date).getFullYear();
}

function createYear(year) {
  return new Date(year, 0, 1).getTime();
}

function getMonth(date) {
  return new Date(date).getMonth();
}

function diffMonth(min, max) {
  const minYear = getYear(min);
  const maxYear = getYear(max);
  const minMonth = getMonth(min);
  const maxMonth = getMonth(max);
  return (maxYear - minYear) * 12 + (maxMonth - minMonth) % 12;
}

function creatMonth(year, month) {
  return new Date(year, month, 1).getTime();
}

function diffDay(min, max) {
  return Math.ceil((max - min) / DAY_MS);
}

function diffHour(min, max) {
  return Math.ceil((max - min) / HOUR_MS);
}

function diffMinus(min, max) {
  return Math.ceil((max - min) / (60 * 1000));
}

module.exports = function(info) {
  const minInterval = info.minInterval;
  const ticks = [];
  let min = info.min;
  let max = info.max;
  let interval = info.interval;
  let count;

  // 如果最大值和最小值相等，则设置最大值大于最小值一天
  if (max === min) {
    max = min + DAY_MS;
  }

  // 计算间距
  if (Util.isNil(interval)) {
    const innerTime = max - min;
    const dms = DAY_MS; // 天代表的秒
    const yms = 365 * dms; // 年代表的秒
    interval = parseInt(innerTime / (info.maxCount || MAX_COUNT), 10);
    if (minInterval && minInterval > interval) {
      interval = minInterval;
    }
    const yfactor = interval / yms;
    const minYear = getYear(min);
    // 大于半年
    if (yfactor > 0.51) {
      const year = Math.ceil(yfactor);
      // interval = year * yms;
      const maxYear = getYear(max);

      for (let i = minYear; i <= maxYear + year; i = i + year) {
        ticks.push(createYear(i));
      }
      interval = null;
    } else if (yfactor > 0.0834) { // 大于一个月
      const month = Math.ceil(yfactor / 0.0834);
      const mmMoth = getMonth(min);
      const dMonths = diffMonth(min, max);

      for (let i = 0; i <= dMonths + month; i = i + month) {
        ticks.push(creatMonth(minYear, i + mmMoth));
      }
      interval = null;

    } else if (interval > dms * 0.5) { // 大于一天
      const date = new Date(min);
      const year = date.getFullYear();
      const month = date.getMonth(min);
      const mday = date.getDate();
      const day = Math.ceil(interval / dms);
      const ddays = diffDay(min, max);
      interval = day * dms;
      for (let i = 0; i < ddays + day; i = i + day) {
        ticks.push(new Date(year, month, mday + i).getTime());
      }

    } else if (interval > HOUR_MS) { // 大于一个小时
      const date = new Date(min);
      const year = date.getFullYear();
      const month = date.getMonth(min);
      const day = date.getDate();
      const hour = date.getHours();
      const hours = AutoUtil.snapTo(SNAP_ARRAY, Math.ceil(interval / HOUR_MS));
      const dHours = diffHour(min, max);
      interval = hours * HOUR_MS;

      for (let i = 0; i <= dHours + hours; i = i + hours) {
        ticks.push(new Date(year, month, day, hour + i).getTime());
      }

    } else if (interval > MINUTE_MS) { // 最小单位是分钟
      const dMinus = diffMinus(min, max);
      const minutes = Math.ceil(interval / MINUTE_MS);
      interval = minutes * MINUTE_MS;

      for (let i = 0; i <= dMinus + minutes; i = i + minutes) {
        ticks.push(min + i * MINUTE_MS);
      }
    } else {
      if (interval < 1000) {
        interval = 1000;
      }
      min = Math.floor(min / 1000) * 1000;
      const dSeconds = Math.ceil((max - min) / 1000);
      const seconds = Math.ceil(interval / 1000);
      interval = seconds * 1000;

      for (let i = 0; i < dSeconds + seconds; i = i + seconds) {
        ticks.push(min + i * 1000);
      }
    }

  }

  if (!ticks.length) {
    min = Math.floor(min / 1000) * 1000;
    max = Math.ceil(max / 1000) * 1000;
    count = (max - min) / interval;
    for (let i = 0; i <= count; i++) {
      ticks.push(Util.fixedBase(interval * i + min, interval));
    }
  }

  return {
    max,
    min,
    interval,
    ticks,
    count: ticks.length
  };
};
