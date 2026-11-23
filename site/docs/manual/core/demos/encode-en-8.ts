import { Chart } from '@antv/g2';

const I = [0, 1, 2, 3, 4];
const X = I.map((i) => ((i - 2) * Math.PI) / 2);
const Y = X.map((x) => Math.sin(x));

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: I,
  encode: {
    x: {
      type: 'column',
      value: X,
    },
    y: {
      type: 'column',
      value: Y,
    },
    shape: 'smooth',
  },
});

chart.render();
