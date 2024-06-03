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

KChart.data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/antvdemo/assets/data/candle-sticks.json',
  transform: [
    {
      type: 'sort',
      callback: (a, b) => {
        return new Date(a.time).getTime() - new Date(b.time).getTime();
      },
    },
    {
      type: 'map',
      callback: (obj) => {
        const trend = Math.sign(obj.start - obj.end);
        obj.trend = trend > 0 ? '下跌' : trend === 0 ? '不变' : '上涨';
        obj.link = [obj.min, obj.max];
        obj.interval = [obj.start, obj.end];
        return obj;
      },
    },
  ],
}).scale('color', {
  domain: ['下跌', '不变', '上涨'],
  range: ['#4daf4a', '#999999', '#e41a1c'],
});

KChart.link()
  .encode('x', 'time')
  .encode('y', ['min', 'max'])
  .encode('color', 'trend')
  .tooltip({
    title: 'time',
    items: [
      { field: 'start', name: '开盘价' },
      { field: 'end', name: '收盘价' },
      { field: 'min', name: '最低价' },
      { field: 'max', name: '最高价' },
    ],
  });

KChart.interval()
  .encode('x', 'time')
  .encode('y', ['start', 'end'])
  .encode('color', 'trend')
  .style('fillOpacity', 1)
  .style('stroke', (d) => {
    if (d.trend === '不变') return '#999999';
  })
  .axis('x', {
    title: false,
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

const ColumnChart = new Chart({
  container: 'columnChart',
  autoFit: true,
  paddingTop: 0,
  paddingBottom: 0,
  height: 180,
  paddingLeft: 60,
});

ColumnChart.data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/antvdemo/assets/data/candle-sticks.json',
  transform: [
    {
      type: 'sort',
      callback: (a, b) => {
        return new Date(a.time).getTime() - new Date(b.time).getTime();
      },
    },
    {
      type: 'map',
      callback: (obj) => {
        const trend = Math.sign(obj.start - obj.end);
        obj.trend = trend > 0 ? '下跌' : trend === 0 ? '不变' : '上涨';
        obj.link = [obj.min, obj.max];
        obj.interval = [obj.start, obj.end];
        return obj;
      },
    },
  ],
}).scale('color', {
  domain: ['下跌', '不变', '上涨'],
  range: ['#4daf4a', '#999999', '#e41a1c'],
});

ColumnChart.interval()
  .encode('x', 'time')
  .encode('y', 'volumn')
  .encode('color', 'trend')
  .axis('x', false)
  .axis('y', {
    title: false,
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
