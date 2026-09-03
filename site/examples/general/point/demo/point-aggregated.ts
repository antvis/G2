/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/circle_github_punchcard.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 360,
  inset: 10,
});

chart.options({
  type: 'view',
  style: {
    mainStroke: 'black',
  },
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/commits.json',
      },
      transform: [{ type: 'group', size: 'sum' }, { type: 'sortY' }],
      axis: {
        x: { title: 'time (hours)', tickCount: 24 },
        y: { title: 'time (day)', grid: true },
      },
      scale: {
        y: { type: 'point' },
      },
      encode: {
        x: (d) => new Date(d.time).getUTCHours(),
        y: (d) => new Date(d.time).getUTCDay(),
        size: 'count',
        color: 'count',
        shape: 'point',
      },
    },
  ],
});

chart.render();
