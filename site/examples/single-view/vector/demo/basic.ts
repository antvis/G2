import { Chart } from '@antv/g2';

const data = [
  { year: '1951 年', value: 38 },
  { year: '1952 年', value: 52 },
  { year: '1956 年', value: 61 },
  { year: '1957 年', value: 145 },
  { year: '1958 年', value: 48 },
];

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data(data)
  .encode('x', 'year')
  .encode('y', 'value')
  .encode('color', 'steelblue')
  .axis('y', { tickFormatter: '.0%' });

chart.render();
