import { Chart } from '@antv/g2';

const fruits = [
  { type: 'Apple', year: '2001', value: 260 },
  { type: 'Orange', year: '2001', value: 100 },
  { type: 'Banana', year: '2001', value: 90 },
  { type: 'Apple', year: '2002', value: 210 },
  { type: 'Orange', year: '2002', value: 150 },
  { type: 'Banana', year: '2002', value: 30 },
];

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data(fruits)
  .transform({ type: 'stackEnter', groupBy: 'color' })
  .transform({ type: 'dodgeX' })
  .encode('x', 'year')
  .encode('y', 'value')
  .encode('color', 'type')
  .encode('color', 'type')
  .animate('enter', { duration: 500 });

chart.render();
