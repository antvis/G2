import { Chart } from '../src';
// 有必要的话，请在需要注意的地方加上注释

const chart = new Chart({ container: 'container', autoFit: true });

// ========== spec 风格模板 ==========
// chart.options({
//   type: 'interval',
//   autoFit: true,
//   data: [
//     { letter: 'A', frequency: 0.08167 },
//     { letter: 'B', frequency: 0.01492 },
//     { letter: 'C', frequency: 0.02782 },
//     { letter: 'D', frequency: 0.04253 },
//     { letter: 'E', frequency: 0.12702 },
//     { letter: 'F', frequency: 0.02288 },
//     { letter: 'G', frequency: 0.02015 },
//   ],
//   encode: { x: 'letter', y: 'frequency' },
// });

// // ========== api 风格模板 ==========
const data = [
  { month: 'Jan', city: 'Tokyo', temperature: 7 },
  { month: 'Jan', city: 'London', temperature: 3.9 },
  { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
  { month: 'Feb', city: 'London', temperature: 4.2 },
  { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
  { month: 'Mar', city: 'London', temperature: 5.7 },
  { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
  { month: 'Apr', city: 'London', temperature: 8.5 },
  { month: 'May', city: 'Tokyo', temperature: 18.4 },
  { month: 'May', city: 'London', temperature: 11.9 },
  { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
  { month: 'Jun', city: 'London', temperature: 15.2 },
  { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
  { month: 'Jul', city: 'London', temperature: 17 },
  // { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
  { month: 'Aug', city: 'London', temperature: 16.6 },
  { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
  { month: 'Sep', city: 'London', temperature: 14.2 },
  { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
  { month: 'Oct', city: 'London', temperature: 10.3 },
  { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
  { month: 'Nov', city: 'London', temperature: 6.6 },
  { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
  { month: 'Dec', city: 'London', temperature: 4.8 },
];

chart
  .data(data)
  .encode('x', 'month')
  .encode('y', 'temperature')
  .encode('color', 'city')
  .scale('x', {
    range: [0, 1],
  })
  .scale('y', {
    nice: true,
  })
  .axis('y', { labelFormatter: (d) => d + '°C' });

chart.line().encode('shape', 'smooth');

chart.point().encode('shape', 'point').tooltip(false);

chart.render();
