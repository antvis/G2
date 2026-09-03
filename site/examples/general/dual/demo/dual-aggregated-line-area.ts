/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_dual_axis.html
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
    value: 'https://assets.antv.antgroup.com/g2/weather.json',
    transform: [
      {
        type: 'filter',
        callback: (d) => d.location === 'Seattle',
      },
    ],
  },
  children: [
    {
      type: 'area',
      transform: [{ type: 'groupX', y: 'mean', y1: 'mean' }],
      encode: {
        x: (d) => new Date(d.date).getUTCMonth(),
        y: ['temp_max', 'temp_min'],
      },
      scale: {
        y: { nice: true },
      },
      axis: {
        y: {
          title: 'Avg. Temperature (°C)',
          titleFill: '#85C5A6',
        },
      },
      style: {
        fill: '#85c5A6',
        fillOpacity: 0.3,
      },
      tooltip: {
        items: [
          { channel: 'y', valueFormatter: '.1f' },
          { channel: 'y1', valueFormatter: '.1f' },
        ],
      },
    },
    {
      type: 'line',
      transform: [{ type: 'groupX', y: 'mean' }],
      encode: {
        x: (d) => new Date(d.date).getMonth(),
        y: 'precipitation',
        shape: 'smooth',
      },
      style: {
        stroke: 'steelblue',
      },
      scale: {
        y: { independent: true },
      },
      axis: {
        y: {
          position: 'right',
          grid: null,
          title: 'Precipitation (inches)',
          titleFill: 'steelblue',
        },
      },
      tooltip: {
        items: [{ channel: 'y', valueFormatter: '.1f' }],
      },
    },
  ],
});

chart.render();
