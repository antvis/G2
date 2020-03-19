import { Chart } from '@antv/g2';

const data = [
  { title: 'Revenue', subtitle: 'US$, in thousands', ranges: [150, 225, 300], actual: 270, target: 250 },
  { title: 'Profit', subtitle: '%', ranges: [20, 25, 30], actual: 23, target: 26 },
  { title: 'Order Size', subtitle: 'US$, average', ranges: [350, 500, 600], actual: 100, target: 550 },
  { title: 'New Customers', subtitle: 'count', ranges: [1400, 2000, 2500], actual: 1650, target: 2100 },
  { title: 'Satisfaction', subtitle: 'out of 5', ranges: [3.5, 4.25, 5], actual: 3.2, target: 4.4 }
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});
chart.legend(false); // 不展示图例

let y = 0;
const yGap = 0.1;
for (let i = 0, l = data.length; i < l; i++) {
  const ranges = data[i].ranges;
  const view = chart.createView({
    region: {
      start: {
        x: 0,
        y
      },
      end: {
        x: 1,
        y: y + yGap
      }
    },
    padding: [15, 120, 10]
  });
  view.data([data[i]]);
  view.scale({
    actual: {
      min: 0,
      max: ranges[2],
    },
    target: {
      min: 0,
      max: ranges[2],
    }
  });
  view.coordinate().transpose();
  view.axis('target', false);
  view.axis('actual', {
    position: 'right'
  });
  view.point()
    .position('title*target')
    .color('#square')
    .shape('line')
    .size(12)
    .style({
      lineWidth: 2
    });
  view.interval()
    .position('title*actual')
    .color('#223273')
    .size(15);
  // 差
  view.annotation().region({
    start: ['start', 0],
    end: ['end', ranges[0]],
    style: {
      fill: '#FFA39E',
      fillOpacity: 0.85
    }
  });
  // 良
  view.annotation().region({
    start: ['start', ranges[0]],
    end: ['end', ranges[1]],
    style: {
      fill: '#FFD591',
      fillOpacity: 0.85
    }
  });
  // 优
  view.annotation().region({
    start: ['start', ranges[1]],
    end: ['end', ranges[2]],
    style: {
      fill: '#A7E8B4',
      fillOpacity: 0.85
    }
  });
  y += yGap + 0.125;
}
chart.legend({
  custom: true,
  items: [
    {
      value: '差',
      name: '差',
      marker: { symbol: 'square', style: { fill: '#FFA39E', r: 5 } }
    },
    {
      value: '良',
      name: '良',
      marker: { symbol: 'square', style: { fill: '#FFD591', r: 5 } }
    },
    {
      value: '优',
      name: '优',
      marker: { symbol: 'square', style: { fill: '#A7E8B4', r: 5 } }
    },
    {
      value: '实际值',
      name: '实际值',
      marker: { symbol: 'square', style: { fill: '#223273', r: 5 } }
    },
    {
      value: '目标值',
      name: '目标值',
      marker: { symbol: 'line', style: { stroke: '#262626', r: 5 } }
    }
  ]
});

chart.removeInteraction('legend-filter'); // 自定义图例，移除默认的分类图例筛选交互
chart.render();
