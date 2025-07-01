import { transform } from 'typescript';
import { Chart } from '../src';
// 有必要的话，请在需要注意的地方加上注释

const chart = new Chart({ container: 'container' });

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

chart.options({
  // theme: 'classicDark',
  type: 'interval',
  scale: {
    color: { range: ['#444'] },
  },
  autoFit: true,
  data: [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02782 },
    { letter: 'D', frequency: 0.04253 },
    { letter: 'E', frequency: 0.12702 },
    { letter: 'F', frequency: 0.02288 },
    { letter: 'H', frequency: 0.06094 },
    { letter: 'I', frequency: 0.02288 },
  ],
  encode: { x: 'letter', y: 'frequency', color: () => 'bar' },
  labels: [
    {
      text: 'frequency',
      transform: [
        {
          type: 'contrastReverse',
        },
        // {
        //   type: 'contrastReverseStroke',
        // },
      ],
    },
  ],
});

chart.render();
