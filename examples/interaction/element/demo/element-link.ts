import { Chart, registerInteraction } from '@antv/g2';

registerInteraction('element-link', {
  start: [
    {trigger: 'interval:mouseenter', action: 'element-link-by-color:link'}
  ],
  end: [
    {trigger: 'interval:mouseleave', action: 'element-link-by-color:unlink'}
  ]
});

const data = [
  { year: '2014', type: 'Sales', sales: 1000 },
  { year: '2015', type: 'Sales', sales: 1170 },
  { year: '2016', type: 'Sales', sales: 660 },
  { year: '2017', type: 'Sales', sales: 1030 },
  { year: '2014', type: 'Expenses', sales: 400 },
  { year: '2015', type: 'Expenses', sales: 460 },
  { year: '2016', type: 'Expenses', sales: 1120 },
  { year: '2017', type: 'Expenses', sales: 540 },
  { year: '2014', type: 'Profit', sales: 300 },
  { year: '2015', type: 'Profit', sales: 300 },
  { year: '2016', type: 'Profit', sales: 300 },
  { year: '2017', type: 'Profit', sales: 350 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.data(data);
chart.scale({
  sales: {
    max: 2400,
    tickInterval: 600,
    nice: true,
  },
});

chart.tooltip({
  showMarkers: false
});

chart
  .interval()
  .position('year*sales')
  .color('type')
  .adjust('stack');

chart.interaction('element-highlight-by-color');
chart.interaction('element-link');

chart.render();
