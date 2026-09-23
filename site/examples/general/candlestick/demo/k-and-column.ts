import { Chart } from '@antv/g2';

document.getElementById('container').innerHTML = `
  <div id="kChart" ></div>
  <div id="columnChart"></div>
`;

const KChart = new Chart({
  container: 'kChart',
  autoFit: true,
  height: 360,
  paddingLeft: 60,
});

const dataSource = {
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/antvdemo/assets/data/candle-sticks.json',
};

const tooltip = {
  title: 'time',
  items: [
    { field: 'start', name: '开盘价' },
    { field: 'end', name: '收盘价' },
    { field: 'min', name: '最低价' },
    { field: 'max', name: '最高价' },
  ],
};

const scale = {
  x: {
    compare: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  },
  color: {
    domain: ['下跌', '不变', '上涨'],
    range: ['#4daf4a', '#999999', '#e41a1c'],
  },
};

KChart.options({
  type: 'view',
  data: dataSource,
  encode: {
    x: 'time',
    color: (d) => {
      const trend = Math.sign(d.start - d.end);
      return trend > 0 ? '下跌' : trend === 0 ? '不变' : '上涨';
    },
  },
  scale,
  children: [
    {
      type: 'link',
      encode: { y: ['min', 'max'] },
      tooltip,
    },
    {
      type: 'interval',
      encode: { y: ['start', 'end'] },
      style: {
        fillOpacity: 1,
        stroke: (d) => {
          if (d.start === d.end) return '#999999';
        },
      },
      axis: {
        x: {
          title: false,
        },
        y: {
          title: false,
        },
      },
      tooltip,
    },
  ],
});

const ColumnChart = new Chart({
  container: 'columnChart',
  autoFit: true,
  paddingTop: 0,
  paddingBottom: 0,
  height: 180,
  paddingLeft: 60,
});

ColumnChart.options({
  type: 'interval',
  data: dataSource,
  encode: {
    x: 'time',
    y: 'volumn',
    color: (d) => {
      const trend = Math.sign(d.start - d.end);
      return trend > 0 ? '下跌' : trend === 0 ? '不变' : '上涨';
    },
  },
  scale,
  axis: {
    x: false,
    y: {
      title: false,
    },
  },
});

KChart.on('legend:filter', (e) => {
  const { nativeEvent, data } = e;
  if (!nativeEvent) return;
  ColumnChart.emit('legend:filter', { data });
});

KChart.on('legend:reset', (e) => {
  const { nativeEvent, data } = e;
  if (!nativeEvent) return;
  ColumnChart.emit('legend:reset', { data });
});

KChart.render();
ColumnChart.render();
