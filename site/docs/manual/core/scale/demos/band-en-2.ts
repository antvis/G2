import { Chart } from '@antv/g2';

const data = [
  { category: 'A', value: 100 },
  { category: 'B', value: 80 },
  { category: 'C', value: 120 },
  { category: 'D', value: 90 },
];

const charts = [
  { paddingOuter: 0, title: 'paddingOuter: 0' },
  { paddingOuter: 0.3, title: 'paddingOuter: 0.3' },
  { paddingOuter: 0.6, title: 'paddingOuter: 0.6' },
];

charts.forEach((config, index) => {
  const container = document.createElement('div');
  container.style.width = '300px';
  container.style.height = '200px';
  container.style.display = 'inline-block';
  container.style.margin = '10px';
  document.getElementById('container').appendChild(container);

  const chart = new Chart({
    container,
    autoFit: true,
  });

  chart.options({
    type: 'interval',
    data,
    encode: {
      x: 'category',
      y: 'value',
      color: 'category',
    },
    scale: {
      x: {
        type: 'band',
        paddingInner: 0.2,
        paddingOuter: config.paddingOuter,
      },
    },
    axis: {
      x: { title: config.title },
      y: { title: null },
    },
  });

  chart.render();
});
