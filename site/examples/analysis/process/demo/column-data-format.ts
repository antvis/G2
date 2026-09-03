/**
 * The column-major data format example.
 * Instead of passing row-major data (array of objects),
 * you can now pass column-major data (object with arrays).
 */

import { Chart } from '@antv/g2';

const container = document.getElementById('container');
const chart = new Chart({
  container,
  width: 640,
  height: 480,
});

// Column-major data format
const columnData = {
  'Sepal.Length': [5.1, 4.9, 4.7, 4.6, 5, 5.4],
  'Sepal.Width': [3.5, 3, 3.2, 3.1, 3.6, 3.9],
  'Petal.Length': [1.4, 1.4, 1.3, 1.5, 1.4, 1.7],
  'Petal.Width': [0.2, 0.2, 0.2, 0.2, 0.2, 0.4],
  Species: ['setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa'],
};

chart.options({
  type: 'view',
  data: {
    type: 'column',
    value: columnData,
  },
  children: [
    {
      type: 'point',
      encode: {
        x: 'Sepal.Length',
        y: 'Sepal.Width',
        color: 'Species',
      },
    },
  ],
});

chart.render();
