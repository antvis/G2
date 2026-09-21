import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  coordinate: {
    transform: [
      {
        type: 'fisheye',
        focusX: 0.7,
        focusY: 0.3,
        distortionX: 3,
        distortionY: 3,
      },
    ],
  },
  type: 'point',
  data: [
    { x: 1, y: 1, category: 'A' },
    { x: 2, y: 2, category: 'B' },
    { x: 3, y: 3, category: 'C' },
    { x: 4, y: 4, category: 'D' },
    { x: 5, y: 5, category: 'E' },
    { x: 6, y: 6, category: 'F' },
    { x: 7, y: 7, category: 'G' },
    { x: 8, y: 8, category: 'H' },
    { x: 9, y: 9, category: 'I' },
  ],
  encode: {
    x: 'x',
    y: 'y',
    color: 'category',
    shape: 'point',
  },
  style: {
    r: 6,
    lineWidth: 1,
  },
});

chart.render();
