/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_precipitation_mean.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// groupX 为分组并对指定的通道进行聚合，可以理解为把数据通过 y 通道的数据聚合， 然后取平均值(mean) 变更为一条数据。
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
      encode: {
        x: (d) => new Date(d.date).getUTCMonth(),
        y: 'precipitation',
      },
      scale: {
        y: { tickCount: 5, domainMax: 6 },
      },
      tooltip: {
        items: [{ channel: 'y', valueFormatter: '.2f' }],
      },
    },
    {
      type: 'lineY',
      transform: [{ type: 'groupX', y: 'mean' }],
      encode: {
        y: 'precipitation',
      },
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
