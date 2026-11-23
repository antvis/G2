/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_precipitation_mean.html
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
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  },
  children: [
    {
      type: 'interval',
      transform: [{ type: 'groupX', y: 'mean' }],
      encode: { x: (d) => new Date(d.date).getUTCMonth(), y: 'precipitation' },
      scale: { y: { tickCount: 5, domainMax: 6 } },
      tooltip: { channel: 'y', valueFormatter: '.2f' },
    },
    {
      type: 'lineY',
      transform: [{ type: 'groupX', y: 'mean' }],
      encode: { y: 'precipitation' },
      style: {
        stroke: '#F4664A',
        strokeOpacity: 1,
        lineWidth: 2,
        lineDash: [3, 3],
      },
    },
  ],
});

chart.render();
