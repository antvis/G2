import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { year: '1991', value: 1 },
    { year: '1992', value: 4 },
    { year: '1993', value: 9 },
    { year: '1994', value: 16 },
    { year: '1995', value: 25 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { y: { type: 'sqrt' } },
  children: [
    { type: 'line', labels: [{ text: 'value', style: { dx: -10, dy: -12 } }] },
    { type: 'point', style: { fill: 'white' }, tooltip: false },
  ],
});

chart.render();
