import { Chart } from '@antv/g2';

const data = [
  {
    time: '2015-11-19',
    start: 8.18,
    max: 8.33,
    min: 7.98,
    end: 8.32,
    volumn: 1810,
    money: 14723.56,
  },
  {
    time: '2015-11-18',
    start: 8.37,
    max: 8.6,
    min: 8.03,
    end: 8.09,
    volumn: 2790.37,
    money: 23309.19,
  },
  {
    time: '2015-11-17',
    start: 8.7,
    max: 8.78,
    min: 8.32,
    end: 8.37,
    volumn: 3729.04,
    money: 31709.71,
  },
  {
    time: '2015-11-16',
    start: 8.18,
    max: 8.69,
    min: 8.05,
    end: 8.62,
    volumn: 3095.44,
    money: 26100.69,
  },
  {
    time: '2015-11-13',
    start: 8.01,
    max: 8.75,
    min: 7.97,
    end: 8.41,
    volumn: 5815.58,
    money: 48562.37,
  },
  {
    time: '2015-11-12',
    start: 7.76,
    max: 8.18,
    min: 7.61,
    end: 8.15,
    volumn: 4742.6,
    money: 37565.36,
  },
  {
    time: '2015-11-11',
    start: 7.55,
    max: 7.81,
    min: 7.49,
    end: 7.8,
    volumn: 3133.82,
    money: 24065.42,
  },
  {
    time: '2015-11-10',
    start: 7.5,
    max: 7.68,
    min: 7.44,
    end: 7.57,
    volumn: 2670.35,
    money: 20210.58,
  },
  {
    time: '2015-11-09',
    start: 7.65,
    max: 7.66,
    min: 7.3,
    end: 7.58,
    volumn: 2841.79,
    money: 21344.36,
  },
  {
    time: '2015-11-06',
    start: 7.52,
    max: 7.71,
    min: 7.48,
    end: 7.64,
    volumn: 2725.44,
    money: 20721.51,
  },
  {
    time: '2015-11-05',
    start: 7.48,
    max: 7.57,
    min: 7.29,
    end: 7.48,
    volumn: 3520.85,
    money: 26140.83,
  },
  {
    time: '2015-11-04',
    start: 7.01,
    max: 7.5,
    min: 7.01,
    end: 7.46,
    volumn: 3591.47,
    money: 26285.52,
  },
  {
    time: '2015-11-03',
    start: 7.1,
    max: 7.17,
    min: 6.82,
    end: 7,
    volumn: 2029.21,
    money: 14202.33,
  },
  {
    time: '2015-11-02',
    start: 7.09,
    max: 7.44,
    min: 6.93,
    end: 7.17,
    volumn: 3191.31,
    money: 23205.11,
  },
  {
    time: '2015-10-30',
    start: 6.98,
    max: 7.27,
    min: 6.84,
    end: 7.18,
    volumn: 3522.61,
    money: 25083.44,
  },
  {
    time: '2015-10-29',
    start: 6.94,
    max: 7.2,
    min: 6.8,
    end: 7.05,
    volumn: 2752.27,
    money: 19328.44,
  },
  {
    time: '2015-10-28',
    start: 7.01,
    max: 7.14,
    min: 6.8,
    end: 6.85,
    volumn: 2311.11,
    money: 16137.32,
  },
  {
    time: '2015-10-27',
    start: 6.91,
    max: 7.31,
    min: 6.48,
    end: 7.18,
    volumn: 3172.9,
    money: 21827.3,
  },
  {
    time: '2015-10-26',
    start: 6.9,
    max: 7.08,
    min: 6.87,
    end: 6.95,
    volumn: 2769.31,
    money: 19337.44,
  },
  {
    time: '2015-10-23',
    start: 6.71,
    max: 6.85,
    min: 6.58,
    end: 6.79,
    volumn: 2483.18,
    money: 16714.31,
  },
  {
    time: '2015-10-22',
    start: 6.38,
    max: 6.67,
    min: 6.34,
    end: 6.65,
    volumn: 2225.88,
    money: 14465.56,
  },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .data(data)
  .encode('x', 'time')
  .encode('color', (d) => {
    const trend = Math.sign(d.start - d.end);
    return trend > 0 ? '下跌' : trend === 0 ? '不变' : '上涨';
  })
  .scale('x', {
    compare: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  })
  .scale('color', {
    domain: ['下跌', '不变', '上涨'],
    range: ['#4daf4a', '#999999', '#e41a1c'],
  });

chart
  .link()
  .encode('y', ['min', 'max'])
  .tooltip({
    title: 'time',
    items: [
      { field: 'start', name: '开盘价' },
      { field: 'end', name: '收盘价' },
      { field: 'min', name: '最低价' },
      { field: 'max', name: '最高价' },
    ],
  });

chart
  .interval()
  .encode('y', ['start', 'end'])
  .style('fillOpacity', 1)
  .style('stroke', (d) => {
    if (d.start === d.end) return '#999999';
  })
  .axis('y', {
    title: false,
  })
  .tooltip({
    title: 'time',
    items: [
      { field: 'start', name: '开盘价' },
      { field: 'end', name: '收盘价' },
      { field: 'min', name: '最低价' },
      { field: 'max', name: '最高价' },
    ],
  });

chart.render();
