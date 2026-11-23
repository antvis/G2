import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  coordinate: {
    type: 'parallel',
    transform: [{ type: 'transpose' }],
  },
  data: [
    { dim1: 10, dim2: 30, dim3: 20, dim4: 60, category: 'A' },
    { dim1: 20, dim2: 20, dim3: 30, dim4: 40, category: 'B' },
    { dim1: 30, dim2: 10, dim3: 40, dim4: 20, category: 'C' },
  ],
  encode: {
    position: ['dim1', 'dim2', 'dim3', 'dim4'],
    color: 'category',
  },
  style: {
    lineWidth: 2,
    strokeOpacity: 0.7,
  },
  scale: {
    color: {
      palette: 'spectral',
    },
  },
  axis: {
    position: { zIndex: 1 },
    position1: { zIndex: 1 },
    position2: { zIndex: 1 },
    position3: { zIndex: 1 },
  },
});

chart.render();
