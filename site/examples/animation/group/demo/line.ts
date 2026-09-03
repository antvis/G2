/**
 * A recreation of this demo: https://canisjs.github.io/canis-editor/index.html?exmp=purchases_1
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/doughnut-purchases.json',
  },
  children: [
    {
      type: 'line',
      encode: {
        x: 'year',
        y: 'count',
        color: 'year',
        shape: 'smooth',
      },
      scale: {
        y: { zero: true, nice: true },
      },
      style: {
        gradient: 'x',
        gradientColor: 'start',
      },
      animate: {
        enter: { type: 'pathIn', duration: 3000 },
      },
      axis: {
        y: { labelFormatter: '~s' },
      },
    },
    {
      type: 'point',
      transform: [{ type: 'stackEnter' }],
      encode: {
        x: 'year',
        y: 'count',
        color: 'year',
        shape: 'point',
      },
      animate: {
        enter: { duration: 300 },
      },
    },
    {
      type: 'text',
      transform: [{ type: 'stackEnter' }],
      encode: {
        x: 'year',
        y: 'count',
        text: 'year',
      },
      animate: {
        enter: { duration: 300 },
      },
      style: {
        lineWidth: 5,
        stroke: '#fff',
        textAlign: 'center',
        dy: -8,
      },
    },
  ],
});

chart.render();
