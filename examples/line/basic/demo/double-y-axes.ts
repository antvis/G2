import { Chart } from '@antv/g2';

const SECOND = 1000;
const MINUTE = 1000 * 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function toInteger(number, fix = 1) {
  if (Math.round(number) === number) {
    return number;
  }
  return Number(number).toFixed(fix);
}

function humanizeDuration(duration, fix = 1) {
  if (duration === 0) {
    return '0';
  }
  if (duration < MINUTE) {
    return toInteger(duration / SECOND, fix) + ' 秒';
  }
  if (duration < HOUR) {
    return toInteger(duration / MINUTE, fix) + ' 分';
  }
  if (duration < DAY) {
    return toInteger(duration / HOUR, fix) + '小时';
  }
  return toInteger(duration / HOUR / 24, fix) + ' 天';
}

const data = [
  { date: 1489593600000, pv: 17, time: 12351000 },
  { date: 1489680000000, pv: 10, time: 18000 },
  { date: 1489766400000, pv: 3, time: 0 },
  { date: 1489852800000, pv: 3, time: 0 },
  { date: 1489939200000, pv: 18, time: 21157000 },
  { date: 1490025600000, pv: 32, time: 3543000 },
  { date: 1490112000000, pv: 25, time: 10000 },
  { date: 1490198400000, pv: 23, time: 24000 },
  { date: 1490284800000, pv: 7, time: 0 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.data(data);
chart.scale({
  date: {
    alias: '日期',
    type: 'time',
  },
  pv: {
    alias: '进入次数',
    min: 0,
    sync: true, // 将 pv 字段数值同 time 字段数值进行同步
    nice: true,
  },
  time: {
    alias: '平均时长',
    formatter: (value) => {
      return humanizeDuration(value, 0);
    },
    sync: true,  // 将 pv 字段数值同 time 字段数值进行同步
    nice: true,
  },
  count: {
    alias: '次数',
  },
});

chart.axis('time', {
  grid: null,
  title: {},
});
chart.axis('pv', {
  title: {},
});

chart.tooltip({
  showCrosshairs: true,
  shared: true,
});

chart
  .line()
  .position('date*pv')
  .color('#4FAAEB');
chart
  .line()
  .position('date*time')
  .color('#9AD681')
  .shape('dash');
chart.render();
