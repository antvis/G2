import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 400,
  height: 400,
  autoFit: false,
});
chart.data([
  { year: '1991', value: 13 },
  { year: '1992', value: 34 },
  { year: '1993', value: 5 },
  { year: '1994', value: 34 },
  { year: '1995', value: 20 },
  { year: '1996', value: 7 },
  { year: '1997', value: 23 },
  { year: '1998', value: 90 },
  { year: '1999', value: 3 },
]);
chart.tooltip({
  showCrosshairs: true,
});
chart
  .line()
  .position('year*value')
  .animate(false);
chart.render();
