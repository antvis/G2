/**
 * Example: Column-major data format support
 *
 * G2 now supports passing data in column-major format (also known as columnar format),
 * where data is organized as an object with column names as keys and arrays as values.
 *
 * This is useful for:
 * 1. Scientific computing and data analysis workflows
 * 2. Data serialization where column-major format is more compact
 * 3. When data comes from libraries that use column-major format
 *
 * Example:
 * Column-major format:
 * {
 *   "x": [1, 2, 3, 4, 5],
 *   "y": [10, 20, 15, 25, 30],
 *   "category": ["A", "B", "A", "B", "A"]
 * }
 *
 * Equivalent row-major format (traditional):
 * [
 *   { "x": 1, "y": 10, "category": "A" },
 *   { "x": 2, "y": 20, "category": "B" },
 *   { "x": 3, "y": 15, "category": "A" },
 *   { "x": 4, "y": 25, "category": "B" },
 *   { "x": 5, "y": 30, "category": "A" }
 * ]
 */

import { Chart } from '@antv/g2';

const container = document.getElementById('container');
const chart = new Chart({
  container,
  width: 640,
  height: 480,
});

// Column-major data format
const irisData = {
  'Sepal.Length': [5.1, 4.9, 4.7, 4.6, 5.0, 5.4, 4.6, 5.0, 4.4, 4.9],
  'Sepal.Width': [3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1],
  'Petal.Length': [1.4, 1.4, 1.3, 1.5, 1.4, 1.7, 1.4, 1.5, 1.4, 1.5],
  'Petal.Width': [0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.1],
  Species: [
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
  ],
};

// Method 1: Explicit column type
chart.data({
  type: 'column',
  value: irisData,
});

// Method 2: Auto-detection (also works)
// chart.data(irisData);

chart
  .point()
  .encode('x', 'Sepal.Length')
  .encode('y', 'Sepal.Width')
  .encode('color', 'Species')
  .encode('size', 'Petal.Length');

chart.interaction('element-tooltip');

chart.render();
