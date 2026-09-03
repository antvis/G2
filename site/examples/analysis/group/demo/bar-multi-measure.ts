/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/bar_grouped_repeated.html
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
    value: 'https://assets.antv.antgroup.com/g2/movies.json',
  },
  children: [
    {
      type: 'interval',
      transform: [{ type: 'groupX', y: 'sum' }],
      axis: {
        y: { labelFormatter: '~s' },
        x: { labelTransform: 'rotate(90)' },
      },
      encode: {
        x: 'Major Genre',
        y: 'Worldwide Gross',
        series: () => 'Worldwide Gross',
        color: () => 'Worldwide Gross',
      },
      tooltip: {
        items: [{ channel: 'y', valueFormatter: '~s' }],
      },
    },
    {
      type: 'interval',
      transform: [{ type: 'groupX', y: 'sum' }],
      encode: {
        x: 'Major Genre',
        y: 'US Gross',
        color: () => 'US Gross',
        series: () => 'US Gross',
      },
      tooltip: {
        items: [{ channel: 'y', valueFormatter: '~s' }],
      },
    },
  ],
});

chart.render();
