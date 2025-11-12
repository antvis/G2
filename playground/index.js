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
  { letter: 'A', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02782 },
  { letter: 'D', frequency: 0.04253 },
  { letter: 'E', frequency: 0.12702 },
  { letter: 'F', frequency: 0.02288 },
  { letter: 'G', frequency: 0.02015 },
];
chart
  .interval()
  .data(data)
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .scale('y', {
    nice: 1,
    tickMethod: (a, b, c, d) => {
      console.log({ a, b, c, d });
      return [0, 0.04, 0.08, 0.12, 0.14, 0.16];
    },
  });

chart.render();
