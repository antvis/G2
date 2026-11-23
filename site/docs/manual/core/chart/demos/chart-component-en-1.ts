import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'point',
  height: 600,
  width: 700,
  margin: 100,
  padding: 60,
  paddingLeft: 100, // 单独设置paddingLeft的优先级比padding高
  insetLeft: 30,
  insetRight: 30,

  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/commits.json',
  },
  encode: {
    x: (d) => new Date(d.time).getUTCHours(),
    y: (d) => new Date(d.time).getUTCDay(),
    size: 'count',
    shape: 'point',
  },
  transform: [{ type: 'group', size: 'sum' }, { type: 'sortY' }],
  scale: { y: { type: 'point' } },
  style: { shape: 'point', fill: '#76b7b2' },
  axis: {
    x: { title: 'time (hours)', tickCount: 24 },
    y: { title: 'time (day)', grid: true },
  },
  legend: false,
  viewStyle: {
    viewFill: '#DCEEFE',
    plotFill: '#A2D4F6',
    mainFill: '#FFC6A1',
    contentFill: '#FF8E72',
  },
});

chart.render();
